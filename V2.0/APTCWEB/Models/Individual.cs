using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Modified History
    /// Name Date Reason
    /// Vishnu  Mishra      25-07-2018      New Individual properties changed as per Vinay Shared to Arvind
    /// </summary>

    public class Individual : CommonModel
    {
        /// <summary>
        /// Key ID
        /// </summary>
        public string KeyID { get; set; }

        /// <summary>
        /// Doc Type
        /// </summary>
        public string DocType { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        public string Email { get; set; }


        /// <summary>
        /// DOB
        /// </summary>
        [Required(ErrorMessage = "224-dob is required")]
        public string DOB { get; set; }

        /// <summary>
        /// Nationality
        /// </summary>
        [Required(ErrorMessage = "225-nationality is required")]
        public string Nationality { get; set; }

        /// <summary>
        /// Religion
        /// </summary>
        [Required(ErrorMessage = "226-religion is required")]
        public string Religion { get; set; }

        /// <summary>
        /// Notes
        /// </summary>
        public string Notes { get; set; }

        /// <summary>
        /// Gender
        /// </summary>
        [Required(ErrorMessage = "227-gender is required")]
        public string Gender { get; set; }

        /// <summary>
        /// Language
        /// </summary>
        [Required(ErrorMessage = "223-language is required")]
        public string Language { get; set; }

        /// <summary>
        /// MaritalStatus
        /// </summary>
        [Required(ErrorMessage = "229-maritalstatus is required")]
        public string MaritalStatus { get; set; }

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

        /// <summary>
        /// Address
        /// </summary>
        public Address Address { get; set; }

        /// <summary>
        /// ProfilePhoto
        /// </summary>
        [JsonProperty(PropertyName = "profilePhoto")]
        public ProfilePhoto ProfilePhoto { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [Required(ErrorMessage = "163-full name is required")]
        public FullName fullName { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public Status Status { get; set; }

        /// <summary>
        /// ScoreCard
        /// </summary>
        public List<ScoreCards> ScoreCards { get; set; }

        /// <summary>
        /// Incident
        /// </summary>
        public List<Incidents> Incidents { get; set; }

        /// <summary>
        /// AuditInfo
        /// </summary>
        public List<AuditInfo> AuditInfo { get; set; }

        /// <summary>
        /// LoginDetails
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Login LoginDetails { get; set; }

        /// <summary>
        /// Driver Status Details
        /// </summary>
        public List<DriverStatus> DriverStatus { get; set; }
    }

    public class ProfilePhoto
    {
        [JsonProperty(PropertyName = "docFormat")]
        public string DocFormat { get; set; }
        [JsonProperty(PropertyName = "validFrom")]
        public string ValidFrom { get; set; }
        [JsonProperty(PropertyName = "validTo")]
        public string ValidTo { get; set; }
        [JsonProperty(PropertyName = "photo")]
        public string Photo { get; set; }
    }

    /// <summary>
    /// Link
    /// </summary>
    public class Link
    {
        /// <summary>
        /// LinkID
        /// </summary>
        [JsonProperty(PropertyName = "linkID")]
        public string LinkID { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

    }

    /// <summary>
    /// Address
    /// </summary>
    public class Address
    {
        /// <summary>
        /// City
        /// </summary>
        [Required(ErrorMessage = "138-city is required")]
        [JsonProperty("city")]
        public string City { get; set; }

        /// <summary>
        /// State
        /// </summary>
        [Required(ErrorMessage = "140-state is required")]
        [JsonProperty("state")]
        public string State { get; set; }

        /// <summary>
        /// Area
        /// </summary>
        [Required(ErrorMessage = "178-Area is required")]
        [JsonProperty("area")]
        public string Area { get; set; }

        /// <summary>
        /// Street
        /// </summary>
        [Required(ErrorMessage = "179-Street is required")]
        [JsonProperty("street")]
        public string Street { get; set; }

        /// <summary>
        /// Bldg Num
        /// </summary>
        [JsonProperty("bldgNum")]
        public string BldgNum { get; set; }

        /// <summary>
        /// Flat Num
        /// </summary>
        [Required(ErrorMessage = "183-Flat num is required")]
        [JsonProperty("flatNum")]
        public string FlatNum { get; set; }
    }

    /// <summary>
    /// ScoreCards
    /// </summary>
    public class ScoreCards
    {
        /// <summary>
        /// Date
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Date { get; set; }

        /// <summary>
        /// Braking
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Braking { get; set; }

        /// <summary>
        /// Accel
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Accel { get; set; }

        /// <summary>
        /// Turning
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Turning { get; set; }

        /// <summary>
        /// Idling
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Idling { get; set; }

        /// <summary>
        /// TenKmPerHrOver
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TenKmPerHrOver { get; set; }

        /// <summary>
        /// TwentyKmPerHrOver
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TwentyKmPerHrOver { get; set; }

        /// <summary>
        /// ThirtyKmPerHrOver
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ThirtyKmPerHrOver { get; set; }

        /// <summary>
        /// PointsDeducted
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PointsDeducted { get; set; }

        /// <summary>
        /// Points
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Points { get; set; }

        /// <summary>
        /// Percentage
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Percentage { get; set; }
    }

    /// <summary>
    /// Status
    /// </summary>
    public class Status
    {
        /// <summary>
        /// StatusID
        /// </summary>
        [JsonProperty("statusID")]
        public string StatusID { get; set; }

        /// <summary>
        /// DateTime
        /// </summary>
        [JsonProperty("dateTime")]
        public string DateTime { get; set; }
    }

    /// <summary>
    /// Incidents
    /// </summary>
    public class Incidents
    {
        /// <summary>
        /// IncidentID
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "")]
        public string IncidentID;

        /// <summary>
        /// DateTime
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string DateTime;

        /// <summary>
        /// Rank
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Rank;

        /// <summary>
        /// Status
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Status;

        /// <summary>
        /// Remarks
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Remarks;
    }
}