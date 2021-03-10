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
    /// Road Side Assistance Controller
    /// </summary>
    [RoutePrefix("api")]
    public class RoadSideAssistanceController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        /// <summary>
        /// Post Road Side Assistance
        /// <param name="model"></param>
        /// <returns>Post</returns>
        [Route("car_rdasst")]
        [HttpPost]
        [ResponseType(typeof(RoadSideAssistanceResponse))]
        public async Task<IHttpActionResult> RegisterDriverStatus(RoadsideAssistanceModel model)
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

                var userKey = "RoadSideAssistance_" + model.PassengerID +"_" +DateTime.Now.Ticks.ToString();
                //if (await _bucket.ExistsAsync(userKey))
                //{
                //    //return Content(HttpStatusCode.Conflict, new Error($"RoadSideAssistance '{model.PassengerID}' already exists"));
                //    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "169-Passenger ID already exists."), new JsonMediaTypeFormatter());
                //}

                //AuditInfo auditInfo = new AuditInfo();
                //if (model.AuditInfo != null)
                //{
                //    auditInfo.Version = model.AuditInfo.Version;
                //    auditInfo.Status = model.AuditInfo.Status;
                //    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                //    auditInfo.LastChangeBy = model.AuditInfo.LastChangeBy;
                //}
                var roadSideAssistanceMessageDoc = new Document<RoadsideAssistanceModel>()
                {
                    Id = userKey,
                    Content = new RoadsideAssistanceModel
                    {
                        PassengerID = model.PassengerID,
                        MobileNumber = model.MobileNumber,
                        Latitude = model.Latitude,
                        Longitude = model.Longitude,
                        ServiceRequired = model.ServiceRequired,
                        Comments  = model.Comments,
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        Created_By = "CarTrack"
                        //AuditInfo= auditInfo
                    }
                };
                var result = await _bucket.InsertAsync(roadSideAssistanceMessageDoc);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }

                RoadSideAssistanceResponse roadSideAssistanceResponse = new RoadSideAssistanceResponse();
                roadSideAssistanceResponse.RequestRefID = result.Document.Id;
                roadSideAssistanceResponse.Message = "message by CT";
                roadSideAssistanceResponse.Telephone = "1800-6000-123456";

                var jsonRSAR = JSONHelper.ToJSON(roadSideAssistanceResponse);
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), jsonRSAR));
                //return Content(HttpStatusCode.OK, roadSideAssistanceResponse);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
