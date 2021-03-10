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
    /// Passenger Message Controller
    /// </summary>
    [RoutePrefix("api")]
    public class PassengerMessageController : ApiController
    {
        #region Private 
            private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
            private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion

        /// <summary>
        /// Post Passenger Message
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Post</returns>
        [Route("car_passng")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> RegisterPassengerMessage(PassengerMessageModel model)
        {
            //Modified by Vishal on 24-07-2018 as per joe email
            if (string.IsNullOrEmpty(model.NameEN) && string.IsNullOrEmpty(model.NameAR))
            {
                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "110-Either arbic name or english name is required"), new JsonMediaTypeFormatter());
            }
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

                var userKey = "PassengerMessage_" + model.PassengerID;
                if (await _bucket.ExistsAsync(userKey))
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-Passenger ID already exists."), new JsonMediaTypeFormatter());
                }
                List<SawariBookingModel> sawariBookingModels = new List<SawariBookingModel>();

                // call third part api to check Vehicle is valid or not
                var passengerMessageDoc = new Document<PassengerMessageModel>()
                {
                    Id = userKey,
                    Content = new PassengerMessageModel
                    {
                        //Action = "ADD",
                        PassengerID = model.PassengerID,
                        NameEN = model.NameEN,
                        NameAR = model.NameAR,
                        MobileNumber = model.MobileNumber,
                        EmailAddress = model.EmailAddress,
                        Booking = sawariBookingModels,
                        // this is only UAT testing for check when ct created.
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        Created_By = "CarTrack"
                    }
                };

                var result = await _bucket.InsertAsync(passengerMessageDoc);
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
