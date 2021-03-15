//using APTCWebb.Models;
//using APTCWebb.OutPutDto;
//using Couchbase;
//using Couchbase.Core;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Web.Http;
//using APTCWebb.Common;
//using System.Web.Http.Description;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Get Driver Data Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    public class GetDriverDataController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        private readonly IBucket _loginbucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCLOGINBucket"));
//        #endregion

//        /// <summary>
//        /// Create Driver - Get data by individual Id
//        /// </summary>
//        /// <param name="id">Driver_784-2020-9871234-1</param>
//        /// <returns></returns>
//        [Route("aptc_getDriver/{id}")]
//        [HttpGet]
//        [ResponseType(typeof(DriverOutPut))]
//        public IActionResult GetDriver(string id)
//        {
//            string keyValue = string.Empty;
//            //var userDocument1 = _bucket.Query<object>(@"SELECT keyID ID,name.en_US NameEN,name.ar_SA NameAR,email EmailAddress From " + _bucket.Name + " as Driver where meta().id= '" + id + "'").ToList();

//            var userDocument1 = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Driver where meta().id= '" + id + "'").ToList();

//            //var dict = JsonConvert.SerializeObject(userDocument1.Rows);
//            //var dict1 = JsonConvert.DeserializeObject<object>(dict);
//            //var jsonObj = JObject.Parse(dict);
//            //var values = (JArray)jsonObj["value"];

//            string Action = string.Empty;
//            Action = "ADD";
//            string Password = string.Empty;
//            //Password = "password";
//            string Username = string.Empty;
//            //Username = "uid";
//            var ID = string.Empty;
//            var NameEN = string.Empty;
//            var NameAR = string.Empty;
//            var MobileNumber = string.Empty;
//            var EmailAddress = string.Empty;
//            var DriverValid = string.Empty;
//            var Franchise = string.Empty;
//            var vehiclesTypeValue = string.Empty;
//            var LicenseNumber = string.Empty;
//            var PermitNumber = string.Empty;
//            var PassportNumber = string.Empty;
//            var Photo = string.Empty;

//            foreach (var item1 in userDocument1)
//            {
//                // keyID - Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"] != null)
//                    ID = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"].ToString().Split('_')[1];

//                var objLoginDetails = _loginbucket.Query<object>(@"SELECT * From " + _loginbucket.Name + " as Login where meta().id= 'Login_" + ID + "'").ToList();

//                foreach (var loginItem in objLoginDetails)
//                {
//                    if (((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["userId"] != null)
//                        Username = ((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["userId"].ToString();
//                    if (((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["password"] != null)
//                        Password = ((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["password"].ToString();
//                }

//                // = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"];
//                //var  = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"];

//                //name-en_US- Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["en_US"] != null)
//                    NameEN = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["en_US"].ToString();

//                //name-ar_SA - Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["ar_SA"] != null)
//                    NameAR = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["ar_SA"].ToString();

//                //photo - Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["profilePhoto"] != null)
//                    Photo = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["profilePhoto"].ToString();

//                //mobNum-num - Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["mobNum"]["numM"] != null)
//                    MobileNumber = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["mobNum"]["numM"].ToString();
//                // email - Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["email"] != null)
//                    EmailAddress = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["email"].ToString();

//                //auditInfo-status - Done
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["auditInfo"]["status"] != null)
//                    DriverValid = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["auditInfo"]["status"].ToString();

//                //////////////////////////////////////////////// 

//                //roles-link-linkID
//                var FranchiseType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["roles"];
//                foreach (var item in FranchiseType)
//                {
//                    if (item["roleID"].ToString().Contains("CompanyOwner"))
//                    {
//                        if (item["link"]["name"] != null)
//                        {
//                            Franchise = item["link"]["name"].ToString();
//                        }
//                    }
//                }

//                //vehicles-vehType
//                var vehiclesType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["vehicles"];
//                foreach (var item in vehiclesType)
//                {
//                    if (item["status"].ToString().Contains("true"))
//                    {
//                        if (item["vehType"] != null)
//                        {
//                            vehiclesTypeValue = item["vehType"].ToString();
//                        }
//                    }
//                }

