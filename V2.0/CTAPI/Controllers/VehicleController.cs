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
using CTAPI.Common;
using CTAPI.Models;
using Couchbase;
using Couchbase.Core;
using System.Text;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CTAPI.Controllers
{
    /// <summary>
    /// Vehicle Controller
    /// </summary>
    [RoutePrefix("api")]
    public class VehicleController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        //private readonly IBucket _bucketAPTCREF = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        //private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        ///// <summary>
        ///// Push Vehicle
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns>Push</returns>
        //[Route("car_vehicle")]
        //[HttpPost]
        //[ResponseType(typeof(MessageModel))]
        //public async Task<IHttpActionResult> RegisterDriver(Vehicle model)
        //{
        //    try
        //    {

        //        if (!ModelState.IsValid)
        //        {
        //            var modelErrors = new List<string>();
        //            foreach (var modelState in ModelState.Values)
        //            {
        //                foreach (var modelError in modelState.Errors)
        //                {
        //                    modelErrors.Add(modelError.ErrorMessage);
        //                }
        //            }
        //            return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
        //        }

        //        var userKey = "Vehicle_"+model.Vin; // This is vehicle chassis number. - unique number of vehicle discussed with mosaab

        //        if (await _bucket.ExistsAsync(userKey))
        //        {
        //            //return Content(HttpStatusCode.Conflict, new Error($"Vehicle '{model.EngineNumber}' already exists"));
        //            return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "171-VIN number (chassis number) already exists."), new JsonMediaTypeFormatter());
        //        }
        //        // call third part api to check Vehicle is valid or not
        //        var vehicleDoc = new Document<Vehicle>()
        //        {
        //            Id = userKey,
        //            Content = new Vehicle
        //            {
        //                //Id= userKey,
        //                 Vin = model.Vin,
        //                 EngineNumber=model.EngineNumber,
        //                 Registration=model.Registration,
        //                 Action="Add",
        //                 Franchise=model.Franchise,
        //                 Vehicletype=model.Vehicletype,
        //                 VehicleValid=true,
        //                 Colour=model.Colour,
        //                 Make=model.Make,
        //                 Model=model.Model,
        //                 ModelYear=model.ModelYear,
        //                 IsActive = true,
        //                 IsDeleted = false,
        //                 CreatedDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),

        //                CarTrackVehicleResponse = new CarTrackVehicleResponse
        //                  {
        //                      CTStatus = "No",
        //                      CTDescription = ""
        //                  }
        //            }
        //        };
        //        var result = await _bucket.InsertAsync(vehicleDoc);
        //        if (!result.Success)
        //        {
        //            return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
        //        }
        //        return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
        //    }
        //}

        /// <summary>
        /// Update Vehicle Data by CT
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Push</returns>
        [Route("car_update_vehicle")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> UpdateVehicle(Vehicle_CT_Data model)
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
                            modelErrors.Add(modelError.ErrorMessage);
                        }
                    }
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
                }

                string query = @"select* from " + _bucket.Name + " as APTC_Vehicle where meta().id like 'Vehicle_%' and vin = '" +  model.Registration +"'";
                
                var vehicleIsExistOrNot = _bucket.Query<object>(query).ToList();
                if (vehicleIsExistOrNot.Count == 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), model.Registration + " vehicle not exists."), new JsonMediaTypeFormatter());
                }

                var userKey = "Vehicle_CT_Data_" + model.Registration; // This is vehicle chassis number. - unique number of vehicle discussed with mosaab  // in Our DB it`s vin

                if (await _bucket.ExistsAsync(userKey))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"Vehicle '{model.EngineNumber}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "171-Registration number already exists."), new JsonMediaTypeFormatter());
                }
                // call third part api to check Vehicle is valid or not
                var vehicle_CT_Data_Doc = new Document<Vehicle_CT_Data>()
                {
                    Id = userKey,
                    Content = new Vehicle_CT_Data
                    {
                            Registration         = model.Registration,
                            Taxi_type            = model.Taxi_type,
                            Manufacturer         = model.Manufacturer,
                            Model                = model.Model,
                            Modelyear            = model.Modelyear,
                            Colour               = model.Colour,
                            Passenger_capacity   = model.Passenger_capacity,
                            Vehicle_status       = model.Vehicle_status,
                            Vehicle_enabled      = model.Vehicle_enabled,
                            Franchisee_user_name = model.Franchisee_user_name,
                            IsActive=false,
                            Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                            Created_By = "CarTrack"//model.DriverID
                    }
                };
                var result = await _bucket.InsertAsync(vehicle_CT_Data_Doc);
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
        /// Update Vehicle Data from CT to AjmanGO
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Push</returns>
        [Route("car_update_APTCVehicle")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> updateAPTCVehicle(Vehicle_CT_Data model)
        {
            //string CTDriverUpdateAPI = ConfigurationManager.AppSettings.Get("CTDriverUpdateAPI"); 
            string CTUpdateAPIURL = ConfigurationManager.AppSettings.Get("CTVehicleUpdateURL");
            string CTAPIUserId = ConfigurationManager.AppSettings.Get("CTAPIUserId");
            string CTAPIPassword = ConfigurationManager.AppSettings.Get("CTAPIPassword");

            try
            {
                using (var client = new HttpClient())
                {
                    using (var request = new HttpRequestMessage(HttpMethod.Post, CTUpdateAPIURL))
                    {
                        var byteArray = Encoding.ASCII.GetBytes(CTAPIUserId + ":" + CTAPIPassword);
                        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                        var jsonInpt = JsonConvert.SerializeObject(model);


                        var response = await client.PostAsync(CTUpdateAPIURL, new StringContent(jsonInpt));

                        response.EnsureSuccessStatusCode();

                        string content = await response.Content.ReadAsStringAsync();

                        JObject json = JObject.Parse(content);

                        if (response.StatusCode == HttpStatusCode.OK)
                        {
                            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), content, ""), new JsonMediaTypeFormatter());
                        }
                        else
                        {
                            return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), ""), new JsonMediaTypeFormatter());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), ex.InnerException.Message.ToString()), new JsonMediaTypeFormatter());
            }

        }

        private static string CreateUserKey(string username)
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }

    }
}