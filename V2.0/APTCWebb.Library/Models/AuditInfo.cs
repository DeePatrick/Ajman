using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.Json;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
{
    public class AuditInfo
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "version")]
        public string Version { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "status")]
        public string Status { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "remarks")]
        public string Remarks { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "lastChangeDate")]
        public string LastChangeDate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "lastChangeBy")]
        public string LastChangeBy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "isDeleted")]
        public bool IsDeleted { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "dateCreated")]
        public string DateCreated { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "createdBy")]
        public string CreatedBy { get; set; }
    }
}