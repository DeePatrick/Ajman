using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using APTCWebb.Models;
using Couchbase;
using Couchbase.Core;

namespace APTCWebb.Controllers
{
    [RoutePrefix("api/aptclogin")]
    public class APTCLOGINController : ApiController
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseLoginBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

        // GET: api/aptclogin
        [Route("{id}")]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/aptclogin/5
        [Route("{id}")]
        [HttpGet]
        public IActionResult GetLogin(string id)
        {
            try
            {
                var userDocument = _bucket.Query<object>(@"SELECT * From APTCLOGIN where id= '" + id + "'").ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "plaese enter valid user id.");
                }
                else
                {
                    return Content(HttpStatusCode.OK, userDocument);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, ex.Message);
            }
        }

        [Route("getallLogin")]
        [HttpGet]
        public IActionResult GetAllLogin()
        {
            var driverStatusDocument = _bucket.Query<object>(@"SELECT * From `APTCLOGIN` as LOGIN where id like 'LOGIN_%'").ToList();
            return Content(HttpStatusCode.OK, driverStatusDocument);
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> RegisterLogin(Login model)
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
                    return Content(HttpStatusCode.BadRequest, modelErrors[0].ToString());
                }
                
                var userKey = "LOGIN_" + model.UserId;
                if (await _bucket.ExistsAsync(userKey))
                {
                    return Content(HttpStatusCode.Conflict, new Error($"UserId '{model.UserId}' already exists"));
                }
                // call third part api to check Vehicle is valid or not
                var loginDoc = new Document<Login>()
                {
                    Id = userKey,
                    Content = new Login
                    {
                        Id = userKey,
                        UserId = model.UserId,
                        Password = model.Password,
                        Type = model.Type,
                        Status = model.Status,
                        Role = model.Role,
                        Per_language = model.Per_language,
                        Created_on = DateTime.Now.Date.ToString()
                    }
                };
                var result = await _bucket.InsertAsync(loginDoc);
                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
                }

                return Content(HttpStatusCode.Accepted, result.Document.Id);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, ex.StackTrace);
            }
        }

        private static string CreateUserKey(string username)
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }

        // PUT: api/aptclogin/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/APTCLOGIN/5
        public void Delete(int id)
        {
        }
    }
}
