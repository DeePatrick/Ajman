using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWEB.Models
{
    /// <summary>
    /// Sawari Booking Model
    /// </summary>
    public class SawariBookingModel
    {
        /// <summary>
        /// Passenger ID
        /// </summary>
        [Required(ErrorMessage = "113-Passenger ID is required")]
        public string PassengerID { get; set; }
        /// <summary>
        /// Mobile Number
        /// </summary>
        [Required(ErrorMessage = "111-mobile number is required")]
        public string MobileNumber { get; set; }
        /// <summary>
        /// From Location
        /// </summary>
        [Required(ErrorMessage = "117-From Location is required")]
        public string FromLocation { get; set; }
        /// <summary>
        /// To Location
        /// </summary>
        [Required(ErrorMessage = "118-To Location is required")]
        public string ToLocation { get; set; }
        /// <summary>
        /// Date Time Required
        /// </summary>
        [Required(ErrorMessage = "119-Booking Date & Time Required is required")]
        public string DateTimeRequired { get; set; }
        /// <summary>
        /// Comments
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Comments { get; set; }
        /// <summary>
        /// Audit Info
        /// </summary>
        public AuditInfo AuditInfo { get; set; }
    }
}