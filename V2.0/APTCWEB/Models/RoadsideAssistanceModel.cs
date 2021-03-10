using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace APTCWEB.Models
{
    /// <summary>
    /// Roadside Assistance Model
    /// </summary>
    public class RoadsideAssistanceModel
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
        /// Latitude
        /// </summary>
        [Required(ErrorMessage = "114-Latitude ID is required")]
        public string Latitude { get; set; }
        /// <summary>
        /// Longitude
        /// </summary>
        [Required(ErrorMessage = "115-Longitute ID is required")]
        public string Longitude { get; set; }
        /// <summary>
        /// Service Required
        /// </summary>
        [Required(ErrorMessage = "116-Service Required is required")]
        public string ServiceRequired { get; set; }
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
    /// <summary>
    /// Roadside Assistance OutPut Model
    /// </summary>
    public class RoadsideAssistanceModelOutPut
    {
        public string RequestRefID { get; set; }
        public string Message { get; set; }
        public string Telephone { get; set; }
    }
}