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
//using System.Web.Script.Serialization;
//using System.Web.Http.Description;
//using System.Net.Http.Formatting;
//using APTCWebb.OutPutDto;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// New Company Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    public class NewCompanyController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        private readonly IBucket _bucketRef = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
//        #endregion
//        string resultPostNotification = string.Empty;
//        SendNotification sn = new SendNotification();
//        SendEmail sendEmail = new SendEmail();

//        /// <summary>
//        /// Get data by Id
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Company Details for id=Company_5</returns>
//        [Route("aptc_company/{CRNum}")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyOutPut))]
//        public IActionResult GetCompany(string CRNum)
//        {
//            try
//            {
//                string query = @"SELECT cRNum,dED,chamberNum,legalForm,estDate,website,comType,franshisee,telNum,notes,comStatus,email,name,address,numEmployees,vehicles,documents,fines,activities,ownerRoles,companyPhoto,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(ownerRoles) as ownerRolesCount,ARRAY_COUNT(activities) as activitiesCount,ARRAY_COUNT(numEmployees) as numEmployeesCount  From " + _bucket.Name + " as company where meta().id='company_" + CRNum + "' and isActive=true";
//                var comapnyDocument = _bucket.Query<CompanyOutPut>(query).ToList();
//                if (comapnyDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, "182-please enter valid company id.");
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, comapnyDocument);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.Message);
//            }
//        }

//        /// <summary>
//        /// Get all data
//        /// </summary>
//        /// <returns>Return list of company details</returns>
//        [Route("aptc_company")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyOutPut))]
//        public IActionResult GetAllCompany()
//        {
//            string query = @"SELECT cRNum,dED,chamberNum,legalForm,estDate,website,comType,franshisee,telNum,notes,comStatus,email,name,address,numEmployees,vehicles,documents,fines,activities,ownerRoles,companyPhoto,ARRAY_COUNT(vehicles) as vehiclesCount,ARRAY_COUNT(documents) as documentsCount,ARRAY_COUNT(fines) as finesCount,ARRAY_COUNT(ownerRoles) as ownerRolesCount,ARRAY_COUNT(activities) as activitiesCount,ARRAY_COUNT(numEmployees) as numEmployeesCount From " + _bucket.Name + " as company where meta().id LIKE 'company_%' and isActive=true";
//            var comapnyDocument = _bucket.Query<CompanyOutPut>(query).ToList();
//            return Content(HttpStatusCode.OK, comapnyDocument);
//        }

//        /// <summary>
//        /// Post Company
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> Register(NewCompany model)
//        {
//            try
//            {
//                if (model.Name == null)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "114-name is required"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    if (string.IsNullOrEmpty(model.Name.Ar_SA) && string.IsNullOrEmpty(model.Name.En_US))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "114-name is required"), new JsonMediaTypeFormatter());
//                    }
//                }

//                // Validate Model
//                if (!ModelState.IsValid)
//                {
//                    var modelErrors = new List<string>();
//                    foreach (var modelState in ModelState.Values)
//                    {
//                        foreach (var modelError in modelState.Errors)
//                        {
//                            //modelErrors.Add(modelError.ErrorMessage);
//                            modelErrors.Add(modelError.ErrorMessage == "" ? modelError.Exception.Message : modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
//                }

//                    // Add company
//                    Name name = new Name();
//                    if (model.Name != null)
//                    {
//                        name.En_US = model.Name.En_US;
//                        name.Ar_SA = model.Name.Ar_SA;
//                    }

//                    TelNum telNum = new TelNum();
//                    if (model.TelNum != null)
//                    {
//                        telNum.CountryCodeT = model.TelNum.CountryCodeT;
//                        telNum.NumT = model.TelNum.NumT;
//                        telNum.AreaT = model.TelNum.AreaT;
//                    }

//                    Address address = new Address();
//                    if (model.Address != null)
//                    {
//                        address.City = model.Address.City;
//                        address.State = model.Address.State;
//                        address.Area = model.Address.Area;
//                        address.Street = model.Address.Street;
//                        address.BldgNum = model.Address.BldgNum;
//                        address.FlatNum = model.Address.FlatNum;
//                    }

//                    ComStatus comStatus = new ComStatus();
//                    if (model.ComStatus != null)
//                    {
//                        comStatus.StatusID = "PE";
//                        comStatus.DateTime = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
//                }

//                    List<NumEmployees> lstnumEmployees = new List<NumEmployees>();
//                    if (model.NumEmployees != null)
//                    {
//                        foreach (var numEmployee in model.NumEmployees)
//                        {
//                            NumEmployees numEmployees = new NumEmployees();
//                            numEmployees.Employees = numEmployee.Employees;
//                            numEmployees.Date = numEmployee.Date;
//                            lstnumEmployees.Add(numEmployees);
//                        }
//                    }

//                    List<Activities> lstactivities = new List<Activities>();
//                    if (model.Activities != null)
//                    {
//                        foreach (var activitie in model.Activities)
//                        {
//                            Activities activities = new Activities();
//                            activities.ActivityID = activitie.ActivityID;
//                            lstactivities.Add(activities);
//                        }
//                    }

