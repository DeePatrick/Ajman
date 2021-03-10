using APTCWEB.Common;
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
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

namespace APTCWEB.Controllers
{
    [RoutePrefix("api")]
    public class LicenseController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        #endregion
        // GET: api/License
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [Route("aptc.license/getlicenses")]
        [HttpGet]
        public IHttpActionResult GetAllDriver()
        {
            var driverDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Driver where id like 'Driver%' and  isDeleted=true and isActive=true").ToList();
            return Content(HttpStatusCode.OK, driverDocument);
        }

        [Route("aptc.license/create")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Register(License model)
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

                var licenseId = "License" + CreateUserKey(model.LicenseNumber);
                if (await _bucket.ExistsAsync(model.LicenseNumber))
                {
                    //return Content(HttpStatusCode.Conflict, new Error($"License:-'{model.LicenseNumber}' already exists"));
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "License already exists"), new JsonMediaTypeFormatter());
                }
                //call api check driver varification  with EmiratiId if driver valid the driver valid will be true otherwise false
                var licenseDoc = new Document<License>()
                {
                    Id = licenseId,
                    Content = new License
                    {
                        Id= licenseId,
                        Action ="Add",
                        IssueDate=model.IssueDate,
                        ExpiryDate=model.ExpiryDate,
                        IsActive = true,
                        IsDeleted = true,
                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
                    }
                };
                var result = await _bucket.InsertAsync(licenseDoc);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
        private static string CreateUserKey(string username)
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }
    }
}
