using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    public class AuditLogs
    {
        public string Method { get; set; }
        public string URL { get; set; }
        public string ControllerName { get; set; }
        public string Action { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string StatusCode { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status{ get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ResponseParameter  { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string RequestParameter { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Response { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ResponseMessage { get; set; }
        public string LogDate { get; set; }
        public string LogTime { get; set; }
    }
}