using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CTAPI.Models
{
    public class CTResponse
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool CTStatus { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CTResponseId { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CTRemarks { get; set; }
    }
}