//using APTCWebb.OutPutDto;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;

//using APTCWebb.Common;
//using APTCWebb.Models;
//using Newtonsoft.Json.Linq;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Login Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    public class LoginController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        MobileSMS mobileSMS = new MobileSMS();
//        SendOtp sendOtp = new SendOtp();
//        #endregion
//        // GET: api/aptclogin/5
//        /// <summary>
//        /// Get data by Id
//        /// </summary>
//        /// <param name="id">abc@abc.com</param>
//        /// <returns>Return Login Details for id=5</returns>
//        [Route("aptc_login/{id}")]
//        [HttpGet]
//        [ResponseType(typeof(LoginOutPut))]
//        public IActionResult GetLogin(string id)
//        {
//            try
//            {
//                var userDocument = _bucket.Query<object>(@"SELECT loginDetails From " + _bucket.Name + " where email= '" + id + "'").ToList();
//                if (userDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, "176-plaese enter valid user id.");
//                }
//                else
//                {
//                    JObject jsonObj = JObject.Parse(userDocument[0].ToString());
//                    Login login = new Login();
//                    login.UserId = id;
//                    login.Password = jsonObj["loginDetails"]["password"].ToString();
//                    login.Type = (string)jsonObj["loginDetails"]["type"].ToString();
//                    login.LoginStatus = (bool)jsonObj["loginDetails"]["loginStatus"];
//                    JObject jsonmobRoleObj = JObject.Parse(jsonObj["loginDetails"]["userRole"].ToString());
//                    //Department userDepartment = new Department();
//                    //userDepartment.DepartmentName = jsonmobRoleObj["userRoleName"].ToString();
//                    //login.Department= mod;
//                    return Content(HttpStatusCode.OK, login);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.Message);
//            }
//        }



//        private static string CreateUserKey(string username)
//        {
//            var key = Guid.NewGuid(); ; //$"user:{username}";
//            return key.ToString();
//        }

//        /// <summary>
//        /// this function use for reset password 
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns>reset password meesage</returns>
//        public IActionResult ResetPassword(ResetPassword model)
//        {

//            if (string.IsNullOrEmpty(model.Email) && string.IsNullOrEmpty(model.MobileNo))
//            {
//                return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "177-Please select at laest one option for reset password"), new JsonMediaTypeFormatter());
//            }
//            else
//            {
//                return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "177-Please select at laest one option for reset password"), new JsonMediaTypeFormatter());
//            }

//        }
//        /// <summary>
//        /// this function use for change password 
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        public IActionResult ChangePassword(Login model)
//        {
//            return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "UserId already exists."), new JsonMediaTypeFormatter());
//        }
//    }
//}
