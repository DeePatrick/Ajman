using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{

    public class Individual : Person
    {
        public List<Roles> Roles { get; set; }

        public List<Fines> Fines { get; set; }

        public List<Vehicles> Vehicles { get; set; }


        public Status Status { get; set; }

        public List<ScoreCards> ScoreCards { get; set; }

        public List<Incidents> Incidents { get; set; }

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

        [JsonProperty(PropertyName = "linkID")]
        public string LinkID { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

    }


    public class Address
    {

        [Required(ErrorMessage = "138-city is required")]
        [JsonProperty("city")]
        public string City { get; set; }

        [Required(ErrorMessage = "140-state is required")]
        [JsonProperty("state")]
        public string State { get; set; }


        [Required(ErrorMessage = "178-Area is required")]
        [JsonProperty("area")]
        public string Area { get; set; }


        [Required(ErrorMessage = "179-Street is required")]
        [JsonProperty("street")]
        public string Street { get; set; }

        [JsonProperty("bldgNum")]
        public string BldgNum { get; set; }

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


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Braking { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Accel { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Turning { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Idling { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TenKmPerHrOver { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string TwentyKmPerHrOver { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ThirtyKmPerHrOver { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PointsDeducted { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Points { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Percentage { get; set; }
    }

    /// <summary>
    /// Status
    /// </summary>
    public class Status
    {

        [JsonProperty("statusID")]
        public string StatusID { get; set; }

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