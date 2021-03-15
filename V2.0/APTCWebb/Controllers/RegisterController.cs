//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Net.Http.Headers;
//using System.Security.Cryptography;
//using System.Text;
//using System.Threading.Tasks;
//using System.Web.Http;
//using Couchbase;
//using Couchbase.Core;
//using Couchbase.IO;
//using JWT;
//using APTCWebb.Models;

//namespace APTCWebb.Controllers
//{
//    [RoutePrefix("api/register")]
//    public class RegisterController : ApiController
//    {
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseUserBucket"));
//        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];

//        // GET: api/Register
//        public IEnumerable<string> Get()
//        {
//            return new string[] { "value1", "value2" };
//        }

//        // GET: api/Register/5
//        public string Get(int id)
//        {
//            return "value";
//        }

//        // POST: api/Register
//        [HttpPost]
//        public async Task<IActionResult> Register(Register model)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                {
//                    return Content(HttpStatusCode.Forbidden, new Error($"error: '{ ModelState.Values.ToString()}'"));
//                }

//                var userKey = Guid.NewGuid().ToString(); ;
//                if (await _bucket.ExistsAsync(userKey.ToString()))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"Email '{model.Email}' already exists"));
//                }
//                var userDoc = new Document<Register>()
//                {
//                    Id = userKey,
//                    Content = new Register
//                    {
//                        Id = userKey,
//                        Name = model.Name,
//                        Email = model.Email,
//                        Password = model.Password
//                    }
//                };
//                var result = await _bucket.InsertAsync(userDoc);
//                if (!result.Success)
//                {
//                    return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
//                }

//                return Content(HttpStatusCode.Accepted, "success");
//                //return Content(HttpStatusCode.OK, "success");
//            }
//            catch (Exception ex)
//            {

//                return Content(HttpStatusCode.Forbidden, ex.Message);
//            }
//        }

//        // PUT: api/Register/5
//        public void Put(int id, [FromBody]string value)
//        {

//        }

//        // DELETE: api/Register/5
//        public void Delete(int id)
//        {
//        }
//    }
//}
