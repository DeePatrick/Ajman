using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace APTCWebb.Library.Models
{
    public class CommonModel
    {

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool IsActive { get; set; } = true;

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Action { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Created_On { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Modified_On { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Created_By { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Modified_By { get; set; }
    }
}
