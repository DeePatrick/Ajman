using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using APTCWebb.Common;
using APTCWebb.Helpers;
using APTCWebb.Models;
using Couchbase;
using Couchbase.Core;
using APTCWebb.OutPutDto;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// Sawari Booking Controller
    /// </summary>
    [RoutePrefix("api")]
    public class SawariBookingController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion
        // GET: api/SawariBooking
        /// <summary>
        /// Get data
        /// </summary>
        /// <returns></returns>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get data by Id
        /// </summary>
        /// <param name="id">SawariBooking_784-2020-9871234-1</param>
        /// <returns></returns>
        // GET: api/SawariBooking/5
        [Route("aptc_sawari/{id}")]
        [HttpGet]
        [ResponseType(typeof(SawariBookingOutPut))]
        public IActionResult GetSawariBooking(string id)
        {
            var allVehicleDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as SawariBooking where meta().id='" + id + "'").ToList();
            return Content(HttpStatusCode.OK, allVehicleDocument);
        }

        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns></returns>
        // GET: api/SawariBooking/getAll
        [Route("aptc_sawari/getall")]
        [HttpGet]
        [ResponseType(typeof(SawariBookingOutPut))]
        public IActionResult GetAllSawariBooking()
        {
            var allVehicleDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as SawariBooking where meta().id like 'SawariBooking_%'").ToList();
            return Content(HttpStatusCode.OK, allVehicleDocument);
        }

        /// <summary>
        /// Post Sawari Booking
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_sawari")]
        [Route("car_sawari")]
        [HttpPost]
        [ResponseType(typeof(SawariBookingResponse))]
        public async Task<IActionResult> RegisterDriverStatus(SawariBookingModel model)
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

                var userKey = "SawariBooking_" + model.PassengerID;
                if (await _bucket.ExistsAsync(userKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"SawariBooking '{model.PassengerID}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "169-Passenger ID already exists."), new JsonMediaTypeFormatter());
                }
                AuditInfo auditInfo = new AuditInfo(); 
                if (model.AuditInfo != null)
                {
                    auditInfo.Version = model.AuditInfo.Version;
                    auditInfo.Status = model.AuditInfo.Status;
                    auditInfo.Remarks = model.AuditInfo.Remarks;
                    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                    auditInfo.LastChangeBy = model.AuditInfo.LastChangeBy;
                    auditInfo.DateCreated = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                    auditInfo.CreatedBy = model.AuditInfo.CreatedBy;
                }
                var sawariBookingModelMessageDoc = new Document<SawariBookingModel>()
                {
                    Id = userKey,
                    Content = new SawariBookingModel
                    {
                        PassengerID = model.PassengerID,
                        MobileNumber = model.MobileNumber,
                        FromLocation = model.FromLocation,
                        ToLocation = model.ToLocation,
                        DateTimeRequired = model.DateTimeRequired,
                        Comments = model.Comments,
                        AuditInfo= auditInfo
                    }
                };
                var result = await _bucket.InsertAsync(sawariBookingModelMessageDoc);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }

                SawariBookingResponse sawariBookingResponse = new SawariBookingResponse();
                sawariBookingResponse.RequestRefID = result.Document.Id;
                sawariBookingResponse.Message = "messge by CT";
                sawariBookingResponse.Telephone = "1800-6000-123456";

                var jsonSBR = JSONHelper.ToJSON(sawariBookingResponse);
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), jsonSBR), new JsonMediaTypeFormatter());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
