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

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Doc In Controller 
//    /// </summary>
//    [RoutePrefix("api")]
//    public class DocInController : ApiController
//    {
//        #region PrviavteFields
//        private readonly Couchbase.Core.IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        #endregion

//        /// <summary>
//        /// Get All Active Document
//        /// </summary>
//        /// <returns>Return Doc In Details for id=DOCIN_5</returns>
//        [Route("aptc_Active_docIn")]
//        [HttpGet]
//        [ResponseType(typeof(DocInOutPut))]
//        public IActionResult GetAll_Active_DocIn()
//        {
//            try
//            {
//                string strQuery = @"SELECT meta().id as docInId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                dateTime,docType,docRef,docContent,version,lang,docFile,status,id,issueDate,expiryDate,place,categories From " + _bucket.Name + " as docIn where meta().id like 'DOCIN_%' and status=true";

//                var docInDocument = _bucket.Query<DocInOutPut>(strQuery).ToList();

//                if (docInDocument.Count == 0)
//                {
//                   return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "182-please enter valid document id."), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, docInDocument);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }


//        /// <summary>
//        /// Get All InActive Document
//        /// </summary>
//        /// <returns>Return Doc In Details for id=DOCIN_5</returns>
//        [Route("aptc_InActive_docIn")]
//        [HttpGet]
//        [ResponseType(typeof(DocInOutPut))]
//        public IActionResult GetAll_InActive_DocIn()
//        {
//            try
//            {
//                string strQuery = @"SELECT meta().id as docInId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                dateTime,docType,docRef,docContent,version,lang,docFile,status,id,issueDate,expiryDate,place,categories From " + _bucket.Name + " as docIn where meta().id like 'DOCIN_%' and status=false";

//                var docInDocument = _bucket.Query<DocInOutPut>(strQuery).ToList();

//                if (docInDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "182-please enter valid document id."), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, docInDocument);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Post Doc In
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_docIn")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> Register(List<DocIn> lstDoc)
//        {
//            try
//            {
//                // DocRef,docFile,DocImage,DocType,Lang
//                foreach (var model in lstDoc)
//                {
//                    if (!ModelState.IsValid)
//                    {
//                        var modelErrors = new List<string>();
//                        foreach (var modelState in ModelState.Values)
//                        {
//                            foreach (var modelError in modelState.Errors)
//                            {
//                                modelErrors.Add(modelError.ErrorMessage);
//                            }
//                        }
//                        return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
//                    }

//                    bool status = false;
//                    string ValidFrom = string.Empty;
//                    string ValidTo = string.Empty;
//                    string DocClass = string.Empty;
//                    var maxDocVersion = 0;
//                    if (model.DocType.ToString().ToLower() == "profilephoto")
//                    {
//                        status = true;
//                        string updateQuery = @"SELECT * From " + _bucket.Name + " as Users where meta().id ='" + model.IndivID + "'";
//                        var userDocument = _bucket.Query<object>(updateQuery).ToList();
//                        if (userDocument.Count > 0)
//                        {
//                            List<int> maxVersion = new List<int>();

//                            if (((Newtonsoft.Json.Linq.JToken)userDocument[0]).Root["Users"]["documents"] != null)
//                            {
//                                var auditInfoVersion = ((Newtonsoft.Json.Linq.JToken)userDocument[0]).Root["Users"]["documents"];
//                                foreach (var itemTD in auditInfoVersion)
//                                {
//                                    if (itemTD["version"] != null)
//                                    {
//                                        maxVersion.Add(Convert.ToInt32(itemTD["version"]));
//                                    }
//                                }
//                            }
//                            if (maxVersion.Count != 0)
//                                maxDocVersion = 1 + maxVersion.Max();
//                            else
//                                maxDocVersion = 1;
//                        }
//                        if (maxDocVersion == 0)
//                        {
//                            maxDocVersion = 1;
//                        }

