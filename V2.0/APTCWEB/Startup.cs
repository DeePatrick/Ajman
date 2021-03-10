using Microsoft.Owin;
using Microsoft.Owin.Infrastructure;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Filters;
using Microsoft.Owin.Cors;
using Owin;

namespace APTCWEB
{
    public class Startup:AuthorizationFilterAttribute
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            //var oauthProvider = new OAuthAuthorizationServerProvider
            //{
            //    OnGrantResourceOwnerCredentials = async context =>
            //    {
            //        if (context.UserName == "rranjan" && context.Password == "password@123")
            //        {
            //            var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
            //            claimsIdentity.AddClaim(new Claim("user", context.UserName));
            //            context.Validated(claimsIdentity);
            //            return;
            //        }
            //        context.Rejected();
            //    },
            //    OnValidateClientAuthentication = async context =>
            //    {
            //        string clientId;
            //        string clientSecret;
            //        if (context.TryGetBasicCredentials(out clientId, out clientSecret))
            //        {
            //            if (clientId == "rajeev" && clientSecret == "secretKey")
            //            {
            //                context.Validated();
            //            }
            //        }
            //    }
            //};
            //var oauthOptions = new OAuthAuthorizationServerOptions
            //{
            //    AllowInsecureHttp = true,
            //    TokenEndpointPath = new PathString("/accesstoken"),
            //    Provider = oauthProvider,
            //    AuthorizationCodeExpireTimeSpan = TimeSpan.FromMinutes(1),
            //    AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(3),
            //    SystemClock = new SystemClock()

            //};
            //app.UseOAuthAuthorizationServer(oauthOptions);
            //app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            app.Use(config);
        }
    }
}