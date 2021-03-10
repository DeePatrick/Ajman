using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Company
    /// </summary>
    public class Company
    {
        /// <summary>
        /// KeyID
        /// </summary>
        public string KeyID { get; set; }

        /// <summary>
        /// DocType
        /// </summary>
        public string DocType { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        public string Email { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        public FullName fullName { get; set; }

        /// <summary>
        /// Roles
        /// </summary>
        //public List<CompanyRoles> Roles { get; set; }
        public List<Roles> Roles { get; set; }


        /// <summary>
        /// Fines
        /// </summary>
        public List<Fines> Fines { get; set; }

        /// <summary>
        /// Documents
        /// </summary>
        public List<Documents> Documents { get; set; }

        /// <summary>
        /// Vehicles
        /// </summary>
        public List<Vehicles> Vehicles { get; set; }

        /// <summary>
        /// MobNum
        /// </summary>
        public MobNum MobNum { get; set; }

        /// <summary>
        /// TelNum
        /// </summary>
        public TelNum TelNum { get; set; }

        /// <summary>
        /// AuditInfo
        /// </summary>
        public List<AuditInfo> AuditInfo { get; set; }

        /// <summary>
        /// Website
        /// </summary>
        public string Website { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        public CompanyAddress Address { get; set; }

    }

    /// <summary>
    /// 
    /// </summary>
    public class CompanyAddress
    {
        /// <summary>
        /// AddressLine1
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AddressLine1 { get; set; }

        /// <summary>
        /// AddressLine2
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AddressLine2 { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "138-city is required")]
        public string City { get; set; }

        /// <summary>
        /// Zip
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "139-zip is required")]
        public string Zip { get; set; }

        /// <summary>
        /// State
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "140-state is required")]
        public string State { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "141-country is required")]
        public string Country { get; set; }

        /// <summary>
        /// Line
        /// </summary>
        public Line Line { get; set; }
    }

    /// <summary>
    /// 
    /// </summary>
    public class Line
    {
        /// <summary>
        /// Line1
        /// </summary>
        [Required(ErrorMessage = "142-address line1 is required")]
        public string Line1 { get; set; }

        /// <summary>
        /// Line2
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Line2 { get; set; }
    }

   /* /// <summary>
    /// Roles
    /// </summary>
    public class CompanyRoles
    {

        /// <summary>
        /// RoleID
        /// </summary>
        public string RoleID { get; set; }


        /// <summary>
        /// Link
        /// </summary>
        public Link Link { get; set; }
    }*/

}