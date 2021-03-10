using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Filters;
using System.Configuration;

namespace CTAPI.App_Start
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute,IFilter
    {
        private string IpAddress = ConfigurationManager.AppSettings.Get("APIIPADDRESS");
        private string ApiKey = ConfigurationManager.AppSettings.Get("APIKEY");
        private string GetIP()
        {
            string strHostName = "";
            strHostName = System.Net.Dns.GetHostName();

            IPHostEntry ipEntry = System.Net.Dns.GetHostEntry(strHostName);

            IPAddress[] addr = ipEntry.AddressList;

            return addr[addr.Length - 1].ToString();

        }
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            //if (actionContext.Request.Headers.Authorization == null)
            //{
            //    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            //}
            //else
            //{
            //    // Gets header parameters  
            //    string authenticationString = actionContext.Request.Headers.Authorization.Parameter;
            //    string originalString = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationString));

            //    // Gets username and password 
            //    string validuserId = "arvind";
            //    string validpassword = "arvind123";
            //    string usrename = originalString.Split(':')[0];
            //    string password = originalString.Split(':')[1];
            //    // Check if it is valid credential 
            //    if (!validuserId.Equals(usrename) || !validpassword.Equals(password))
            //    {
            //        actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "unauthorized");
            //    }

            //}

            base.OnAuthorization(actionContext);
        }
    }
}