//                    List<OwnerRoles> lstOwnerRoles = new List<OwnerRoles>();
//                    if (model.OwnerRoles != null)
//                    {
//                        foreach (var ownerRole in model.OwnerRoles)
//                        {
//                            OwnerRoles ownerRoles = new OwnerRoles();
//                            ownerRoles.OwnerRoleID = ownerRole.OwnerRoleID;
//                            ownerRoles.ID = ownerRole.ID;
//                            ownerRoles.Nationality = ownerRole.Nationality;
//                            ownerRoles.OwnerRoleType = ownerRole.OwnerRoleType;
//                            ownerRoles.OwnerNameAr = ownerRole.OwnerNameAr;
//                            ownerRoles.OwnerNameEn = ownerRole.OwnerNameEn;
//                            lstOwnerRoles.Add(ownerRoles);
//                        }
//                    }

//                    List<Fines> lstFines = new List<Fines>();
//                    if (model.Fines != null)
//                    {
//                        foreach (var fine in model.Fines)
//                        {
//                            Fines fines = new Fines();
//                            fines.FineID = fine.FineID;
//                            fines.DateTime = fine.DateTime;
//                            fines.Amount = fine.Amount;
//                            fines.Status = fine.Status;
//                            fines.Remark = fine.Remark;
//                            lstFines.Add(fines);
//                        }
//                    }

//                    List<Documents> lstDocuments = new List<Documents>();
//                    if (model.Documents != null)
//                    {
//                        foreach (var document in model.Documents)
//                        {
//                            Documents addnewDocument = new Documents();
//                            addnewDocument.DocumentID = document.DocumentID;
//                            addnewDocument.Type = document.Type;
//                            addnewDocument.Version = document.Version;
//                            addnewDocument.ExpDate = document.ExpDate;
//                            addnewDocument.DocStatus = document.DocStatus;
//                            lstDocuments.Add(document);
//                        }
//                    }

//                    List<Vehicles> lstVehicles = new List<Vehicles>();
//                    if (model.Vehicles != null)
//                    {
//                        foreach (var vehicle in model.Vehicles)
//                        {
//                            Vehicles vehicles = new Vehicles();
//                            vehicles.VehicleID = vehicle.VehicleID;
//                            vehicles.Make = vehicle.Make;
//                            vehicles.ModelYear = vehicle.ModelYear;
//                            vehicles.VehType = vehicle.VehType;
//                            vehicles.Status = vehicle.Status;
//                            lstVehicles.Add(vehicles);
//                        }
//                    }

//                    List<AuditInfo> lstauditInfo = new List<AuditInfo>();
//                    AuditInfo auditInfo = new AuditInfo();
//                    auditInfo.Version = "1";
//                    auditInfo.Status = "true";
//                    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
//                    auditInfo.LastChangeBy = model.Email;
//                    lstauditInfo.Add(auditInfo);
                    

//                    string password = Guid.NewGuid().ToString("d").Substring(1, 4);
//                    var companyDoc = new Document<NewCompany>()
//                    {
//                        Id = "company_" + model.CRNum,
//                        Content = new NewCompany
//                        {
//                            CRNum = model.CRNum,
//                            DED = model.DED,
//                            ChamberNum = model.ChamberNum,
//                            LegalForm = model.LegalForm,
//                            EstDate = model.EstDate,
//                            Email = model.Email,
//                            Website = model.Website,
//                            ComType = model.ComType,
//                            Franshisee = model.Franshisee,
//                            Name = name,
//                            TelNum = model.TelNum,
//                            Address = model.Address,
//                            Notes = model.Notes,
//                            ComStatus = model.ComStatus,
//                            IsActive = true,
//                            NumEmployees = lstnumEmployees,
//                            Activities = lstactivities,
//                            OwnerRoles = lstOwnerRoles,
//                            Fines = lstFines,
//                            Vehicles = lstVehicles,
//                            Documents = lstDocuments,
//                            AuditInfo = lstauditInfo,
//                            CompanyPhoto=model.CompanyPhoto
//                        },
//                    };

//                    var result = await _bucket.InsertAsync(companyDoc);
//                    if (!result.Success)
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), result.Message), new JsonMediaTypeFormatter());
//                    }
//                    else
//                    {
//                        /////////////////////////////////// add document in IndivID
//                        if (model.IndivID != string.Empty)
//                        {
//                            string query1 = @"SELECT * From " + _bucket.Name + " as Individual where meta().id like'individual_%' and keyID='" + model.IndivID + "'";
//                            var individualDocument = _bucket.Query<object>(query1).ToList();

//                            if (individualDocument.Count > 0)
//                            {
//                                Link addLinkInRole = new Link();
//                                List<Link> lstAddNewLink = new List<Link>();

//                                if (model.CRNum != null)
//                                {
                                   
//                                    addLinkInRole.LinkID = model.CRNum;
//                                    if (model.Name != null)
//                                    {
//                                        addLinkInRole.Name = model.Name.En_US;
//                                    }
//                                    lstAddNewLink.Add(addLinkInRole);
//                                }
                            
//                                Roles addNewRole = new Roles();
                            
