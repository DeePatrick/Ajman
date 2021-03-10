using Couchbase.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using APTCWEB.Models;
using APTCWEB.Common;
using System.Net.Http.Formatting;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Role Permissions Controller
    /// </summary>
    [RoutePrefix("api")]
    public class RolePermissionsController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = Couchbase.ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        string baseFilePath = ConfigurationManager.AppSettings["BaseFilePath"];
        #endregion

        /// <summary>
        /// Get Role Permissions by DeptCode and roleCode
        /// </summary>
        /// <param name="deptCode"></param>
        /// <param name="roleCode"></param>
        /// <returns></returns>
        [Route("aptc_RolePermissions/{deptCode}/{roleCode}")]
        [HttpGet]
        //[ResponseType(typeof(USMParamsOutPut))]
        public IHttpActionResult GetRolePermissions(string deptCode, string roleCode)
        {
            try
            {
                RolePermissions objRolePermissions = new RolePermissions();
                
                //string query = @"SELECT * FROM " +_bucket.Name + " as rolePer where meta().id = 'RolePermissions'";
                string query = @"SELECT du.Permissions as Permissions FROM " + _bucket.Name + " AS d USE KEYS['RolePermissions'] UNNEST d.RolePermission AS du  where du.DeptCode = '"+deptCode+"' AND du.RoleCode = '"+roleCode+"'";
                var rolePermissionsDocument = _bucket.Query<object>(query).ToList();

                if (rolePermissionsDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "201-please enter valid deptCode/roleCode.");
                }
                else
                {
                    return Content(HttpStatusCode.OK, rolePermissionsDocument);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
