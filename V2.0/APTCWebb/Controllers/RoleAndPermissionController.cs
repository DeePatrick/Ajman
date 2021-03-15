using APTCWebb.Common;
using APTCWebb.OutPutDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix("api")]
    public class RoleAndPermissionController : ApiController
    {
        /// <summary>
        /// Get user By email
        /// </summary>
        /// <returns>return staff details by id </returns>
        //[Route("aptc_user/{email}")]
        //[HttpGet]
        //[ResponseType(typeof(IndividualOutPut))]
        //public IActionResult GetRole()
        //{
        //    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, ""), new JsonMediaTypeFormatter());
        //}

        // GET: api/RoleAndPermission/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RoleAndPermission
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/RoleAndPermission/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/RoleAndPermission/5
        public void Delete(int id)
        {
        }
    }
}