//                                addNewRole.Name = "Company Owner";
//                                addNewRole.RoleID = "CMOW";
//                                addNewRole.Link = lstAddNewLink;

//                                string query = @"UPDATE " + _bucket.Name + " SET roles = ARRAY_APPEND(roles, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewRole).ToString() + ") where meta().id like'individual_%' and keyID='" + model.IndivID + "'";
//                                var resultIndividual = _bucket.Query<object>(query);
//                                //return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), docOutID + " has been added sucessfully"), new JsonMediaTypeFormatter());

//                            }
//                        }
//                    if (ConfigurationManager.AppSettings.Get("NotificationSettingFlag") == "1")
//                    {
//                        #region Post Notification RoleCodeHODP
//                        //////////////// Post Notification Code
//                        try
//                        {
//                            PostNotificationParameters objPostNotificationParameters = new PostNotificationParameters();
//                            objPostNotificationParameters.UserCode = string.Empty;
//                            objPostNotificationParameters.RoleCode = AspectEnums.RoleCodeHODP;
//                            objPostNotificationParameters.DeptCode = AspectEnums.DeptCodeFROE;
//                            objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.CompanyRegistration;
//                            objPostNotificationParameters.KeyID = companyDoc.Id;//docOutDocument.KeyID;
//                            objPostNotificationParameters.Value = model.ChamberNum;
//                            objPostNotificationParameters.Status = AspectEnums.StatusPS;//"PE";//model.Status.ToString();
//                            resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
//                        }
//                        catch (Exception ex)
//                        {
//                            return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//                        }
//                        #endregion
//                        #region Post Notification RoleCodeBCKO
//                        //////////////// Post Notification Code
//                        try
//                        {
//                            PostNotificationParameters objPostNotificationParameters = new PostNotificationParameters();
//                            objPostNotificationParameters.UserCode = string.Empty;
//                            objPostNotificationParameters.RoleCode = AspectEnums.RoleCodeBCKO;
//                            objPostNotificationParameters.DeptCode = AspectEnums.DeptCodeFROE;
//                            objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.CompanyRegistration;
//                            objPostNotificationParameters.KeyID = companyDoc.Id;//docOutDocument.KeyID;
//                            objPostNotificationParameters.Value = model.ChamberNum;
//                            objPostNotificationParameters.Status = AspectEnums.StatusPS;//"PE";//model.Status.ToString();
//                            resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
//                        }
//                        catch (Exception ex)
//                        {
//                            return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//                        }
//                        #endregion
//                    }
//                    ///////////////////////////////////
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
//                    }
                
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is put method for update company by CRNum
//        /// </summary>
//        /// <param name="model">company</param>
//        /// <returns>success or fail message according to action</returns>
//        [Route("aptc_company")]
//        [HttpPut]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> UpdateCompany(NewCompany model)
//        {
//            try
//            {
//                if (model.Name == null)
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "114-name is required"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    if (string.IsNullOrEmpty(model.Name.Ar_SA) && string.IsNullOrEmpty(model.Name.En_US))
//                    {
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "114-name is required"), new JsonMediaTypeFormatter());
//                    }
//                }

//                // Validate Model Code
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
//                // Validate company is exist or not
//                var companyDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as company where meta().id='company_" + model.CRNum + "'").ToList();

//                if (companyDocument.Count > 0)
//                {
//                    // edit company
//                    #region fetch max audit version
//                    MessageModel msg = new MessageModel();
//                    List<int> maxVersion = new List<int>();
//                    var maxAuditVersion = 0;

//                    if (((Newtonsoft.Json.Linq.JToken)companyDocument[0]).Root["company"]["auditInfo"] != null)
//                    {
//                        var auditInfoVersion = ((Newtonsoft.Json.Linq.JToken)companyDocument[0]).Root["company"]["auditInfo"];
//                        foreach (var itemTD in auditInfoVersion)
//                        {
//                            if (itemTD["version"] != null)
//                            {
//                                maxVersion.Add(Convert.ToInt32(itemTD["version"]));
//                            }
//                        }
//                    }

//                    if (maxVersion.Count != 0)
//                        maxAuditVersion = maxVersion.Max() + 1;
//                    else
//                        maxAuditVersion = 0;
//                    ///////////////////////////
//                    AuditInfo auditInfo = new AuditInfo();
//                    if (maxAuditVersion != null)
//                        auditInfo.Version = maxAuditVersion.ToString();
//                    else
//                        auditInfo.Version = "0";
//                    auditInfo.Status = "true";
//                    auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
//                    auditInfo.LastChangeBy = model.Email;
//                    #endregion
//                    #region Update Company

//                    string updatequeryString = string.Empty;

//                    updatequeryString = @"update " + _bucket.Name + " set ";
//                    updatequeryString += " dED ='" + model.DED + "',";
//                    updatequeryString += " chamberNum ='" + model.ChamberNum + "',";
//                    updatequeryString += " legalForm ='" + model.LegalForm + "',";
//                    updatequeryString += " estDate ='" + model.EstDate + "',";
//                    updatequeryString += " email ='" + model.Email + "',";
//                    updatequeryString += " website ='" + model.Website + "',";
//                    updatequeryString += " comType ='" + model.ComType + "',";
//                    updatequeryString += " franshisee ='" + model.Franshisee + "',";