//                // Fetch Data from document Type
//                var docType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["documents"];

//                foreach (var item in docType)
//                {
//                    if (item["documentID"].ToString().Contains("license"))
//                    {
//                        //documents-type ("documentID": "license")
//                        if (item["number"] != null)
//                        {
//                            LicenseNumber = item["number"].ToString();
//                        }
//                    }
//                    if (item["documentID"].ToString().Contains("permit"))
//                    {
//                        //documents-type ("documentID": "permit")
//                        if (item["number"] != null)
//                        {
//                            PermitNumber = item["number"].ToString();
//                        }
//                    }
//                    if (item["documentID"].ToString().Contains("passport"))
//                    {
//                        //documents-type ("documentID": "passport")
//                        if (item["number"] != null)
//                        {
//                            PassportNumber = item["number"].ToString();
//                        }
//                    }
//                }
//            }

//            var driverList = new List<string>();
//            var dData = new DriverModel
//            {
//                ID = "Driver_" + ID,
//                NameEN = NameEN,
//                NameAR = NameAR,
//                Action = Action,
//                DriverValid = DriverValid,
//                EmailAddress = EmailAddress,
//                LicenseNumber = LicenseNumber,
//                PassportNumber = PassportNumber,
//                MobileNumber = MobileNumber,
//                PermitNumber = PermitNumber,
//                Photo = Photo,
//                VehicleType = vehiclesTypeValue,
//                Username = Username,
//                Password = Password,
//                Franchise = Franchise,
//                IsActive = true,
//                Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                Created_By = EmailAddress,
//                CarTrackDriverResponse = new CarTrackDriverResponse
//                {
//                    CTStatus = "No",
//                    CTDescription = string.Empty
//                }
//            };

//            return Content(HttpStatusCode.OK, dData);
//        }

//        /// <summary>
//        /// Create Driver - Get all driver data 
//        /// </summary>
//        /// <param name="id">Driver_784-2020-9871234-1</param>
//        /// <returns></returns>
//        [Route("aptc_getALLDriver")]
//        [HttpGet]
//        [ResponseType(typeof(DriverOutPut))]
//        public IActionResult GetAllDriver()
//        {
//            #region private values
//                string keyValue = string.Empty;
//                string Action = string.Empty;
//                Action = "ADD";
//                string Password = string.Empty;
//                //Password = "password";
//                string Username = string.Empty;
//                //Username = "uid";
//                var ID = string.Empty;
//                var NameEN = string.Empty;
//                var NameAR = string.Empty;
//                var MobileNumber = string.Empty;
//                var EmailAddress = string.Empty;
//                var DriverValid = string.Empty;
//                var Franchise = string.Empty;
//                var vehiclesTypeValue = string.Empty;
//                var LicenseNumber = string.Empty;
//                var PermitNumber = string.Empty;
//                var PassportNumber = string.Empty;
//                var Photo = string.Empty;
//                var driverList = new List<DriverModel>();
//                bool isThisTaxiDriver;
//            #endregion

//            var userDocument1 = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Driver where meta().id LIKE 'individual_%'").ToList();
//            foreach (var item1 in userDocument1)
//            {
//                isThisTaxiDriver = false;
//                if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["roles"] != null)
//                {
//                    //roles-roleID
//                    var taxiDriverType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["roles"];
//                    foreach (var itemTD in taxiDriverType)
//                    {
//                        if (itemTD["roleID"].ToString().ToLower().Contains("taxidriver"))
//                        {
//                            isThisTaxiDriver = true;
//                        }
//                    }
//                }

//                if (isThisTaxiDriver == true)
//                {
//                    // keyID - Done
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"] != null)
//                        ID = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"].ToString().Split('_')[1];

//                    // email - Done
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["email"] != null)
//                        EmailAddress = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["email"].ToString();

//                    var objLoginDetails = _loginbucket.Query<object>(@"SELECT * From " + _loginbucket.Name + " as Login where meta().id= 'Login_" + EmailAddress + "'").ToList();

