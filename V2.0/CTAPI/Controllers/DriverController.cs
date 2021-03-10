using CTAPI.App_Start;
using CTAPI.Models;
using Couchbase;
using Couchbase.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using CTAPI.Common;
using System.Web.Http.Description;
using System.Net.Http.Formatting;
using System.Text;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CTAPI.Controllers
{
    /// <summary>
    /// Driver Controller
    /// </summary>
    [RoutePrefix("api")]
    public class DriverController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        /// <summary>
        /// Push Driver
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Push</returns>        
        [Route("car_driver")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Register(DriverModel model)
        {
            //Modified by Arvind on 23-07-2018 as per joe email
            if (string.IsNullOrEmpty(model.NameEN) && string.IsNullOrEmpty(model.NameAR))
            {
                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "110-Either aribac name or english name is required"), new JsonMediaTypeFormatter());
            }
            string destinationPath = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("FilePath"));
            destinationPath = destinationPath + "/driver";
            string root = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("TempFilePath"));
            var tempPath = Path.GetTempPath();
            try
            {
                if (!ModelState.IsValid)
                {
                    var modelErrors = new List<string>();
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            modelErrors.Add(modelError.ErrorMessage);
                        }
                    }
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
                }

                var driverId = "Driver_" + model.EmiratiId;
                var driverDocumentEmirati = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where meta().id= 'Driver_" + model.EmiratiId + "'").ToList();

                var driverDocumentEmail = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where emailAddress= '" + model.EmailAddress + "'").ToList();

                if (Convert.ToDateTime(model.LicenseExpiryDate) <= Convert.ToDateTime(model.LicenseIssueDate))
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "164-license expiry date should be greater than license issue date"), new JsonMediaTypeFormatter());
                }
                if (driverDocumentEmirati.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "165-Emirati Id already exists"), new JsonMediaTypeFormatter());
                }
                if (driverDocumentEmail.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-The e-mail already exists"), new JsonMediaTypeFormatter());
                }

                bool isDriverValid = true;

                string password = Guid.NewGuid().ToString("d").Substring(1, 4);
                var driverDoc = new Document<DriverModel>()
                {
                    Id = driverId,
                    Content = new DriverModel
                    {
                        EmiratiId = model.EmiratiId,
                        NameEN = model.NameEN,
                        NameAR = model.NameAR,
                        Action = "Add",
                        DriverValid = isDriverValid.ToString(),
                        EmailAddress = model.EmailAddress,
                        LicenseNumber = model.LicenseNumber,
                        PassportNumber = model.PassportNumber,
                        MobileNumber = model.MobileNumber,
                        PermitNumber = model.PermitNumber,
                        Photo = model.Photo,
                        VehicleType = model.VehicleType,
                        LicenseIssueDate = DataConversion.ConvertYMDHMS(model.LicenseIssueDate),
                        LicenseExpiryDate = DataConversion.ConvertYMDHMS(model.LicenseExpiryDate),
                        Password = password,
                        IsActive = true,
                        IsDeleted = false,
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        Created_By = model.Created_By,//model.EmailAddress,
                        Franchise = model.Franchise,
                        HotelPickup = model.HotelPickup,
                        CarTrackDriverResponse = new CarTrackDriverResponse
                        {
                            CTStatus = "No",
                            CTDescription = string.Empty
                        }
                    }
                };
                var result = await _bucket.InsertAsync(driverDoc);
                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }


        /// <summary>
        /// Update Driver Data from CT to AjmanGO
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Push</returns>
        [Route("car_update_APTCDriver")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> updateAPTCDriver(Driver_CT_Data model)
        {
            string CTUpdateAPIURL = ConfigurationManager.AppSettings.Get("CTDriverUpdateURL");
            string CTAPIUserId = ConfigurationManager.AppSettings.Get("CTAPIUserId"); ;
            string CTAPIPassword = ConfigurationManager.AppSettings.Get("CTAPIPassword"); ;

            try
            {
                using (var client = new HttpClient())
                {
                    using (var request = new HttpRequestMessage(HttpMethod.Post, CTUpdateAPIURL))
                    {
                        var byteArray = Encoding.ASCII.GetBytes(CTAPIUserId + ":" + CTAPIPassword);
                        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                        var jsonInpt = JsonConvert.SerializeObject(model);

                        var response = await client.PostAsync(CTUpdateAPIURL, new StringContent(jsonInpt));

                        response.EnsureSuccessStatusCode();

                        string content = await response.Content.ReadAsStringAsync();

                        JObject json = JObject.Parse(content);

                        if (response.StatusCode == HttpStatusCode.OK)
                        {
                            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), content, ""), new JsonMediaTypeFormatter());
                        }
                        else
                        {
                            return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), ""), new JsonMediaTypeFormatter());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), ex.InnerException.Message.ToString()), new JsonMediaTypeFormatter());
            }
        }
    }
}
