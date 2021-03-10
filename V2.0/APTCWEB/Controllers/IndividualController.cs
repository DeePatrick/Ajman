using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Couchbase;
using Couchbase.Core;
using APTCWEB.Models;
using System.Net.Mail;
using APTCWEB.Common;
using System.Web.Http.Description;
using System.Net.Http.Formatting;
using APTCWEB.OutPutDto;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Individual Controller
    /// </summary>
    [RoutePrefix("api")]
    public class IndividualController : ApiController
    {
        #region PrviavteFields
            private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
            private readonly IBucket _bucketRef = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion
        string resultPostNotification = string.Empty;
        SendNotification sn = new SendNotification();

        SendEmail sendEmail = new SendEmail();
        MobileSMS mobileSMS = new MobileSMS();
        SendOtp sendOtp = new SendOtp();

        /// <summary>
        /// Get data from ICA by emirati id - Thirty Party API
        /// </summary>
        /// <param name="id">784-2020-9871234-1</param>
        /// <returns></returns>
        [Route("aptc_ica/{id}")]
        [HttpGet]
        [ResponseType(typeof(MessageModel))]
        public IHttpActionResult GetICARecord(string id)
        {
            try
            {
                var userDocument = _bucket.Query<object>(@"SELECT * From ICADB where id= '" + id + "'").ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "175-please enter valid emiratid");
                }
                else
                {
                    return Content(HttpStatusCode.OK, userDocument);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }

        }

        /// <summary>
        /// Get data by email
        /// </summary>
        /// <param name="id">abc@abc.com</param>
        /// <returns>Return Individual Details for email</returns>
        [Route("aptc_individual/{email}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividual(string email)
        {
            try
            {
                IndividualOutPut userDetails = new IndividualOutPut();
                string queryLogin = string.Empty;

                string query = @"SELECT email,docType,address,dob,gender,profilePhoto,isActive,keyID,language,fullName,maritalStatus,notes,nationality,religion,mobNum,telNum,ARRAY_COUNT(roles) as rolesCount,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(scoreCards) as scoreCardsCount,ARRAY_COUNT(incidents) as incidentsCount,ARRAY_COUNT(driverStatus) as driverStatusCount,vehicles,fines,scoreCards,incidents,driverStatus From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and  isActive=true and email='" + email + "' ";
                var userDocument = _bucket.Query<IndividualOutPut>(query).ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, email), new JsonMediaTypeFormatter());
                }
                foreach (var item in userDocument)
                {
                    queryLogin = @"SELECT emirateId,roles,department From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and email='" + email + "'";
                    var loginDocument = _bucket.Query<Login>(queryLogin).ToList();
                    foreach (var login in loginDocument)
                    {
                        item.EmirateId = login.EmirateId;
                        //item.Department = login.Department;
                        //item.PrimaryRole = login.Roles.PrimaryRole;
                        //item.OtherRoles = login.Roles.OtherRoles;
                    }

                    //query = @"SELECT docImage From " + _bucket.Name + " as `documents` where meta().id like'DOCIN%' and docType like'%profilephoto%' and indivID='" + item.KeyID + "' and status=true";
                    //var docDocument = _bucket.Query<object>(query).ToList();
                    //foreach (var doc in docDocument)
                    //{
                    //    item.ProfilePhoto = ((Newtonsoft.Json.Linq.JContainer)doc)["docImage"].ToString();
                    //}
                    item.ProfilePhoto = item.ProfilePhoto;
                    userDetails = item;

                }
                return Content(HttpStatusCode.OK, userDetails);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
            //try
            //{
            //    List<object> lstObj = new List<object>();
            //    string query = @"SELECT * From " + _bucket.Name + " as `personalInformation` where meta().id like'individual_%' and email ='" + email + "' and isActive=true";
            //    var personelInformation = _bucket.Query<object>(query).FirstOrDefault();
            //    if (personelInformation == null)
            //    {
            //        return Content(HttpStatusCode.NotModified, MessageResponse.Message(HttpStatusCode.NotModified.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
            //    }
            //    string queryLogin = @"SELECT * From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and email='" + email + "'";
            //    var loginDetails = _bucket.Query<object>(queryLogin).FirstOrDefault();
            //    lstObj.Add(personelInformation);
            //    if (loginDetails != null)
            //    {
            //        lstObj.Add(loginDetails);
            //    }
            //    return Content(HttpStatusCode.OK, lstObj);
            //}
            //catch (Exception ex)
            //{
            //    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            //}
        }

        /// <summary>
        /// Get data by emirati
        /// </summary>
        /// <param name="emirati">123456789</param>
        /// <returns>Return Individual Details for email</returns>
        [Route("aptc_individual_emirati/{emirati}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividualByEmirati(string emirati)
        {
            try
            {
                IndividualOutPut userDetails = new IndividualOutPut();
                string queryLogin = string.Empty;
                string query = @"SELECT email,docType,address,dob,gender,profilePhoto,isActive,keyID,language,fullName,maritalStatus,notes,nationality,religion,mobNum,telNum,ARRAY_COUNT(roles) as rolesCount,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(scoreCards) as scoreCardsCount,ARRAY_COUNT(incidents) as incidentsCount,ARRAY_COUNT(driverStatus) as driverStatusCount,vehicles,fines,scoreCards,incidents,driverStatus From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and  isActive=true and keyID='" + emirati + "' ";
                var userDocument = _bucket.Query<IndividualOutPut>(query).ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, emirati), new JsonMediaTypeFormatter());
                }
                foreach (var item in userDocument)
                {
                    userDetails = item;
                }
                return Content(HttpStatusCode.OK, userDetails);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all individual records
        /// </summary>
        /// <returns>Return individual list</returns>
        [Route("aptc_individual")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetAllIndividual()
        {
            try
            {
                List<object> lstObj = new List<object>();
                string queryLogin = string.Empty;
                //SELECT* FROM APTCCRM WHERE meta().id like'DOC%' and docType like'%ProfilePhoto%'
                string query = @"SELECT email,docType,address,dob,gender,profilePhoto,isActive,keyID,language,fullName,auditInfo
                            ,maritalStatus,notes,nationality,roles,religion,mobNum,telNum,ARRAY_COUNT(roles) as rolesCount,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(scoreCards) as scoreCardsCount,ARRAY_COUNT(incidents) as incidentsCount,ARRAY_COUNT(driverStatus) as driverStatusCount,vehicles,fines,scoreCards,incidents,driverStatus From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and  isActive=true ";
                var userDocument = _bucket.Query<IndividualOutPut>(query).ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                //foreach (var item in userDocument)
                //{
                //    queryLogin = @"SELECT emirateId,roles,department From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and email='" + item.Email + "'";
                //    var loginDocument = _bucket.Query<Login>(queryLogin).ToList();
                //    foreach (var login in loginDocument)
                //    {
                //        item.EmirateId = login.EmirateId;
                //        if (login.Department!=null)
                //        {
                //            item.Department = login.Department;
                //        }
                //        else
                //        {
                //            item.Department = "";
                //        }
                //        if (login.Roles != null)
                //        {
                //            item.PrimaryRole = login.Roles.PrimaryRole;
                //            item.OtherRoles = login.Roles.OtherRoles;
                //        }
                //        else
                //        {
                //            item.Department = "";
                //        }

                //    }
                //    item.ProfilePhoto = item.ProfilePhoto;
                //    lstObj.Add(item);
                //}
                return Content(HttpStatusCode.OK, userDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
            //List<object> lstObj = new List<object>();
            //string queryLogin = string.Empty;
            //string query = @"SELECT * From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and  isActive=true ";
            //var individualDocument = _bucket.Query<object>(query).ToList();
            //if (individualDocument.Count == 0)
            //{
            //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
            //}

            //foreach (var item in individualDocument)
            //{

            //    List<object> lstObj1 = new List<object>();
            //    queryLogin = @"SELECT * From " + _bucket.Name + " as `loginDetails` where meta().id like'login_%' and  isActive=true and email='" + ((Newtonsoft.Json.Linq.JToken)item).Root["personelInformation"]["email"] + "'";
            //    var loginDocument = _bucket.Query<object>(queryLogin).FirstOrDefault();
            //    lstObj1.Add(item);
            //    if (loginDocument != null)
            //    {
            //        lstObj1.Add(loginDocument);
            //    }
            //    lstObj.Add(lstObj1);

            //}

            //return Content(HttpStatusCode.OK, lstObj);
        }

        /// <summary>
        /// this is post method for add  individual
        /// </summary>
        /// <param name="model">Individual</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_individual")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public IHttpActionResult IndividualRegister(Individual model)
        {

            try
            {
                if (model.fullName == null)
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-Full name is required"), new JsonMediaTypeFormatter());
                }
                else
                {
                    if (string.IsNullOrEmpty(model.fullName.Ar_SA) && string.IsNullOrEmpty(model.fullName.En_US))
                    {
                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-Full name is required"), new JsonMediaTypeFormatter());
                    }
                }
                // Validate Model
                if (!ModelState.IsValid)
                {
                    var modelErrors = new List<string>();
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            modelErrors.Add(modelError.ErrorMessage == "" ? modelError.Exception.Message : modelError.ErrorMessage);
                        }
                    }
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
                }

                var userDocumentEmail = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where email= '" + model.Email + "' and isActive=true").ToList();
                if (userDocumentEmail.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-The e-mail already exists"), new JsonMediaTypeFormatter());
                }

                if (model.LoginDetails != null)
                {
                    if (string.IsNullOrEmpty(model.LoginDetails.Password))
                    {
                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "158-Password is required"), new JsonMediaTypeFormatter());
                    }
                }

                var userDocumentPhone = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where " + _bucket.Name + ".mobNum.num= '" + model.MobNum.NumM + "'").ToList();

                if (userDocumentPhone.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "Mobile number already exists"), new JsonMediaTypeFormatter());
                }

                Address address = new Address();
                address.City = model.Address.City;
                address.State = model.Address.State;
                address.Area = model.Address.Area;
                address.Street = model.Address.Street;
                address.BldgNum = model.Address.BldgNum;
                address.FlatNum = model.Address.FlatNum;

                MobNum mobNum = new MobNum();
                mobNum.CountryCodeM = "+971";
                mobNum.NumM = model.MobNum.NumM;
                mobNum.AreaM = model.MobNum.AreaM;

                TelNum telNum = new TelNum();
                if (model.TelNum != null)
                {
                    telNum.CountryCodeT = "+971";
                    telNum.NumT = model.TelNum.NumT;
                    telNum.AreaT = model.TelNum.AreaT;
                }

                List<AuditInfo> lstauditInfo = new List<AuditInfo>();
                AuditInfo auditInfo = new AuditInfo();
                auditInfo.Version = "1";
                auditInfo.Status = "true";
                auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                auditInfo.LastChangeBy = model.Email;
                lstauditInfo.Add(auditInfo);

                List<Roles> lstRoles = new List<Roles>();
                if (model.Roles != null)
                {
                    foreach (var role in model.Roles)
                    {
                        Roles roles = new Roles();
                        roles.RoleID = role.RoleID;
                        roles.Name = role.Name;
                        roles.Link = role.Link;
                        lstRoles.Add(roles);
                    }
                }

                #region MyRegion
                    List<Fines> lstFines = new List<Fines>();
                    List<Documents> lstDocuments = new List<Documents>();
                    List<Vehicles> lstVehicles = new List<Vehicles>();
                    List<Incidents> LstIncident = new List<Incidents>();
                    List<ScoreCards> LstScoreCard = new List<ScoreCards>();
                    List<DriverStatus> driverStatus = new List<DriverStatus>();
                #endregion

                FullName fullName = new FullName();
                fullName.En_US = model.fullName.En_US;
                fullName.Ar_SA = model.fullName.Ar_SA;

                Status status = new Status();
                if (model.Status != null)
                {
                    status.StatusID = "PE";
                    status.DateTime = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                }
                
                ProfilePhoto profilePhoto = new ProfilePhoto();
                if (model.ProfilePhoto != null)
                {
                    profilePhoto.DocFormat = model.ProfilePhoto.DocFormat;
                    profilePhoto.Photo = model.ProfilePhoto.Photo;
                    profilePhoto.ValidFrom = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                    profilePhoto.ValidTo = DataConversion.ConvertYMDHMS(DateTime.Now.AddDays(Convert.ToInt16(ConfigurationManager.AppSettings.Get("ValidToProfilePhotoDays"))).ToString());
                }
                string docId = string.Empty;
                docId = "individual_" + model.KeyID;
                var individualDoc = new Document<Individual>()
                {
                    Id = docId,
                    Content = new Individual
                    {
                        KeyID = model.KeyID,
                        fullName = fullName,
                        DOB = DataConversion.ConvertDateYMD(model.DOB),
                        Nationality = model.Nationality,
                        Gender = model.Gender,
                        Fines = lstFines,
                        Language = model.Language,
                        MaritalStatus = model.MaritalStatus,
                        MobNum = mobNum,
                        AuditInfo = lstauditInfo,
                        Vehicles = lstVehicles,
                        Roles = lstRoles,
                        TelNum = telNum,
                        DocType = ("Individual").ToLower(),
                        Documents = lstDocuments,
                        Email = model.Email,
                        ProfilePhoto = profilePhoto,
                        Notes = model.Notes,
                        ScoreCards = LstScoreCard,
                        Address = address,
                        Religion = model.Religion,
                        Status = status,
                        Incidents = LstIncident,
                        DriverStatus = driverStatus,
                    },
                };
                var result = _bucket.Insert(individualDoc);
                if (!result.Success)
                {
                    if (result.Message.Contains("KeyExists"))
                    {
                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "205-The record already exists"), new JsonMediaTypeFormatter());
                    }
                    else
                    {
                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                    }
                }
                else
                {
                    try
                    {
                        if (model.LoginDetails != null)
                        {
                            var loginDocumentId = "login_" + Guid.NewGuid();
                            string Name = string.Empty;
                            if (model.Language == "En_US")
                            {
                                Name = model.fullName.En_US;
                            }
                            else
                            {
                                Name = model.fullName.En_US;
                            }

                            string password = "";
                            if (!model.LoginDetails.Password.Equals("N/A"))
                            {
                                password = EncryptDecryptString.EncodePasswordToBase64(model.LoginDetails.Password);
                            }
                            docId = string.Empty;
                            if (!string.IsNullOrEmpty(model.KeyID))
                            {
                                docId = model.KeyID;
                            }
                            List<PrevPassword> prevPassword = new List<PrevPassword>();
                            var loginDocument = new Document<Login>()
                            {
                                Id = loginDocumentId,
                                Content = new Login
                                {
                                    Lang = model.Language,
                                    DocType = ("Individual").ToLower(),
                                    Name = Name,
                                    EmirateId = model.KeyID,
                                    Department = model.LoginDetails.Department,
                                    PassSetDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                                    Password = password,
                                    Email = model.Email,
                                    MobNum = mobNum,
                                    Roles = model.LoginDetails.Roles,
                                    PrevPass = prevPassword,
                                    IsActive = true,
                                    Created_By = model.Email,
                                    Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                                },
                            };
                            var loginResult = _bucket.Insert(loginDocument);
                            if (!loginResult.Success)
                            {
                                _bucket.Remove(result.Document.Id);
                                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                            }
                        }
                        if (ConfigurationManager.AppSettings.Get("NotificationSettingFlag") == "1")
                        {
                            #region Post Notification RoleCodeHODP
                            //////////////// Post Notification Code
                            try
                            {
                                PostNotificationParameters objPostNotificationParameters = new PostNotificationParameters();
                                objPostNotificationParameters.UserCode = string.Empty;
                                objPostNotificationParameters.RoleCode = AspectEnums.RoleCodeHODP;
                                objPostNotificationParameters.DeptCode = AspectEnums.DeptCodeFROE;
                                objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.IndividualCreation;
                                objPostNotificationParameters.KeyID = model.KeyID;
                                objPostNotificationParameters.Status = AspectEnums.StatusPS;//"PE";//model.Status.ToString();
                                resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
                            }
                            catch (Exception ex)
                            {
                                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
                            }
                            #endregion
                            #region Post Notification RoleCodeBCKO
                            //////////////// Post Notification Code
                            try
                            {
                                PostNotificationParameters objPostNotificationParameters = new PostNotificationParameters();
                                objPostNotificationParameters.UserCode = string.Empty;
                                objPostNotificationParameters.RoleCode = AspectEnums.RoleCodeBCKO;
                                objPostNotificationParameters.DeptCode = AspectEnums.DeptCodeFROE;
                                objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.IndividualCreation;
                                objPostNotificationParameters.KeyID = model.KeyID;
                                objPostNotificationParameters.Status = AspectEnums.StatusPS;//"PE";//model.Status.ToString();
                                resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
                            }
                            catch (Exception ex)
                            {
                                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
                            }
                            #endregion
                        }
                    }
                    catch (Exception ex)
                    {
                        _bucket.Remove(result.Document.Id);
                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                    }
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// this is put method for update  individual
        /// </summary>
        /// <param name="model">Individual</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_individual")]
        [HttpPut]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Updateindividual(Individual model)
        {
            try
            {
                // Validate Model
                if (model.fullName == null)
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-Full name is required"), new JsonMediaTypeFormatter());
                }
                else
                {
                    if (string.IsNullOrEmpty(model.fullName.Ar_SA) && string.IsNullOrEmpty(model.fullName.En_US))
                    {
                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "224-Full name is required"), new JsonMediaTypeFormatter());
                    }
                }
                if (!ModelState.IsValid)
                {
                    var modelErrors = new List<string>();
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            modelErrors.Add(modelError.ErrorMessage == "" ? modelError.Exception.Message : modelError.ErrorMessage);
                        }
                    }
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
                }
                string query = @"SELECT * From " + _bucket.Name + " as Individual where meta().id like'individual_%' and  email= '" + model.Email + "'";
                var userDocument = _bucket.Query<object>(query).ToList();
                if (userDocument.Count > 0)
                {
                    //return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "EmiratiID already exists"), new JsonMediaTypeFormatter());
                    ///////////////////////// edit API Code 27-Aug-2018
                    #region fetch max audit version
                    MessageModel msg = new MessageModel();
                    List<int> maxVersion = new List<int>();
                    var maxAuditVersion = 0;

                    if (((Newtonsoft.Json.Linq.JToken)userDocument[0]).Root["Individual"]["auditInfo"] != null)
                    {
                        var auditInfoVersion = ((Newtonsoft.Json.Linq.JToken)userDocument[0]).Root["Individual"]["auditInfo"];
                        foreach (var itemTD in auditInfoVersion)
                        {
                            if (itemTD["version"] != null)
                            {
                                maxVersion.Add(Convert.ToInt32(itemTD["version"]));
                            }
                        }
                    }

                    if (maxVersion.Count != 0)
                        maxAuditVersion = 1 + maxVersion.Max();
                    else
                        maxAuditVersion = 0;
                    ///////////////////////////
                    AuditInfo auditInfo = new AuditInfo();
                    if (maxAuditVersion != null)
                        auditInfo.Version = maxAuditVersion.ToString();
                    else
                        auditInfo.Version = "0";
                    auditInfo.Status = "true";
                    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                    auditInfo.LastChangeBy = model.Email;
                    #endregion
                    #region Updare Individual
                    string updatequeryString = string.Empty;

                    updatequeryString = @"update " + _bucket.Name + " set ";
                    updatequeryString += " dob ='" + model.DOB + "',";
                    updatequeryString += " gender ='" + model.Gender + "',";
                    updatequeryString += " profilePhoto.docFormat ='" + model.ProfilePhoto.DocFormat + "',";
                    updatequeryString += " profilePhoto.photo ='" + model.ProfilePhoto.Photo + "',";
                    updatequeryString += " profilePhoto.validFrom ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "',";
                    updatequeryString += " profilePhoto.validTo ='" + DataConversion.ConvertYMDHMS(DateTime.Now.AddDays(Convert.ToInt16(ConfigurationManager.AppSettings.Get("ValidToProfilePhotoDays"))).ToString()) + "',";
                    updatequeryString += " language ='" + model.Language + "',";
                    updatequeryString += " maritalStatus ='" + model.MaritalStatus + "',";
                    /////// full Name
                    if (model.fullName != null)
                    {
                        updatequeryString += " fullName.en_US ='" + model.fullName.En_US + "',";
                        updatequeryString += " fullName.ar_SA ='" + model.fullName.Ar_SA + "',";
                    }
                    /////// Tel Num
                    if (model.MobNum != null)
                    {
                        updatequeryString += " mobNum.countryCodeM ='" + model.MobNum.CountryCodeM + "',";
                        updatequeryString += " mobNum.numM ='" + model.MobNum.NumM + "',";
                        updatequeryString += " mobNum.areaM ='" + model.MobNum.AreaM + "',";
                    }
                    /////// Tel Num
                    if (model.TelNum != null)
                    {
                        updatequeryString += " telNum.countryCodeT ='" + model.TelNum.CountryCodeT + "',";
                        updatequeryString += " telNum.numT ='" + model.TelNum.NumT + "',";
                        updatequeryString += " telNum.areaT ='" + model.TelNum.AreaT + "',";
                    }
                    ////// Address
                    if (model.Address != null)
                    {
                        updatequeryString += " address.city ='" + model.Address.City + "',";
                        updatequeryString += " address.state ='" + model.Address.State + "',";
                        updatequeryString += " address.area ='" + model.Address.Area + "',";
                        updatequeryString += " address.street ='" + model.Address.Street + "',";
                        updatequeryString += " address.bldgNum ='" + model.Address.BldgNum + "',";
                        updatequeryString += " address.flatNum ='" + model.Address.FlatNum + "',";
                    }
                    //// Status
                    if (model.Status != null)
                    {
                        //updatequeryString += " status.statusID ='" + model.Status.StatusID + "',";
                        updatequeryString += " status.statusID ='PE',";
                        updatequeryString += " status.dateTime ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "',";
                    }
                    updatequeryString += " email ='" + model.Email + "',";
                    updatequeryString += " notes ='" + model.Notes + "',";
                    updatequeryString += " religion ='" + model.Religion + "',";
                    updatequeryString += " roles=[],";
                    updatequeryString += " auditInfo = ARRAY_APPEND( auditInfo, " + Newtonsoft.Json.JsonConvert.SerializeObject(auditInfo).ToString() + ")";
                    updatequeryString += " where keyID = '" + model.KeyID + "'";
                    var result = _bucket.Query<object>(updatequeryString);

                    query = @"select roles[0] from " + _bucket.Name + "  where keyID = '" + model.KeyID + "'";
                    foreach (var item in model.Roles)
                    {
                        var queryUpdateOtherRoles = @"update `APTCCRM` SET roles= ARRAY_APPEND( roles, " + Newtonsoft.Json.JsonConvert.SerializeObject(item).ToString() + " )  where keyID = '" + model.KeyID + "'";
                        _bucket.Query<object>(queryUpdateOtherRoles);
                    }
                    if (model.LoginDetails != null)
                    {
                        string name = string.Empty;
                        if (model.Language == "en_US")
                        {
                            name = model.fullName.En_US;
                        }
                        else
                        {
                            name = model.fullName.Ar_SA;
                        }
                        string mobileNo = model.MobNum.CountryCodeM + model.MobNum.AreaM + model.MobNum.NumM;
                        string updateLoginQueryString = string.Empty;
                        updateLoginQueryString = @"update " + _bucket.Name + " set ";
                        updateLoginQueryString += "name ='" + name + "',";
                        updateLoginQueryString += "mobile ='" + mobileNo + "',";
                        updateLoginQueryString += "department ='" + model.LoginDetails.Department + "' ";
                        updateLoginQueryString += "where meta().id like'login_%' and email ='" + model.Email + "'";
                        var resultLogin = _bucket.Query<object>(updateLoginQueryString);
                    }
                    //update login details

                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, model.Email), new JsonMediaTypeFormatter());
                    #endregion
                }
                else
                {
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// this is delete method for soft delete as isActive=false
        /// </summary>
        /// <param name="email">abc@abc.com</param>
        /// <returns>return success or fail message according action</returns>
        [Route("aptc_individual/{email}")]
        [HttpDelete]
        [ResponseType(typeof(MessageModel))]
        public IHttpActionResult DeleteIndividual(string email)
        {
            string query = string.Empty;
            try
            {
                query = @"Update " + _bucket.Name + " set isActive=false where meta().id like 'login_%' and email='" + email + "'";
                _bucket.Query<object>(query).ToList();
                query = @"Update " + _bucket.Name + " set isActive=false where meta().id like 'individua_%' and email='" + email + "'";
                _bucket.Query<object>(query).ToList();
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, ""), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all driver status records
        /// </summary>
        /// <returns>Return driver status list</returns>
        [Route("aptc_individual_driverStatus")]
        [HttpGet]
        [ResponseType(typeof(IndividualDriverStatusOutPut))]
        public IHttpActionResult GetAllIndividual_DriverStatus()
        {
            try
            {
                string query = @"SELECT fullName,keyID as emiratiId,driverStatus,roles From " + _bucket.Name + " as `DStatus` where meta().id like'individual_%' and isActive=true";
                var driverStatusDocument = _bucket.Query<IndividualDriverStatusOutPut>(query).ToList();
                if (driverStatusDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, driverStatusDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all driver incidents records
        /// </summary>
        /// <returns>Return driver incidents list</returns>
        [Route("aptc_individual_incidents")]
        [HttpGet]
        [ResponseType(typeof(DriverIncidentsOutPut))]
        public IHttpActionResult GetAllIndividual_Incidents()
        {
            try
            {
                string query = @"SELECT fullName,keyID as emiratiId,incidents,roles From " + _bucket.Name + " as `IncidentMsg` where meta().id like'individual_%' and isActive=true";
                var driverIncidentsDocument = _bucket.Query<DriverIncidentsOutPut>(query).ToList();
                if (driverIncidentsDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, driverIncidentsDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all driver scoreCards records
        /// </summary>
        /// <returns>Return driver scoreCards list</returns>
        [Route("aptc_individual_scoreCards")]
        [HttpGet]
        [ResponseType(typeof(DriverScoreCardsOutPut))]
        public IHttpActionResult GetAllIndividual_ScoreCards()
        {
            try
            {
                string query = @"SELECT fullName,keyID as emiratiId,scoreCards,roles From " + _bucket.Name + " as `DriverSC` where meta().id like'individual_%' and isActive=true";
                var driverScoreCardsDocument = _bucket.Query<DriverScoreCardsOutPut>(query).ToList();
                if (driverScoreCardsDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, driverScoreCardsDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all driver fines records
        /// </summary>
        /// <returns>Return driver fines list</returns>
        [Route("aptc_individual_fines")]
        [HttpGet]
        [ResponseType(typeof(DriverFinesOutPut))]
        public IHttpActionResult GetAllIndividual_Fines()
        {
            try
            {
                string query = @"SELECT fullName,keyID as emiratiId,fines,roles From " + _bucket.Name + " as `FI` where meta().id like'individual_%' and isActive=true";
                var finesDocument = _bucket.Query<DriverFinesOutPut>(query).ToList();
                if (finesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, finesDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all driver documents records
        /// </summary>
        /// <returns>Return driver documents list</returns>
        [Route("aptc_individual_documents")]
        [HttpGet]
        [ResponseType(typeof(DriverDocumentsOutPut))]
        public IHttpActionResult GetAllIndividual_Documents()
        {
            try
            {
                string query = @"SELECT fullName,keyID as emiratiId,documents,roles From " + _bucket.Name + " as `doc` where meta().id like'individual_%' and isActive=true";
                var documentsDocument = _bucket.Query<DriverDocumentsOutPut>(query).ToList();
                if (documentsDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, documentsDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all driver vehicles records
        /// </summary>
        /// <returns>Return driver vehicles list</returns>
        [Route("aptc_individual_vehicles")]
        [HttpGet]
        [ResponseType(typeof(DriverVehiclesOutPut))]
        public IHttpActionResult GetAllIndividual_Vehicles()
        {
            try
            {
                string query = @"SELECT fullName,keyID as emiratiId,vehicles,roles From " + _bucket.Name + " as `veh` where meta().id like'individual_%' and isActive=true";
                var vehiclesDocument = _bucket.Query<DriverVehiclesOutPut>(query).ToList();
                if (vehiclesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, vehiclesDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all individual records for DDL
        /// </summary>
        /// <returns>Return individual ddl list</returns>
        [Route("aptc_individualName")]
        [HttpGet]
        [ResponseType(typeof(IndividualNameOutPut))]
        public IHttpActionResult GetAllIndividualName()
        {
            try
            {
                string query = @"SELECT keyID,fullName From " + _bucket.Name + " as `DDL_individual` where meta().id like'individual_%' and  isActive=true ";
                var dDL_individualDocument = _bucket.Query<IndividualNameOutPut>(query).ToList();
                if (dDL_individualDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, dDL_individualDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get individual companys data by emirati ID
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return Companys Details</returns>
        [Route("aptc_individual_getCompanys/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetindividualCompanys(string keyID)
        {
            try
            {
                string query = string.Empty;
                query = @"SELECT roles From " + _bucket.Name + " as Individual where meta().id like'individual_%' and keyID='" + keyID.Trim() + "'";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, individualRolesDocument);
                }
                else
                {
                    string strIndividual_companyIds = string.Empty;

                    foreach (var item in individualRolesDocument)
                    {
                        if (((Newtonsoft.Json.Linq.JToken)item).Root["roles"] != null)
                        {
                            var role = ((Newtonsoft.Json.Linq.JToken)item).Root["roles"];
                            foreach (var veh in role) // link for assign companies array
                            {
                                if (veh["roleID"].ToString() == "CMOW")
                                {
                                    if (veh["link"] != null)
                                    {
                                        var linkID = veh["link"];
                                        foreach (var lnk in linkID)
                                        {
                                            if (lnk["linkID"] != null) // check null value in linkID(CompanyID)
                                            {
                                                if (strIndividual_companyIds.Trim() == string.Empty)
                                                    strIndividual_companyIds = lnk["linkID"].ToString();  // This is company Id/ cRNum.
                                                else
                                                    strIndividual_companyIds = strIndividual_companyIds + "','" + lnk["linkID"].ToString(); // This is company Id/ cRNum.
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //if (strIndividual_companyIds.Trim() == string.Empty)
                    //{
                    //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                    //}

                    string strIndividualcompanysData = @"SELECT cRNum,dED,chamberNum,legalForm,estDate,website,comType,franshisee,telNum,notes,comStatus,email,name,address,numEmployees,vehicles,documents,fines,activities,ownerRoles,companyPhoto,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(ownerRoles) as ownerRolesCount,ARRAY_COUNT(activities) as activitiesCount,ARRAY_COUNT(numEmployees) as numEmployeesCount  From " + _bucket.Name + " as company where meta().id like'company_%' and cRNum IN ['" + strIndividual_companyIds + "'] and isActive=true";
                    var getindividualCompanysDocument = _bucket.Query<CompanyOutPut>(strIndividualcompanysData).ToList();
                    return Content(HttpStatusCode.OK, getindividualCompanysDocument);

                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get login individual`s all active company`s all employees Data
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return vehicle data</returns>
        [Route("aptc_individual_getAllActiveCompanysEmployees/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividualAllActiveCompanysEmployees(string keyID)
        {
            try
            {
                string query = string.Empty;
                query = @"Select l.['linkID'] as companyID from APTCCRM AS d UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where d.docType= 'individual' and r.['roleID']= 'CMOW' and d.keyID IN ['" + keyID.Trim() + "']";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, individualRolesDocument);
                }
                else
                {
                    #region Individual_companyIds
                        string strIndividual_companyIds = string.Empty;
                        foreach (var item in individualRolesDocument)
                        {
                            if (((Newtonsoft.Json.Linq.JToken)item).Root["companyID"] != null)
                            {
                                if (strIndividual_companyIds.Trim() == string.Empty)
                                    strIndividual_companyIds = ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString();  // This is company Id/ cRNum.
                                else
                                    strIndividual_companyIds = strIndividual_companyIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString(); // This is company Id/ cRNum.
                            }
                        }

                        //foreach (var item in individualRolesDocument)
                        //{
                        //    if (((Newtonsoft.Json.Linq.JToken)item).Root["roles"] != null)
                        //    {
                        //        var role = ((Newtonsoft.Json.Linq.JToken)item).Root["roles"];
                        //        foreach (var veh in role) // link for assign companies array
                        //        {
                        //            if (veh["roleID"].ToString() == "CMOW")
                        //            {
                        //                if (veh["link"] != null)
                        //                {
                        //                    var linkID = veh["link"];
                        //                    foreach (var lnk in linkID)
                        //                    {
                        //                        if (lnk["linkID"] != null) // check null value in linkID(CompanyID)
                        //                        {
                        //                            if (strIndividual_companyIds.Trim() == string.Empty)
                        //                                strIndividual_companyIds = lnk["linkID"].ToString();  // This is company Id/ cRNum.
                        //                            else
                        //                                strIndividual_companyIds = strIndividual_companyIds + "','" + lnk["linkID"].ToString(); // This is company Id/ cRNum.
                        //                        }
                        //                    }
                        //                }
                        //            }
                        //        }
                        //    }
                        //}

                    //if (strIndividual_companyIds.Trim() == string.Empty)
                    //{
                    //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "no company found for login individual."), new JsonMediaTypeFormatter());
                    //}
                    #endregion
                    #region Companys employees list

                        ////strIndividual_companyIds
                        //string strEmployees_EmiratiIds = string.Empty;

                        //query = @"SELECT keyID,roles From " + _bucket.Name + " as emp where meta().id like 'individual_%'";
                        //var individualRoleDocument = _bucket.Query<object>(query).ToList();
                        //if (individualRoleDocument.Count == 0)
                        //{
                        //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "no record found."), new JsonMediaTypeFormatter());
                        //}
                        //else
                        //{
                        //    foreach (var item in individualRoleDocument)
                        //    {
                        //        if (((Newtonsoft.Json.Linq.JToken)item).Root["roles"] != null)
                        //        {
                        //            var link = ((Newtonsoft.Json.Linq.JToken)item).Root["roles"];
                        //            foreach (var veh in link) // link for assign companies array
                        //            {
                        //                if (veh["link"] != null)
                        //                {
                        //                    var linkID = veh["link"];
                        //                    foreach (var lnk in linkID)
                        //                    {
                        //                        if (lnk["linkID"] != null) // check null value in linkID(CompanyID)
                        //                        {
                        //                            string[] strcmpIDs;
                        //                            strcmpIDs = strIndividual_companyIds.Split(',');

                        //                            foreach (var cID in strcmpIDs)
                        //                            {
                        //                                if (lnk["linkID"].ToString().Trim() == cID) // Add Employees_EmailIds for a company CRNum
                        //                                {
                        //                                    if (strEmployees_EmiratiIds.Trim() == string.Empty)
                        //                                        strEmployees_EmiratiIds = ((Newtonsoft.Json.Linq.JToken)item).Root["keyID"].ToString();  // This is emirati Id.
                        //                                    else
                        //                                        strEmployees_EmiratiIds = strEmployees_EmiratiIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["keyID"].ToString(); // This is emirati Id.
                        //                                }
                        //                            }
                        //                        }
                        //                    }
                        //                }
                        //            }
                        //        }
                        //    }
                        //    if (strEmployees_EmiratiIds.Trim() == string.Empty)
                        //    {
                        //        return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                        //    }
                        //    string strAllCompanysEmployees = @"SELECT email,docType,address,dob,gender,profilePhoto,isActive,keyID,language,fullName,maritalStatus,notes,nationality,religion,roles,mobNum,telNum,ARRAY_COUNT(roles) as rolesCount,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(scoreCards) as scoreCardsCount,ARRAY_COUNT(incidents) as incidentsCount,ARRAY_COUNT(driverStatus) as driverStatusCount,vehicles,fines,scoreCards,incidents,driverStatus From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and keyID IN ['" + strEmployees_EmiratiIds + "']";
                        //    var getAllCompanysEmployeesDocument = _bucket.Query<IndividualOutPut>(strAllCompanysEmployees).ToList();
                        //    if (getAllCompanysEmployeesDocument.Count == 0)
                        //    {
                        //        return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                        //    }
                        //    return Content(HttpStatusCode.OK, getAllCompanysEmployeesDocument);
                        //}

                    #endregion

                    #region Data by noSQL query

                    string strAllCompanysEmployees = @"Select d.status,d.email,d.docType,d.address,d.dob,d.gender,d.profilePhoto,d.isActive,d.keyID,d.language,d.fullName,d.auditInfo,d.maritalStatus,";
                    strAllCompanysEmployees = strAllCompanysEmployees + "d.notes,d.nationality,d.religion,d.mobNum,d.telNum,ARRAY_COUNT(d.roles) as rolesCount,ARRAY_COUNT(d.vehicles) as vehiclesCount,ARRAY_COUNT(d.documents) as documentsCount,";
                    strAllCompanysEmployees = strAllCompanysEmployees + "ARRAY_COUNT(d.fines) as finesCount,ARRAY_COUNT(d.scoreCards) as scoreCardsCount,ARRAY_COUNT(d.incidents) as incidentsCount,ARRAY_COUNT(d.driverStatus) as driverStatusCount,";
                    strAllCompanysEmployees = strAllCompanysEmployees + "d.vehicles,d.fines,d.scoreCards,d.incidents,d.driverStatus,r.['name'] as roleName,l.['name'] as companyName,r.['roleID'] as roleCode,l.['linkID'] as companyCode from APTCCRM AS d";
                    strAllCompanysEmployees = strAllCompanysEmployees + " UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where  d.docType='individual' and l.['linkID'] IN  ['"+ strIndividual_companyIds + "'] and d.keyID NOT IN  ['"+  keyID +"'] and d.isActive=true";

                    var getAllActiveCompanysActiveEmployeesDocument = _bucket.Query<IndividualOutPut>(strAllCompanysEmployees).ToList();
                    //if (getAllActiveCompanysActiveEmployeesDocument.Count == 0)
                    //{
                    //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                    //}
                    return Content(HttpStatusCode.OK, getAllActiveCompanysActiveEmployeesDocument);
                    #endregion
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        ///  Get login individual`s all active company`s all vehicles Data
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return vehicle data</returns>
        [Route("aptc_individual_getAllActiveVehicles/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(CompanyVehicleOutPut))]
        public IHttpActionResult GetAllActiveVehicles(string keyID)
        {
            try
            {
                Vehicle_APTC vehicle_APTC = new Vehicle_APTC();
                List<Vehicle_APTC> lstVehicle_APTC = new List<Vehicle_APTC>();
                string strIndividual_companyIds = string.Empty;
                string query = string.Empty;

                query = @"Select l.['linkID'] as companyID from APTCCRM AS d UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where d.docType= 'individual' and r.['roleID']= 'CMOW' and d.keyID IN ['" + keyID.Trim() + "'] and d.isActive=true";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, individualRolesDocument);
                }
                else
                {
                    #region Individual_companyIds
                        foreach (var item in individualRolesDocument)
                        {
                            if (((Newtonsoft.Json.Linq.JToken)item).Root["companyID"] != null)
                            {
                                if (strIndividual_companyIds.Trim() == string.Empty)
                                    strIndividual_companyIds = ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString();  // This is company Id/ cRNum.
                                else
                                    strIndividual_companyIds = strIndividual_companyIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString(); // This is company Id/ cRNum.
                            }
                        }
                        //if (strIndividual_companyIds.Trim() == string.Empty)
                        //{
                        //    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "no company found for login individual."), new JsonMediaTypeFormatter());
                        //}
                    #endregion
                }

                query = @"SELECT vehicles  From " + _bucket.Name + " where meta().id like 'company_%' and cRNum In ['"+ strIndividual_companyIds + "']  and isActive=true";
                var getcompanyVehiclesDocument = _bucket.Query<CompanyVehicleOutPut>(query).ToList();

                if (getcompanyVehiclesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, getcompanyVehiclesDocument);
                }
                else
                {
                    foreach (var item in getcompanyVehiclesDocument)
                    {
                        foreach (var veh in item.Vehicles)
                        {
                            string strQuery = @"SELECT keyID,docType,engineNum,numSeats,trafficNum,firstRegData,yearManufacture,makeModel,colour,vehType,fuelType,transType,vehValid,disabledFriendly,vehPlate,remarks,ownership,status From " + _bucket.Name + " as Vehicle where meta().id='vehicle_" + veh.VehicleID + "' and isActive=true";
                            var allVehicleDocument = _bucket.Query<Vehicle_APTCOutPut>(strQuery).ToList();
                            if (allVehicleDocument.Count != 0)
                            {
                                foreach (var vehAPTC in allVehicleDocument)
                                {
                                    vehicle_APTC = new Vehicle_APTC();
                                    vehicle_APTC.KeyID = vehAPTC.KeyID;
                                    vehicle_APTC.DocType = vehAPTC.DocType;
                                    vehicle_APTC.EngineNum = vehAPTC.EngineNum;
                                    vehicle_APTC.NumSeats = vehAPTC.NumSeats;
                                    vehicle_APTC.TrafficNum = vehAPTC.TrafficNum;
                                    vehicle_APTC.FirstRegData = vehAPTC.FirstRegData;
                                    vehicle_APTC.YearManufacture = vehAPTC.YearManufacture;
                                    vehicle_APTC.Make = vehAPTC.Make;
                                    vehicle_APTC.Model = vehAPTC.Model;
                                    vehicle_APTC.Colour = vehAPTC.Colour;
                                    vehicle_APTC.VehType = vehAPTC.VehType;
                                    vehicle_APTC.FuelType = vehAPTC.FuelType;
                                    vehicle_APTC.TransType = vehAPTC.TransType;
                                    vehicle_APTC.VehValid = vehAPTC.VehValid;
                                    vehicle_APTC.DisabledFriendly = vehAPTC.DisabledFriendly;
                                    vehicle_APTC.VehPlate = vehAPTC.VehPlate;
                                    vehicle_APTC.Remarks = vehAPTC.Remarks;
                                    vehicle_APTC.Ownership = vehAPTC.Ownership;
                                    vehicle_APTC.Status = vehAPTC.Status;
                                }
                                lstVehicle_APTC.Add(vehicle_APTC);
                            }
                        }
                    }
                }

                query = @"SELECT vehicles  From " + _bucket.Name + " where docType= 'individual'  and keyID IN ['" + keyID.Trim() + "'] and isActive=true";
                var getIndividualVehiclesDocument = _bucket.Query<CompanyVehicleOutPut>(query).ToList();

                if (getIndividualVehiclesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, getIndividualVehiclesDocument);
                }
                else
                {
                    foreach (var item in getIndividualVehiclesDocument)
                    {
                        foreach (var veh in item.Vehicles)
                        {
                            string strQuery = @"SELECT keyID,docType,engineNum,numSeats,trafficNum,firstRegData,yearManufacture,makeModel,colour,vehType,fuelType,transType,vehValid,disabledFriendly,vehPlate,remarks,ownership,status From " + _bucket.Name + " as Vehicle where meta().id='vehicle_" + veh.VehicleID + "' and isActive=true";
                            var allVehicleDocument = _bucket.Query<Vehicle_APTCOutPut>(strQuery).ToList();
                            if (allVehicleDocument.Count != 0)
                            {
                                foreach (var vehAPTC in allVehicleDocument)
                                {
                                    vehicle_APTC = new Vehicle_APTC();
                                    vehicle_APTC.KeyID = vehAPTC.KeyID;
                                    vehicle_APTC.DocType = vehAPTC.DocType;
                                    vehicle_APTC.EngineNum = vehAPTC.EngineNum;
                                    vehicle_APTC.NumSeats = vehAPTC.NumSeats;
                                    vehicle_APTC.TrafficNum = vehAPTC.TrafficNum;
                                    vehicle_APTC.FirstRegData = vehAPTC.FirstRegData;
                                    vehicle_APTC.YearManufacture = vehAPTC.YearManufacture;
                                    vehicle_APTC.Make = vehAPTC.Make;
                                    vehicle_APTC.Model = vehAPTC.Model;
                                    vehicle_APTC.Colour = vehAPTC.Colour;
                                    vehicle_APTC.VehType = vehAPTC.VehType;
                                    vehicle_APTC.FuelType = vehAPTC.FuelType;
                                    vehicle_APTC.TransType = vehAPTC.TransType;
                                    vehicle_APTC.VehValid = vehAPTC.VehValid;
                                    vehicle_APTC.DisabledFriendly = vehAPTC.DisabledFriendly;
                                    vehicle_APTC.VehPlate = vehAPTC.VehPlate;
                                    vehicle_APTC.Remarks = vehAPTC.Remarks;
                                    vehicle_APTC.Ownership = vehAPTC.Ownership;
                                    vehicle_APTC.Status = vehAPTC.Status;
                                }
                                lstVehicle_APTC.Add(vehicle_APTC);
                            }
                        }
                    }
                }

                return Content(HttpStatusCode.OK, lstVehicle_APTC);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message, ""), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get login individual`s all active company`s all active driver`s DriverStatus Data
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return vehicle data</returns>
        [Route("aptc_individual_getAllActiveCompanysDrivers_DriverStatus/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividualAllCompanysDrivers_DriverStatus(string keyID)
        {
            try
            {
                string query = string.Empty;
                query = @"Select l.['linkID'] as companyID from APTCCRM AS d UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where d.docType= 'individual' and r.['roleID']= 'CMOW' and d.keyID IN ['" + keyID.Trim() + "']";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, individualRolesDocument);
                }
                else
                {
                    #region Individual_companyIds
                        string strIndividual_companyIds = string.Empty;
                        foreach (var item in individualRolesDocument)
                        {
                            if (((Newtonsoft.Json.Linq.JToken)item).Root["companyID"] != null)
                            {
                                if (strIndividual_companyIds.Trim() == string.Empty)
                                    strIndividual_companyIds = ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString();  // This is company Id/ cRNum.
                                else
                                    strIndividual_companyIds = strIndividual_companyIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString(); // This is company Id/ cRNum.
                            }
                        }
                    #endregion
                   
                    #region Data by noSQL query
                    string strAllCompanysEmployees = @"Select d.gender,d.profilePhoto,d.isActive,d.keyID,d.language,d.fullName,d.nationality,d.religion,d.vehicles";
                           strAllCompanysEmployees = strAllCompanysEmployees + ",d.driverStatus,r.['name'] as roleName,l.['name'] as companyName,r.['roleID'] as roleCode,l.['linkID'] as companyCode  from APTCCRM AS d";
                           strAllCompanysEmployees = strAllCompanysEmployees + " UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where  d.docType='individual' and r.['roleID']= 'DRVR' and l.['linkID'] IN  ['" + strIndividual_companyIds + "'] and d.keyID NOT IN  ['" + keyID + "'] and d.isActive=true";

                    var getAllActiveCompanysActiveEmployeesDocument = _bucket.Query<object>(strAllCompanysEmployees).ToList();
                    return Content(HttpStatusCode.OK, getAllActiveCompanysActiveEmployeesDocument);
                    #endregion
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get login individual`s all active company`s all active driver`s ScoreCards Data
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return vehicle data</returns>
        [Route("aptc_individual_getAllActiveCompanysDrivers_ScoreCards/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividualAllCompanysDrivers_ScoreCards(string keyID)
        {
            try
            {
                string query = string.Empty;
                query = @"Select l.['linkID'] as companyID from APTCCRM AS d UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where d.docType= 'individual' and r.['roleID']= 'CMOW' and d.keyID IN ['" + keyID.Trim() + "']";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, individualRolesDocument);
                }
                else
                {
                    #region Individual_companyIds
                    string strIndividual_companyIds = string.Empty;
                    foreach (var item in individualRolesDocument)
                    {
                        if (((Newtonsoft.Json.Linq.JToken)item).Root["companyID"] != null)
                        {
                            if (strIndividual_companyIds.Trim() == string.Empty)
                                strIndividual_companyIds = ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString();  // This is company Id/ cRNum.
                            else
                                strIndividual_companyIds = strIndividual_companyIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString(); // This is company Id/ cRNum.
                        }
                    }
                    #endregion
                    #region Data by noSQL query
                    string strAllCompanysEmployees = @"Select d.gender,d.profilePhoto,d.isActive,d.keyID,d.language,d.fullName,d.nationality,d.religion,d.vehicles";
                    strAllCompanysEmployees = strAllCompanysEmployees + ",d.scoreCards,r.['name'] as roleName,l.['name'] as companyName,r.['roleID'] as roleCode,l.['linkID'] as companyCode  from APTCCRM AS d";
                    strAllCompanysEmployees = strAllCompanysEmployees + " UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where  d.docType='individual' and r.['roleID']= 'DRVR' and l.['linkID'] IN  ['" + strIndividual_companyIds + "'] and d.keyID NOT IN  ['" + keyID + "'] and d.isActive=true";

                    var getAllActiveCompanysActiveEmployeesDocument = _bucket.Query<object>(strAllCompanysEmployees).ToList();
                    return Content(HttpStatusCode.OK, getAllActiveCompanysActiveEmployeesDocument);
                    #endregion
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get login individual`s all active company`s all active driver`s ScoreCards Data
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return driver data</returns>
        [Route("aptc_individual_getAllActiveCompanysDrivers_Incidents/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividualAllCompanysDrivers_Incidents(string keyID)
        {
            try
            {
                string query = string.Empty;
                query = @"Select l.['linkID'] as companyID from APTCCRM AS d UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where d.docType= 'individual' and r.['roleID']= 'CMOW' and d.keyID IN ['" + keyID.Trim() + "']";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, individualRolesDocument);
                }
                else
                {
                    #region Individual_companyIds
                    string strIndividual_companyIds = string.Empty;
                    foreach (var item in individualRolesDocument)
                    {
                        if (((Newtonsoft.Json.Linq.JToken)item).Root["companyID"] != null)
                        {
                            if (strIndividual_companyIds.Trim() == string.Empty)
                                strIndividual_companyIds = ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString();  // This is company Id/ cRNum.
                            else
                                strIndividual_companyIds = strIndividual_companyIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString(); // This is company Id/ cRNum.
                        }
                    }
                    #endregion

                    #region Data by noSQL query

                    string strAllCompanysEmployees = @"Select d.gender,d.profilePhoto,d.isActive,d.keyID,d.language,d.fullName,d.nationality,d.religion,d.vehicles";
                    strAllCompanysEmployees = strAllCompanysEmployees + ",d.incidents,r.['name'] as roleName,l.['name'] as companyName,r.['roleID'] as roleCode,l.['linkID'] as companyCode  from APTCCRM AS d";
                    strAllCompanysEmployees = strAllCompanysEmployees + " UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where  d.docType='individual' and r.['roleID']= 'DRVR' and l.['linkID'] IN  ['" + strIndividual_companyIds + "'] and d.keyID NOT IN  ['" + keyID + "'] and d.isActive=true";

                    var getAllActiveCompanysActiveEmployeesDocument = _bucket.Query<object>(strAllCompanysEmployees).ToList();
                    return Content(HttpStatusCode.OK, getAllActiveCompanysActiveEmployeesDocument);

                    #endregion
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get login individual`s all active company`s all permit Data
        /// </summary>
        /// <param name="id">keyID</param>
        /// <returns>Return permit data</returns>
        [Route("aptc_individual_getAllActivePermits/{keyID}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetIndividualAllActiveCompanysPermits(string keyID)
        {
            try
            {
                string query = string.Empty;
                query = @"Select l.['linkID'] as companyID from APTCCRM AS d UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where d.docType= 'individual' and r.['roleID']= 'CMOW' and d.keyID IN ['" + keyID.Trim() + "']";
                var individualRolesDocument = _bucket.Query<object>(query).ToList();
                ///////////// Validate Individual IsExist or Not
                if (individualRolesDocument.Count == 0)
                {
                    return Content(HttpStatusCode.OK, individualRolesDocument);
                }
                else
                {
                    #region Individual_companyIds
                        string strIndividual_companyIds = string.Empty;
                        foreach (var item in individualRolesDocument)
                        {
                            if (((Newtonsoft.Json.Linq.JToken)item).Root["companyID"] != null)
                            {
                                if (strIndividual_companyIds.Trim() == string.Empty)
                                    strIndividual_companyIds = ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString();  // This is company Id/ cRNum.
                                else
                                    strIndividual_companyIds = strIndividual_companyIds + "','" + ((Newtonsoft.Json.Linq.JToken)item).Root["companyID"].ToString(); // This is company Id/ cRNum.
                            }
                        }
                    #endregion
                    DocOutOutPut permit_APTC = new DocOutOutPut();
                    List<DocOutOutPut> lstpermit_APTC = new List<DocOutOutPut>();

                    #region Company Permit Data by noSQL query
                        string indvName = string.Empty;
                        query = @"SELECT documents  From " + _bucket.Name + " where meta().id like 'company_%' and cRNum In ['"+ strIndividual_companyIds + "'] and isActive=true";
                        var getCompanyPermitsDocument = _bucket.Query<CompanyPermitOutPut>(query).ToList();

                        if (getCompanyPermitsDocument.Count == 0)
                        {
                            return Content(HttpStatusCode.NoContent, getCompanyPermitsDocument);
                        }
                        else
                        {
                            foreach (var item in getCompanyPermitsDocument)
                            {
                                foreach (var veh in item.Documents)
                                {
                                    string strQuery = @"SELECT meta().id as docOutId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
                                                    dateTime,docType,docRef,docContent,version,lang,docFile,status,docAccepted 
                                                    From " + _bucket.Name + " as docOut where meta().id LIKE 'PERMIT_%' and meta().id='" + veh.DocumentID + "' and status=true";
                                    var docOutDocument = _bucket.Query<DocOutOutPut>(strQuery).ToList();

                                    if (docOutDocument.Count != 0)
                                    {
                                        foreach (var perAPTC in docOutDocument)
                                        {
                                            permit_APTC = new DocOutOutPut();
                                            permit_APTC.RejReas = perAPTC.RejReas;
                                            permit_APTC.ValidTo = perAPTC.ValidTo;
                                            permit_APTC.ValidFrom = perAPTC.ValidFrom;
                                            permit_APTC.DateTime = perAPTC.DateTime;
                                            permit_APTC.DocRef = perAPTC.DocRef;
                                            permit_APTC.DocContent = perAPTC.DocContent;
                                            permit_APTC.Version = perAPTC.Version;
                                            permit_APTC.Lang = perAPTC.Lang;
                                            permit_APTC.DocFile = perAPTC.DocFile;
                                            permit_APTC.Status = perAPTC.Status;
                                            permit_APTC.DocAccepted = perAPTC.DocAccepted;

                                            //IndivID Name
                                            if (perAPTC.IndivID != null)
                                            {
                                                var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + perAPTC.IndivID + "'").ToList();

                                                foreach (var indvItem in objIndivDetails)
                                                {
                                                    if (((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"] != null)
                                                        indvName = ((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"].ToString();
                                                    perAPTC.IndivName = indvName;
                                                }
                                                permit_APTC = perAPTC;
                                            }
                                            else
                                            {
                                                permit_APTC = perAPTC;
                                            }
                                            //docClass name
                                            if (perAPTC.DocClass != null)
                                            {
                                                var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + perAPTC.DocClass.ToUpper() + "'").ToList();

                                                foreach (var docClassItem in objDocClassDetails)
                                                {
                                                    if (((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"] != null)
                                                        perAPTC.DocClassName = ((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"].ToString();
                                                }
                                                permit_APTC = perAPTC;
                                            }
                                            else
                                            {
                                                permit_APTC = perAPTC;
                                            }
                                            //DocType Name
                                            if (permit_APTC.DocType != null)
                                            {
                                                var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Permit'] AS r where r.Code='" + perAPTC.DocType.ToUpper() + "'").ToList();

                                                foreach (var docItem in objDocTypeDetails)
                                                {
                                                    if (((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"] != null)
                                                        perAPTC.DocTypeName = ((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"].ToString();
                                                }
                                                permit_APTC = perAPTC;
                                            }
                                            else
                                            {
                                                permit_APTC = perAPTC;
                                            }
                                            // CompID Name
                                            if (perAPTC.CompID != null)
                                            {
                                                var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + perAPTC.CompID + "'").ToList();

                                                foreach (var comItem in objComDetails)
                                                {
                                                    if (((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"] != null)
                                                        perAPTC.CompIDName = ((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"].ToString();
                                                }
                                                permit_APTC = perAPTC;
                                            }
                                            else
                                            {
                                                permit_APTC = perAPTC;
                                            }
                                            //VehID Name
                                            if (perAPTC.VehID != null)
                                            {
                                                var objVehicleDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + perAPTC.VehID + "'").ToList();

                                                foreach (var vehItem in objVehicleDetails)
                                                {
                                                    if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"] != null)
                                                        perAPTC.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"].ToString();

                                                    if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"] != null)
                                                        perAPTC.VehIDMake = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"].ToString();

                                                    if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"] != null)
                                                        perAPTC.VehIDModel = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"].ToString();
                                                }
                                                permit_APTC = perAPTC;
                                            }
                                            else
                                            {
                                                permit_APTC = perAPTC;
                                            }
                                            ///////////////////////////////////////////////////
                                        }
                                        lstpermit_APTC.Add(permit_APTC);
                                    }
                                }
                            }
                           // return Content(HttpStatusCode.OK, lstpermit_APTC);
                        }
                    #endregion
                    #region Individual Permit Data by noSQL query
                    indvName = string.Empty;
                    query = @"SELECT documents  From " + _bucket.Name + " where meta().id like 'individual_%' and keyID In ['" + keyID.Trim() + "'] and isActive=true";
                    var getIndividualPermitsDocument = _bucket.Query<CompanyPermitOutPut>(query).ToList();

                    if (getIndividualPermitsDocument.Count == 0)
                    {
                        return Content(HttpStatusCode.NoContent, getIndividualPermitsDocument);
                    }
                    else
                    {
                        foreach (var item in getIndividualPermitsDocument)
                        {
                            foreach (var veh in item.Documents)
                            {
                                string strQuery = @"SELECT meta().id as docOutId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
                                                    dateTime,docType,docRef,docContent,version,lang,docFile,status,docAccepted 
                                                    From " + _bucket.Name + " as docOut where meta().id LIKE 'PERMIT_%' and meta().id='" + veh.DocumentID + "' and status=true";
                                var docOutDocument = _bucket.Query<DocOutOutPut>(strQuery).ToList();

                                if (docOutDocument.Count != 0)
                                {
                                    foreach (var perAPTC in docOutDocument)
                                    {
                                        permit_APTC = new DocOutOutPut();
                                        permit_APTC.RejReas = perAPTC.RejReas;
                                        permit_APTC.ValidTo = perAPTC.ValidTo;
                                        permit_APTC.ValidFrom = perAPTC.ValidFrom;
                                        permit_APTC.DateTime = perAPTC.DateTime;
                                        permit_APTC.DocRef = perAPTC.DocRef;
                                        permit_APTC.DocContent = perAPTC.DocContent;
                                        permit_APTC.Version = perAPTC.Version;
                                        permit_APTC.Lang = perAPTC.Lang;
                                        permit_APTC.DocFile = perAPTC.DocFile;
                                        permit_APTC.Status = perAPTC.Status;
                                        permit_APTC.DocAccepted = perAPTC.DocAccepted;

                                        //IndivID Name
                                        if (perAPTC.IndivID != null)
                                        {
                                            var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + perAPTC.IndivID + "'").ToList();

                                            foreach (var indvItem in objIndivDetails)
                                            {
                                                if (((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"] != null)
                                                    indvName = ((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"].ToString();
                                                perAPTC.IndivName = indvName;
                                            }
                                            permit_APTC = perAPTC;
                                        }
                                        else
                                        {
                                            permit_APTC = perAPTC;
                                        }
                                        //docClass name
                                        if (perAPTC.DocClass != null)
                                        {
                                            var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + perAPTC.DocClass.ToUpper() + "'").ToList();

                                            foreach (var docClassItem in objDocClassDetails)
                                            {
                                                if (((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"] != null)
                                                    perAPTC.DocClassName = ((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"].ToString();
                                            }
                                            permit_APTC = perAPTC;
                                        }
                                        else
                                        {
                                            permit_APTC = perAPTC;
                                        }
                                        //DocType Name
                                        if (permit_APTC.DocType != null)
                                        {
                                            var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Permit'] AS r where r.Code='" + perAPTC.DocType.ToUpper() + "'").ToList();

                                            foreach (var docItem in objDocTypeDetails)
                                            {
                                                if (((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"] != null)
                                                    perAPTC.DocTypeName = ((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"].ToString();
                                            }
                                            permit_APTC = perAPTC;
                                        }
                                        else
                                        {
                                            permit_APTC = perAPTC;
                                        }
                                        // CompID Name
                                        if (perAPTC.CompID != null)
                                        {
                                            var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + perAPTC.CompID + "'").ToList();

                                            foreach (var comItem in objComDetails)
                                            {
                                                if (((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"] != null)
                                                    perAPTC.CompIDName = ((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"].ToString();
                                            }
                                            permit_APTC = perAPTC;
                                        }
                                        else
                                        {
                                            permit_APTC = perAPTC;
                                        }
                                        //VehID Name
                                        if (perAPTC.VehID != null)
                                        {
                                            var objVehicleDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + perAPTC.VehID + "'").ToList();

                                            foreach (var vehItem in objVehicleDetails)
                                            {
                                                if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"] != null)
                                                    perAPTC.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"].ToString();

                                                if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"] != null)
                                                    perAPTC.VehIDMake = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"].ToString();

                                                if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"] != null)
                                                    perAPTC.VehIDModel = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"].ToString();
                                            }
                                            permit_APTC = perAPTC;
                                        }
                                        else
                                        {
                                            permit_APTC = perAPTC;
                                        }
                                        ///////////////////////////////////////////////////
                                    }
                                    lstpermit_APTC.Add(permit_APTC);
                                }
                            }
                        }
                    }
                    #endregion

                    return Content(HttpStatusCode.OK, lstpermit_APTC);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// this is put method for approved  individual
        /// </summary>
        /// <param name="model">Individual</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_Approved_individual/{keyID}")]
        [HttpPut]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> ApprovedIndividual(string keyID)
        {
            string query = string.Empty;
            try
            {
                query = @"Update " + _bucket.Name + " set status.statusID='AP',status.dateTime ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "' where meta().id like 'individual_%' and keyID='" + keyID + "'";
                _bucket.Query<object>(query).ToList();
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, keyID+ " has been approved successfully"), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
