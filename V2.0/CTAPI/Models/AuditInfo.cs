using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CTAPI.Models
{
    /// <summary>
    /// Audit Info
    /// </summary>
    public class AuditInfo
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Version { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Remarks { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string LastChangeDate { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string LastChangeBy { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool IsDeleted { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DateCreated { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CreatedBy { get; set; }
    }
}