//                        DocClass = model.DocClass;
//                        ValidFrom = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
//                        ValidTo = DataConversion.ConvertYMDHMS(DateTime.Now.AddDays(Convert.ToInt16(ConfigurationManager.AppSettings.Get("ValidToProfilePhotoDays"))).ToString());
//                    }
//                    else
//                    {
//                        status = false;
//                        if (string.IsNullOrEmpty(model.ValidFrom))
//                        {
//                            //return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "190-document valid from is required"), new JsonMediaTypeFormatter());
//                        }
//                        if (string.IsNullOrEmpty(model.ValidTo))
//                        {
//                            //return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "191-document valid to is required"), new JsonMediaTypeFormatter());
//                        }
//                        ValidFrom = model.ValidFrom;
//                        ValidTo = model.ValidTo;
//                    }
//                    DocContent docContent = new DocContent();
//                    if (model.DocContent != null)
//                    {
//                        docContent.Duration = model.DocContent.Duration;
//                        docContent.Fees = model.DocContent.Fees;
//                    }
//                    List<DocFile> lstDocFile = new List<DocFile>();
//                    if (model.DocFile != null)
//                    {
//                        foreach (var df in model.DocFile)
//                        {
//                            DocFile docFile = new DocFile();
//                            docFile.DocFormat = df.DocFormat;
//                            docFile.DocImage = df.DocImage;
//                            lstDocFile.Add(docFile);
//                        }
//                    }
//                    var docID = "DOCIN_" + GenerateRandamNumber();
//                    var docInDocument = new Document<DocIn>()
//                    {
//                        Id = docID,
//                        Content = new DocIn
//                        {
//                            DocType = model.DocType.ToLower(),
//                            Version = maxDocVersion,
//                            DocRef = model.DocRef,
//                            Lang = model.Lang,
//                            Status = false,
//                            DateTime = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                            DocClass = model.DocClass,
//                            ValidTo = ValidTo,
//                            ValidFrom = ValidFrom,
//                            RejReas = "",
//                            IndivID = model.IndivID,
//                            VehID = model.VehID,
//                            CompID = model.CompID,
//                            DocContent = docContent,
//                            DocFile = lstDocFile,
//                            Id=model.Id,
//                            IssueDate = model.IssueDate,
//                            ExpiryDate = model.ExpiryDate,
//                            Place = model.Place,
//                            Categories = model.Categories
//                        },
//                    };
//                    var result = await _bucket.InsertAsync(docInDocument);
//                    //if (!result.Success)
//                    //{
//                    //    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
//                    //}
//                    /////////////////////////////////// add document in IndivID
//                    if (model.IndivID.Trim() != string.Empty)
//                    {
//                        string query1 = @"SELECT * From " + _bucket.Name + " as Individual where meta().id= 'individual_" + model.IndivID.Trim() + "'";
//                        var individualDocument = _bucket.Query<object>(query1).ToList();

//                        if (individualDocument.Count > 0)
//                        {
                            
//                            Documents addnewDocument = new Documents();
//                            addnewDocument.DocumentID = docID;
//                            // add document code
//                            string query = @"UPDATE " + _bucket.Name + " SET documents = ARRAY_APPEND(documents, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewDocument).ToString() + ") where meta().id='individual_" + model.IndivID.Trim() + "'";
//                            var resultIndividual = _bucket.Query<object>(query);
//                        }
//                    }
//                    /////////////////////////////////// add document in CompID
//                    if (model.CompID!=null)
//                    {
//                        if (model.CompID.Trim() != string.Empty)
//                        {
//                            var companyDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Company where meta().id= 'company_" + model.CompID.Trim() + "'").ToList();

//                            if (companyDocument.Count > 0)
//                            {
//                                Documents addnewDocument = new Documents();
//                                addnewDocument.DocumentID = docID;
//                                // add document code
//                                string query = @"UPDATE " + _bucket.Name + " SET documents = ARRAY_APPEND(documents, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewDocument).ToString() + ") where meta().id='company_" + model.CompID.Trim() + "'";
//                                var resultIndividual = _bucket.Query<object>(query);
//                            }
//                        }
//                    }
//                }
//                /////////////////////////////////
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), "Documents uploaded sucessfully"));
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is delete method for soft delete as isActive=false
//        /// </summary>
//        /// <param name="id">dicIn_9087654321</param>
//        /// <returns>Return Doc In Details for id=DOCIN_5</returns>
//        [Route("aptc_docIn/{id}")]
//        [HttpDelete]
//        public IActionResult DeleteDocIn(string id)
//        {
//            try
//            {
//                _bucket.Query<object>(@"Update " + _bucket.Name + " set status=false where meta().id='" + id + "' and status=true").ToList();
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, id+ " has been deleted successfully."), new JsonMediaTypeFormatter());

