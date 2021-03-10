using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace CTAPI.ActionFilters
{
    public class ApiAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        private string GETAPIKEY = ConfigurationManager.AppSettings.Get("GETAPIKEY");
        private string POSTAPIKEY = ConfigurationManager.AppSettings.Get("POSTAPIKEY");
        private string GetIP()
        {
            string strHostName = "";
            strHostName = System.Net.Dns.GetHostName();

            IPHostEntry ipEntry = System.Net.Dns.GetHostEntry(strHostName);

            IPAddress[] addr = ipEntry.AddressList;

            return addr[addr.Length - 1].ToString();

        }
        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            HttpRequestHeaders headers = context.Request.Headers;
            string requestGetApiKey = headers.GetValues("getApiKey").First();
            string requestPostApiKey = headers.GetValues("postApiKey").First();
            if (string.IsNullOrEmpty(requestPostApiKey) && string.IsNullOrEmpty(requestPostApiKey))
            {

            }
            else
            {
                if (!string.IsNullOrEmpty(requestPostApiKey))
                {

                }
            }
            //context.Request.Method.Method
            if (context.Request.Method.Method == "GET")
            {
                if (!GETAPIKEY.Equals(requestGetApiKey))
                {
                    HttpContext.Current.Response.Write("you are not authorized to access api.Please check api key");
                    context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                }
            }
            if (context.Request.Method.Method == "POST")
            {
                if (!POSTAPIKEY.Equals(requestPostApiKey))
                {
                    HttpContext.Current.Response.Write("you are not authorized to access api.Please check api key");
                    context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[0], context.Request);
                }
            }

            return Task.FromResult(0);
        }
        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            context.Result = new ResultWithChallenge(context.Result);
            return Task.FromResult(0);
        }

        public bool AllowMultiple
        {
            get { return false; }
        }

        private string[] GetAutherizationHeaderValues(string rawAuthzHeader)
        {

            var credArray = rawAuthzHeader.Split(':');

            if (credArray.Length == 4)
            {
                return credArray;
            }
            else
            {
                return null;
            }

        }

    }
    public class ResultWithChallenge : IHttpActionResult
    {
        private readonly string authenticationScheme = "amx";
        private readonly IHttpActionResult next;

        public ResultWithChallenge(IHttpActionResult next)
        {
            this.next = next;
        }

        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = await next.ExecuteAsync(cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                response.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue(authenticationScheme));
            }

            return response;
        }
    }
    public class MeesageModel
    {
        public string StatusCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}