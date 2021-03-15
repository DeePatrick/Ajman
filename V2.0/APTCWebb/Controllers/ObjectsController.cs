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
//    /// Objects Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    public class ObjectsController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        private readonly IBucket _bucketRef = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
//        #endregion
//        string resultPostNotification = string.Empty;
//        SendNotification sn = new SendNotification();

//        ////////////////// Add Individual objects APIs

//        /// <summary>
//        /// Individual Add Role
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_individual_addRole/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddRole([FromUri]string id, Roles model)
//        {
//            try
//            {
//                bool isThisRoleExist = false;

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

//                Roles addNewRole = new Roles();
//                addNewRole.RoleID = model.RoleID;
//                addNewRole.Link = model.Link;

//                /////////////////// Validate Code for Role already exist or not.
//                var roleDoc = _bucket.Query<object>(@"SELECT roles From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();
//                foreach (var item1 in roleDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["roles"] != null)
//                    {
//                        //roles-roleID
//                        var roleIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["roles"];

//                        foreach (var itemTD in roleIsExist)
//                        {
//                            if (itemTD["roleID"].ToString() == model.RoleID)
//                            {
//                                isThisRoleExist = true;
//                            }
//                        }
//                    }
//                }

//                if (isThisRoleExist == true)
//                {
//                    // role already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.RoleID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add role code
//                    string query = @"UPDATE " + _bucket.Name + " SET roles = ARRAY_APPEND(roles, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewRole).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.RoleID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Individual Add Fine
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns>Post</returns>
//        [Route("aptc_individual_addFine/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddFine([FromUri]string id, Fines model)
//        {
//            try
//            {
//                bool isThisFineExist = false;

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

//                Fines addNewFine = new Fines();
//                addNewFine.FineID = model.FineID;
//                addNewFine.Amount = model.Amount;
//                addNewFine.Status = model.Status;
//                addNewFine.Remark = model.Remark;
//                addNewFine.DateTime = model.DateTime;

//                /////////////////// Validate Code for Fine already exist or not.
//                var fineDoc = _bucket.Query<object>(@"SELECT fines From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var item1 in fineDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["fines"] != null)
//                    {
//                        //fines-FineID
//                        var finesIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["fines"];

//                        foreach (var itemTD in finesIsExist)
//                        {
//                            if (itemTD["fineID"].ToString() == model.FineID)
//                            {
//                                isThisFineExist = true;
//                            }
//                        }
//                    }
//                }
//                ///////////////////////////////////
//                if (isThisFineExist == true)
//                {
//                    // fine already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.FineID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add fine code
//                    string query = @"UPDATE " + _bucket.Name + " SET fines = ARRAY_APPEND(fines, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewFine).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.FineID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Individual Add Document
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns>Post</returns>
//        [Route("aptc_individual_addDocument/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddDocument([FromUri]string id, Documents model)
//        {
//            try
//            {

//                bool isThisDocumentExist = false;

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

//                Documents addnewDocument = new Documents();
//                addnewDocument.DocumentID = model.DocumentID;
//                addnewDocument.Type = model.Type;
//                addnewDocument.Version = model.Version;
//                addnewDocument.ExpDate = model.ExpDate;
//                addnewDocument.DocStatus = model.DocStatus;

//                //addnewDocument.DocumentID     = model.DocumentID; // documentType 
//                //addnewDocument.DocumentValue  = model.DocumentValue;//Images base64 string
//                //addnewDocument.Version        = model.Version;// versioning
//                //addnewDocument.Number         = model.Number;//Documents Number
//                //addnewDocument.ExpiryDate     = model.ExpiryDate;//Expriy date
//                //addnewDocument.Status         = model.Status; //DocStatus
//                //addnewDocument.HotelPickup    = model.HotelPickup; // permission type for lincece only

//                /////////////////// Validate Code for Fine already exist or not.

//                var documentDoc = _bucket.Query<object>(@"SELECT documents From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var item1 in documentDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["documents"] != null)
//                    {
//                        //documents-DocumentType
//                        var documentsIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["documents"];

//                        foreach (var itemTD in documentsIsExist)
//                        {
//                            if (itemTD["documentID"].ToString() == model.DocumentID)
//                            {
//                                isThisDocumentExist = true;
//                            }
//                        }
//                    }
//                }