//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is update method for document status=true or (status=false with reason)
//        /// </summary>
//        /// <param name="id">dicIn_9087654321</param>
//        /// <returns>Return Doc In Details for id=DOCIN_5</returns>
//        [Route("aptc_Approved_DocIn/{id}")]
//        [HttpPut]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> Approved_DocIn(string id,DocIn model)
//        {
//            try
//            {
//                string query = @"select * from " + _bucket.Name + " where meta().id='" + id + "'";
//                var docInData = _bucket.Query<IndividualOutPut>(query).ToList();
//                if (docInData.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, id), new JsonMediaTypeFormatter());
//                }

//                /////////////////////////////////////////////////// Update Document Status Code
//                if (model.Status)
//                {
//                    _bucket.Query<object>(@"Update " + _bucket.Name + " set status=true where meta().id='" + id + "'").ToList();
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, id + " status has been updated successfully."), new JsonMediaTypeFormatter());
//                }
//                if (string.IsNullOrEmpty(model.RejReas))
//                {
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "193-Rejection reason is required."), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    _bucket.Query<object>(@"Update " + _bucket.Name + " set rejReas='"+ model.RejReas +"',status=false where meta().id='" + id + "'").ToList();
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, id + " status has been updated successfully."), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// this is put method for update docIn
//        /// </summary>
//        /// <param name="model">DOCIN</param>
//        /// <returns>success or fail message according to action</returns>
//        [Route("aptc_docIn/{id}")]
//        [HttpPut]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> Update_DOCIN(string Id,DocIn model)
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
//                            modelErrors.Add(modelError.ErrorMessage == "" ? modelError.Exception.Message : modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
//                }
//                // Validate company is exist or not
//                var docInDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as docIn where meta().id='" + Id + "'").ToList();

//                if (docInDocument.Count > 0)
//                {
//                    // edit docIn
//                    #region Updare docIn
//                    string updatequeryString = string.Empty;

//                    updatequeryString = @"update " + _bucket.Name + " set ";
//                    updatequeryString += " docType ='" + model.DocType + "',";
//                    updatequeryString += " docRef ='" + model.DocRef + "',";
//                    updatequeryString += " lang ='" + model.Lang + "',";
//                    updatequeryString += " version ='" + model.Version + "',";
//                    updatequeryString += " status ='" + model.Status + "',";
//                    updatequeryString += " dateTime ='" + model.DateTime + "',";
//                    updatequeryString += " validFrom ='" + model.ValidFrom + "',";
//                    updatequeryString += " validTo ='" + model.ValidTo + "',";
//                    updatequeryString += " rejReas ='" + model.RejReas + "',";
//                    updatequeryString += " indivID ='" + model.IndivID + "',";
//                    updatequeryString += " vehID ='" + model.VehID + "',";
//                    updatequeryString += " compID ='" + model.CompID + "',";
//                    updatequeryString += " docClass ='" + model.DocClass + "',";
//                    /////////////////// New Fields
//                    updatequeryString += " id ='" + model.Id + "',";
//                    updatequeryString += " issueDate ='" + model.IssueDate + "',";
//                    updatequeryString += " expiryDate ='" + model.ExpiryDate + "',";
//                    updatequeryString += " place ='" + model.Place + "',";
//                    updatequeryString += " categories ='" + model.Categories + "',";

//                    updatequeryString += "docFile =[],";

//                    /////// Doc Content
//                    if (model.DocContent != null)
//                    {
//                        updatequeryString += " docContent.fees ='" + model.DocContent.Fees + "',";
//                        updatequeryString += " docContent.duration ='" + model.DocContent.Duration + "'";
//                    }

