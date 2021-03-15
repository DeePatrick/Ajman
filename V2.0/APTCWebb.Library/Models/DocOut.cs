using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Doc Out
    /// </summary>
    public class DocOut
    {
        [JsonProperty("docType")]
        [Required(ErrorMessage = "187-document doctype is required")]
        public string DocType { get; set; }

        [Required(ErrorMessage = "123-language is required")]
        [JsonProperty("lang")]
        public string Lang { get; set; }

        [JsonProperty("version")]
        public int Version { get; set; }

        [JsonProperty("dateTime")]
        public string DateTime { get; set; }

        [JsonProperty("status")]
        public bool Status { get; set; }

        //[Required(ErrorMessage = "187-document referance is required")]
        [JsonProperty("docRef")]
        public string DocRef { get; set; }

        //[JsonProperty("metaData")]
        //public MetaData MetaData { get; set; }
        //[Required(ErrorMessage = "190-document valid from is required")]
        [JsonProperty("validFrom")]
        public string ValidFrom { get; set; }

        //[Required(ErrorMessage = "191-document valid to is required")]
        [JsonProperty("validTo")]
        public string ValidTo { get; set; }

        /// <summary>
        /// Rejection Reason
        /// </summary>
        [JsonProperty("rejReas")]
        public string RejReas { get; set; }

        [JsonProperty("indivID")]
        public string IndivID { get; set; }

        [JsonProperty("vehID")]
        public string VehID { get; set; }

        [JsonProperty("compID")]
        public string CompID { get; set; }

        [JsonProperty("docClass")]
        public string DocClass { get; set; }

        [JsonProperty("docContent")]
        public DocContent DocContent { get; set; }

        /// <summary>
        /// ////////// DocFormat & DocImage should be array as discussed with Joe - 22-Sep-2018
        /// </summary>
        [JsonProperty("docFile")]
        public List<DocFile> DocFile { get; set; }

        [JsonProperty("docAccepted")]
        public string DocAccepted    { get; set; }
    }

    /// <summary>
    /// PERMIT Details 
    /// </summary>
    public class PERMDET
    {
        [JsonProperty("permitID")]
        public string PermitID { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }


        [JsonProperty("capacity")]
        public string Capacity { get; set; }

        [JsonProperty("duration")]
        public string Duration { get; set; }
    }
}