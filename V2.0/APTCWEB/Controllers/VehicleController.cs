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
using APTCWEB.Common;
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;

namespace APTCWEB.Controllers
{
    //[RoutePrefix("api")]
    //public class VehicleController : ApiController
    //{
    //    #region PrviavteFields
    //    private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
    //    private readonly IBucket _bucketAPTCREF = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
    //    private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
    //    #endregion
    //    // GET: api/vehicle
    //    public IEnumerable<string> Get()
    //    {
    //        return new string[] { "value1", "value2" };
    //    }

    //    // GET: api/vehicle/5
    //    [Route("car.vehicle/{id}")]
    //    [HttpGet]
    //    public IHttpActionResult GetVehicle(string id)
    //    {
    //        var result = _bucket.Get<object>(@"SELECT * From " + _bucket.Name + " as Vehicle where id like 'Vehicle%' and id= '" + id + "'");
    //        return Content(HttpStatusCode.OK, result);
    //    }

    //    [Route("car.vehicle/getall")]
    //    [HttpGet]
    //    public IHttpActionResult GetAllVehicle()
    //    {
    //        var allDriverDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Vehicle where id like 'Vehicle%'").ToList();
    //        return Content(HttpStatusCode.OK, allDriverDocument);
    //    }

        
    //    [Route("car.vehicle")]
    //    [HttpPost]
    //    [ResponseType(typeof(MessageModel))]
    //    public async Task<IHttpActionResult> RegisterDriver(Vehicle model)
    //    {
    //        try
    //        {

    //            if (!ModelState.IsValid)
    //            {
    //                var modelErrors = new List<string>();
    //                foreach (var modelState in ModelState.Values)
    //                {
    //                    foreach (var modelError in modelState.Errors)
    //                    {
    //                        modelErrors.Add(modelError.ErrorMessage);
    //                    }
    //                }
    //                return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
    //            }

    //            var userKey = "Vehicle_"+model.Vin;

    //            if (await _bucket.ExistsAsync(userKey))
    //            {
    //                //return Content(HttpStatusCode.Conflict, new Error($"Vehicle '{model.EngineNumber}' already exists"));
    //                return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "171-Vin numbner already exists"), new JsonMediaTypeFormatter());
    //            }
    //            // call third part api to check Vehicle is valid or not
    //            var vehicleDoc = new Document<Vehicle>()
    //            {
    //                Id = userKey,
    //                Content = new Vehicle
    //                {
    //                     Id = userKey,
    //                     Vin =model.Vin,
    //                     EngineNumber=model.EngineNumber,
    //                     Registration=model.Registration,
    //                     Action="Add",
    //                     Vehicletype=model.Vehicletype,
    //                     VehicleValid=true,
    //                     Colour=model.Colour,
    //                     Make=model.Make,
    //                     Model=model.Model,
    //                     ModelYear=model.ModelYear,
    //                     IsActive = true,
    //                     IsDeleted = true,
    //                     CreatedDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),

    //                    CarTrackVehicleResponse = new CarTrackVehicleResponse
    //                      {
    //                          CTStatus = "No",
    //                          CTDescription = ""
    //                      }
    //                }
    //            };
    //            var result = await _bucket.InsertAsync(vehicleDoc);
    //            if (!result.Success)
    //            {
    //                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
    //            }
    //            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
    //        }
    //    }

    //    private static string CreateUserKey(string username)
    //    {
    //        var key = Guid.NewGuid(); ; //$"user:{username}";
    //        return key.ToString();
    //    }

    //    // PUT: api/vehicle/5
    //    public void Put(int id, [FromBody]string value)
    //    {
    //    }

    //    [Route("car.vehicle/delete/{id}")]
    //    [HttpGet]
    //    public async Task<IHttpActionResult> Delete(string id)
    //    {
    //        try
    //        {

    //            var result = await _bucket.RemoveAsync(id);
    //            if (!result.Success)
    //            {
    //                return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
    //            }

    //            return Content(HttpStatusCode.Accepted, "deleted");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(HttpStatusCode.Forbidden, ex.StackTrace);
    //        }
    //    }

