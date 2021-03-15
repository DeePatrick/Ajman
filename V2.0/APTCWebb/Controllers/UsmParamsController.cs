//using Couchbase.Core;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;
//using System.Web.Http.Description;
//using APTCWebb.OutPutDto;
//using APTCWebb.Common;
//using System.Net.Http.Formatting;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// UsmParamsController
//    /// </summary>
//    [RoutePrefix("api")]
//    public class UsmParamsController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = Couchbase.ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
//        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
//        string baseFilePath = ConfigurationManager.AppSettings["BaseFilePath"];
//        #endregion 


//        /// <summary>
//        /// Get get Usm Params by Role ID
//        /// </summary>
//        /// <param name="roleID"></param>
//        /// <returns></returns>
//        [Route("aptc_getUsmParams/{RoleCode}")]
//        [HttpGet]
//        [ResponseType(typeof(USMParamsOutPut))]
//        public IActionResult GetUsmParams(string roleCode)
//        {
//            try
//            {
//                string query = @"SELECT r.* FROM " + _bucket.Name + " AS d UNNEST d.`Role` AS r WHERE r.RoleCode = '" + roleCode + "'";
//                var usmParamsDocument = _bucket.Query<object>(query).ToList();
                
//                if (usmParamsDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, "200-Please enter valid Role Code.");
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, usmParamsDocument);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//    }
//}