//                    /////// Company Status
//                    if (model.ComStatus != null)
//                    {
//                        updatequeryString += " comStatus.statusID ='PE',"; 
//                        updatequeryString += " comStatus.dateTime ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "',";
//                    }

//                    /////// full Name
//                    if (model.Name != null)
//                    {
//                        updatequeryString += " name.en_US ='" + model.Name.En_US + "',";
//                        updatequeryString += " name.ar_SA ='" + model.Name.Ar_SA + "',";
//                    }
//                    /////// Tel Num
//                    if (model.TelNum != null)
//                    {
//                        updatequeryString += " telNum.countryCodeT ='" + model.TelNum.CountryCodeT + "',";
//                        updatequeryString += " telNum.numT ='" + model.TelNum.NumT + "',";
//                        updatequeryString += " telNum.areaT ='" + model.TelNum.AreaT + "',";
//                    }
//                    ////// Address
//                    if (model.Address != null)
//                    {
//                        updatequeryString += " address.city ='" + model.Address.City + "',";
//                        updatequeryString += " address.state ='" + model.Address.State + "',";
//                        updatequeryString += " address.area ='" + model.Address.Area + "',";
//                        updatequeryString += " address.street ='" + model.Address.Street + "',";
//                        updatequeryString += " address.bldgNum ='" + model.Address.BldgNum + "',";
//                        updatequeryString += " address.flatNum ='" + model.Address.FlatNum + "',";
//                    }
//                    //// comStatus
//                    if (model.ComStatus != null)
//                    {
//                        updatequeryString += " comStatus.statusID ='" + model.ComStatus.StatusID + "',";
//                        updatequeryString += " comStatus.dateTime ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "',";
//                    }
//                    updatequeryString += " email ='" + model.Email + "',";
//                    updatequeryString += " notes ='" + model.Notes + "',";
//                    updatequeryString += " companyPhoto ='" + model.CompanyPhoto + "',";
//                    updatequeryString += " ownerRoles=[],";
//                    updatequeryString += " auditInfo = ARRAY_APPEND( auditInfo, " + Newtonsoft.Json.JsonConvert.SerializeObject(auditInfo).ToString() + ")";
//                    updatequeryString += " where meta().id='company_" + model.CRNum + "'";

//                    var result = _bucket.Query<object>(updatequeryString);

//                    foreach (var item in model.OwnerRoles)
//                    {
//                        var queryUpdateOwnerRoles = @"update " + _bucket.Name + " SET ownerRoles= ARRAY_APPEND(ownerRoles, " + Newtonsoft.Json.JsonConvert.SerializeObject(item).ToString() + " )  where meta().id='company_" + model.CRNum + "'";
//                        _bucket.Query<object>(queryUpdateOwnerRoles);
//                    }

//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.CRNum + " has been updated sucessfully"), new JsonMediaTypeFormatter());

//                    #endregion
//                    //Vehicles = lstVehicles,Roles = lstRoles,Documents = lstDocuments,LoginDetails = model.LoginDetails
//                    //Fines = lstFines,,ScoreCards = LstScoreCard,Incidents = LstIncident
//                }
                
//                else
//                {
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.NotFound, "company does not exist"), new JsonMediaTypeFormatter());
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
//        [Route("aptc_company/{CRNum}")]
//        [HttpDelete]
//        [ResponseType(typeof(MessageModel))]
//        public IActionResult DeleteCompany(string CRNum)
//        {
//            try
//            {
//                string query = @"update " + _bucket.Name + " set isActive=false where cRNum='" + CRNum + "'";
//                var result = _bucket.Query<object>(query).ToList();
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, CRNum+ " has been deleted successfully."), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get all company records for DDL
//        /// </summary>
//        /// <returns>Return company ddl list</returns>
//        [Route("aptc_companyName")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyNameOutPut))]
//        public IActionResult GetAllCompanyName()
//        {
//            try
//            {
//                string query = @"SELECT cRNum,name From " + _bucket.Name + " as companyName where meta().id LIKE 'company_%' and isActive=true";
//                var comapnyNameDocument = _bucket.Query<CompanyNameOutPut>(query).ToList();
//                if (comapnyNameDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, ""), new JsonMediaTypeFormatter());
//                }
//                return Content(HttpStatusCode.OK, comapnyNameDocument);
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

        
//        /// <summary>
//        /// Get Vehicles data by company Id
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Company Details for id=Company_5</returns>
//        [Route("aptc_company_getVehicles/{CRNum}")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyVehicleOutPut))]
//        public IActionResult GetCompanyVehicles(string CRNum)
//        {
//            try
//            {
//                Vehicle_APTC vehicle_APTC = new Vehicle_APTC();
//                List<Vehicle_APTC> lstVehicle_APTC = new List<Vehicle_APTC>();
                
//                string query = @"SELECT vehicles  From " + _bucket.Name + " where meta().id='company_" + CRNum + "' and isActive=true";
//                var getVehiclesDocument = _bucket.Query<CompanyVehicleOutPut>(query).ToList();
                
