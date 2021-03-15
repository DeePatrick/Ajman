//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Threading.Tasks;
//using System.Web.Http;
//using Couchbase;
//using Couchbase.Core;
//using APTCWebb.Models;
//using System.Net.Mail;
//using APTCWebb.Common;
//using System.Web.Http.Description;
//using System.Net.Http.Formatting;
//using APTCWebb.OutPutDto;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Serialization;
//using Newtonsoft.Json.Linq;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// StaffController
//    /// </summary>
//    [RoutePrefix("api")]
//    public class StaffController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        string baseFilePath = ConfigurationManager.AppSettings["BaseFilePath"];
//        string query = string.Empty;
//        #endregion

//        /// <summary>
//        /// Get all data
//        /// </summary>
//        /// <returns>return all staff list </returns>
//        [Route("aptc_user")]
//        [HttpGet]
//        [ResponseType(typeof(LoginOutPut))]
//        public IActionResult GetAllUser()
//        {
//            try
//            {
//                //query = @"SELECT roles,mobile,department,lang,docType,name,email,userPhoto,prevPass,`password`,mobNum,telNum
//                //    From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' " +
//                //    " and  isActive=true and docType='user'";
//                query = @"SELECT roles,department,lang,docType,name,email,userPhoto,prevPass,`password`,mobNum,telNum
//                    From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and docType='user' ";
//                var users = _bucket.Query<LoginOutPut>(query).ToList();
//                if (users.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "record not found."), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    //return Content(HttpStatusCode.OK, users);
//                    LoginOutPut loginOutPut = new LoginOutPut();
//                    List<LoginOutPut> stLogin = new List<LoginOutPut>();
//                    bool IsDepartmentNotFound = false;

//                    foreach (var item1 in users)
//                    {
//                        loginOutPut = new LoginOutPut();
//                        //Other Roles 
//                        List<OtherRoleOutPut> othoutPut = new List<OtherRoleOutPut>();
//                        List<string> lstDept = new List<string>();
//                        if (item1.Roles.OtherRoles != null)
//                        {
//                            foreach (var or in item1.Roles.OtherRoles)
//                            {
//                                IsDepartmentNotFound = false;

//                                var objOtherRolesDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Role'] AS r").ToList();
//                                foreach (var item in objOtherRolesDetails)
//                                {
//                                    if (((Newtonsoft.Json.Linq.JToken)item).Root["Roles"] != null)
//                                    {
//                                        foreach (var itemRoles in ((Newtonsoft.Json.Linq.JToken)item).Root["Roles"])
//                                        {
//                                            if (itemRoles["Code"] != null)
//                                            {
//                                                if (itemRoles["Code"].ToString().ToUpper() == or.Name.ToString().ToUpper())
//                                                {
//                                                    if (((Newtonsoft.Json.Linq.JToken)item).Root["Val"] != null)
//                                                    {
//                                                        IsDepartmentNotFound = true;
//                                                        or.Department = ((Newtonsoft.Json.Linq.JToken)item).Root["Val"].ToString();
//                                                        othoutPut.Add(or);
//                                                    }
//                                                }

//                                            }
//                                        }
//                                    }
//                                }
//                                if (IsDepartmentNotFound == false)
//                                {
//                                    othoutPut.Add(or);
//                                }
//                                item1.Roles.OtherRoles = othoutPut;
//                            }
//                            loginOutPut = item1;
//                        }
//                        else
//                        {
//                            loginOutPut = item1;
//                        }
//                        stLogin.Add(loginOutPut);
//                    }
//                    return Content(HttpStatusCode.OK, stLogin);
//                }
//                //List<object> lstObj = new List<object>();
//                //string queryLogin = string.Empty;

//                //string query = @"SELECT email,docType,address,dob,documents,gender,isActive,keyID,language,fullName,auditInfo
//                //            ,maritalStatus,notes,nationality,religion,mobNum,telNum From " + _bucket.Name + " as `personelInformation` where meta().id like'user_%' and  isActive=true ";
//                //var userDocument = _bucket.Query<UserDetails>(query).ToList();
//                //if (userDocument.Count == 0)
//                //{
//                //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
//                //}
//                //foreach (var item in userDocument)
//                //{
//                //    queryLogin = @"SELECT emirateId,roles,department From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and email='" + item.Email + "'";
//                //    var loginDocument = _bucket.Query<Login>(queryLogin).ToList();
//                //    foreach (var login in loginDocument)
//                //    {
//                //        item.emirateId = login.EmirateId;
//                //        item.Department = login.Department;
//                //        item.PrimaryRole = login.Roles.PrimaryRole;
//                //        item.otherRoles = login.Roles.OtherRoles;
//                //    }
//                //    query = @"SELECT docImage From " + _bucket.Name + " as `documents` where meta().id like'DOCIN%' and docType like'%profilephoto%' and indivID='" + item.KeyID + "' and status=true";
//                //    var docDocument = _bucket.Query<object>(query).ToList();
//                //    foreach (var doc in docDocument)
//                //    {
//                //        item.ProfilePhoto = ((Newtonsoft.Json.Linq.JContainer)doc)["docImage"].ToString();
//                //    }
//                //    lstObj.Add(item);
//                //}
//                //return Content(HttpStatusCode.OK, users);
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }

