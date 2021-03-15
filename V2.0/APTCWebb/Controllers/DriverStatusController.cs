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
using APTCWebb.Models;
using Couchbase;
using Couchbase.Core;
using APTCWebb.OutPutDto;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// Driver Status Controller
    /// </summary>
    [RoutePrefix("api")]
    public class DriverStatusController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion

        /// <summary>
        /// Get data
        /// </summary>
        /// <returns></returns>
        // GET: api/driverStatus
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get data by id
        /// </summary>
        /// <param name="id">DriverStatus_1GNEK13ZX3R298984</param>
        /// <returns></returns>
        // GET: api/driverStatus/5
        [Route("aptc_drstat{id}")]

        [HttpGet]
        [ResponseType(typeof(DriverStatusOutPut))]
        public IActionResult GetDriverStatus(string id)
        {
            var result = _bucket.Get<object>(id);
            return Content(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns></returns>
        [Route("aptc_drstat/getall")]
        [HttpGet]
        [ResponseType(typeof(DriverStatusOutPut))]
        public IActionResult GetAllDriverStatus()
        {
            var driverStatusDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as DriverStatus where driverID like 'DriverStatus%'").ToList();
            return Content(HttpStatusCode.OK, driverStatusDocument);
        }

        /// <summary>
        /// Post Driver Status
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_drstat")]
        [Route("car_drstat")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> RegisterDriverStatus(DriverStatus model)
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
                var userKey = "DriverStatus_" + model.VehicleID;
                if (await _bucket.ExistsAsync(userKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"Driver Status '{model.VehicleID}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "166-Vehicle ID already exists"), new JsonMediaTypeFormatter());
                }
                // call third part api to check Vehicle is valid or not
                var driverStatusMessageDoc = new Document<DriverStatus>()
                {
                    Id = userKey,
                    Content = new DriverStatus
                    {
                        DriverID = userKey,
                        DriverState = model.DriverState,
                        Date = model.Date,
                        Time = model.Time,
                        VehicleID = model.VehicleID,
                    }
                };
                var result = await _bucket.InsertAsync(driverStatusMessageDoc);
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
