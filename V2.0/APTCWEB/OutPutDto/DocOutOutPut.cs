using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWEB.OutPutDto
{
    /// <summary>
    /// DocOut OutPut
    /// </summary>
    public class DocOutOutPut
    {
        [JsonProperty("docOutId")]
        public string DocOutId { get; set; }

        [JsonProperty("docType")]
        public string DocType { get; set; }

        [JsonProperty("docTypeName")]
        public string DocTypeName { get; set; }

        [JsonProperty("docRef")]
        public string DocRef { get; set; }

        [JsonProperty("docClass")]
        public string DocClass { get; set; }


        [JsonProperty("docClassName")]
        public string DocClassName { get; set; }

        [JsonProperty("lang")]
        public string Lang { get; set; }

        [JsonProperty("version")]
        public int Version { get; set; }

        [JsonProperty("dateTime")]
        public string DateTime { get; set; }

        [JsonProperty("status")]
        public bool Status { get; set; }

        [JsonProperty("validFrom")]
        public string ValidFrom { get; set; }

        [JsonProperty("validTo")]
        public string ValidTo { get; set; }

        [JsonProperty("rejReas")]
        public string RejReas { get; set; }

        [JsonProperty("indivID")]
        public string IndivID { get; set; }

        [JsonProperty("indivName")]
        public string IndivName { get; set; }

        [JsonProperty("vehID")]
        public string VehID { get; set; }

        [JsonProperty("vehIDTrafficNum")]
        public string VehIDTrafficNum { get; set; }

        [JsonProperty("vehIDMake")]
        public string VehIDMake { get; set; }

        [JsonProperty("vehIDModel")]
        public string VehIDModel { get; set; }

        [JsonProperty("compID")]
        public string CompID { get; set; }

        [JsonProperty("compIDName")]
        public string CompIDName { get; set; }

        [JsonProperty("docContent")]
        public DocContent DocContent { get; set; } = new DocContent { Duration = string.Empty, Fees = string.Empty };

        [JsonProperty("docFile")]
        public List<DocFile> DocFile { get; set; }

        [JsonProperty("docAccepted")]
        public string DocAccepted { get; set; }
    }
}