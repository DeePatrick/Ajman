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
    /// Passenger Message Controller
    /// </summary>
    [RoutePrefix("api")]
    public class PassengerMessageController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion
        /// <summary>
        /// Get data
        /// </summary>
        /// <returns></returns>
        // GET: api/passengerMessage
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Get data by Id
        /// </summary>
        /// <param name="id">PassengerMessage_abdul.rahman@qlc.com</param>
        /// <returns></returns>
        // GET: api/passengerMessage/5
        [Route("aptc_passng/{id}")]
        [HttpGet]
        [ResponseType(typeof(PassengerMessageOutPut))]
        public IActionResult GetPassengerMessage(string id)
        {
            var result = _bucket.Get<object>(id);
            return Content(HttpStatusCode.OK, result);
        }

        
        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns></returns>
        [Route("aptc_passng/getall")]
        [HttpGet]
        [ResponseType(typeof(PassengerMessageOutPut))]
        public IActionResult GetAllPassengerMessage()
        {
            var passengerMessageDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as PassengerMessage where  META().id LIKE 'PassengerMessage_%'").ToList();
            return Content(HttpStatusCode.OK, passengerMessageDocument);
        }

        /// <summary>
        /// Post Passenger Message
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_passng")]
        [Route("car_passng")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> RegisterPassengerMessage(PassengerMessageModel model)
        {
            //Modified by Vishal on 23-07-2018 as per joe email
            if (string.IsNullOrEmpty(model.NameEN) && string.IsNullOrEmpty(model.NameAR))
            {
                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "110-NameEN or NameAR is required"), new JsonMediaTypeFormatter());
            }
            try
            {
                //Modified by Vishal on 24-07-2018 as per joe email
                if (string.IsNullOrEmpty(model.NameEN) && string.IsNullOrEmpty(model.NameAR))
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "110-Either nameEN or nameAR is required"), new JsonMediaTypeFormatter());
                }
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

                var userKey = "PassengerMessage_" + model.EmailAddress;
                if (await _bucket.ExistsAsync(userKey))
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-The e-mail already exists"), new JsonMediaTypeFormatter());
                }
                // call third part api to check Vehicle is valid or not
                var passengerMessageDoc = new Document<PassengerMessageModel>()
                {
                    Id = userKey,
                    Content = new PassengerMessageModel
                    {
                        Action = "ADD",
                        PassengerID = userKey,
                        NameEN = model.NameEN,
                        NameAR = model.NameAR,
                        MobileNumber = model.MobileNumber,
                        EmailAddress = model.EmailAddress,
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

        //// PUT: api/passengerMessage/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}
        /// <summary>
        ///  Delete
        /// </summary>
        /// <param name="id">PassengerMessage_abdul.rahman@qlc.com</param>
        /// <returns></returns>
        [Route("aptc_passng/delete/{id}")]
        [HttpGet]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {

                var result = await _bucket.RemoveAsync(id);
                if (!result.Success)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "Data has not been updated."), new JsonMediaTypeFormatter());
                }

                return Content(HttpStatusCode.Accepted, "deleted");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, ex.StackTrace);
            }
        }
    }
}
