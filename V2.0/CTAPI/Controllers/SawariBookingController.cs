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
using CTAPI.Common;
using CTAPI.Helpers;
using CTAPI.Models;
using Couchbase;
using Couchbase.Core;

namespace CTAPI.Controllers
{
    /// <summary>
    /// Sawari Booking Controller
    /// </summary>
    [RoutePrefix("api")]
    public class SawariBookingController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        /// <summary>
        /// Post Sawari Booking
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Post</returns>
        [Route("car_sawari")]
        [HttpPost]
        [ResponseType(typeof(SawariBookingResponse))]
        public IHttpActionResult RegisterSawariBooking(SawariBookingModel model)
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

                // Commented By Arvind acccording vinay on 21/08/2018

                //var userKey = "SawariBooking_" + model.PassengerID;
                //if (await _bucket.ExistsAsync(userKey))
                //{
                //    //return Content(HttpStatusCode.Conflict, new Error($"SawariBooking '{model.PassengerID}' already exists"));
                //    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "169-Passenger ID already exists."), new JsonMediaTypeFormatter());
                //}
                //AuditInfo auditInfo = new AuditInfo(); 
                //if (model.AuditInfo != null)
                //{
                //    auditInfo.Version = model.AuditInfo.Version;
                //    auditInfo.Status = model.AuditInfo.Status;
                //    auditInfo.Remarks = model.AuditInfo.Remarks;
                //    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                //    auditInfo.LastChangeBy = model.AuditInfo.LastChangeBy;
                //    auditInfo.DateCreated = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                //    auditInfo.CreatedBy = model.AuditInfo.CreatedBy;
                //}
                //var sawariBookingModelMessageDoc = new Document<SawariBookingModel>()
                //{
                //    Id = userKey,
                //    Content = new SawariBookingModel
                //    {
                //        PassengerID = model.PassengerID,
                //        MobileNumber = model.MobileNumber,
                //        FromLocation = model.FromLocation,
                //        ToLocation = model.ToLocation,
                //        DateTimeRequired = model.DateTimeRequired,
                //        Comments = model.Comments,
                //        AuditInfo= auditInfo
                //    }
                //};
                //var result = await _bucket.InsertAsync(sawariBookingModelMessageDoc);

                //if (!result.Success)
                //{
                //    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                //}

                Booking booking = new Booking();
                booking.FromLocation = model.FromLocation;
                booking.ToLocation = model.ToLocation;
                booking.DateTimeRequired = model.DateTimeRequired;
                booking.Comments = model.Comments;

                var PassengerMessage = _bucket.GetDocument<object>("PassengerMessage_"+model.PassengerID);
                if (PassengerMessage.Content != null)
                {
                    string query = @"UPDATE APTCCRM SET booking = ARRAY_APPEND( booking, " + Newtonsoft.Json.JsonConvert.SerializeObject(booking).ToString() + ") where meta().id = 'PassengerMessage_" + model.PassengerID + "'";
                    var result = _bucket.Query<object>(query);
                }
                else
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "169-Passenger ID does not exists."), new JsonMediaTypeFormatter());
                }

                SawariBookingResponse sawariBookingResponse = new SawariBookingResponse();
                sawariBookingResponse.RequestRefID = model.PassengerID;
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