//        }

//        /// <summary>
//        /// Get user By email
//        /// </summary>
//        /// <returns>return staff details by id </returns>
//        [Route("aptc_user/{email}")]
//        [HttpGet]
//        [ResponseType(typeof(LoginOutPut))]
//        public IActionResult GetUserByEmail(string email)
//        {
//            try
//            {
//                query = @"SELECT roles,department,lang,docType,name,email,userPhoto,prevPass,`password`,mobNum,telNum
//                    From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and email='" + email + "'and docType='user'";
//                var user = _bucket.Query<LoginOutPut>(query).ToList();
//                if (user.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    //return Content(HttpStatusCode.OK, user.FirstOrDefault());
//                    LoginOutPut loginOutPut = new LoginOutPut();
//                    List<LoginOutPut> stLogin = new List<LoginOutPut>();
//                    bool IsDepartmentNotFound = false;
//                    foreach (var item1 in user)
//                    {
//                        loginOutPut = new LoginOutPut();
//                        //Other Roles 
//                        List<OtherRoleOutPut> othoutPut = new List<OtherRoleOutPut>();
//                        List<string> lstDept = new List<string>();
//                        if (item1.Roles.OtherRoles != null)
//                        {
//                            foreach (var or in item1.Roles.OtherRoles)
//                            {
//                                IsDepartmentNotFound = false;

//                                var objOtherRolesDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Role'] AS r").ToList();
//                                foreach (var item in objOtherRolesDetails)
//                                {
//                                    if (((Newtonsoft.Json.Linq.JToken)item).Root["Roles"] != null)
//                                    {
//                                        foreach (var itemRoles in ((Newtonsoft.Json.Linq.JToken)item).Root["Roles"])
//                                        {
//                                            if (itemRoles["Code"] != null)
//                                            {
//                                                if (itemRoles["Code"].ToString().ToUpper() == or.Name.ToString().ToUpper())
//                                                {
//                                                    if (((Newtonsoft.Json.Linq.JToken)item).Root["Val"] != null)
//                                                    {
//                                                        IsDepartmentNotFound = true;
//                                                        or.Department = ((Newtonsoft.Json.Linq.JToken)item).Root["Val"].ToString();
//                                                        othoutPut.Add(or);
//                                                    }
//                                                }
                                                
//                                            }
//                                        }
//                                    }
//                                }
//                                if(IsDepartmentNotFound==false)
//                                {
//                                    othoutPut.Add(or);
//                                }
//                                item1.Roles.OtherRoles = othoutPut;
//                            }
//                            loginOutPut = item1;
//                        }
//                        else
//                        {
//                            loginOutPut = item1;
//                        }


//                        stLogin.Add(loginOutPut);
//                    }
//                    return Content(HttpStatusCode.OK, stLogin);
//                }
//                //foreach (var login in loginDocument)
//                //{
//                //    item.emirateId = login.EmirateId;
//                //    item.Department = login.Department;
//                //    item.PrimaryRole = login.Roles.PrimaryRole;
//                //    item.otherRoles = login.Roles.OtherRoles;
//                //}
//                //query = @"SELECT docImage From " + _bucket.Name + " as `documents` where meta().id like'DOCIN%' and docType like'%profilephoto%' and indivID='" + item.KeyID + "' and status=true";
//                //var docDocument = _bucket.Query<object>(query).ToList();
//                //foreach (var doc in docDocument)
//                //{
//                //    item.ProfilePhoto = ((Newtonsoft.Json.Linq.JContainer)doc)["docImage"].ToString();
//                //}
//                //userDetails = item;

//                //}

//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }

//        }

//        /// <summary>
//        /// create user by admin or company staff
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns>return successfully message or fail message with status code</returns>
//        [Route("aptc_user")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> InsertUser(Login model)
//        {
//            //string ppp = EncryptDecryptString.DecodePasswordToFrom64("MTIzNDU2OTk5");
//            try
//            {

