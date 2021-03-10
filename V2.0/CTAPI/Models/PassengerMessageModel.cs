using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    /// <summary>
    /// Passenger Message Model
    /// </summary>
    public class PassengerMessageModel:CommonModel
    {
        /// <summary>
        /// Action
        /// </summary>
        //public string Action { get; set; }

        /// <summary>
        /// Passenger ID
        /// </summary>
        public string PassengerID { get; set; }

        /// <summary>
        /// NameEN
        /// </summary>
        public string NameEN { get; set; }

        /// <summary>
        /// NameAR
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
        [Required(ErrorMessage = "112-email address is required")]
        public string EmailAddress { get; set; }

        /// <summary>
        /// Booking
        /// </summary>
        public List<SawariBookingModel> Booking { get; set; }
    }
}