//                    //updatequeryString += " auditInfo = ARRAY_APPEND( auditInfo, " + Newtonsoft.Json.JsonConvert.SerializeObject(auditInfo).ToString() + ")";
//                    updatequeryString += " where meta().id='" + Id + "'";

//                    var result = _bucket.Query<object>(updatequeryString);
                    


//                    foreach (var item in model.DocFile)
//                    {
//                        var queryUpdatedocFile = @"update " + _bucket.Name + " SET docFile= ARRAY_APPEND(docFile, " + Newtonsoft.Json.JsonConvert.SerializeObject(item).ToString() + " ) where meta().id='" + Id + "'";
//                        _bucket.Query<object>(queryUpdatedocFile);
//                    }

//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), Id + " has been updated sucessfully"), new JsonMediaTypeFormatter());
//                    #endregion
//                    //Vehicles = lstVehicles,Roles = lstRoles,Documents = lstDocuments,LoginDetails = model.LoginDetails
//                    //Fines = lstFines,,ScoreCards = LstScoreCard,Incidents = LstIncident
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.NotFound, "document does not exist"), new JsonMediaTypeFormatter());
//                }

//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get data by Id with Master Data
//        /// </summary>
//        /// <param name="id">dicIn_9087654321</param>
//        /// <returns>Return Doc In Details for id=DOCIN_5</returns>
//        [Route("aptc_docIn/{id}")]
//        [HttpGet]
//        [ResponseType(typeof(DocInOutPut))]
//        public IActionResult GetDocIn_WithMaster(string id)
//        {
//            string indvName = string.Empty;
//            try
//            {
//                string strQuery = @"SELECT meta().id as docInId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                dateTime,docType,docRef,docContent,version,lang,docFile,status,id,issueDate,expiryDate,place,categories 
//                From " + _bucket.Name + " as docIn where meta().id='" + id + "'";
//                var docInDocument = _bucket.Query<DocInOutPut>(strQuery).ToList();
//                if (docInDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "182-please enter valid document id."), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    DocInOutPut docInOutPut = new DocInOutPut();
//                    List<DocInOutPut> stDoc = new List<DocInOutPut>();
//                    foreach (var item1 in docInDocument)
//                    {
//                        docInOutPut = new DocInOutPut();
//                        //IndivID Name
//                        if (item1.IndivID != null)
//                        {
//                            var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + item1.IndivID + "'").ToList();

//                            foreach (var item in objIndivDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["inDiv"]["fullName"]["en_US"] != null)
//                                    indvName = ((Newtonsoft.Json.Linq.JToken)item).Root["inDiv"]["fullName"]["en_US"].ToString();
//                                item1.IndivName = indvName;
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        //docClass name
//                        if (item1.DocClass != null)
//                        {
//                            var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + item1.DocClass.ToUpper() + "'").ToList();

//                            foreach (var item in objDocClassDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["Value"] != null)
//                                    item1.DocClassName = ((Newtonsoft.Json.Linq.JToken)item).Root["Value"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        //DocType Name
//                        if (item1.DocType != null)
//                        {
//                            var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocType'] AS r where r.Code='" + item1.DocType.ToUpper() + "'").ToList();

//                            foreach (var item in objDocTypeDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["Value"] != null)
//                                    item1.DocTypeName = ((Newtonsoft.Json.Linq.JToken)item).Root["Value"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        // CompID Name
//                        if (item1.CompID != null)
//                        {
//                            var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + item1.CompID + "'").ToList();

//                            foreach (var item in objComDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["cmp"]["name"]["en_US"] != null)
//                                    item1.CompIDName = ((Newtonsoft.Json.Linq.JToken)item).Root["cmp"]["name"]["en_US"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        //VehID Name
//                        if (item1.VehID != null)
//                        {
//                            var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + item1.VehID + "'").ToList();

//                            foreach (var item in objIndivDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["trafficNum"] != null)
//                                    item1.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["trafficNum"].ToString();

//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["make"] != null)
//                                    item1.VehIDMake = ((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["make"].ToString();

//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["model"] != null)
//                                    item1.VehIDModel = ((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["model"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
                       