//                if (string.IsNullOrEmpty(model.Name))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-name is required"), new JsonMediaTypeFormatter());
//                }
//                if (string.IsNullOrEmpty(model.Email))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "112-email is required"), new JsonMediaTypeFormatter());
//                }
//                if (string.IsNullOrEmpty(model.Password))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "158-Password is required"), new JsonMediaTypeFormatter());
//                }
//                var userDocumentEmail = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where email= '" + model.Email + "'  and isActive=true and isActive=true and meta().id like'%login_%'").ToList();
//                if (userDocumentEmail.Count > 0)
//                {
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-The e-mail already exists"), new JsonMediaTypeFormatter());
//                }
//                if (model.MobNum == null)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "199-mobnum is required"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    if (string.IsNullOrEmpty(model.MobNum.AreaM))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "200-areaM is required"), new JsonMediaTypeFormatter());
//                    }
//                    if (string.IsNullOrEmpty(model.MobNum.NumM))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "201-NumM is required"), new JsonMediaTypeFormatter());
//                    }
//                    if (string.IsNullOrEmpty(model.MobNum.CountryCodeM))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "202-CountryCodeM is required"), new JsonMediaTypeFormatter());
//                    }
//                }
//                if (model.Roles == null)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "203-roles is required"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    if (string.IsNullOrEmpty(model.Roles.PrimaryRole))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "204-PrimaryRole is required"), new JsonMediaTypeFormatter());
//                    }
//                    if (model.Roles.OtherRoles == null)
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "205-OtherRoles is required"), new JsonMediaTypeFormatter());
//                    }
//                }

//                var userDocumentPhone = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where " + _bucket.Name + ".mobNum.num= '" + model.MobNum.NumM + "' and isActive=true and meta().id like'%login_%'").ToList();

//                if (userDocumentPhone.Count > 0)
//                {
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "Mobile number already exists"), new JsonMediaTypeFormatter());
//                }

//                try
//                {
//                    List<PrevPassword> prevPassword = new List<PrevPassword>();
//                    var loginDocumentId = "login_" + Guid.NewGuid();
//                    MobNum mobNum = new MobNum();
//                    mobNum.CountryCodeM = model.MobNum.CountryCodeM;
//                    mobNum.NumM = model.MobNum.NumM;
//                    mobNum.AreaM = model.MobNum.AreaM;
//                    TelNum telNum = new TelNum();
//                    if (model.TelNum != null)
//                    {
//                        telNum.CountryCodeT = model.TelNum.CountryCodeT;
//                        telNum.NumT = model.TelNum.NumT;
//                        telNum.AreaT = model.TelNum.AreaT;
//                    }
//                    var loginDocument = new Document<Login>()
//                    {
//                        Id = loginDocumentId,
//                        Content = new Login
//                        {
//                            Lang = model.Lang,
//                            DocType = "user",
//                            Name = model.Name,
//                            PassSetDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                            Password = EncryptDecryptString.EncodePasswordToBase64(model.Password),
//                            Email = model.Email,
//                            EmirateId = model.EmirateId,
//                            //Mobile = model.Mobile,
//                            MobNum = mobNum,
//                            TelNum = telNum,
//                            Department = model.Department,
//                            Roles = model.Roles,
//                            PrevPass = prevPassword,
//                            IsActive = true,
//                            Created_By = model.Email,
//                            UserPhoto = model.UserPhoto,
//                            Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                        },
//                    };
//                    var result = _bucket.Insert(loginDocument);
//                    if (!result.Success)
//                    {
//                        //_bucket.Remove(loginResult.Document.Content.Email);
//                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
//                    }
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Content.Email), new JsonMediaTypeFormatter());
//                }
//                catch (Exception ex)
//                {
//                    //_bucket.Remove(result.Document.Id);
//                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message), new JsonMediaTypeFormatter());
//                }

//                //}
//                // return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result..Id), new JsonMediaTypeFormatter());
//                //}
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is put method for update user by email 
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns>return successfully message or fail message with status code</returns>
//        [Route("aptc_user")]
//        [HttpPut]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> UpdateUser(Login model)
//        {
//            Login login = new Login();
//            try
//            {
//                if (string.IsNullOrEmpty(model.Name))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-name is required"), new JsonMediaTypeFormatter());
//                }

