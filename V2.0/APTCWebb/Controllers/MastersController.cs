//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Formatting;
//using System.Threading.Tasks;
//using System.Web.Http;
//using System.Web.Http.Description;
//using APTCWebb.Common;
//using APTCWebb.Models;
//using Couchbase;
//using Couchbase.Core;
//using APTCWebb.OutPutDto;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Masters Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    public class MastersController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
//        #endregion

//        /// <summary>
//        /// Get Common Masters
//        /// </summary>
//        /// <returns>Return list of company details</returns>
//        [Route("aptc_getCommonMasters/{name}")]
//        [HttpGet]
//        public IActionResult GetCommonMasters(string name)
//        {
//            //string query = @"SELECT Contents." + name + " From " + _bucket.Name + " as cmt where meta().id='REF_EN_US'";
//            string query = @"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['"+ name + "'] AS r";
//            var CommonMasterDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, CommonMasterDocument);
//        }

//        /// <summary>
//        ///  Add Common Masters
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_addCommonMasters/{name}")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> RegisterCommonMasters([FromUri]string name, CommonMasters model)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                {
//                    var modelErrors = new List<string>();
//                    foreach (var modelState in ModelState.Values)
//                    {
//                        foreach (var modelError in modelState.Errors)
//                        {
//                            modelErrors.Add(modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
//                }

//                CommonMasters addNewCommonMaster = new CommonMasters();
//                addNewCommonMaster.Code = model.Code;
//                addNewCommonMaster.Value = model.Value;
//                addNewCommonMaster.Rank = model.Rank;

//                // add scoreCard code
//                string query = @"UPDATE " + _bucket.Name + " SET "+ name + " = ARRAY_APPEND("+ name + ", " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewCommonMaster).ToString() + ") where meta().id='REF_EN_US'";
//                var result = _bucket.Query<object>(query);
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), "Master data has been added sucessfully"), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Update Masters
//        /// </summary>
//        /// <param name="id"></param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_editCommonMasters/{name}")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> UpdateCommonMasters([FromUri]string name, CommonMasters model)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                {
//                    var modelErrors = new List<string>();
//                    foreach (var modelState in ModelState.Values)
//                    {
//                        foreach (var modelError in modelState.Errors)
//                        {
//                            modelErrors.Add(modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
//                }

//                string query = @"SELECT Contents." + name + " From " + _bucket.Name + " as CommonMasters where meta().id='REF_EN_US'";
//                var CommonMasterDocument = _bucket.Query<object>(query).ToList();
//                foreach (var item1 in CommonMasterDocument)
//                {
//                    var cMData = ((Newtonsoft.Json.Linq.JToken)item1).Root[""+ name +""];

//                    foreach (var item in cMData)
//                    {
//                        if (item["Code"].ToString()==model.Code)
//                        {
//                            // edit Common Master
//                            string updateQuery = @"UPDATE " + _bucket.Name + " SET value = '" + model.Value + "',rank = '" + model.Rank + "' where meta().id='REF_EN_US'";
//                            var result = _bucket.Query<object>(updateQuery);
//                            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), name + " has been updated sucessfully"), new JsonMediaTypeFormatter());
//                        }
//                    }
//                }
//                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "code not found."), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        private static string CreateUserKey()
//        {
//            var key = Guid.NewGuid(); ; //$"user:{username}";
//            return key.ToString();
//        }

//        /// <summary>
//        /// Get State Master as per country
//        /// </summary>
//        /// <returns>Return list of state of selected country details</returns>
//        [Route("aptc_getStateOfCountry/{countryCode}")]
//        [HttpGet]
//        public IActionResult GetStateOfCountry(string countryCode)
//        {
//            string query = @"SELECT r.State FROM "+ _bucket.Name +" AS d UNNEST d.Country AS r WHERE r.Code = '"+ countryCode + "';";
//            var stateOfCountryDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, stateOfCountryDocument);
//        }

//        /// <summary>
//        /// Get Model Master as per vehMake
//        /// </summary>
//        /// <returns>Return list of Model of selected vehMake details</returns>
//        [Route("aptc_getModelOfVehMake/{vehMakeCode}")]
//        [HttpGet]
//        public IActionResult GetModelOfVehMake(string vehMakeCode)
//        {
//            string query = @"SELECT r.Model FROM " + _bucket.Name + " AS d UNNEST d.VehMake AS r WHERE r.Code = " + vehMakeCode + ";";
//            var stateOfCountryDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, stateOfCountryDocument);
//        }


//        /// <summary>
//        /// Get Plate Masters
//        /// </summary>
//        /// <returns>Return list of company details</returns>
//        [Route("aptc_getPlateMasters")]
//        [HttpGet]
//        public IActionResult GetPlateMasters()
//        {
//            //string query = @"SELECT plateCountry From " + _bucket.Name + " as cmt where meta().id='Plate_EN'";
//            string query = @"SELECT r.*FROM APTCREF AS d USE KEYS[""Plate_EN""] UNNEST d.['plateCountry'] AS r";
//            var CommonMasterDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, CommonMasterDocument);
//        }

//        /// <summary>
//        /// Get Plate Country Masters
//        /// </summary>
//        /// <returns>Return list of plate country details</returns>
//        [Route("aptc_getPlateCountryMasters")]
//        [HttpGet]
//        public IActionResult GetPlateCountryMasters()
//        {
//            string query = @"SELECT plateCountry From " + _bucket.Name + " as cmt where meta().id='Plate_EN'";
//            var CommonMasterDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, CommonMasterDocument);
//        }

//        /// <summary>
//        /// Get Plate Master as per country
//        /// </summary>
//        /// <returns>Return list of plate of selected country details</returns>
//        [Route("aptc_getPlateTypeOfCountry/{platecountryCode}")]
//        [HttpGet]
//        public IActionResult GetPlateTypeOfCountry(string platecountryCode)
//        {
//            //string query = @"SELECT r.Code , r.['Value'] as Name FROM APTCREF AS d USE KEYS [""Plate_EN""] UNNEST d.['plateCountry'] AS r WHERE r.Code = '"+ platecountryCode +"'";
//            string query = @"SELECT r.* FROM APTCREF AS d USE KEYS [""Plate_EN""] UNNEST d.['plateCountry'] AS r WHERE r.Code = '" + platecountryCode + "'";
//            var stateOfCountryDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, stateOfCountryDocument);
//        }

//        ///// <summary>
//        ///// Get Plate Master as per country
//        ///// </summary>
//        ///// <returns>Return list of plate of selected country details</returns>
//        //[Route("aptc_getPlateCategoryOfPlateType/{plateTypeCode}")]
//        //[HttpGet]
//        //public IActionResult GetPlateCategoryOfPlateType(string plateTypeCode)
//        //{
//        //    string query = @"SELECT r.Plate FROM " + _bucket.Name + " AS d UNNEST d.plateCountry AS r WHERE r.Code = '" + plateTypeCode + "';";
//        //    var stateOfCountryDocument = _bucket.Query<object>(query).ToList();
//        //    return Content(HttpStatusCode.OK, stateOfCountryDocument);
//        //}

//    }
//}