//                ///////////////////////////////////
//                if (isThisDocumentExist == true)
//                {
//                    // document already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.DocumentID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add document code
//                    string query = @"UPDATE " + _bucket.Name + " SET documents = ARRAY_APPEND(documents, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewDocument).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.DocumentID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Individual Add Vehicle
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns>Post</returns>
//        [Route("aptc_individual_addVehicle/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddVehicle([FromUri]string id, Vehicles model)
//        {
//            try
//            {
//                bool isThisVehicleExist = false;

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

//                Vehicles addNewVehicle = new Vehicles();
//                addNewVehicle.VehicleID = model.VehicleID;
//                addNewVehicle.Make = model.Make;
//                addNewVehicle.ModelYear = model.ModelYear;
//                addNewVehicle.VehType = model.VehType;
//                addNewVehicle.Status = model.Status;

//                /////////////////// Validate Code for vehicle already exist or not.

//                var vehicleDoc = _bucket.Query<object>(@"SELECT vehicles From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var itemRoot in vehicleDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)itemRoot).Root["vehicles"] != null)
//                    {
//                        //documents-DocumentType
//                        var documentsIsExist = ((Newtonsoft.Json.Linq.JToken)itemRoot).Root["vehicles"];

//                        foreach (var item in documentsIsExist)
//                        {
//                            if (item["vehicleID"].ToString() == model.VehicleID)
//                            {
//                                isThisVehicleExist = true;
//                            }
//                        }
//                    }
//                }

//                ///////////////////////////////////
//                if (isThisVehicleExist == true)
//                {
//                    // role already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.VehicleID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add vehicle code
//                    string query = @"UPDATE " + _bucket.Name + " SET vehicles = ARRAY_APPEND(vehicles, " + Newtonsoft.Json.JsonConvert.SerializeObject(model).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.VehicleID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Individual Add ScoreCard
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns>Post</returns>
//        [Route("aptc_individual_addScoreCard/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddScoreCard([FromUri]string id, ScoreCards model)
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

//                ScoreCards addNewScoreCard = new ScoreCards();
//                addNewScoreCard.Date = model.Date;
//                addNewScoreCard.Braking = model.Braking;
//                addNewScoreCard.Accel = model.Accel;
//                addNewScoreCard.Turning = model.Turning;
//                addNewScoreCard.Idling = model.Idling;
//                addNewScoreCard.TenKmPerHrOver = model.TenKmPerHrOver;
//                addNewScoreCard.TwentyKmPerHrOver = model.TwentyKmPerHrOver;
//                addNewScoreCard.ThirtyKmPerHrOver = model.ThirtyKmPerHrOver;
//                addNewScoreCard.PointsDeducted = model.PointsDeducted;
//                addNewScoreCard.Points = model.Points;
//                addNewScoreCard.Percentage = model.Percentage;

//                // add scoreCard code
//                string query = @"UPDATE " + _bucket.Name + " SET scoreCards = ARRAY_APPEND(scoreCards, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewScoreCard).ToString() + ") where meta().id='" + id + "'";
//                var result = _bucket.Query<object>(query);
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), "Score card has been added sucessfully"), new JsonMediaTypeFormatter());

//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Individual Add Incident
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns>Post</returns>
//        [Route("aptc_individual_addIncident/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddIncident([FromUri]string id, Incidents model)
//        {
//            try
//            {
//                bool isThisIncidentExist = false;

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

//                Incidents addNewIncident = new Incidents();
//                addNewIncident.IncidentID = model.IncidentID;
//                addNewIncident.DateTime = model.DateTime;
//                addNewIncident.Rank = model.Rank;
//                addNewIncident.Status = model.Status;
//                addNewIncident.Remarks = model.Remarks;

//                /////////////////// Validate Code for incident already exist or not.

//                var incidentDoc = _bucket.Query<object>(@"SELECT incidents From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var item1 in incidentDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["incidents"] != null)
//                    {
//                        //documents-DocumentType
//                        var documentsIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["incidents"];

//                        foreach (var itemTD in documentsIsExist)
//                        {
//                            if (itemTD["incidentID"].ToString() == model.IncidentID)
//                            {
//                                isThisIncidentExist = true;
//                            }
//                        }
//                    }
//                }