//                if (string.IsNullOrEmpty(model.Email))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "112-email is required"), new JsonMediaTypeFormatter());
//                }
//                if (string.IsNullOrEmpty(model.Name))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-name is required"), new JsonMediaTypeFormatter());
//                }
//                if (model.MobNum == null)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "199-mobnum is required"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    if (string.IsNullOrEmpty(model.MobNum.AreaM))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "200-areaM is required"), new JsonMediaTypeFormatter());
//                    }
//                    if (string.IsNullOrEmpty(model.MobNum.NumM))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "201-NumM is required"), new JsonMediaTypeFormatter());
//                    }
//                    if (string.IsNullOrEmpty(model.MobNum.CountryCodeM))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "202-CountryCodeM is required"), new JsonMediaTypeFormatter());
//                    }
//                }
//                if (model.Roles == null)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "203-roles is required"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    if (string.IsNullOrEmpty(model.Roles.PrimaryRole))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "204-PrimaryRole is required"), new JsonMediaTypeFormatter());
//                    }
//                    if (model.Roles.OtherRoles == null)
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "205-OtherRoles is required"), new JsonMediaTypeFormatter());
//                    }
//                }

//                if (!ModelState.IsValid)
//                {
//                    var modelErrors = new List<string>();
//                    foreach (var modelState in ModelState.Values)
//                    {
//                        foreach (var modelError in modelState.Errors)
//                        {
//                            modelErrors.Add(modelError.ErrorMessage == "" ? modelError.Exception.Message : modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
//                }

//                string Query = @"SELECT * From " + _bucket.Name + " as Users where meta().id like'login_%' and email= '" + model.Email + "'";
//                var user = _bucket.Query<object>(Query).ToList();
//                if (user.Count > 0)
//                {
//                    string updateLoginQueryString = string.Empty;
//                    updateLoginQueryString = @"update " + _bucket.Name + " set ";
//                    updateLoginQueryString += "name ='" + model.Name + "',";

//                    /////// Tel Num
//                    if (model.MobNum != null)
//                    {
//                        updateLoginQueryString += " mobNum.countryCodeM ='" + model.MobNum.CountryCodeM + "',";
//                        updateLoginQueryString += " mobNum.numM ='" + model.MobNum.NumM + "',";
//                        updateLoginQueryString += " mobNum.areaM ='" + model.MobNum.AreaM + "',";
//                    }
//                    /////// Tel Num
//                    if (model.TelNum != null)
//                    {
//                        updateLoginQueryString += " telNum.countryCodeT ='" + model.TelNum.CountryCodeT + "',";
//                        updateLoginQueryString += " telNum.numT ='" + model.TelNum.NumT + "',";
//                        updateLoginQueryString += " telNum.areaT ='" + model.TelNum.AreaT + "',";
//                    }

//                    updateLoginQueryString += "roles.primaryRole ='" + model.Roles.PrimaryRole + "',";
//                    updateLoginQueryString += "roles.otherRoles =[],";
//                    updateLoginQueryString += "department ='" + model.Department + "', ";
//                    updateLoginQueryString += "userPhoto ='" + model.UserPhoto + "'";
//                    updateLoginQueryString += " where meta().id like'login_%' and email ='" + model.Email + "'";
//                    var resultLogin = _bucket.Query<object>(updateLoginQueryString);
//                    query = @"select roles.otherRoles[0] from " + _bucket.Name + "  where meta().id like'login_%' and email = '" + model.Email + "'";
//                    foreach (var item in model.Roles.OtherRoles)
//                    {
//                        var queryUpdateOtherRoles = @"update `APTCCRM` SET roles.otherRoles= ARRAY_APPEND( roles.otherRoles, " + Newtonsoft.Json.JsonConvert.SerializeObject(item).ToString() + " ) where meta().id like'login_%' and email ='" + model.Email + "'";
//                        _bucket.Query<object>(queryUpdateOtherRoles);
//                    }

//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, model.Email), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.Update, model.Email), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is delete method for soft delete as isActive=false
//        /// </summary>
//        /// <returns>Return list of company details</returns>
//        [Route("aptc_user/{email}")]
//        [HttpDelete]
//        [ResponseType(typeof(MessageModel))]
//        public IActionResult DeleteUser(string email)
//        {
//            try
//            {

//                query = @"update " + _bucket.Name + " set isActive=false  where meta().id like 'login_%' and email='" + email + "'";
//                _bucket.Query<object>(query).ToList();
//                // query = @"update " + _bucket.Name + " set isActive=false  where email='" + email + "'";
//                //_bucket.Query<object>(query).ToList();
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, ""), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message), new JsonMediaTypeFormatter());
//            }
//        }
//    }
//}
