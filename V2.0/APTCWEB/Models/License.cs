using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// License
    /// </summary>
    /// 

    public class License: CommonModel
    {
        /// <summary>
        /// Id 
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// Issue Date
        /// </summary>
        [Required(ErrorMessage = "148-issue date is required")]
        public string IssueDate { get; set; }

        /// <summary>
        /// Expiry Date
        /// </summary>
        [Required(ErrorMessage = "149-expiry date is required")]
        public string ExpiryDate { get; set; }

        /// <summary>
        /// License Number
        /// </summary>
        [Required(ErrorMessage = "146-license number is required")]
        public string LicenseNumber { get; set; }

        /// <summary>
        /// HotelPickup [Added on 23-07-2018 as per joe email]
        /// </summary>
        public bool HotelPickup { get; set; } = false;
    }
}