//                ///////////////////////////////////
//                if (isThisIncidentExist == true)
//                {
//                    // role already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.IncidentID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add vehicle code
//                    string query = @"UPDATE " + _bucket.Name + " SET incidents = ARRAY_APPEND(incidents, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewIncident).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.IncidentID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Individual Add Driver Status
//        /// </summary>
//        /// <param name="id">individual_784123412345671</param>
//        /// <param name="model"></param>
//        /// <returns>Post</returns>
//        [Route("aptc_individual_addDriverStatus/{id}")]
//        [HttpPost]
//        public IActionResult IndividualAddDriverStatus([FromUri]string id, DriverStatus model)
//        {
//            try
//            {
//                bool isThisIncidentExist = false;

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

//                DriverStatus addNewDriverStatus = new DriverStatus();
//                addNewDriverStatus.DriverID = model.DriverID;
//                addNewDriverStatus.DriverState = model.DriverState;
//                addNewDriverStatus.Date = model.Date;
//                addNewDriverStatus.Time = model.Time;
//                addNewDriverStatus.VehicleID = model.VehicleID;


//                /////////////////// Validate Code for incident already exist or not.

//                var incidentDoc = _bucket.Query<object>(@"SELECT incidents From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                // add driver status
//                string query = @"UPDATE " + _bucket.Name + " SET driverStatus = ARRAY_APPEND(driverStatus, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewDriverStatus).ToString() + ") where meta().id='" + id + "'";
//                var result = _bucket.Query<object>(query);
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.DriverID + "driver status has been added sucessfully"), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        ////////////////// Add Company objects APIs

//        /// <summary>
//        /// Company Add NumEmployee
//        /// </summary>
//        /// <param name="id">company_cRNumber</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company_addNumEmployee/{id}")]
//        [HttpPost]
//        public IActionResult CompanyAddNumEmployee([FromUri]string id, NumEmployees model)
//        {
//            try
//            {
//                bool isThisNumEmployeeExist = false;

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

//                NumEmployees addNewNumEmployee = new NumEmployees();
//                addNewNumEmployee.Date = model.Date;
//                addNewNumEmployee.Employees = model.Employees;

//                // add NumEmployee code
//                string query = @"UPDATE " + _bucket.Name + " SET numEmployees = ARRAY_APPEND(numEmployees, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewNumEmployee).ToString() + ") where meta().id='" + id + "'";
//                var result = _bucket.Query<object>(query);
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.Employees + " has been added sucessfully"), new JsonMediaTypeFormatter());
                
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Company Add Activitie
//        /// </summary>
//        /// <param name="id">company_cRNumber</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company_addActivitie/{id}")]
//        [HttpPost]
//        public IActionResult CompanyAddActivitie([FromUri]string id, Activities model)
//        {
//            try
//            {
//                Activities addNewActivitie = new Activities();
//                addNewActivitie.ActivityID = model.ActivityID;

//                // add Activitie code
//                string query = @"UPDATE " + _bucket.Name + " SET activities = ARRAY_APPEND(activities, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewActivitie).ToString() + ") where meta().id='" + id + "'";
//                var result = _bucket.Query<object>(query);
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.ActivityID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Company Add Role
//        /// </summary>
//        /// <param name="id">company_cRNumber</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company_addRole/{id}")]
//        [HttpPost]
//        public IActionResult CompanyAddRole([FromUri]string id, Roles model)
//        {
//            try
//            {
//                bool isThisRoleExist = false;

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

//                Roles addNewRole = new Roles();
//                addNewRole.RoleID = model.RoleID;
//                addNewRole.Name = model.Name;
                
//                /////////////////// Validate Code for Role already exist or not.
//                var roleDoc = _bucket.Query<object>(@"SELECT roles From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();
//                foreach (var item1 in roleDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["roles"] != null)
//                    {
//                        //roles-roleID
//                        var roleIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["roles"];

//                        foreach (var itemTD in roleIsExist)
//                        {
//                            if (itemTD["RoleID"].ToString() == model.RoleID)
//                            {
//                                isThisRoleExist = true;
//                            }
//                        }
//                    }
//                }

//                if (isThisRoleExist == true)
//                {
//                    // role already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.RoleID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add role code
//                    string query = @"UPDATE " + _bucket.Name + " SET roles = ARRAY_APPEND(roles, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewRole).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.RoleID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Company Add Fine
//        /// </summary>
//        /// <param name="id">company_cRNumber</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company_addFine/{id}")]
//        [HttpPost]
//        public IActionResult CompanyAddFine([FromUri]string id, Fines model)
//        {
//            try
//            {
//                bool isThisFineExist = false;

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

