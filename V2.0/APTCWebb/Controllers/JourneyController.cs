using APTCWebb.Common;
using APTCWebb.Models;
using Couchbase;
using Couchbase.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// Journey Controller
    /// </summary>
    [RoutePrefix("api")]
    public class JourneyController : ApiController
    {
        #region PrviavteFields
        private readonly Couchbase.Core.IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion

        /// <summary>
        /// Post Trip
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_trip")]
        [Route("car_trip")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> Journey(Journey model)
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

                var pickupDate = Convert.ToDateTime(DataConversion.ConvertYMDHMS(model.PickupDateTime));
                var currentDate = Convert.ToDateTime(DataConversion.ConvertYMDHMS(DateTime.Now.ToString()));

                if (pickupDate > currentDate)
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "168-Date cannot be in the future"), new JsonMediaTypeFormatter());
                }

                var journeyDoc = new Document<Journey>()
                {
                    Id = CreateUserKey(),
                    Content = new Journey
                    {
                        BookingId = CreateUserKey(),//Booking ID in CT
                        PassengerID=model.PassengerID,//Either a reference to a registered passenger or else “Anonymous” denoting a non-registered passenger
                        DestinationAddress = model.DestinationAddress,
                        DestinationLat = model.DestinationLat,
                        DestinationLon = model.DestinationLon,
                        DriverID = model.DriverID,
                        NumPassengers = model.NumPassengers,
                        PickupAddress = model.PickupAddress,
                        PickupDateTime = model.PickupDateTime,
                        PickupLat = model.PickupLat,
                        PickupLon = model.PickupLon,
                        VehicleID = model.VehicleID,
                        TaxiType = model.TaxiType,
                        Waypoints = model.Waypoints,
                        Created_On =  DataConversion.ConvertYMDHMS(DateTime.Now.ToString())
                    }
                };

                //IBucket _bucketperformance = ClusterHelper.GetBucket("DriverTrip");

                var result = await _bucket.InsertAsync(journeyDoc);

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
        private static string CreateUserKey()
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }
    }
}
