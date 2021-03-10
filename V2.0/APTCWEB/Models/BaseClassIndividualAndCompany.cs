using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWEB.Models
{
    /// <summary>
    /// Base Class Individual And Company
    /// </summary>
    public class BaseClassIndividualAndCompany
    {
        //public string KeyID { get; set; }
        //public string DocType { get; set; }

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
    }

    /// <summary>
    /// Documents
    /// </summary>
    public class Documents
    {

        /// <summary>
        /// Document Type
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DocumentID { get; set; }

        /// <summary>
        /// Document Type
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Type { get; set; }

        /// <summary>
        /// Version
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Version { get; set; }

        ///// <summary>
        ///// Document Number
        ///// </summary>
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //public string Number { get; set; }

        /// <summary>
        /// Document Expiry Date
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ExpDate { get; set; }

        ///// <summary>
        ///// Hotel Pickup True/false
        ///// </summary>
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //public string HotelPickup { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool DocStatus { get; set; }
    }

    /// <summary>
    /// Fines
    /// </summary>
    public class Fines
    {

        /// <summary>
        /// Fine ID
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FineID { get; set; }


        /// <summary>
        /// Date Time
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DateTime { get; set; }


        /// <summary>
        /// Amount
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Amount { get; set; }


        /// <summary>
        /// Status
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status { get; set; }


        /// <summary>
        /// Remark
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Remark { get; set; }
    }

    /// <summary>
    /// Vehicles
    /// </summary>
    public class Vehicles
    {

        /// <summary>
        /// VehicleID
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string VehicleID { get; set; }

        /// <summary>
        /// Make
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Make { get; set; }

        /// <summary>
        /// ModelYear
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ModelYear { get; set; }

        /// <summary>
        /// VehType
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string VehType { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status { get; set; }
    }

    /// <summary>
    /// MobNum
    /// </summary>
    public class MobNum
    {
        /// <summary>
        /// Country Code
        /// </summary>
        [Required(ErrorMessage = "156-country code is required")]
        [JsonProperty(PropertyName = "countryCodeM")]
        public string CountryCodeM { get; set; }

        /// <summary>
        /// Num
        /// </summary>
        [Required(ErrorMessage = "163-number is required")]
        [JsonProperty(PropertyName = "numM")]
        public string NumM { get; set; }


        /// <summary>
        /// Area
        /// </summary>
        [JsonProperty(PropertyName = "areaM")]
        public string AreaM { get; set; }
    }

    /// <summary>
    /// TelNum
    /// </summary>
    public class TelNum
    {
        /// <summary>
        /// Country Code
        /// </summary>
        [JsonProperty(PropertyName = "countryCodeT")]
        public string CountryCodeT { get; set; }

        /// <summary>
        /// Num
        /// </summary>
        [JsonProperty(PropertyName = "numT")]
        public string NumT { get; set; }

        /// <summary>
        /// Area
        /// </summary>
        [JsonProperty(PropertyName = "areaT")]
        public string AreaT { get; set; }
    }

    /// <summary>
    /// Name
    /// </summary>
    public class FullName
    {

        /// <summary>
        /// Ar_SA
        /// </summary>
        [JsonProperty(PropertyName = "ar_SA")]
        public string Ar_SA { get; set; }


        /// <summary>
        /// En_US
        /// </summary>
        [JsonProperty(PropertyName = "en_US")]
        public string En_US { get; set; }
    }

    /// <summary>
    /// Roles
    /// </summary>
    public class Roles
    {

        /// <summary>
        /// RoleID
        /// </summary>
        [JsonProperty(PropertyName = "roleID")]
        public string RoleID { get; set; }

        // New Company 
        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        /// <summary>
        /// Link
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public List<Link> Link { get; set; }
    }

    /// <summary>
    /// Company Owner Roles
    /// </summary>
    public class OwnerRoles
    {

        /// <summary>
        /// RoleID
        /// </summary>
        [JsonProperty(PropertyName = "ownerRoleID")]
        public string OwnerRoleID { get; set; }

        // New Company 
        /// <summary>
        /// ID 
        /// </summary>
        [JsonProperty(PropertyName = "id")]
        public string ID { get; set; }

        // New Company 
        /// <summary>
        /// Nationality 
        /// </summary>
        [JsonProperty(PropertyName = "nationality")]
        public string Nationality { get; set; }

        // New Company 
        /// <summary>
        /// Role Type 
        /// </summary>
        [JsonProperty(PropertyName = "ownerRoleType")]
        public string OwnerRoleType { get; set; }

        /// <summary>
        /// Owner Name Ar
        /// </summary>
        [JsonProperty(PropertyName = "ownerNameAr")]
        public string OwnerNameAr { get; set; }

        /// <summary>
        /// Owner Name En
        /// </summary>
        [JsonProperty(PropertyName = "ownerNameEn")]
        public string OwnerNameEn { get; set; }

    }

    /// <summary>
    /// number of Employees 
    /// </summary>
    public class NumEmployees
    {
        /// <summary>
        /// On Date
        /// </summary>
        [JsonProperty("date")]
        public string Date { get; set; }

        /// <summary>
        /// Employees
        /// </summary>
        [JsonProperty("employees")]
        public int Employees { get; set; }
    }

    /// <summary>
    /// Name
    /// </summary>
    public class Name
    {
        /// <summary>
        /// Ar_SA
        /// </summary>
        [JsonProperty("ar_SA")]
        public string Ar_SA { get; set; }

        /// <summary>
        /// En_US
        /// </summary>
        [JsonProperty("en_US")]
        public string En_US { get; set; }
    }

    public class Activities
    {
        public string ActivityID { get; set; }
    }

}