//                if (getVehiclesDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, getVehiclesDocument);
//                }
//                else
//                {
//                    foreach (var item in getVehiclesDocument)
//                    {
//                        foreach (var veh in item.Vehicles)
//                        {
//                            string strQuery = @"SELECT keyID,docType,engineNum,numSeats,trafficNum,firstRegData,yearManufacture,makeModel,colour,vehType,fuelType,transType,vehValid,disabledFriendly,vehPlate,remarks,ownership,status From " + _bucket.Name + " as Vehicle where meta().id='vehicle_" + veh.VehicleID + "' and isActive=true";
//                            var allVehicleDocument = _bucket.Query<Vehicle_APTCOutPut>(strQuery).ToList();
//                            if (allVehicleDocument.Count != 0)
//                            {
//                                foreach (var vehAPTC in allVehicleDocument)
//                                {
//                                    vehicle_APTC = new Vehicle_APTC();
//                                    vehicle_APTC.KeyID = vehAPTC.KeyID;
//                                    vehicle_APTC.DocType = vehAPTC.DocType;
//                                    vehicle_APTC.EngineNum = vehAPTC.EngineNum;
//                                    vehicle_APTC.NumSeats = vehAPTC.NumSeats;
//                                    vehicle_APTC.TrafficNum = vehAPTC.TrafficNum;
//                                    vehicle_APTC.FirstRegData = vehAPTC.FirstRegData;
//                                    vehicle_APTC.YearManufacture = vehAPTC.YearManufacture;
//                                    vehicle_APTC.Make = vehAPTC.Make;
//                                    vehicle_APTC.Model = vehAPTC.Model;
//                                    vehicle_APTC.Colour = vehAPTC.Colour;
//                                    vehicle_APTC.VehType = vehAPTC.VehType;
//                                    vehicle_APTC.FuelType = vehAPTC.FuelType;
//                                    vehicle_APTC.TransType = vehAPTC.TransType;
//                                    vehicle_APTC.VehValid = vehAPTC.VehValid;
//                                    vehicle_APTC.DisabledFriendly = vehAPTC.DisabledFriendly;
//                                    vehicle_APTC.VehPlate = vehAPTC.VehPlate;
//                                    vehicle_APTC.Remarks = vehAPTC.Remarks;
//                                    vehicle_APTC.Ownership = vehAPTC.Ownership;
//                                }
//                                lstVehicle_APTC.Add(vehicle_APTC);
//                            }
//                        }
//                    }
//                    return Content(HttpStatusCode.OK, lstVehicle_APTC);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message, ""), new JsonMediaTypeFormatter());
//            }
//        }

        
//        /// <summary>
//        /// Get Employees data by company Id
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Company Details for id=Company_5</returns>
//        [Route("aptc_company_getEmployees/{CRNum}")]
//        [HttpGet]
//        [ResponseType(typeof(IndividualOutPut))]
//        public IActionResult GetCompanyEmployees(string CRNum)
//        {
//            try
//            {
//                string query = string.Empty;
//                query = @"SELECT * From " + _bucket.Name + " as cmp where meta().id='company_" + CRNum + "' and isActive=true";
//                var companyDocument = _bucket.Query<object>(query).ToList();
//                ///////////// Validate Company IsExist or Not
//                if (companyDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.OK, companyDocument);
//                }
//                else
//                {
//                    #region Data by noSQL query
//                        string strAllCompanysEmployees = @"Select d.email,d.docType,d.address,d.dob,d.gender,d.profilePhoto,d.isActive,d.keyID,d.language,d.fullName,d.auditInfo,d.maritalStatus,";
//                        strAllCompanysEmployees = strAllCompanysEmployees + "d.notes,d.nationality,d.religion,d.mobNum,d.telNum,ARRAY_COUNT(d.roles) as rolesCount,ARRAY_COUNT(d.vehicles) as vehiclesCount,ARRAY_COUNT(d.documents) as documentsCount,";
//                        strAllCompanysEmployees = strAllCompanysEmployees + "ARRAY_COUNT(d.fines) as finesCount,ARRAY_COUNT(d.scoreCards) as scoreCardsCount,ARRAY_COUNT(d.incidents) as incidentsCount,ARRAY_COUNT(d.driverStatus) as driverStatusCount,";
//                        strAllCompanysEmployees = strAllCompanysEmployees + "d.vehicles,d.fines,d.scoreCards,d.incidents,d.driverStatus,r.['name'] as roleName,l.['name'] as companyName,r.['roleID'] as roleCode,l.['linkID'] as companyCode from APTCCRM AS d";
//                        strAllCompanysEmployees = strAllCompanysEmployees + " UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where  d.docType='individual' and l.['linkID'] IN  ['" + CRNum + "'] and d.isActive=true";

