using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWEB.OutPutDto
{
    /// <summary>
    /// DocIn OutPut
    /// </summary>
    public class DocInOutPut
    {
        [JsonProperty("docInId")]
        public string DocInId { get; set; }

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
        public string Version { get; set; }

        [JsonProperty("dateTime")]
        public string DateTime { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("validFrom")]
        public string validFrom { get; set; }

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

        //[JsonProperty("metaData")]
        //public MetaData MetaData { get; set; } = new MetaData { DocClass = "", DocType = "", Lang = "English", Version = 1, DateTime = DateTime.Now.ToString(), Status = "Active", ValidFrom = DateTime.Now.ToString(), ValidTo = DateTime.Now.AddDays(60).ToString(), RejReas = "", IndivID = "individual_id", VehID = "", CompID = "" };

        [JsonProperty("docContent")] 
        public DocContent DocContent { get; set; } = new DocContent { Duration = string.Empty, Fees = string.Empty };

        [JsonProperty("docFile")]
        public List<DocFile> DocFile { get; set; }

        ///////////////// Add New fields for License & Passport Data - 02-Nov-2018 - as discussed with brijesh,Vinay & mosaab.
       
        /// <summary>
        ///  ID 
        /// </summary>
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("issueDate")]
        public string IssueDate { get; set; }

        [JsonProperty("expiryDate")]
        public string ExpiryDate { get; set; }

        [JsonProperty("place")]
        public string Place { get; set; }

        [JsonProperty("categories")]
        public string Categories { get; set; }

    }
}