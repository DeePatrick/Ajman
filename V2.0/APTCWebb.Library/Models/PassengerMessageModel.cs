using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Passenger Message Model
    /// </summary>
    public class PassengerMessageModel
    {
        /// <summary>
        /// Action
        /// </summary>
        public string Action { get; set; }

        /// <summary>
        /// Passenger ID
        /// </summary>
        public string PassengerID { get; set; }

        /// <summary>
        /// Name in English [Changed by Vishal on 23-07-2018 as per joe email]
        /// </summary>
        public string NameEN { get; set; }

        /// <summary>
        /// Name in Arabic [Changed by Vishal on 23-07-2018 as per joe email]
        /// </summary>
        public string NameAR { get; set; }

        /// <summary>
        /// Mobile Number
        /// </summary>
        [Required(ErrorMessage = "111-mobile number is required")]
        public string MobileNumber { get; set; }

        /// <summary>
        /// Email Address
        /// </summary>
        [Required(ErrorMessage = "112-email is required")]
        public string EmailAddress { get; set; }
    }
}