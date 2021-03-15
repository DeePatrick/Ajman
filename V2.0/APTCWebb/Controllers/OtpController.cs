//using System;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Net.Http.Formatting;
//using System.Web.Http;
//using System.Web.Http.Description;
//using APTCWebb.Common;
//using APTCWebb.Models;
//using Couchbase;
//using Couchbase.Core;
//using Newtonsoft.Json.Linq;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Otp Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    public class OtpController : ApiController
//    {
//        #region Variables
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        SendEmail sendEmail = new SendEmail();
//        MobileSMS mobileSMS = new MobileSMS();
//        SendOtp sendOtp = new SendOtp();
//        #endregion

//        /// <summary>
//        /// use for send opt 
//        /// </summary>
//        /// <param name="id"></param>
//        /// <returns>otp model class</returns>
//        [Route("aptc_sendotp/{id}")]
//        [HttpGet]
//        [ResponseType(typeof(MessageModel))]
//        public IActionResult Sendotp(string id)
//        {
//            Otp model = new Otp();
//            try
//            {
//                model.MobileOtp = sendOtp.GenerateOtp();
//                var userDocument = _bucket.Query<object>(@"SELECT mobileNo,emailId From ICADB where id= '" + id + "'").ToList();
//                if (userDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "175-please enter valid emiratid"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    JObject jsonObj = JObject.Parse(userDocument[0].ToString());
//                    //string mobileNo = (string)jsonObj["mobileNo"];
//                    model.Email = (string)jsonObj["emailId"]; ;
//                    model.MobileNo = (string)jsonObj["mobileNo"];
//                    model.MobileOtp = model.MobileOtp;
//                    mobileSMS.SendOtpViaMobile(model.MobileNo, model.MobileOtp, model.Email);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, model.Email), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, MessageResponse.Message(HttpStatusCode.Forbidden.ToString(), ex.Message), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// validate login  credential and send otp
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns>otp model class</returns>
//        [Route("aptc_sendotp")]
//        [HttpPost]
//        [ResponseType(typeof(Otp))]
//        public IActionResult SendLoginOtp(Login model)
//        {

//            Otp otpModel = new Otp();
//            otpModel.MobileOtp = sendOtp.GenerateOtp();
//            try
//            {
//                string otpQuery = string.Empty;
//                if (model.DocType!= "individual")
//                {
//                    otpQuery = @"SELECT meta().id as Id,email,mobNum,emirateId From " + _bucket.Name + " as APTCCRM where meta().id like 'login_%' and email='" + model.Email + "' and `password`='" + EncryptDecryptString.EncodePasswordToBase64(model.Password) + "' and docType='user'";
//                }
//                else
//                {
//                    otpQuery = @"SELECT meta().id as Id,email,mobNum,emirateId From " + _bucket.Name + " as APTCCRM where meta().id like 'login_%' and email='" + model.Email + "' and `password`='" + EncryptDecryptString.EncodePasswordToBase64(model.Password) + "' and docType='individual'";
//                }
                
//                var userDocument = _bucket.Query<object>(otpQuery).ToList();
//                if (userDocument.Count > 0)
//                {
//                    string mobileNo = "";
//                    string emirateId = "";
//                    foreach (var item in userDocument)
//                    {
//                        mobileNo = ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"].ToString();
//                        otpModel.Email = ((Newtonsoft.Json.Linq.JToken)item).Root["email"].ToString();
//                        if (((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["countryCodeM"].ToString().Contains("+"))
//                        {
//                            otpModel.MobileNo = ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["countryCodeM"].ToString() + ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["areaM"].ToString() + ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["numM"].ToString();
//                        }
//                        else
//                        {
//                            otpModel.MobileNo = "+" + ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["countryCodeM"].ToString() + ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["areaM"].ToString() + ((Newtonsoft.Json.Linq.JToken)item).Root["mobNum"]["numM"].ToString();
//                        }
//                        otpModel.MobileOtp = otpModel.MobileOtp;
//                    }

//                    if (string.IsNullOrEmpty(emirateId))
//                    {

//                    }
//                    //JObject jsonObj = JObject.Parse(userDocument[0].ToString());
//                    //JObject jsonmobNumObj = JObject.Parse(jsonObj["APTCCRM"]["mobNum"].ToString());
//                    //string area = (string)jsonmobNumObj["areaM"].ToString();
//                    //if (string.IsNullOrEmpty("area"))
//                    //{
//                    //    area = string.Empty;
//                    //}
//                    //string mobileNo = (string)jsonmobNumObj["countryCodeM"] + area + (string)jsonmobNumObj["numM"];
//                    //otpModel.KeyId = (string)jsonObj["APTCCRM"]["keyID"];
//                    //otpModel.MobileNo = mobileNo;
//                    //otpModel.MobileOtp = otpModel.MobileOtp;

//                    var sendResult = mobileSMS.SendOtpViaMobile(otpModel.MobileNo, otpModel.MobileOtp, otpModel.Email);
//                    if (sendResult == "200")
//                    {
//                        return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, otpModel.Email), new JsonMediaTypeFormatter());
//                    }
//                    else
//                    {
//                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), sendResult), new JsonMediaTypeFormatter());
//                    }

//                }
//                else
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "179-invalid userid or password"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// match otp by return Id if send userid and password then put ica:false
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_matchotp")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public IActionResult MatchIcaOtp(MatchOtp model)
//        {
//            try
//            {

//                string otpDocId = "otp_" + model.Id;
//                string query = @"SELECT * From " + _bucket.Name + " as APTCCRM  where meta().id= '" + otpDocId + "'";
//                //string otpDocId = "otp_" + model.Id.Split('_')[1].ToString();
//                var userOtp = _bucket.Query<object>(query).ToList();
//                if (userOtp.Count > 0)
//                {
//                    JObject jsonObj = JObject.Parse(userOtp[0].ToString());
//                    string otp = (string)jsonObj["APTCCRM"]["mobileOtp"];
//                    //if (otp == model.otp)
//                    //{
//                    _bucket.Remove(otpDocId);
//                    if (model.IsIca == true)
//                    {
//                        query = @"SELECT * From ICADB as userDetails where emailId= '" + model.Id + "'";
//                        var userDocument = _bucket.Query<object>(query);
//                        return Content(HttpStatusCode.OK, ((Couchbase.N1QL.QueryResult<object>)userDocument).Rows[0]);
//                    }
//                    else
//                    {
//                        if (model.DocType != "individual")
//                        {

//                            query = @"SELECT * From " + _bucket.Name + " as userDetails where meta().id like'login_%' and email='" + model.Id + "'";
//                        }
//                        else
//                        {
//                            query = @"SELECT * From " + _bucket.Name + " as userDetails where meta().id like'login_%' and email='" + model.Id + "' and docType='individual'";
//                        }
//                        var userDocument = _bucket.Query<object>(query);
//                        return Content(HttpStatusCode.OK, ((Couchbase.N1QL.QueryResult<object>)userDocument).Rows[0]);
//                    }
//                }
//                else
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "173-invalid otp"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, MessageResponse.Message(HttpStatusCode.Forbidden.ToString(), ex.Message), new JsonMediaTypeFormatter());
//            }
//        }
//    }
//}
