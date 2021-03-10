using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Filters;
using System.Configuration;
using System.Web.Http;

namespace APTCWEB.App_Start
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        private string apiUser = ConfigurationManager.AppSettings.Get("ApiUser");
        private string apiPassword = ConfigurationManager.AppSettings.Get("ApiPassword");
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return;
            }
            else
            {
                // Gets header parameters  
                string authenticationString = actionContext.Request.Headers.Authorization.Parameter;
                string originalString = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationString));

                // Gets username and password 
                string validuserId = "arvind";
                string validpassword = "arvind123";
                string usrename = originalString.Split(':')[0];
                string password = originalString.Split(':')[1];
                // Check if it is valid credential 
                if (!apiUser.Equals(usrename) || !apiPassword.Equals(password))
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "unauthorized");
                    return;
                }
                
            }
            
            base.OnAuthorization(actionContext);
        }
    }
    
}