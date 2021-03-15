using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
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
        public FullName fullName { get; set; }
        public List<Roles> Roles { get; set; }
        public List<Fines> Fines { get; set; }
        public List<Documents> Documents { get; set; }
        public List<Vehicles> Vehicles { get; set; }
        public MobNum MobNum { get; set; }
        public TelNum TelNum { get; set; }
    }


    public class Documents
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DocumentID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Type { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Version { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ExpDate { get; set; }

        /// <summary>
        /// Hotel Pickup True/false
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool HotelPickup { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool DocStatus { get; set; }
    }


    public class Fines
    {

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FineID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DateTime { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Amount { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Remark { get; set; }
    }


    public class Vehicles
    {

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string VehicleID { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Make { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ModelYear { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string VehType { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status { get; set; }
    }


    public class MobNum
    {
        [Required(ErrorMessage = "156-country code is required")]
        [JsonProperty(PropertyName = "countryCodeM")]
        public string CountryCodeM { get; set; }

        [Required(ErrorMessage = "163-number is required")]
        [JsonProperty(PropertyName = "numM")]
        public string NumM { get; set; }

        [JsonProperty(PropertyName = "areaM")]
        public string AreaM { get; set; }
    }


    public class TelNum
    {
        [JsonProperty(PropertyName = "countryCodeT")]
        public string CountryCodeT { get; set; }


        [JsonProperty(PropertyName = "numT")]
        public string NumT { get; set; }


        [JsonProperty(PropertyName = "areaT")]
        public string AreaT { get; set; }
    }


    public class FullName
    {

        [JsonProperty(PropertyName = "ar_SA")]
        public string Ar_SA { get; set; }


        [JsonProperty(PropertyName = "en_US")]
        public string En_US { get; set; }
    }

    /// <summary>
    /// Roles
    /// </summary>
    public class Roles
    {

        [JsonProperty(PropertyName = "roleID")]
        public string RoleID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public List<Link> Link { get; set; }
    }

    /// <summary>
    /// Company Owner Roles
    /// </summary>
    public class OwnerRoles
    {

        [JsonProperty(PropertyName = "ownerRoleID")]
        public string OwnerRoleID { get; set; }


        [JsonProperty(PropertyName = "id")]
        public string ID { get; set; }

        [JsonProperty(PropertyName = "nationality")]
        public string Nationality { get; set; }


        [JsonProperty(PropertyName = "ownerRoleType")]
        public string OwnerRoleType { get; set; }


        [JsonProperty(PropertyName = "ownerNameAr")]
        public string OwnerNameAr { get; set; }


        [JsonProperty(PropertyName = "ownerNameEn")]
        public string OwnerNameEn { get; set; }

    }

    public class NumEmployees
    {

        [JsonProperty("date")]
        public string Date { get; set; }

        [JsonProperty("employees")]
        public int Employees { get; set; }
    }


    public class Name
    {

        [JsonProperty("ar_SA")]
        public string Ar_SA { get; set; }

        [JsonProperty("en_US")]
        public string En_US { get; set; }
    }

    public class Activities
    {
        public string ActivityID { get; set; }
    }

}