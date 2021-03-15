//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Formatting;
//using System.Threading.Tasks;
//using System.Web.Http;
//using System.Web.Http.Description;
//using APTCWebb.Common;
//using APTCWebb.Models;
//using Couchbase;
//using Couchbase.Core;
//using APTCWebb.OutPutDto;
//using System.IO;
//using System.Web;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// CT Push Controller
//    /// </summary>
    
//    [RoutePrefix("api")]
//    public class CTPushController : ApiController
//    {
//        #region PrviavteFields
//          private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseTargetBucket"));
//          private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
//        #endregion

//        /// <summary>
//        /// Push Driver
//        /// </summary>
//        /// <returns></returns>
//        [Route("car_driver/push")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> Register(DriverModel model)
//        {
//            //Modified by Arvind on 23-07-2018 as per joe email
//            if (string.IsNullOrEmpty(model.NameEN) && string.IsNullOrEmpty(model.NameAR))
//            {
//                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), "110-NameEN or NameAR is required"), new JsonMediaTypeFormatter());
//            }
//            string destinationPath = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("FilePath"));
//            destinationPath = destinationPath + "/driver";
//            string root = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("TempFilePath"));
//            var tempPath = Path.GetTempPath();

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

//                var driverId = "Driver_" + model.ID;
//                var driverDocumentEmirati = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where id= '" + model.ID + "'").ToList();
//                var driverDocumentEmail = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where emailAddress= '" + model.EmailAddress + "'").ToList();

//                if (model.Action == "Add")
//                {
//                    if (driverDocumentEmirati.Count > 0)
//                    {
//                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "165-Emirati Id already exists"), new JsonMediaTypeFormatter());
//                    }
//                    if (driverDocumentEmail.Count > 0)
//                    {
//                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "105-The e-mail already exists"), new JsonMediaTypeFormatter());
//                    }
//                }

//                bool isDriverValid = true;

//                string password = Guid.NewGuid().ToString("d").Substring(1, 4);
//                var driverDoc = new Document<DriverModel>()
//                {
//                    Id = driverId,
//                    Content = new DriverModel
//                    {
//                        ID = model.ID,
//                        NameEN = model.NameEN,
//                        NameAR = model.NameAR,
//                        Action = model.Action,
//                        DriverValid = isDriverValid.ToString(),
//                        EmailAddress = model.EmailAddress,
//                        LicenseNumber = model.LicenseNumber,
//                        PassportNumber = model.PassportNumber,
//                        MobileNumber = model.MobileNumber,
//                        PermitNumber = model.PermitNumber,
//                        Photo = model.Photo,
//                        VehicleType = model.VehicleType,
//                        Password = password,
//                        Franchise = model.Franchise,
//                        IsActive = true,
//                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                        Created_By = model.EmailAddress,
//                        CarTrackDriverResponse = new CarTrackDriverResponse
//                        {
//                            CTStatus = "No",
//                            CTDescription = string.Empty
//                        }
//                    }
//                };
//                if (model.Action=="Add")
//                {
//                    var result = await _bucket.InsertAsync(driverDoc);
//                    if (!result.Success)
//                    {
//                        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
//                    }
//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
//                }
//                else if(model.Action == "MOD")
//                {
//                    string queryString = @" update " + _bucket.Name + " set nameEN ='" + model.NameEN + "',nameAR = '" + model.NameAR + "',action ='" + model.Action + "', emailAddress = '" + model.EmailAddress + "',licenseNumber = '" + model.LicenseNumber + "' , passportNumber = '" + model.PassportNumber + "' ,mobileNumber = '" + model.MobileNumber + "' , permitNumber = '" + model.PermitNumber + "',vehicleType = '" + model.VehicleType + "',carTrackDriverResponse.ctStatus='No',carTrackDriverResponse.ctDescription='',modifiedDate='" + DateTime.Now.ToString() + "'  where meta().id= 'Driver_" + model.ID + "'";
//                    var result = await _bucket.QueryAsync<DriverModel>(queryString);
//                    if (!result.Success)
//                    {
//                        return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "Data has not been updated."), new JsonMediaTypeFormatter());
//                    }

//                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, model.ID.ToLower() + " updated successfully"), new JsonMediaTypeFormatter());
//                }
//                return null;
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }
//    }
//}
