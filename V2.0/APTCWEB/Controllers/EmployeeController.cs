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
    /// Employee Controller
    /// </summary>
    [RoutePrefix("api")]
    public class EmployeeController : ApiController
    {
        #region PrviavteFields
            private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        #endregion

        SendEmail sendEmail = new SendEmail();
        MobileSMS mobileSMS = new MobileSMS();
        SendOtp sendOtp = new SendOtp();

        /// <summary>
        /// Get data by email
        /// </summary>
        /// <param name="id">abc@abc.com</param>Employee
        /// <returns>Return Employee Details for email</returns>
        [Route("aptc_employee/{email}")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetEmployee(string email)
        {
            try
            {
                IndividualOutPut userDetails = new IndividualOutPut();
                string queryLogin = string.Empty;

                string query = @"SELECT email,docType,address,dob,gender,profilePhoto,isActive,keyID,language,fullName
                             ,maritalStatus,notes,nationality,religion,mobNum,telNum From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and  isActive=true and email='" + email + "' ";
                var userDocument = _bucket.Query<IndividualOutPut>(query).ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, email), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, userDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get all employee records
        /// </summary>
        /// <returns>Return employee list</returns>
        [Route("aptc_employee")]
        [HttpGet]
        [ResponseType(typeof(IndividualOutPut))]
        public IHttpActionResult GetAllEmployee()
        {
            try
            {
                List<object> lstObj = new List<object>();
                string queryLogin = string.Empty;
                //SELECT* FROM APTCCRM WHERE meta().id like'DOC%' and docType like'%ProfilePhoto%'
                string query = @"SELECT email,docType,address,dob,gender,profilePhoto,isActive,keyID,language,fullName,auditInfo
                            ,maritalStatus,notes,nationality,roles,religion,mobNum,telNum From " + _bucket.Name + " as `personelInformation` where meta().id like'individual_%' and  isActive=true ";
                var userDocument = _bucket.Query<IndividualOutPut>(query).ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, userDocument);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// this is post method for add  employee
        /// </summary>
        /// <param name="model">employee</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_employee")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public IHttpActionResult EmployeeRegister(Individual model)
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
                mobNum.CountryCodeM = model.MobNum.CountryCodeM;
                mobNum.NumM = model.MobNum.NumM;
                mobNum.AreaM = model.MobNum.AreaM;

                TelNum telNum = new TelNum();
                if (model.TelNum != null)
                {
                    telNum.CountryCodeT = model.TelNum.CountryCodeT;
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
                List<Incidents> lstIncident = new List<Incidents>();
                List<ScoreCards> lstScoreCard = new List<ScoreCards>();
                List<DriverStatus> lstdriverStatus = new List<DriverStatus>();
                #endregion

                FullName fullName = new FullName();
                fullName.En_US = model.fullName.En_US;
                fullName.Ar_SA = model.fullName.Ar_SA;

                Status status = new Status();
                if (model.Status != null)
                {
                    status.StatusID = model.Status.StatusID;
                    status.DateTime = model.Status.DateTime;
                }

                
                
                //DataConversion.ConvertYMDHMS(DateTime.Now.AddDays(Convert.ToInt16(ConfigurationManager.AppSettings.Get("ValidToProfilePhotoDays"))).ToString())
                ProfilePhoto profilePhoto = new ProfilePhoto();
                if (model.ProfilePhoto != null)
                {
                    profilePhoto.DocFormat = model.ProfilePhoto.DocFormat;
                    profilePhoto.Photo = model.ProfilePhoto.Photo;
                    profilePhoto.ValidFrom = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                    profilePhoto.ValidTo = DataConversion.ConvertYMDHMS(DateTime.Now.AddDays(Convert.ToInt16(ConfigurationManager.AppSettings.Get("ValidToProfilePhotoDays"))).ToString());
                }
                string docId = string.Empty;
                if (string.IsNullOrEmpty(model.KeyID))
                {
                    docId = "individual_" + Guid.NewGuid();
                }
                else
                {
                    docId = "individual_" + model.KeyID;
                }

                var employeeDoc = new Document<Individual>()
                {
                    Id = docId,
                    Content = new Individual
                    {
                        KeyID = docId,
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
                        ScoreCards = lstScoreCard,
                        Address = address,
                        Religion = model.Religion,
                        Status = status,
                        Incidents = lstIncident,
                        DriverStatus = lstdriverStatus,
                    },
                };
                var result = _bucket.Insert(employeeDoc);
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
        /// this is put method for update  individual
        /// </summary>
        /// <param name="model">Individual</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_employee")]
        [HttpPut]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> UpdateEmployee(Individual model)
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
                string query = @"SELECT * From " + _bucket.Name + " as Employee where meta().id like'individual_%' and  email= '" + model.Email + "'";
                var userDocument = _bucket.Query<object>(query).ToList();
                if (userDocument.Count > 0)
                {
                    //return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "EmiratiID already exists"), new JsonMediaTypeFormatter());
                    ///////////////////////// edit API Code 27-Aug-2018
                    #region fetch max audit version
                    MessageModel msg = new MessageModel();
                    List<int> maxVersion = new List<int>();
                    var maxAuditVersion = 0;

                    if (((Newtonsoft.Json.Linq.JToken)userDocument[0]).Root["Employee"]["auditInfo"] != null)
                    {
                        var auditInfoVersion = ((Newtonsoft.Json.Linq.JToken)userDocument[0]).Root["Employee"]["auditInfo"];
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
                    #region Updare Employee
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
                        updatequeryString += " status.statusID ='" + model.Status.StatusID + "',";
                        updatequeryString += " status.dateTime ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "',";
                    }
                    updatequeryString += " email ='" + model.Email + "',";
                    updatequeryString += " notes ='" + model.Notes + "',";
                    updatequeryString += " religion ='" + model.Religion + "',";
                    updatequeryString += "roles=[],";
                    updatequeryString += "auditInfo = ARRAY_APPEND( auditInfo, " + Newtonsoft.Json.JsonConvert.SerializeObject(auditInfo).ToString() + ")";
                    updatequeryString += " where keyID = '" + model.KeyID + "'";
                    var result = _bucket.Query<object>(updatequeryString);
                    query = @"select roles[0] from " + _bucket.Name + "  where keyID = '" + model.KeyID + "'";

                    foreach (var item in model.Roles)
                    {
                        var queryUpdateOtherRoles = @"update `APTCCRM` SET roles= ARRAY_APPEND( roles, " + Newtonsoft.Json.JsonConvert.SerializeObject(item).ToString() + " )  where keyID = '" + model.KeyID + "'";
                        _bucket.Query<object>(queryUpdateOtherRoles);
                    }
                   
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
        [Route("aptc_employee/{email}")]
        [HttpDelete]
        [ResponseType(typeof(MessageModel))]
        public IHttpActionResult DeleteEmployee(string email)
        {
            string query = string.Empty;
            try
            {
                query = @"Update " + _bucket.Name + " set isActive=false where meta().id like 'individual_%' and email='" + email + "'";
                _bucket.Query<object>(query).ToList();
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, ""), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

    }
}