//                        var getAllActiveCompanysActiveEmployeesDocument = _bucket.Query<IndividualOutPut>(strAllCompanysEmployees).ToList();
//                        return Content(HttpStatusCode.OK, getAllActiveCompanysActiveEmployeesDocument);
//                    #endregion
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message, ""), new JsonMediaTypeFormatter());
//            }
//        }

        
//        /// <summary>
//        /// Get Employees count of a company Id
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Employees Count for id=Company_5</returns>
//        [Route("aptc_company_getEmployeesCount/{CRNum}")]
//        [HttpGet]
//        public IActionResult GetCompanyEmployeesCount(string CRNum)
//        {
//            try
//            {
//                string query = string.Empty; 
//                query = @"SELECT * From " + _bucket.Name + " as cmp where meta().id='company_" + CRNum + "' and isActive=true";
//                var companyDocument = _bucket.Query<object>(query).ToList();
//                ///////////// Validate Company IsExist or Not
//                if (companyDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.OK, companyDocument);
//                }
//                else
//                {
//                    string strEmployees_EmiratiIdsCount = string.Empty;
//                    #region Data by noSQL query
//                        strEmployees_EmiratiIdsCount = @"Select count(*) as empCount from APTCCRM AS d";
//                        strEmployees_EmiratiIdsCount = strEmployees_EmiratiIdsCount + " UNNEST d.['roles'] AS r UNNEST r.['link'] AS l where  d.docType='individual' and l.['linkID'] IN  ['" + CRNum + "'] and d.isActive=true";

//                        var getAllActiveCompanysActiveEmployeesCountDocument = _bucket.Query<object>(strEmployees_EmiratiIdsCount).ToList();
//                        return Content(HttpStatusCode.OK, getAllActiveCompanysActiveEmployeesCountDocument);
//                    #endregion
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get Pending Permit data of a company
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Company Details for id=Company_5</returns>
//        [Route("aptc_company_getPendingPermits/{CRNum}")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyVehicleOutPut))]
//        public IActionResult GetCompanyPendingPermits(string CRNum)
//        {
//            try
//            {
//                string indvName = string.Empty;
//                string query = @"SELECT documents  From " + _bucket.Name + " where meta().id='company_" + CRNum + "' and isActive=true";
//                var getPermitsDocument = _bucket.Query<CompanyPermitOutPut>(query).ToList();

//                if (getPermitsDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, getPermitsDocument);
//                }
//                else
//                {
//                    DocOutOutPut permit_APTC = new DocOutOutPut();
//                    List<DocOutOutPut> lstpermit_APTC = new List<DocOutOutPut>();

//                    foreach (var item in getPermitsDocument)
//                    {
//                        foreach (var veh in item.Documents)
//                        {
//                            string strQuery = @"SELECT meta().id as docOutId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                                                dateTime,docType,docRef,docContent,version,lang,docFile,status,docAccepted 
//                                                From " + _bucket.Name + " as docOut where meta().id LIKE 'PERMIT_%' and meta().id='" + veh.DocumentID + "' and status=true and docAccepted!='AP'";
//                            var docOutDocument = _bucket.Query<DocOutOutPut>(strQuery).ToList();

//                            if (docOutDocument.Count != 0)
//                            {
//                                foreach (var perAPTC in docOutDocument)
//                                {
//                                    permit_APTC = new DocOutOutPut();
//                                    permit_APTC.RejReas      = perAPTC.RejReas;
//                                    permit_APTC.ValidTo      = perAPTC.ValidTo;
//                                    permit_APTC.ValidFrom    = perAPTC.ValidFrom;
//                                    permit_APTC.DateTime     = perAPTC.DateTime;
//                                    permit_APTC.DocRef       = perAPTC.DocRef;
//                                    permit_APTC.DocContent   = perAPTC.DocContent;
//                                    permit_APTC.Version      = perAPTC.Version;
//                                    permit_APTC.Lang         = perAPTC.Lang;
//                                    permit_APTC.DocFile      = perAPTC.DocFile;
//                                    permit_APTC.Status       = perAPTC.Status;
//                                    permit_APTC.DocAccepted  = perAPTC.DocAccepted;

//                                    //IndivID Name
//                                    if (perAPTC.IndivID != null)
//                                    {
//                                        var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + perAPTC.IndivID + "'").ToList();

//                                        foreach (var indvItem in objIndivDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"] != null)
//                                                   indvName = ((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"].ToString();
//                                            perAPTC.IndivName = indvName;
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                       permit_APTC = perAPTC;
//                                    }
//                                    //docClass name
//                                    if (perAPTC.DocClass != null)
//                                    {
//                                        var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + perAPTC.DocClass.ToUpper() + "'").ToList();

//                                        foreach (var docClassItem in objDocClassDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"] != null)
//                                                perAPTC.DocClassName = ((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //DocType Name
//                                    if (permit_APTC.DocType != null)
//                                    {
//                                        var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Permit'] AS r where r.Code='" + perAPTC.DocType.ToUpper() + "'").ToList();

//                                        foreach (var docItem in objDocTypeDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"] != null)
//                                                perAPTC.DocTypeName = ((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    // CompID Name
//                                    if (perAPTC.CompID != null)
//                                    {
//                                        var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + perAPTC.CompID + "'").ToList();

//                                        foreach (var comItem in objComDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"] != null)
//                                                perAPTC.CompIDName = ((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //VehID Name
//                                    if (perAPTC.VehID != null)
//                                    {
//                                        var objVehicleDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + perAPTC.VehID + "'").ToList();

