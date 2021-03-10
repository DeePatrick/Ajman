using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace APTCWEB.App_Start
{
    public class AuthAttribute : ActionFilterAttribute
    {
        private string apiUser = ConfigurationManager.AppSettings.Get("ApiUser");
        private string apiPassword = ConfigurationManager.AppSettings.Get("ApiPassword");
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var abc = actionContext.Request.Headers;
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                throw new HttpResponseException(actionContext.Response);
            }
            else
            {
                // Gets header parameters  
                string authenticationString = actionContext.Request.Headers.Authorization.Parameter;
                string originalString = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationString));

                // Gets username and password 
                string usrename = originalString.Split(':')[0];
                string password = originalString.Split(':')[1];
                // Check if it is valid credential 
                if (!apiUser.Equals(usrename) || !apiPassword.Equals(password))
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "unauthorized");
                    throw new HttpResponseException(actionContext.Response);
                }
                //throw new HttpResponseException(resp);
                //Trace.WriteLine(string.Format("Action Method {0} executing at {1}", actionContext.ActionDescriptor.ActionName, DateTime.Now.ToShortDateString()), "Web API Logs");
            }

            //public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
            //{
            //    Trace.WriteLine(string.Format("Action Method {0} executed at {1}", actionExecutedContext.ActionContext.ActionDescriptor.ActionName, DateTime.Now.ToShortDateString()), "Web API Logs");
            //}
        }
    }
}