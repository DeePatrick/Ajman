using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Staff
    /// </summary>

    public class Staff
    {
        /// <summary>
        /// Key ID
        /// </summary>
        [JsonProperty(PropertyName = "keyID")]
        public string KeyID { get; set; }

        /// <summary>
        /// Doc Type
        /// </summary>
        [JsonProperty(PropertyName = "docType")]
        public string DocType { get; set; }

        /// <summary>
        /// Doc Type
        /// </summary>
        [JsonProperty(PropertyName = "isActive")]
        public bool IsActive { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        /// <summary>
        /// DOB
        /// </summary>
        [Required(ErrorMessage = "224-dob is required")]
        [JsonProperty(PropertyName = "dob")]
        public string DOB { get; set; }

        /// <summary>
        /// Nationality
        /// </summary>
        [JsonProperty(PropertyName = "nationality")]
        [Required(ErrorMessage = "225-nationality is required")]
        public string Nationality { get; set; }

        /// <summary>
        /// Religion
        /// </summary>
        [JsonProperty(PropertyName = "religion")]
        [Required(ErrorMessage = "226-religion is required")]
        public string Religion { get; set; }

        /// <summary>
        /// Notes
        /// </summary>
        [JsonProperty(PropertyName = "notes")]
        public string Notes { get; set; }

        /// <summary>
        /// Gender
        /// </summary>
        [JsonProperty(PropertyName = "gender")]
        [Required(ErrorMessage = "227-gender is required")]
        public string Gender { get; set; }

        /// <summary>
        /// Language
        /// </summary>
        [JsonProperty(PropertyName = "language")]
        [Required(ErrorMessage = "228-language is required")]
        public string Language { get; set; }

        /// <summary>
        /// MaritalStatus
        /// </summary>
        [JsonProperty(PropertyName = "maritalStatus")]
        [Required(ErrorMessage = "229-maritalstatus is required")]
        public string MaritalStatus { get; set; }

        /// <summary>
        /// Documents
        /// </summary>
        [JsonProperty(PropertyName = "documents")]
        public List<Documents> Documents { get; set; }

        /// <summary>
        /// MobNum
        /// </summary>
        [JsonProperty(PropertyName = "mobNum")]
        public MobNum MobNum { get; set; }

        /// <summary>
        /// TelNum
        /// </summary>
        [JsonProperty(PropertyName = "telNum")]
        public TelNum TelNum { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        [JsonProperty(PropertyName = "address")]
        public Address Address { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty(PropertyName = "fullName")]
        public FullName fullName { get; set; }

        /// <summary>
        /// AuditInfo
        /// </summary>
        [JsonProperty(PropertyName = "auditInfo")]
        public List<AuditInfo> AuditInfo { get; set; }

        /// <summary>
        /// LoginDetails
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Login LoginDetails { get; set; }
    }

    public class UserDetails
    {

        //SELECT email, docType, address, dob, documents, gender, isActive, keyID, language, fullName, auditInfo
        //                    , maritalStatus, notes, nationality, religion, mobNum, telNum From APTCCRM as `personelInformation` where meta().id like'user_%' and isActive = true
        [JsonProperty("fullName")]
        public FullName FullName { get; set; }
        [JsonProperty("dob")]
        public string DOB { get; set; }
        [JsonProperty("docType")]
        public string DocType { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        public Address address { get; set; }
        [JsonProperty("auditInfo")]
        public List<AuditInfo> AuditInfo { get; set; }
        [JsonProperty("gender")]
        public string Gender { get; set; }
        [JsonProperty("isActive")]
        public bool IsActive { get; set; }
        [JsonProperty("keyID")]
        public string KeyID { get; set; }
        [JsonProperty("language")]
        public string Language { get; set; }
        [JsonProperty("maritalStatus")]
        public string MaritalStatus { get; set; }
        [JsonProperty("notes")]
        public string Notes { get; set; }
        [JsonProperty("mobNum")]
        public MobNum MobNum { get; set; }
        [JsonProperty("telNum")]
        public TelNum TelNum { get; set; }
        [JsonProperty("nationality")]
        public string Nationality { get; set; }
        [JsonProperty("religion")]
        public string Religion { get; set; }
        [JsonProperty("emirateId")]
        public string emirateId { get; set; }
        [JsonProperty("department")]
        public string Department { get; set; }
        [JsonProperty("otherRoles")]
        public List<OtherRole> otherRoles { get; set; }
        [JsonProperty("primaryRole")]
        public string PrimaryRole { get; set; }
        [JsonProperty("profilePhoto")]
        public string ProfilePhoto { get; set; }
    }


}