using APTCWEB.ActionFilters;
using APTCWEB.App_Start;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APTCWEB
{
    /// <summary>
    /// 
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };// this is use for make default json formate in CamelCase
            //config.Filters.Add(new BasicAuthenticationAttribute());
            //config.Filters.Add(new LoggingFilterAttribute());
            //config.Filters.Add(new BasicAuthenticationAttribute());
            config.Filters.Add(new GlobalExceptionAttribute());
            config.MapHttpAttributeRoutes();
        }
    }
}