    //    [Route("car.vehicle/edit/{id}")]
    //    [HttpGet]
    //    public async Task<IHttpActionResult> Edit(string id)
    //    {
    //        try
    //        {
    //            //string queryString = @" select firstNameEN , lasttNameEN 
    //            //,firstNameAR , lastNameAR , mobileNumber , emailAddress  , vehicleType  , permitNumber  , licenseNumber , pasportNumber 
    //            //,carTrackDriverResponse.ctStatus='No' ,carTrackDriverResponse.ctDescription,ModifiedDate from APTCCRM
    //            //where id= '" + id + "'";
    //            //var result = await _bucket.QueryAsync<DriverModel>(queryString);

    //            var result = await _bucket.GetAsync<object>(id);
    //            if (!result.Success)
    //            {
    //                return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
    //            }

    //            return Content(HttpStatusCode.Accepted, result);
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(HttpStatusCode.Forbidden, new Error(ex.StackTrace));
    //        }
    //    }

    //    [Route("car.vehicle/update")]
    //    [HttpPost]
    //    public async Task<IHttpActionResult> Update(Vehicle model)
    //    {
    //        try
    //        {
    //            string queryString = @" update " + _bucket.Name + " set  vin='" + model.Vin + "',registration='" +  model.Registration + "',vehicletype='"+ model.Vehicletype + "',make='"+ model.Make + "',model='" + model.Model + "',modelYear='"+ model.ModelYear + "',colour='"+ model.Colour +"',action='MOD',carTrackVehicleResponse.ctStatus='No' ,carTrackVehicleResponse.ctDescription='',ModifiedDate='" + DateTime.Now.ToString() + "'  where id= '" + model.Id + "'";
    //            var result = await _bucket.QueryAsync<DriverModel>(queryString);

    //            if (!result.Success)
    //            {
    //                return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
    //            }

    //            return Content(HttpStatusCode.Accepted, model.Id.ToLower() + " updated successfully");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(HttpStatusCode.Forbidden, new Error(ex.StackTrace));
    //        }
    //    }

    //    // GET: api/vehicle/VehicleType
    //    [Route("car.vehicle/vehicleTypeDDL")]
    //    [HttpGet]
    //    public IHttpActionResult BindVehicleTypeDDL()
    //    {
    //        var allVehicleType = _bucket.Query<object>(@"select VehType from "+ _bucketAPTCREF.Name + " where meta().id='REF::EN-USA'").ToList();
    //        //var allVehicleType = _bucket.Query<object>(@"select VehType[*].Val from "+ _bucketAPTCREF.Name + "").ToList();
    //        return Content(HttpStatusCode.OK, allVehicleType);
    //    }

    //    // GET: api/vehicle/ColourDDL
    //    [Route("car.vehicle/colourDDL")]
    //    [HttpGet]
    //    public IHttpActionResult BindColourDDL()
    //    {
    //        var allColour = _bucket.Query<object>(@"select VehColour from " + _bucketAPTCREF.Name + " where meta().id='REF::EN-USA'").ToList();
    //        //var allVehicleType = _bucket.Query<object>(@"select VehColour[*].Val from "+ _bucketAPTCREF.Name + "").ToList();
    //        return Content(HttpStatusCode.OK, allColour);
    //    }

    //    // GET: api/vehicle/MakeDDL
    //    [Route("car.vehicle/makeDDL")]
    //    [HttpGet]
    //    public IHttpActionResult BindMakeDDL()
    //    {
    //        var allMake = _bucket.Query<object>(@"select VehMake from " + _bucketAPTCREF.Name + " where meta().id='REF::EN-USA'").ToList();
    //        //var allVehicleType = _bucket.Query<object>(@"select VehColour[*].Val from "+ _bucketAPTCREF.Name + "").ToList();
    //        return Content(HttpStatusCode.OK, allMake);
    //    }

    //    // GET: api/vehicle/MakeDDL
    //    [Route("car.vehicle/modelDDL/{id}")]
    //    [HttpGet]
    //    public IHttpActionResult BindModelDDL(int id)
    //    {
    //        var allModel = _bucket.Query<object>(@"select item.Model from " + _bucketAPTCREF.Name + " UNNEST VehMake AS item where item.Code=" + id + "").ToList();
    //        //var allVehicleType = _bucket.Query<object>(@"select VehColour[*].Val from "+ _bucketAPTCREF.Name + "").ToList();
    //        return Content(HttpStatusCode.OK, allModel);
    //    }
    //}
}