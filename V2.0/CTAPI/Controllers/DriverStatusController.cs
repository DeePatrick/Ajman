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
using CTAPI.Models;
using Couchbase;
using Couchbase.Core;

namespace CTAPI.Controllers
{
    /// <summary>
    /// Driver Status Controller
    /// </summary>
    [RoutePrefix("api")]
    public class DriverStatusController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));

        ///// <summary>
        ///// Post Driver Status
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns>Post</returns>
        //[Route("car_drstat")]
        //[HttpPost]
        //[ResponseType(typeof(MessageModel))]
        //public async Task<IHttpActionResult> RegisterDriverStatus(DriverStatus model)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            var modelErrors = new List<string>();
        //            foreach (var modelState in ModelState.Values)
        //            {
        //                foreach (var modelError in modelState.Errors)
        //                {
        //                    modelErrors.Add(modelError.ErrorMessage);
        //                }
        //            }
        //            return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
        //        }
        //        var userKey = "DriverStatus_" + model.VehicleID;
        //        if (await _bucket.ExistsAsync(userKey))
        //        {
        //            //return Content(HttpStatusCode.Conflict, new Error($"Driver Status '{model.VehicleID}' already exists"));
        //            return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "166-Vehicle ID already exists"), new JsonMediaTypeFormatter());
        //        }
        //        // call third part api to check Vehicle is valid or not
        //        var incidentMessageMessageDoc = new Document<DriverStatus>()
        //        {
        //            Id = userKey,
        //            Content = new DriverStatus
        //            {
        //                DriverID = model.DriverID,
        //                DriverState = model.DriverState,
        //                Date = model.Date,
        //                Time = model.Time,
        //                VehicleID = model.VehicleID,
        //                // this is only UAT testing for check when ct created.
        //                Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
        //                Created_By = "CarTrack"
        //            }
        //        };
        //        var result = await _bucket.InsertAsync(incidentMessageMessageDoc);
        //        if (!result.Success)
        //        {
        //            return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
        //        }
        //            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
        //    }
        //}
        private static string CreateUserKey(string username)
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }

        //////////////////// New way to update driver status code - as discussed with mosaab - 21-Sep-2108
        /// <summary>
        /// Post Driver Status
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Post</returns>
        [Route("car_drstat")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> RegisterDriverStatus(DriverStatus model)
        {
            bool isThisTaxiDriver;
            isThisTaxiDriver = false;
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

                string query = @"SELECT * From " + _bucket.Name + " as Driver where meta().id= 'individual_" + model.DriverID + "'";
                var driverIsExistOrNot = _bucket.Query<object>(query).ToList();
                if (driverIsExistOrNot.Count == 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.DriverID+ " driver not exists."), new JsonMediaTypeFormatter());
                }
                else
                {
                    foreach (var item1 in driverIsExistOrNot)
                    {
                        isThisTaxiDriver = false;
                        if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["roles"] != null)
                        {
                            //roles-roleID
                            var taxiDriverType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["roles"];
                            foreach (var itemTD in taxiDriverType)
                            {
                                if (itemTD["nAME_EN"] != null)
                                {
                                    if (itemTD["nAME_EN"].ToString().ToLower().Contains("taxi drivers"))
                                    {
                                        isThisTaxiDriver = true;
                                    }
                                }
                            }
                        }
                    }
                }

                if (isThisTaxiDriver)
                {
                    DriverStatus addNewDriverStatus = new DriverStatus();
                    addNewDriverStatus.DriverID = model.DriverID;
                    addNewDriverStatus.DriverState = model.DriverState;
                    addNewDriverStatus.Date = model.Date;
                    addNewDriverStatus.Time = model.Time;
                    addNewDriverStatus.VehicleID = model.VehicleID;

                    var queryUpdateDriverStatus = @"update " + _bucket.Name + " SET driverStatus= ARRAY_APPEND(driverStatus, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewDriverStatus).ToString() + " ) where meta().id like'individual_%' and keyID ='" + model.DriverID + "'";
                    var result = _bucket.Query<object>(queryUpdateDriverStatus);
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.DriverID + " driver status has been added sucessfully"), new JsonMediaTypeFormatter());
                }
                else
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.DriverID + " have not taxi driver role."), new JsonMediaTypeFormatter());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