//                        stDoc.Add(docInOutPut);
//                    }
//                            return Content(HttpStatusCode.OK, stDoc);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get ALL data with Master Data
//        /// </summary>
//        /// <param name="id"></param>
//        /// <returns>Return Doc In Details for id=DOCIN_5</returns>
//        [Route("aptc_docIn")]
//        [HttpGet]
//        [ResponseType(typeof(DocInOutPut))]
//        public IActionResult GetAllDocIn_WithMaster()
//        {
//            string indvName = string.Empty;
//            try
//            {
//                string strQuery = @"SELECT meta().id as docInId,docClass,compID,vehID,indivID,rejReas,validTo,validFrom,
//                dateTime,docType,docRef,docContent,version,lang,docFile,status,id,issueDate,expiryDate,place,categories 
//                From " + _bucket.Name + " as docIn where meta().id like 'DOCIN_%' and status=true";
//                var docInDocument = _bucket.Query<DocInOutPut>(strQuery).ToList();
//                if (docInDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, "182-please enter valid document id."), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    DocInOutPut docInOutPut = new DocInOutPut();
//                    List<DocInOutPut> stDoc = new List<DocInOutPut>();
//                    foreach (var item1 in docInDocument)
//                    {
//                        docInOutPut = new DocInOutPut();
//                        //IndivID Name
//                        if (item1.IndivID != null)
//                        {
//                            var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as inDiv where meta().id= 'individual_" + item1.IndivID + "'").ToList();

//                            foreach (var item in objIndivDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["inDiv"]["fullName"]["en_US"] != null)
//                                    indvName = ((Newtonsoft.Json.Linq.JToken)item).Root["inDiv"]["fullName"]["en_US"].ToString();
//                                item1.IndivName = indvName;
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        //docClass name
//                        if (item1.DocClass != null)
//                        {
//                            var objDocClassDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocClass'] AS r where r.Code='" + item1.DocClass.ToUpper() + "'").ToList();

//                            foreach (var item in objDocClassDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["Value"] != null)
//                                    item1.DocClassName = ((Newtonsoft.Json.Linq.JToken)item).Root["Value"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        //DocType Name
//                        if (item1.DocType != null)
//                        {
//                            var objDocTypeDetails = _bucket.Query<object>(@"SELECT r.* FROM APTCREF AS d USE KEYS[""REF_EN_US""] UNNEST d.['DocType'] AS r where r.Code='" + item1.DocType.ToUpper() + "'").ToList();

//                            foreach (var item in objDocTypeDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["Value"] != null)
//                                    item1.DocTypeName = ((Newtonsoft.Json.Linq.JToken)item).Root["Value"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        // CompID Name
//                        if (item1.CompID != null)
//                        {
//                            var objComDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as cmp where meta().id= 'company_" + item1.CompID + "'").ToList();

//                            foreach (var item in objComDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["cmp"]["name"]["en_US"] != null)
//                                    item1.CompIDName = ((Newtonsoft.Json.Linq.JToken)item).Root["cmp"]["name"]["en_US"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }
//                        //VehID Name
//                        if (item1.VehID != null)
//                        {
//                            var objIndivDetails = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as veh where meta().id= 'vehicle_" + item1.VehID + "'").ToList();

//                            foreach (var item in objIndivDetails)
//                            {
//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["trafficNum"] != null)
//                                    item1.VehIDTrafficNum = ((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["trafficNum"].ToString();

//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["make"] != null)
//                                    item1.VehIDMake = ((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["make"].ToString();

//                                if (((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["model"] != null)
//                                    item1.VehIDModel = ((Newtonsoft.Json.Linq.JToken)item).Root["veh"]["model"].ToString();
//                            }
//                            docInOutPut = item1;
//                        }
//                        else
//                        {
//                            docInOutPut = item1;
//                        }

//                        stDoc.Add(docInOutPut);
//                    }
//                    return Content(HttpStatusCode.OK, stDoc);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        public string GenerateRandamNumber()
//        {
//            int _min = 100000000;
//            int _max = 999999999;
//            Random _rdm = new Random();
//            return (_rdm.Next(_min, _max)).ToString();
//        }
//    }
//}
