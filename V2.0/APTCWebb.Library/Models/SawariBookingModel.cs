﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Sawari Booking Model
    /// </summary>
    public class SawariBookingModel
    {

        [Required(ErrorMessage = "113-Passenger ID is required")]
        public string PassengerID { get; set; }

        [Required(ErrorMessage = "111-mobile number is required")]
        public string MobileNumber { get; set; }

        [Required(ErrorMessage = "117-From Location is required")]
        public string FromLocation { get; set; }

        [Required(ErrorMessage = "118-To Location is required")]
        public string ToLocation { get; set; }

        [Required(ErrorMessage = "119-Booking Date & Time Required is required")]
        public string DateTimeRequired { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Comments { get; set; }

        public AuditInfo AuditInfo { get; set; }
    }
}