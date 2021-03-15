using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// New Company
    /// </summary>
    public class NewCompany :CommonModel
    {
        /// <summary>
        /// CR Number
        /// </summary>
        [Required(ErrorMessage = "186-cr number is required")]
        [JsonProperty("cRNum")]
        public string CRNum { get; set; }

        /// <summary>
        /// DED
        /// </summary>
        [JsonProperty("dED")]
        public string DED { get; set; } // the Emirate// DED_REF_NO//

        /// <summary>
        /// Chamber Num
        /// </summary>
        [JsonProperty("chamberNum")]
        public string ChamberNum { get; set; }

        /// <summary>
        /// Legal Form
        /// </summary>
        [JsonProperty("legalForm")]
        public string LegalForm { get; set; }

        /// <summary>
        /// Est Date
        /// </summary>
        [JsonProperty("estDate")]
        public string EstDate { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        [JsonProperty("email")]
        public string Email { get; set; }

        /// <summary>
        /// Web site
        /// </summary>
        [JsonProperty("website")]
        public string Website { get; set; }

        /// <summary>
        /// Com Type
        /// </summary>
        [JsonProperty("comType")]
        public string ComType { get; set; }

        /// <summary>
        /// Franshisee
        /// </summary>
        [JsonProperty("franshisee")]
        public Boolean Franshisee { get; set; }

        [JsonProperty("numEmployees")]
        public List<NumEmployees> NumEmployees { get; set; }
        
        /// <summary>
        /// Name
        /// </summary>
        public Name Name { get; set; }

        /// <summary>
        /// TelNum
        /// </summary>
        [JsonProperty("telNum")]
        public TelNum TelNum { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        [JsonProperty("address")]
        public Address Address { get; set; }

        /// <summary>
        /// Notes
        /// </summary>
        [JsonProperty("notes")]
        public string Notes {get;set;}

        [JsonProperty("activities")]
        public List<Activities> Activities { get; set; }

        /// <summary>
        /// Roles
        /// </summary>
        [JsonProperty("ownerRoles")]
        public List<OwnerRoles> OwnerRoles { get; set; }

        /// <summary>
        /// Fines
        /// </summary>
        [JsonProperty("fines")]
        public List<Fines> Fines { get; set; }

        /// <summary>
        /// Documents
        /// </summary>
        [JsonProperty("documents")]
        public List<Documents> Documents { get; set; }

        /// <summary>
        /// Vehicles
        /// </summary>
        [JsonProperty("vehicles")]
        public List<Vehicles> Vehicles { get; set; }

        /// <summary>
        /// MobNum
        /// </summary>
        [JsonProperty("comStatus")]
        public ComStatus ComStatus { get; set; }

        /// <summary>
        /// Audit Info
        /// </summary>
        [JsonProperty("auditInfo")]
        public List<AuditInfo> AuditInfo { get; set; }

        /// <summary>
        /// Documents
        /// </summary>
        [JsonProperty("companyPhoto")]
        public string CompanyPhoto { get; set; }

        /// <summary>
        /// Individual Id
        /// </summary>
        [JsonProperty("indivID")]
        public string IndivID { get; set; } // This is Emirati Id. This field use for only Add company owenr role.
    }
}


public class ComStatus
{
    [JsonProperty("statusID")]
    public string StatusID { get; set; }
    [JsonProperty("dateTime")]
    public string DateTime { get; set; }
}