//                    foreach (var loginItem in objLoginDetails)
//                    {
//                        if (((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["userId"] != null)
//                            Username = ((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["userId"].ToString();
//                        if (((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["password"] != null)
//                            Password = ((Newtonsoft.Json.Linq.JToken)loginItem).Root["Login"]["password"].ToString();
//                    }

//                    // = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"];
//                    //var  = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["keyID"];

//                    //name-en_US- Done
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["en_US"] != null)
//                        NameEN = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["en_US"].ToString();

//                    //name-ar_SA - Done
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["ar_SA"] != null)
//                        NameAR = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["name"]["ar_SA"].ToString();

//                    //mobNum-num - Done
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["mobNum"]["num"] != null)
//                        MobileNumber = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["mobNum"]["num"].ToString();


//                    //auditInfo-status - Done
//                    if (((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["auditInfo"]["status"] != null)
//                        DriverValid = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["auditInfo"]["status"].ToString();

//                    //////////////////////////////////////////////// 

//                    //roles-link-linkID
//                    var FranchiseType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["roles"];

//                    foreach (var item in FranchiseType)
//                    {
//                        if (item["roleID"].ToString().ToLower().Contains("companyowner"))
//                        {
//                            if (item["link"]["name"] != null)
//                            {
//                                Franchise = item["link"]["name"].ToString();
//                            }
//                        }
//                    }

//                    //vehicles-vehType
//                    var vehiclesType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["vehicles"];
//                    foreach (var item in vehiclesType)
//                    {
//                        if (item["status"].ToString().Contains("true"))
//                        {
//                            if (item["vehType"] != null)
//                            {
//                                vehiclesTypeValue = item["vehType"].ToString();
//                            }
//                        }
//                    }

//                    // Fetch Data from document Type
//                    var docType = ((Newtonsoft.Json.Linq.JToken)item1).Root["Driver"]["documents"];

//                    foreach (var item in docType)
//                    {
//                        if (item["documentID"].ToString().Contains("license"))
//                        {
//                            //documents-type ("documentID": "license")
//                            if (item["type"] != null)
//                            {
//                                LicenseNumber = item["type"].ToString();
//                            }
//                        }
//                        if (item["documentID"].ToString().Contains("permit"))
//                        {
//                            //documents-type ("documentID": "permit")
//                            if (item["type"] != null)
//                            {
//                                PermitNumber = item["type"].ToString();
//                            }
//                        }
//                        if (item["documentID"].ToString().Contains("passport"))
//                        {
//                            //documents-type ("documentID": "passport")
//                            if (item["type"] != null)
//                            {
//                                PassportNumber = item["type"].ToString();
//                            }
//                        }

//                        //if (item["documentID"].ToString().Contains("photo"))
//                        //{
//                        //    //documents-type ("documentID": "photo")
//                        //    if (item["type"] != null)
//                        //    {
//                        //        Photo = item["type"].ToString();
//                        //    }
//                        //}
//                    }

//                    var dData = new DriverModel
//                    {
//                        ID = "Driver_" + ID,
//                        NameEN = NameEN,
//                        NameAR = NameAR,
//                        Action = Action,
//                        DriverValid = DriverValid,
//                        EmailAddress = EmailAddress,
//                        LicenseNumber = LicenseNumber,
//                        PassportNumber = PassportNumber,
//                        MobileNumber = MobileNumber,
//                        PermitNumber = PermitNumber,
//                        Photo = Photo,
//                        VehicleType = vehiclesTypeValue,
//                        Username = Username,
//                        Password = Password,
//                        Franchise = Franchise,
//                        IsActive = true,
                      
//                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                        Created_By = EmailAddress,
//                        CarTrackDriverResponse = new CarTrackDriverResponse
//                        {
//                            CTStatus = "No",
//                            CTDescription = string.Empty
//                        }
//                    };

//                    driverList.Add(dData);
//                    ////////////// End if
//                }
//            }
//            return Content(HttpStatusCode.OK, driverList);
//        }
//    }
//}
