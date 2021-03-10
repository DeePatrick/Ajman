using Newtonsoft.Json;
using System.Collections.Generic;


namespace APTCWEB.OutPutDto
{
    using System;
    using APTCWEB.Common;

    /// <summary>
    ///  Login OutPut Model
    /// </summary>
    /// <summary>
    ///  Login Model
    /// </summary>
    public class LoginOutPut
    {
        public string Id { get; set; }

        /// <summary>
        /// Lang
        /// </summary>
        [JsonProperty("lang")]
        public string Lang { get; set; }

        /// <summary>
        /// DocType
        /// </summary>
        [JsonProperty("docType")]
        public string DocType { get; set; }


        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [JsonProperty("password")]
        public string Password { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [JsonProperty("email")]
        public string Email { get; set; }

        /// <summary>
        /// Mobile
        /// </summary>
        [JsonProperty("mobile")]
        public string Mobile { get; set; }

        /// <summary>
        /// MobNum
        /// </summary>
        [JsonProperty("mobNum")]
        public MobNumOutPut MobNum { get; set; }

        /// <summary>
        /// TelNum
        /// </summary>
        [JsonProperty("telNum")]
        public TelNumOutPut TelNum { get; set; }

        /// <summary>
        /// PassSetDate
        /// </summary>
        [JsonProperty("passSetDate")]
        public string PassSetDate { get; set; }


        /// <summary>
        /// EmirateId
        /// </summary
        [JsonProperty("emirateId")]
        public string EmirateId { get; set; }

        /// <summary>
        /// EmirateId
        /// </summary>
        [JsonProperty("department")]
        public string Department { get; set; }

        /// <summary>
        /// Roles
        /// </summary>
        [JsonProperty("roles")]
        public UserRoleOutPut Roles { get; set; }

        /// <summary>
        /// PrevPass
        /// </summary>
        [JsonProperty("prevPass")]
        public List<PrevPasswordOutPut> PrevPass { get; set; }

        /// <summary>
        /// Documents
        /// </summary>
        [JsonProperty("userPhoto")]
        public string UserPhoto { get; set; }
    }

    public class UserRoleOutPut
    {
        /// <summary>
        /// Primary Role
        /// </summary>
        
        [JsonProperty("primaryRole")]
        public string PrimaryRole { get; set; }

        /// <summary>
        /// Other Roles
        /// </summary>
        [JsonProperty("otherRoles")]
        public List<OtherRoleOutPut> OtherRoles { get; set; }
    }
    public class OtherRoleOutPut
    {
        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("dept")]
        public string Department { get; set; }
    }

    /// <summary>
    /// Other Roles
    /// </summary>
    public class PrevPasswordOutPut
    {
        /// <summary>
        /// SrNo
        /// </summary>
        [JsonProperty("srNo")]
        public string SrNo { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [JsonProperty("password")]
        public string Password { get; set; }

        /// <summary>
        /// Changed On
        /// </summary>
        [JsonProperty("changedOn")]
        public string ChangedOn { get; set; }
    }

    /// <summary>
    /// MobNum
    /// </summary>
    public class MobNumOutPut
    {
        /// <summary>
        /// Country Code
        /// </summary>
        [JsonProperty(PropertyName = "countryCodeM")]
        public string CountryCodeM { get; set; }

        /// <summary>
        /// Num
        /// </summary>
        [JsonProperty(PropertyName = "numM")]
        public string NumM { get; set; }

        /// <summary>
        /// Area
        /// </summary>
        [JsonProperty(PropertyName = "areaM")]
        public string AreaM { get; set; }
    }

    /// <summary>
    /// TelNum OutPut
    /// </summary>
    public class TelNumOutPut
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
}