//                Fines addNewFine = new Fines();
//                addNewFine.FineID = model.FineID;
//                addNewFine.Amount = model.Amount;
//                addNewFine.Status = model.Status;
//                addNewFine.Remark = model.Remark;
//                addNewFine.DateTime = model.DateTime;

//                /////////////////// Validate Code for Fine already exist or not.
//                var fineDoc = _bucket.Query<object>(@"SELECT fines From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var item1 in fineDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["fines"] != null)
//                    {
//                        //fines-FineID
//                        var finesIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["fines"];

//                        foreach (var itemTD in finesIsExist)
//                        {
//                            if (itemTD["fineID"].ToString() == model.FineID)
//                            {
//                                isThisFineExist = true;
//                            }
//                        }
//                    }
//                }
//                ///////////////////////////////////
//                if (isThisFineExist == true)
//                {
//                    // fine already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.FineID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add fine code
//                    string query = @"UPDATE " + _bucket.Name + " SET fines = ARRAY_APPEND(fines, " + Newtonsoft.Json.JsonConvert.SerializeObject(addNewFine).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
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
//                            objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.FineRequest;
//                            objPostNotificationParameters.KeyID = model.FineID;//docOutDocument.KeyID;
//                            objPostNotificationParameters.Value = model.Amount;
//                            objPostNotificationParameters.Status = model.Status;
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
//                            objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.FineRequest;
//                            objPostNotificationParameters.KeyID = model.FineID;//docOutDocument.KeyID;
//                            objPostNotificationParameters.Value = model.Amount;
//                            objPostNotificationParameters.Status = model.Status;
//                            resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
//                        }
//                        catch (Exception ex)
//                        {
//                            return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//                        }
//                        #endregion
//                    }
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.FineID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Company Add Document
//        /// </summary>
//        /// <param name="id">company_cRNumber</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company_addDocument/{id}")]
//        [HttpPost]
//        public IActionResult CompanyAddDocument([FromUri]string id, Documents model)
//        {
//            try
//            {

//                bool isThisDocumentExist = false;

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

//                Documents addnewDocument = new Documents();
//                addnewDocument.DocumentID = model.DocumentID;
//                addnewDocument.Type = model.Type;
//                addnewDocument.Version = model.Version;
//                addnewDocument.ExpDate = model.ExpDate;
//                addnewDocument.DocStatus = model.DocStatus;

//                //addnewDocument.DocumentID     = model.DocumentID; // documentType 
//                //addnewDocument.DocumentValue  = model.DocumentValue;//Images base64 string
//                //addnewDocument.Version        = model.Version;// versioning
//                //addnewDocument.Number         = model.Number;//Documents Number
//                //addnewDocument.ExpiryDate     = model.ExpiryDate;//Expriy date
//                //addnewDocument.Status         = model.Status; //DocStatus
//                //addnewDocument.HotelPickup    = model.HotelPickup; // permission type for lincece only

//                /////////////////// Validate Code for Fine already exist or not.

//                var documentDoc = _bucket.Query<object>(@"SELECT documents From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var item1 in documentDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["documents"] != null)
//                    {
//                        //documents-DocumentType
//                        var documentsIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["documents"];

//                        foreach (var itemTD in documentsIsExist)
//                        {
//                            if (itemTD["documentID"].ToString() == model.DocumentID)
//                            {
//                                isThisDocumentExist = true;
//                            }
//                        }
//                    }
//                }

//                ///////////////////////////////////
//                if (isThisDocumentExist == true)
//                {
//                    // document already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.DocumentID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add document code
//                    string query = @"UPDATE " + _bucket.Name + " SET documents = ARRAY_APPEND(documents, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewDocument).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.DocumentID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Company Add Vehicle
//        /// </summary>
//        /// <param name="id">company_cRNumber</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_company_addVehicle/{id}")]
//        [HttpPost]
//        public IActionResult CompanyAddVehicle([FromUri]string id, Vehicles model)
//        {
//            try
//            {
//                bool isThisVehicleExist = false;

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

//                Vehicles addNewVehicle = new Vehicles();
//                addNewVehicle.VehicleID = model.VehicleID;
//                addNewVehicle.Make = model.Make;
//                addNewVehicle.ModelYear = model.ModelYear;
//                addNewVehicle.VehType = model.VehType;
//                addNewVehicle.Status = model.Status;

