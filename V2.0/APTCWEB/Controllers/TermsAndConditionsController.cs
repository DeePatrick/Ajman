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
    /// Terms and conditions
    /// </summary>
    [RoutePrefix("api")]
    public class TermsAndConditionsController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion

        /// <summary>
        /// Get Terms and Conditions
        /// </summary>
        /// <returns>Return list of company details</returns>
        [Route("aptc_getTermsAndConditions")]
        [HttpGet]
        public IHttpActionResult GetAboutUs()
        {
            var termsAndConditionsDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as AboutUs where meta().id LIKE 'termsAndConditions_%'").ToList();
            return Content(HttpStatusCode.OK, termsAndConditionsDocument);
        }


        /// <summary>
        ///  Add Terms and Conditions
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_addTermsAndConditions")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> RegisterAboutUs(TermsAndConditions model)
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

                var termsAndConditionsUsMessageDoc = new Document<TermsAndConditions>()
                {
                    Id = "termsAndConditions_" + CreateUserKey(),
                    Content = new TermsAndConditions
                    {
                        Contents = model.Contents,
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString())
                    }
                };
                var result = await _bucket.InsertAsync(termsAndConditionsUsMessageDoc);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Update  Terms and Conditions
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_editTermsAndConditions/{id}")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> UpdateTermsAndConditions([FromUri]string id, TermsAndConditions model)
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

                // add document code
                string query = @"UPDATE " + _bucket.Name + " SET contents = '" + model.Contents + "',modify_On= '" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "' where meta().id='" + id + "'";
                var result = _bucket.Query<object>(query);
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), id + " has been updated sucessfully"), new JsonMediaTypeFormatter());
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