//                                        foreach (var vehItem in objVehicleDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"] != null)
//                                                perAPTC.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"].ToString();

//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"] != null)
//                                                perAPTC.VehIDMake = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"].ToString();

//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"] != null)
//                                                perAPTC.VehIDModel = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    ///////////////////////////////////////////////////
//                                }
//                                lstpermit_APTC.Add(permit_APTC);
//                            }
//                        }
//                    }
//                    return Content(HttpStatusCode.OK, lstpermit_APTC);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get Approved Permit data of a company
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Company Details for id=Company_5</returns>
//        [Route("aptc_company_getApprovedPermits/{CRNum}")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyVehicleOutPut))]
//        public IActionResult GetCompanyApprovedPermits(string CRNum)
//        {
//            try
//            {

//                string indvName = string.Empty;
//                string query = @"SELECT documents  From " + _bucket.Name + " where meta().id='company_" + CRNum + "' and isActive=true";
//                var getPermitsDocument = _bucket.Query<CompanyPermitOutPut>(query).ToList();

//                if (getPermitsDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent,getPermitsDocument);
//                }
//                else
//                {
//                    DocOutOutPut permit_APTC = new DocOutOutPut();
//                    List<DocOutOutPut> lstpermit_APTC = new List<DocOutOutPut>();

//                    foreach (var item in getPermitsDocument)
//                    {
//                        foreach (var veh in item.Documents)
//                        {
//                            string strQuery = @"SELECT meta().id as docOutId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                                                dateTime,docType,docRef,docContent,version,lang,docFile,status,docAccepted 
//                                                From " + _bucket.Name + " as docOut where meta().id LIKE 'PERMIT_%' and meta().id='" + veh.DocumentID + "' and status=true and docAccepted='AP'";
//                            var docOutDocument = _bucket.Query<DocOutOutPut>(strQuery).ToList();

//                            if (docOutDocument.Count != 0)
//                            {
//                                foreach (var perAPTC in docOutDocument)
//                                {
//                                    permit_APTC = new DocOutOutPut();
//                                    permit_APTC.RejReas = perAPTC.RejReas;
//                                    permit_APTC.ValidTo = perAPTC.ValidTo;
//                                    permit_APTC.ValidFrom = perAPTC.ValidFrom;
//                                    permit_APTC.DateTime = perAPTC.DateTime;
//                                    permit_APTC.DocRef = perAPTC.DocRef;
//                                    permit_APTC.DocContent = perAPTC.DocContent;
//                                    permit_APTC.Version = perAPTC.Version;
//                                    permit_APTC.Lang = perAPTC.Lang;
//                                    permit_APTC.DocFile = perAPTC.DocFile;
//                                    permit_APTC.Status = perAPTC.Status;
//                                    permit_APTC.DocAccepted = perAPTC.DocAccepted;

//                                    //IndivID Name
//                                    if (perAPTC.IndivID != null)
//                                    {
//                                        var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + perAPTC.IndivID + "'").ToList();

//                                        foreach (var indvItem in objIndivDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"] != null)
//                                                indvName = ((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"].ToString();
//                                            perAPTC.IndivName = indvName;
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //docClass name
//                                    if (perAPTC.DocClass != null)
//                                    {
//                                        var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + perAPTC.DocClass.ToUpper() + "'").ToList();

//                                        foreach (var docClassItem in objDocClassDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"] != null)
//                                                perAPTC.DocClassName = ((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //DocType Name
//                                    if (permit_APTC.DocType != null)
//                                    {
//                                        var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Permit'] AS r where r.Code='" + perAPTC.DocType.ToUpper() + "'").ToList();

//                                        foreach (var docItem in objDocTypeDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"] != null)
//                                                perAPTC.DocTypeName = ((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    // CompID Name
//                                    if (perAPTC.CompID != null)
//                                    {
//                                        var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + perAPTC.CompID + "'").ToList();

//                                        foreach (var comItem in objComDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"] != null)
//                                                perAPTC.CompIDName = ((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //VehID Name
//                                    if (perAPTC.VehID != null)
//                                    {
//                                        var objVehicleDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + perAPTC.VehID + "'").ToList();

//                                        foreach (var vehItem in objVehicleDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"] != null)
//                                                perAPTC.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"].ToString();

//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"] != null)
//                                                perAPTC.VehIDMake = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"].ToString();

//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"] != null)
//                                                perAPTC.VehIDModel = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    ///////////////////////////////////////////////////
//                                }
//                                lstpermit_APTC.Add(permit_APTC);
//                            }
//                        }
//                    }
//                    return Content(HttpStatusCode.OK, lstpermit_APTC);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get Permit data of a company
//        /// </summary>
//        /// <param name="id">NewCompany_5</param>
//        /// <returns>Return Company Details for id=Company_5</returns>
//        [Route("aptc_company_getPermits/{CRNum}")]
//        [HttpGet]
//        [ResponseType(typeof(CompanyVehicleOutPut))]
//        public IActionResult GetCompanysPermits(string CRNum)
//        {
//            try
//            {
//                string indvName = string.Empty;
//                string query = @"SELECT documents  From " + _bucket.Name + " where meta().id='company_" + CRNum + "' and isActive=true";
//                var getPermitsDocument = _bucket.Query<CompanyPermitOutPut>(query).ToList();

