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
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
using APTCWEB.OutPutDto;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Incident Message Controller
    /// </summary>
    [RoutePrefix("api")]
    public class IncidentMessageController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion
        // GET: api/incidentMessage
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get by Id
        /// </summary>
        /// <param name="id">IncidentMessage_784-2020-1234567-1</param>
        /// <returns>Return Incident Message Details for id=IncidentMessage_784-2020-1234567-1</returns>
        // GET: api/incidentMessage/5
        [Route("aptc_incdnt/{id}")]
        [HttpGet]
        [ResponseType(typeof(IncidentMessageOutPut))] 
        public IHttpActionResult GetIncidentMessage(string id)
        {
            var result = _bucket.Get<object>(id);
            return Content(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns></returns>
        [Route("aptc_incdnt/getall")]
        [HttpGet]
        [ResponseType(typeof(IncidentMessageOutPut))]
        public IHttpActionResult GetAllIncidentMessage()
        {
            var driverStatusDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as IncidentMessage where id like 'IncidentMessage%'").ToList();
            return Content(HttpStatusCode.OK, driverStatusDocument);
        }

        /// <summary>
        /// Post Incident Message
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_incdnt")]
        [Route("car_incdnt")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))] 
        public async Task<IHttpActionResult> RegisterIncidentMessage(IncidentMessageModel model)
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

                var userKey = "IncidentMessage_" + model.DriverID;
                if (await _bucket.ExistsAsync(userKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"Incident Message '{model.DriverID}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "167-Driver ID already exists"), new JsonMediaTypeFormatter());
                }
                // call third part api to check Vehicle is valid or not
                var incidentMessageMessageDoc = new Document<IncidentMessageModel>()
                {
                    Id = userKey,
                    Content = new IncidentMessageModel
                    {
                        ID = userKey,
                        DriverID = model.DriverID,
                        DateTime = model.DateTime,
                        Notes = model.Notes,
                    }
                };
                var result = await _bucket.InsertAsync(incidentMessageMessageDoc);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
        private static string CreateUserKey(string username)
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }
    }
}
