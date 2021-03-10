using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using APTCWEB.Common;
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
using Newtonsoft.Json.Linq;
using System.Net.Http.Formatting;

namespace APTCWEB.Controllers
{

    /// <summary>
    /// DepartmentController
    /// </summary>
    [RoutePrefix("api")]
    public class DepartmentController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion

        /// <summary>
        /// Get all Departments
        /// </summary>
        /// <returns>return all departments and there roles and permissions</returns>
        [Route("aptc_depratments")]
        [HttpGet]
        public IHttpActionResult GetDepartments()
        {
            try
            {
                string Query = @"SELECT * From " + _bucket.Name + " as APTCREF  where meta().id='Departments'";
                var userDocument = _bucket.Query<object>(Query).ToList();
                JObject jsonObj = JObject.Parse(userDocument[0].ToString());
                JObject jsonDept = JObject.Parse(jsonObj["APTCREF"]["Dept"].ToString());
                return Content(HttpStatusCode.OK, ((System.Collections.Generic.IDictionary<string, Newtonsoft.Json.Linq.JToken>)jsonDept).Keys);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }

        }

        /// <summary>
        /// Get role by department name
        /// </summary>
        /// <returns>return all role and there permissions</returns>
        [Route("aptc_depratments/{id}")]
        [HttpGet]
        public IHttpActionResult GetDepartments(string id)
        {
            try
            {
                List<string> lstRole = new List<string>();
                string Query = @"SELECT  APTCREF.`Dept`.`"+ id + "` From APTCREF where meta().id='Departments'";
                var userDocument = _bucket.Query<object>(Query).ToList();
                JObject jsonObj = JObject.Parse(userDocument[0].ToString());
                return Content(HttpStatusCode.OK, jsonObj);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }

        }
    }
}
