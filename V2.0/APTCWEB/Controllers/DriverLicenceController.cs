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
    /// Driver Licence Controller
    /// </summary>
    [RoutePrefix("api")]
    public class DriverLicenceController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        #endregion

        /// <summary>
        /// Get driver license data
        /// </summary>
        /// <returns></returns>
        // GET: api/Driver/license
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get driver license data by emirati Id
        /// </summary>
        /// <param name="id">DriverLicence_784-2020-9871234-1</param>
        /// <returns></returns>
        [Route("aptc_DriverLicence/{id}")]
        [HttpGet]
        [ResponseType(typeof(DriverLicenceOutPut))]
        public IHttpActionResult GetLicense(string id)
        {
            var userDocument1 = _bucket.Query<object>(@"SELECT id,licenseNumber,issueDate,expiryDate,action,hotelPickup From " + _bucket.Name + " where meta().id= '" + id + "'").ToList();
            return Content(HttpStatusCode.OK, userDocument1);
        }

        /// <summary>
        /// Post Driver License
        /// </summary>
        /// <returns></returns>
        [Route("aptc_DriverLicence")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Register(License model)
        {
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

                var driverlicenceId = "DriverLicence_" + model.ID;
                var driverlicenceDocumentEmirati = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where ID= '" + model.ID + "'").ToList();
                

                if (Convert.ToDateTime(model.ExpiryDate) <= Convert.ToDateTime(model.IssueDate))
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "164-license expiry date should be breater than license issue date"), new JsonMediaTypeFormatter());
                }

                if (model.Action == "ADD")
                {
                    if (driverlicenceDocumentEmirati.Count > 0)
                    {
                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "165-Emirati Id already exists"), new JsonMediaTypeFormatter());
                    }
                }


                if (model.Action == "ADD")
                {
                    var driverLicenseDoc = new Document<License>()
                    {
                        Id = driverlicenceId,
                        Content = new License
                        {
                            ID = model.ID,
                            Action = model.Action,
                            LicenseNumber = model.LicenseNumber,
                            IssueDate = DataConversion.ConvertYMDHMS(model.IssueDate),
                            ExpiryDate = DataConversion.ConvertYMDHMS(model.ExpiryDate),
                            HotelPickup = model.HotelPickup,
                            IsActive = true,
                            Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        }
                    };

                    var result = await _bucket.InsertAsync(driverLicenseDoc);
                    if (!result.Success)
                    {
                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                    }
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
                }
                else if (model.Action == "MOD")
                {
                    string queryString = @" update " + _bucket.Name + " set action ='" + model.Action + "', licenseNumber = '" + model.LicenseNumber + "',modifiedDate='" + DateTime.Now.ToString() + "'  where id= '" + model.ID + "'";
                    var result = await _bucket.QueryAsync<DriverModel>(queryString);
                    if (!result.Success)
                    {
                          return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(),"Data has not been updated."), new JsonMediaTypeFormatter());
                    }
                    return Content(HttpStatusCode.Accepted, model.ID + " updated successfully");
                }
                return null;
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
