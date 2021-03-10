using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    public class MessageModel
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }
        public string StatusCode { get; set; }
        public string ResponseMessage { get; set; }
        public string ResponseType { get; set; }
        public bool IsSuccess { get; set; }
    }
}