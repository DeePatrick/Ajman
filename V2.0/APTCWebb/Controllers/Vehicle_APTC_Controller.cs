using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using APTCWebb.Common;
using APTCWebb.Models;
using Couchbase;
using Couchbase.Core;
using APTCWebb.OutPutDto;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// Vehicle APTC Controller
    /// </summary>
    [RoutePrefix("api")]
    public class Vehicle_APTC_Controller : ApiController
    {
        #region PrviavteFields
            private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
            private readonly IBucket _bucketRef = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion
        string resultPostNotification = string.Empty;
        SendNotification sn = new SendNotification();

        /// <summary>
        /// Get data
        /// </summary>
        /// <returns></returns>
        // GET: api/vehicle
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Ger data by Id
        /// </summary>
        /// <param name="id">Vehicle_3UGBH71JXRY109122</param>
        /// <returns></returns>
        // GET: api/vehicle/5
        [Route("aptc_vehicle/{id}")]
        [HttpGet]
        [ResponseType(typeof(Vehicle_APTCOutPut))]
        public IActionResult GetVehicle(string id)
        {
            string strQuery = @"SELECT keyID,docType,engineNum,numSeats,trafficNum,firstRegData,yearManufacture,make,model,colour,vehType,fuelType,transType,vehValid,disabledFriendly,vehPlate,remarks,ownership,status From " + _bucket.Name + " as Vehicle where meta().id='vehicle_" + id + "' and isActive=true";
            var allVehicleDocument = _bucket.Query<Vehicle_APTCOutPut>(strQuery).ToList();
            return Content(HttpStatusCode.OK, allVehicleDocument);
        }

        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns></returns>
        [Route("aptc_vehicle")]
        [HttpGet]
        [ResponseType(typeof(Vehicle_APTCOutPut))]
        public IActionResult GetAllVehicle()
        {
            string strQuery = @"SELECT keyID,docType,engineNum,numSeats,trafficNum,firstRegData,yearManufacture,make,model,colour,vehType,fuelType,transType,isActive,disabledFriendly,vehPlate,remarks,ownership,status From " + _bucket.Name + " as Vehicle where meta().id like 'vehicle_%' and isActive=true";
            var allVehicleDocument = _bucket.Query<Vehicle_APTCOutPut>(strQuery).ToList();
            return Content(HttpStatusCode.OK, allVehicleDocument);
        }

        /// <summary>
        ///get plate number by veh id
        /// </summary>
        /// <param name="id">3UGBH71JXRY109122</param>
        /// <returns></returns>
        // GET: api/aptc_platenumber/
        [Route("aptc_vehplatenumber/{id}")]
        [HttpGet]
        [ResponseType(typeof(VehPlateOutPut))]
        public IActionResult GetPlateNumber(string id)
        {

            string strQuery = @"SELECT vehPlate.plateNumber From " + _bucket.Name + " where meta().id like '%vehicle%' and isActive=true and keyID='"+id+"'";
            var allVehicleDocument = _bucket.Query<VehPlateOutPut>(strQuery).FirstOrDefault();
            if (allVehicleDocument==null)
            {
                return Content(HttpStatusCode.NotFound, MessageResponse.Message(HttpStatusCode.NotFound.ToString(), MessageDescriptions.NotFound, id), new JsonMediaTypeFormatter());
            }
            else
            {
                return Content(HttpStatusCode.OK, allVehicleDocument);
            }

           //
        }

        /// <summary>
        /// Post Vehicle 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_vehicle")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> RegisterVehicle(Vehicle_APTC model)
        {
            try
            {
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

                var vehicleKey = "vehicle_" + model.KeyID;

                if (await _bucket.ExistsAsync(vehicleKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"Vehicle '{model.KeyID}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "170-Key ID already exists."), new JsonMediaTypeFormatter());
                }
                // call third part api to check Vehicle is valid or not

                VehPlate vehPlate = new VehPlate();
                if (model.VehPlate != null)
                {
                    vehPlate.PlateNumber = model.VehPlate.PlateNumber;
                    vehPlate.PlateCategory = model.VehPlate.PlateCategory;
                    vehPlate.PlateSource = model.VehPlate.PlateSource;
                    vehPlate.PlateCode = model.VehPlate.PlateCode;
                }

                Ownership ownership = new Ownership();
                if (model.Ownership != null)
                {
                    ownership.OwnershipType = model.Ownership.OwnershipType;
                    ownership.OwnerID = model.Ownership.OwnerID;
                    ownership.OwnerName = model.Ownership.OwnerName;
                    ownership.LeasorName = model.Ownership.LeasorName;
                }

                List<AuditInfo> lstauditInfo = new List<AuditInfo>();
                AuditInfo auditInfo = new AuditInfo();
                auditInfo.Version = "1";
                auditInfo.Status = "true";
                auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                auditInfo.LastChangeBy = model.KeyID;
                lstauditInfo.Add(auditInfo);

                CTResponse cTResponse = new CTResponse();
                if (model.CTResponse != null)
                {
                    cTResponse.CTStatus = false;
                    cTResponse.CTResponseId = model.CTResponse.CTResponseId;
                    cTResponse.CTRemarks = model.CTResponse.CTRemarks;
                }

                var vehicleDoc = new Document<Vehicle_APTC>()
                {
                    Id = vehicleKey,
                    Content = new Vehicle_APTC
                    {
                        //Id = vehicleKey,
                        KeyID = model.KeyID,    // This is vehicle chassNumber.
                        DocType = model.DocType,
                        EngineNum = model.EngineNum,
                        NumSeats = model.NumSeats,
                        TrafficNum = model.TrafficNum,
                        FirstRegData = model.FirstRegData,
                        YearManufacture = model.YearManufacture,
                        Make = model.Make,
                        Model = model.Model,
                        Colour = model.Colour,
                        VehType = model.VehType,
                        FuelType = model.FuelType,
                        TransType = model.TransType,
                        IsActive = true,    
                        DisabledFriendly = model.DisabledFriendly,
                        VehPlate = vehPlate,
                        AuditInfo = lstauditInfo,
                        CTResponse= cTResponse,
                        Remarks=model.Remarks,
                        Ownership= ownership,
                        VehValid=false,// Third Part Verification
                        Status ="PE"
                    }
                };
                var result = await _bucket.InsertAsync(vehicleDoc);
                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
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
                        objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.VehicleRegistration;
                        objPostNotificationParameters.KeyID = model.KeyID;
                        objPostNotificationParameters.Value = model.TrafficNum;
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
                        objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.VehicleRegistration;
                        objPostNotificationParameters.KeyID = model.KeyID;
                        objPostNotificationParameters.Value = model.TrafficNum;
                        objPostNotificationParameters.Status = AspectEnums.StatusPS;//"PE";//model.Status.ToString(); 

                        resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
                    }
                    catch (Exception ex)
                    {
                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
                    }
                    #endregion
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id+" Notification Status :" +resultPostNotification), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// this is put method for update vehicle
        /// </summary>
        /// <param name="model">vehicle</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_vehicle")]
        [HttpPut]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> UpdateVehicle(Vehicle_APTC model)
        {
            try
            {
                // Validate Model Code
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

                // Validate vehicle is exist or not
                var vehicleDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as vehicle where meta().id='vehicle_" + model.KeyID + "' and isActive=true").ToList();

                if (vehicleDocument.Count > 0)
                {
                    // edit company
                    #region fetch max audit version
                    MessageModel msg = new MessageModel();
                    List<int> maxVersion = new List<int>();
                    var maxAuditVersion = 0;

                    if (((Newtonsoft.Json.Linq.JToken)vehicleDocument[0]).Root["vehicle"]["auditInfo"] != null)
                    {
                        var auditInfoVersion = ((Newtonsoft.Json.Linq.JToken)vehicleDocument[0]).Root["vehicle"]["auditInfo"];
                        foreach (var itemTD in auditInfoVersion)
                        {
                            if (itemTD["version"] != null)
                            {
                                maxVersion.Add(Convert.ToInt32(itemTD["version"]));
                            }
                        }
                    }

                    if (maxVersion.Count != 0)
                        maxAuditVersion = maxVersion.Max() + 1;
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
                    //auditInfo.LastChangeBy = model.Email;
                    #endregion
                    #region Updare Company
                    string updatequeryString = string.Empty;

                    updatequeryString = @"update " + _bucket.Name + " set ";
                    updatequeryString += " docType ='" + model.DocType + "',";
                    updatequeryString += " engineNum ='" + model.EngineNum + "',";
                    updatequeryString += " numSeats ='" + model.NumSeats + "',";
                    updatequeryString += " trafficNum ='" + model.TrafficNum + "',";
                    updatequeryString += " firstRegData ='" + model.FirstRegData + "',";
                    updatequeryString += " yearManufacture ='" + model.YearManufacture + "',";
                    updatequeryString += " make ='" + model.Make + "',";
                    updatequeryString += " model ='" + model.Model + "',";
                    updatequeryString += " colour ='" + model.Colour + "',";
                    updatequeryString += " vehType ='" + model.VehType + "',";
                    updatequeryString += " fuelType ='" + model.FuelType + "',";
                    updatequeryString += " transType ='" + model.TransType + "',";
                    updatequeryString += " disabledFriendly ='" + model.DisabledFriendly + "',";
                    updatequeryString += " remarks ='" + model.Remarks + "',";
                    updatequeryString += " status ='PE',";

                    if (model.VehPlate != null)
                    {
                        updatequeryString += " vehPlate.plateNumber ='" + model.VehPlate.PlateNumber + "',";
                        updatequeryString += " vehPlate.plateCategory ='" + model.VehPlate.PlateCategory + "',";
                        updatequeryString += " vehPlate.plateSource ='" + model.VehPlate.PlateSource + "',";
                        updatequeryString += " vehPlate.plateCode ='" + model.VehPlate.PlateCode + "',";
                    }

                    if (model.Ownership != null)
                    {
                        updatequeryString += " ownership.ownershipType ='" + model.Ownership.OwnershipType + "',";
                        updatequeryString += " ownership.ownerID ='" + model.Ownership.OwnerID + "',";
                        updatequeryString += " ownership.ownerName ='" + model.Ownership.OwnerName + "',";
                        updatequeryString += " ownership.leasorName ='" + model.Ownership.LeasorName + "',";
                    }

                        updatequeryString += " auditInfo = ARRAY_APPEND( auditInfo, " + Newtonsoft.Json.JsonConvert.SerializeObject(auditInfo).ToString() + ")";
                        updatequeryString += " where meta().id='vehicle_" + model.KeyID + "'";

                    var result = _bucket.Query<object>(updatequeryString);
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), model.KeyID + " has been updated sucessfully"), new JsonMediaTypeFormatter());

                    #endregion
                }
                else
                {
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.NotFound, "vehicle does not exist"), new JsonMediaTypeFormatter());
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
        /// <param name="id">vehicle_5</param>
        /// <returns>Return Doc In Details for id=vehicle_5</returns>
        [Route("aptc_vehicle/{id}")]
        [HttpDelete]
        public IActionResult DeleteVehicle(string id)
        {
            try
            {
                _bucket.Query<object>(@"Update " + _bucket.Name + " set isActive=false where meta().id='vehicle_" + id + "' and isActive=true").ToList();
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Delete, id+ " has been deleted successfully."), new JsonMediaTypeFormatter());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Post Company Vehicles 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_vehicle_company/{compID}")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> RegisterCompanyVehicle([FromUri]string compID, Vehicle_APTC model)
        {
            try
            {
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

                var vehicleKey = "vehicle_" + model.KeyID;

                if (await _bucket.ExistsAsync(vehicleKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"Vehicle '{model.KeyID}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "170-Key ID already exists."), new JsonMediaTypeFormatter());
                }
                // call third part api to check Vehicle is valid or not

                VehPlate vehPlate = new VehPlate();
                if (model.VehPlate != null)
                {
                    vehPlate.PlateNumber = model.VehPlate.PlateNumber;
                    vehPlate.PlateCategory = model.VehPlate.PlateCategory;
                    vehPlate.PlateSource = model.VehPlate.PlateSource;
                    vehPlate.PlateCode = model.VehPlate.PlateCode;
                }

                Ownership ownership = new Ownership();
                if (model.Ownership != null)
                {
                    ownership.OwnershipType = model.Ownership.OwnershipType;
                    ownership.OwnerID = model.Ownership.OwnerID;
                    ownership.OwnerName = model.Ownership.OwnerName;
                    ownership.LeasorName = model.Ownership.LeasorName;
                }

                List<AuditInfo> lstauditInfo = new List<AuditInfo>();
                AuditInfo auditInfo = new AuditInfo();
                auditInfo.Version = "1";
                auditInfo.Status = "true";
                auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
                auditInfo.LastChangeBy = model.KeyID;
                lstauditInfo.Add(auditInfo);

                CTResponse cTResponse = new CTResponse();
                if (model.CTResponse != null)
                {
                    cTResponse.CTStatus = false;
                    cTResponse.CTResponseId = model.CTResponse.CTResponseId;
                    cTResponse.CTRemarks = model.CTResponse.CTRemarks;
                }

                var vehicleDoc = new Document<Vehicle_APTC>()
                {
                    Id = vehicleKey,
                    Content = new Vehicle_APTC
                    {
                        //Id = vehicleKey,
                        KeyID = model.KeyID,    // This is vehicle chassNumber.
                        DocType = model.DocType,
                        EngineNum = model.EngineNum,
                        NumSeats = model.NumSeats,
                        TrafficNum = model.TrafficNum,
                        FirstRegData = model.FirstRegData,
                        YearManufacture = model.YearManufacture,
                        Make = model.Make,
                        Model = model.Model,
                        Colour = model.Colour,
                        VehType = model.VehType,
                        FuelType = model.FuelType,
                        TransType = model.TransType,
                        IsActive = true,    
                        DisabledFriendly = model.DisabledFriendly,
                        VehPlate = vehPlate,
                        AuditInfo = lstauditInfo,
                        CTResponse = cTResponse,
                        Remarks = model.Remarks,
                        Ownership = ownership,
                        VehValid=false,// Third Part Verification
                        Status ="PE"
                    }
                };
                var result = await _bucket.InsertAsync(vehicleDoc);
                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }

                /////////////////////////////////// add vehicle to company schema
                if(model.Ownership.OwnershipType=="IND")
                {
                    var individualDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Company where meta().id= 'individual_" + model.Ownership.OwnerID + "'").ToList();
                    if (individualDocument.Count > 0)
                    {
                        Vehicles addnewVCehicleToCompany = new Vehicles();
                        addnewVCehicleToCompany.VehicleID = model.KeyID;
                        //add document code
                        string query = @"UPDATE " + _bucket.Name + " SET vehicles = ARRAY_APPEND(vehicles, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewVCehicleToCompany).ToString() + ") where meta().id='individual_" + model.Ownership.OwnerID + "'";
                        var resultIndividual = _bucket.Query<object>(query);
                        //return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), docOutID + " has been added sucessfully"), new JsonMediaTypeFormatter());
                    }
                }
                else if (compID.Trim() != string.Empty)
                {
                    var companyDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Company where meta().id= 'company_" + compID.Trim() + "'").ToList();
                    if (companyDocument.Count > 0)
                    {
                        Vehicles addnewVCehicleToCompany = new Vehicles();
                        addnewVCehicleToCompany.VehicleID = model.KeyID;
                        //add document code
                        string query = @"UPDATE " + _bucket.Name + " SET vehicles = ARRAY_APPEND(vehicles, " + Newtonsoft.Json.JsonConvert.SerializeObject(addnewVCehicleToCompany).ToString() + ") where meta().id='company_" + compID.Trim() + "'";
                        var resultIndividual = _bucket.Query<object>(query);
                        //return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), docOutID + " has been added sucessfully"), new JsonMediaTypeFormatter());
                    }
                }
                /////////////////////////////////
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
                        objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.VehicleRegistration;
                        objPostNotificationParameters.KeyID = model.KeyID;
                        objPostNotificationParameters.Value = model.TrafficNum;
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
                        objPostNotificationParameters.NotificationType = (int)AspectEnums.NotificationType.VehicleRegistration;
                        objPostNotificationParameters.KeyID = model.KeyID;
                        objPostNotificationParameters.Value = model.TrafficNum;
                        objPostNotificationParameters.Status = AspectEnums.StatusPS;//"PE";//model.Status.ToString(); 

                        resultPostNotification = sn.PostNotification(objPostNotificationParameters);                    //sn.PostNotification();
                    }
                    catch (Exception ex)
                    {
                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
                    }
                    #endregion
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// this is put method for approved vehicle
        /// </summary>
        /// <param name="model">vehicle</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_Approved_vehicle/{id}")]
        [HttpPut]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> ApprovedVehicle(string id)
        {
            try
            {
                _bucket.Query<object>(@"Update " + _bucket.Name + " set status='AP' where meta().id='vehicle_" + id + "' and isActive=true").ToList();
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, id + " has been approved successfully"), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

    }
}
