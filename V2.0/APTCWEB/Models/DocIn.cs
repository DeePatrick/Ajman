using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWEB.Models
{
    /// <summary>
    /// Doc In
    /// </summary>
    public class DocIn
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

//public class MetaData
//{
//    [Required(ErrorMessage = "188-document class is required")]
//    [JsonProperty("docClass")]
//    public string DocClass { get; set; } 

//    [Required(ErrorMessage = "189-document type is required")]
//    [JsonProperty("docType")]
//    public string DocType { get; set; }

//    [Required(ErrorMessage = "123-language is required")]
//    [JsonProperty("lang")]
//    public string Lang { get; set; }

//    [JsonProperty("version")]
//    public int Version { get; set; }

//    [JsonProperty("dateTime")]
//    public string DateTime { get; set; }

//    [JsonProperty("status")]
//    public string Status { get; set; }

//    //[Required(ErrorMessage = "190-document valid from is required")]
//    [JsonProperty("validFrom")]
//    public string ValidFrom { get; set; }

//    //[Required(ErrorMessage = "191-document valid to is required")]
//    [JsonProperty("validTo")]
//    public string ValidTo { get; set; }

//    [JsonProperty("rejReas")]
//    public string RejReas { get; set; }

//    [JsonProperty("indivID")]
//    public string IndivID { get; set; }

//    [JsonProperty("vehID")]
//    public string VehID { get; set; }

//    [JsonProperty("compID")]
//    public string CompID { get; set; }
//} 
public class DocContent
{
    [JsonProperty("duration")]
    public string Duration { get; set; }

    [JsonProperty("fees")]
    public string Fees { get; set; }
} 

public class DocFile
{
    [Required(ErrorMessage = "190-document format is required")]
    [JsonProperty("docFormat")]
    public string DocFormat { get; set; }

    [Required(ErrorMessage = "198-docImage is required")]
    [JsonProperty("docImage")]
    public string DocImage { get; set; }
}