//                if (getPermitsDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, getPermitsDocument);
//                }
//                else
//                {
//                    DocOutOutPut permit_APTC = new DocOutOutPut();
//                    List<DocOutOutPut> lstpermit_APTC = new List<DocOutOutPut>();

//                    foreach (var item in getPermitsDocument)
//                    {
//                        foreach (var veh in item.Documents)
//                        {
//                            string strQuery = @"SELECT meta().id as docOutId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                                                dateTime,docType,docRef,docContent,version,lang,docFile,status,docAccepted 
//                                                From " + _bucket.Name + " as docOut where meta().id LIKE 'PERMIT_%' and meta().id='" + veh.DocumentID + "' and status=true";
//                            var docOutDocument = _bucket.Query<DocOutOutPut>(strQuery).ToList();

//                            if (docOutDocument.Count != 0)
//                            {
//                                foreach (var perAPTC in docOutDocument)
//                                {
//                                    permit_APTC = new DocOutOutPut();
//                                    permit_APTC.RejReas = perAPTC.RejReas;
//                                    permit_APTC.ValidTo = perAPTC.ValidTo;
//                                    permit_APTC.ValidFrom = perAPTC.ValidFrom;
//                                    permit_APTC.DateTime = perAPTC.DateTime;
//                                    permit_APTC.DocRef = perAPTC.DocRef;
//                                    permit_APTC.DocContent = perAPTC.DocContent;
//                                    permit_APTC.Version = perAPTC.Version;
//                                    permit_APTC.Lang = perAPTC.Lang;
//                                    permit_APTC.DocFile = perAPTC.DocFile;
//                                    permit_APTC.Status = perAPTC.Status;
//                                    permit_APTC.DocAccepted = perAPTC.DocAccepted;

//                                    //IndivID Name
//                                    if (perAPTC.IndivID != null)
//                                    {
//                                        var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + perAPTC.IndivID + "'").ToList();

//                                        foreach (var indvItem in objIndivDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"] != null)
//                                                indvName = ((Newtonsoft.Json.Linq.JToken)indvItem).Root["inDiv"]["fullName"]["en_US"].ToString();
//                                            perAPTC.IndivName = indvName;
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //docClass name
//                                    if (perAPTC.DocClass != null)
//                                    {
//                                        var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + perAPTC.DocClass.ToUpper() + "'").ToList();

//                                        foreach (var docClassItem in objDocClassDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"] != null)
//                                                perAPTC.DocClassName = ((Newtonsoft.Json.Linq.JToken)docClassItem).Root["Value"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //DocType Name
//                                    if (permit_APTC.DocType != null)
//                                    {
//                                        var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['Permit'] AS r where r.Code='" + perAPTC.DocType.ToUpper() + "'").ToList();

//                                        foreach (var docItem in objDocTypeDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"] != null)
//                                                perAPTC.DocTypeName = ((Newtonsoft.Json.Linq.JToken)docItem).Root["Value"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    // CompID Name
//                                    if (perAPTC.CompID != null)
//                                    {
//                                        var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + perAPTC.CompID + "'").ToList();

//                                        foreach (var comItem in objComDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"] != null)
//                                                perAPTC.CompIDName = ((Newtonsoft.Json.Linq.JToken)comItem).Root["cmp"]["name"]["en_US"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    //VehID Name
//                                    if (perAPTC.VehID != null)
//                                    {
//                                        var objVehicleDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + perAPTC.VehID + "'").ToList();

//                                        foreach (var vehItem in objVehicleDetails)
//                                        {
//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"] != null)
//                                                perAPTC.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["trafficNum"].ToString();

//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"] != null)
//                                                perAPTC.VehIDMake = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["make"].ToString();

//                                            if (((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"] != null)
//                                                perAPTC.VehIDModel = ((Newtonsoft.Json.Linq.JToken)vehItem).Root["veh"]["model"].ToString();
//                                        }
//                                        permit_APTC = perAPTC;
//                                    }
//                                    else
//                                    {
//                                        permit_APTC = perAPTC;
//                                    }
//                                    ///////////////////////////////////////////////////
//                                }
//                                lstpermit_APTC.Add(permit_APTC);
//                            }
//                        }
//                    }
//                    return Content(HttpStatusCode.OK, lstpermit_APTC);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is put method for Approved company by CRNum
//        /// </summary>
//        /// <param name="model">company</param>
//        /// <returns>success or fail message according to action</returns>
//        [Route("aptc_Approved_company/{CRNum}")]
//        [HttpPut]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> ApprovedCompany(string CRNum)
//        {
//            try
//            {
//                string query = @"update " + _bucket.Name + " set comStatus.statusID='AP',comStatus.dateTime ='" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()) + "' where meta().id like 'company_%' and cRNum='" + CRNum + "' and isActive=true";
//                var result = _bucket.Query<object>(query).ToList();
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, CRNum + " has been approved successfully."), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.Message), new JsonMediaTypeFormatter());
//            }
//        }
//    }
//}
