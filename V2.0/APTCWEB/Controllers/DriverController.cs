using APTCWEB.App_Start;
using APTCWEB.Models;
using APTCWEB.OutPutDto;
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
using APTCWEB.Common;
using System.Web.Http.Description;
using System.Net.Http.Formatting;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Driver Controller
    /// </summary>
    [RoutePrefix("api")]
    public class DriverController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        SendEmail sendEmail = new SendEmail();
        #endregion

        /// <summary>
        /// Get data
        /// </summary>
        /// <returns></returns>
        // GET: api/Driver
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get data by Id
        /// </summary>
        /// <param name="id">Driver_784-2020-9871234-1</param>
        /// <returns></returns>
        [Route("aptc_driver/{id}")]
        [HttpGet]
        [ResponseType(typeof(DriverOutPut))]
        public IHttpActionResult GetDriver(string id)
        {
            var userDocument1 = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Driver where meta().id= '" + id + "'").ToList();
            return Content(HttpStatusCode.OK, userDocument1);
        }

        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns></returns>
        [Route("aptc_driver/getall")]
        [HttpGet]
        [ResponseType(typeof(DriverOutPut))]
        public IHttpActionResult GetAllDriver()
        {
            //SELECT* From APTCCRM as Driver where META().id LIKE 'Driver_%' and isDeleted = false and isActive = true
            var driverDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Driver where META().id LIKE 'Driver_%' and  isDeleted=false and isActive=true").ToList();
            return Content(HttpStatusCode.OK, driverDocument);
        }

        /// <summary>
        /// Post Driver
        /// </summary>
        /// <returns></returns>
        [Route("aptc_driver")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Register(DriverModel model)
        {
            //Modified by Arvind on 23-07-2018 as per joe email
            if (string.IsNullOrEmpty(model.NameEN) && string.IsNullOrEmpty(model.NameAR))
            {
                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "110-Either nameEN or nameAR is required"), new JsonMediaTypeFormatter());
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

                var driverId = "Driver_" + model.ID;
                var driverDocumentEmirati = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where ID= '" + model.ID + "'").ToList();
                var driverDocumentEmail = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where emailAddress= '" + model.EmailAddress + "'").ToList();

                if (model.Action == "ADD")
                {
                    if (driverDocumentEmirati.Count > 0)
                    {
                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "165-Emirati Id already exists"), new JsonMediaTypeFormatter());
                    }
                    if (driverDocumentEmail.Count > 0)
                    {
                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-The e-mail already exists"), new JsonMediaTypeFormatter());
                    }
                }

                bool isDriverValid = true;

                string password = Guid.NewGuid().ToString("d").Substring(1, 4);
                var driverDoc = new Document<DriverModel>()
                {
                    Id = driverId,
                    Content = new DriverModel
                    {
                        ID = model.ID,
                        NameEN = model.NameEN,
                        NameAR = model.NameAR,
                        Action = model.Action,
                        DriverValid = isDriverValid.ToString(),
                        EmailAddress = model.EmailAddress,
                        LicenseNumber = model.LicenseNumber,
                        PassportNumber = model.PassportNumber,
                        MobileNumber = model.MobileNumber,
                        PermitNumber = model.PermitNumber,
                        Photo = model.Photo,
                        VehicleType = model.VehicleType,
                        Username=model.Username,
                        Password = password,
                        Franchise = model.Franchise,
                        IsActive = true,
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        Created_By = model.EmailAddress,
                        CarTrackDriverResponse = new CarTrackDriverResponse
                        {
                            CTStatus = "No",
                            CTDescription = string.Empty
                        }
                    }
                };
                if (model.Action == "ADD")
                {
                    var result = await _bucket.InsertAsync(driverDoc);
                    if (!result.Success)
                    {
                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                    }
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
                }
                else if (model.Action == "MOD")
                {
                    string queryString = @" update " + _bucket.Name + " set action ='" + model.Action + "',nameEN ='" + model.NameEN + "',nameAR = '" + model.NameAR + "' , mobileNumber = '" + model.MobileNumber + "', emailAddress = '" + model.EmailAddress + "' , vehicleType = '" + model.VehicleType + "' , permitNumber = '" + model.PermitNumber + "' , licenseNumber = '" + model.LicenseNumber + "' , passportNumber = '" + model.PassportNumber + "',carTrackDriverResponse.ctStatus='No' ,carTrackDriverResponse.ctDescription='',modified_On='" + DateTime.Now.ToString() + "'  where id= '" + model.ID + "'";
                    var result = await _bucket.QueryAsync<DriverModel>(queryString);
                    if (!result.Success)
                    {
                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "Data has not been updated."), new JsonMediaTypeFormatter());
                    }
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, model.ID.ToLower() + " updated successfully"), new JsonMediaTypeFormatter());

                }
                return null;
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Delete driver
        /// </summary>
        /// <param name="id">Driver_784-2020-9871234-1</param>
        /// <returns></returns>
        [Route("aptc_driver/delete/{id}")]
        [HttpGet]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Delete(string id)
        {
            try
            {
                bool isDeleted = true;
                string queryString = @" update " + _bucket.Name + " set isDeleted=" + isDeleted + " where id= '" + id + "'";
                var result = await _bucket.QueryAsync<DriverModel>(queryString);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "Data has not been updated."), new JsonMediaTypeFormatter());
                }

                return Content(HttpStatusCode.Accepted, "record deleted successfully");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, new Error(ex.StackTrace));
            }
        }

        /// <summary>
        /// Get Data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(DriverOutPut))]
        public IHttpActionResult Get(string id)
        {
            var userDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where meta().id= '" + id + "'").ToList();
            return Content(HttpStatusCode.OK, userDocument);
        }
    }
}
