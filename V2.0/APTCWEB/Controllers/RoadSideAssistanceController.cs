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
using APTCWEB.Common;
using APTCWEB.Helpers;
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
using APTCWEB.OutPutDto;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Road Side Assistance Controller
    /// </summary>
    [RoutePrefix("api")]
    public class RoadSideAssistanceController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion
        // GET: api/RoadSideAssistance
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get data By Id
        /// </summary>
        /// <param name="id">RoadSideAssistance_7654321</param>
        /// <returns></returns>
        // GET: api/RoadSideAssistance/5
        [Route("aptc_rdasst/{id}")]
        [HttpGet]
        [ResponseType(typeof(RoadsideAssistanceOutPut))]
        public IHttpActionResult GetRoadSideAssistance(string id)
        {
            var allVehicleDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as RoadSideAssistance where meta().id='" + id + "'").ToList();
            return Content(HttpStatusCode.OK, allVehicleDocument);
        }


        /// <summary>
        /// Get All Data
        /// </summary>
        /// <returns></returns>
        // GET: api/RoadSideAssistance/getAll
        [Route("aptc_rdasst/getall")]
        [HttpGet]
        [ResponseType(typeof(RoadsideAssistanceOutPut))]
        public IHttpActionResult GetAllRoadSideAssistance()
        {
            var allVehicleDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as RoadSideAssistance where meta().id like 'RoadSideAssistance_%'").ToList();
            return Content(HttpStatusCode.OK, allVehicleDocument);
        }

        /// <summary>
        /// Post Road side Assistance
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_rdasst")]
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

                var userKey = "RoadSideAssistance_" + model.PassengerID;
                if (await _bucket.ExistsAsync(userKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"RoadSideAssistance '{model.PassengerID}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "169-Passenger ID already exists"), new JsonMediaTypeFormatter());
                }

                AuditInfo auditInfo = new AuditInfo();
                if (model.AuditInfo != null)
                {
                    auditInfo.Version = model.AuditInfo.Version;
                    auditInfo.Status = model.AuditInfo.Status;
                    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                    auditInfo.LastChangeBy = model.AuditInfo.LastChangeBy;
                }
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
                        AuditInfo= auditInfo
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
