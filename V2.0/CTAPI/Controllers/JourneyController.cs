using CTAPI.Common;
using CTAPI.Models;
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
using System.Linq;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Journey Controller
    /// </summary>
    [RoutePrefix("api")]
    public class JourneyController : ApiController
    {
        private readonly Couchbase.Core.IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        /// <summary>
        /// Post Trip
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Post</returns>
        [Route("car_trip")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Journey(Journey model)
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


                var validateTripBookingId = _bucket.Query<object>(@"SELECT  * From "+ _bucket.Name + " where meta().id like 'Trip_%' and bookingId='" + model.BookingId +"'").ToList();

                if (validateTripBookingId.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "185-Trip Booking Id already exists"), new JsonMediaTypeFormatter());
                }

                var pickupDate = Convert.ToDateTime(DataConversion.ConvertYMDHMS(model.PickupDateTime));
                var currentDate = Convert.ToDateTime(DataConversion.ConvertYMDHMS(DateTime.Now.ToString()));

                if (pickupDate > currentDate)
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "168-pickup Date cannot be future date"), new JsonMediaTypeFormatter());
                }

                var journeyDoc = new Document<Journey>()
                {
                    Id = "Trip_" + CreateUserKey(),
                    Content = new Journey
                    {
                        BookingId = model.BookingId,//Booking ID in CT
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
                        Created_On =  DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        Created_By= "CarTrack"//model.DriverID
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