//                /////////////////// Validate Code for vehicle already exist or not.

//                var vehicleDoc = _bucket.Query<object>(@"SELECT vehicles From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var itemRoot in vehicleDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)itemRoot).Root["vehicles"] != null)
//                    {
//                        //documents-DocumentType
//                        var documentsIsExist = ((Newtonsoft.Json.Linq.JToken)itemRoot).Root["vehicles"];

//                        foreach (var item in documentsIsExist)
//                        {
//                            if (item["vehicleID"].ToString() == model.VehicleID)
//                            {
//                                isThisVehicleExist = true;
//                            }
//                        }
//                    }
//                }

//                ///////////////////////////////////
//                if (isThisVehicleExist == true)
//                {
//                    // role already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.VehicleID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add vehicle code
//                    string query = @"UPDATE " + _bucket.Name + " SET vehicles = ARRAY_APPEND(vehicles, " + Newtonsoft.Json.JsonConvert.SerializeObject(model).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.VehicleID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        ////////////////// Add Staff/User objects APIs

//        /// <summary>
//        /// Staff/User Add Document
//        /// </summary>
//        /// <param name="id">user_GUID</param>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_user_addDocument/{id}")]
//        [HttpPost]
//        public IActionResult StaffAddDocument([FromUri]string id, Documents model)
//        {
//            try
//            {

//                bool isThisDocumentExist = false;

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

//                Documents addnewDocument = new Documents();
//                addnewDocument.DocumentID = model.DocumentID;
//                addnewDocument.Type = model.Type;
//                addnewDocument.Version = model.Version;
//                addnewDocument.ExpDate = model.ExpDate;
//                addnewDocument.DocStatus = model.DocStatus;

//                //addnewDocument.DocumentID     = model.DocumentID; // documentType 
//                //addnewDocument.DocumentValue  = model.DocumentValue;//Images base64 string
//                //addnewDocument.Version        = model.Version;// versioning
//                //addnewDocument.Number         = model.Number;//Documents Number
//                //addnewDocument.ExpiryDate     = model.ExpiryDate;//Expriy date
//                //addnewDocument.Status         = model.Status; //DocStatus
//                //addnewDocument.HotelPickup    = model.HotelPickup; // permission type for lincece only

//                /////////////////// Validate Code for Fine already exist or not.

//                var documentDoc = _bucket.Query<object>(@"SELECT documents From " + _bucket.Name + " where meta().id = '" + id + "'").ToList();

//                foreach (var item1 in documentDoc)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["documents"] != null)
//                    {
//                        //documents-DocumentType
//                        var documentsIsExist = ((Newtonsoft.Json.Linq.JToken)item1).Root["documents"];

//                        foreach (var itemTD in documentsIsExist)
//                        {
//                            if (itemTD["documentID"].ToString() == model.DocumentID)
//                            {
//                                isThisDocumentExist = true;
//                            }
//                        }
//                    }
//                }

//                ///////////////////////////////////
//                if (isThisDocumentExist == true)
//                {
//                    // document already exist.
//                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.DocumentID + " already exists"), new JsonMediaTypeFormatter());
//                }
//                else
//                {
//                    // add document code
//                    string query = @"UPDATE " + _bucket.Name + " SET documents = ARRAY_APPEND(documents, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewDocument).ToString() + ") where meta().id='" + id + "'";
//                    var result = _bucket.Query<object>(query);
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.DocumentID + " has been added sucessfully"), new JsonMediaTypeFormatter());
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }

//        /// <summary>
//        /// Get individual count
//        /// </summary>
//        /// <returns>Return list of count of list item details</returns>
//        [Route("aptc_individual_item_Count/{id}/{name}")]
//        [HttpGet]
//        public IActionResult GetIndividual_Item_Count(string id,string name)
//        {
//            //string query = @"SELECT Contents." + name + " From " + _bucket.Name + " as cmt where meta().id='REF_EN_US'";
//            string query = @"SELECT ARRAY_COUNT(" + name + ") as " + name + "  from APTCCRM where meta().id ='individual_" + id +"'";
//            var CommonMasterDocument = _bucket.Query<object>(query).ToList();
//            return Content(HttpStatusCode.OK, CommonMasterDocument);
//        }
//    }
//}
