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
    /// Incident Message Controller
    /// </summary>
    [RoutePrefix("api")]
    public class IncidentMessageController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        /// <summary>
        /// Post Incident Message
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Post</returns>
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

                var userKey = "IncidentMessage_" + model.DriverID + "_" + DateTime.Now.Ticks.ToString();
                //if (await _bucket.ExistsAsync(userKey))
                //{
                //    //return Content(HttpStatusCode.Conflict, new Error($"Incident Message '{model.DriverID}' already exists"));
                //    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "167-Driver ID already exists"), new JsonMediaTypeFormatter());
                //}
                // call third part api to check Vehicle is valid or not
                var incidentMessageMessageDoc = new Document<IncidentMessageModel>()
                {
                    Id = userKey,
                    Content = new IncidentMessageModel
                    {
                        DriverID = model.DriverID,
                        DateTime = model.DateTime,
                        Notes = model.Notes,
                        // this is only UAT testing for check when ct created.
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                        Created_By = "CarTrack"
                    }
                };
                var result = await _bucket.InsertAsync(incidentMessageMessageDoc);

                if (!result.Success)
                {
                    //return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), EncryptDecrypt.Encryptword(result.Message)), new JsonMediaTypeFormatter());
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }
                //return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, EncryptDecrypt.Encryptword(result.Document.Id)), new JsonMediaTypeFormatter());
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
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
