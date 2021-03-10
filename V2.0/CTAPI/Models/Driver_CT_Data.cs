using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    /// <summary>
    /// Driver model for CT
    /// </summary>
    public class Driver_CT_Data
    {
        /// <summary>
        /// customer driver id 
        /// </summary>
        //[Required(ErrorMessage = "127-registration number is required")]
        public string customer_driver_id { get; set; } // Unique ID

        /// <summary>
        /// name first surname
        /// </summary>
        public string name_first_surname { get; set; }
        /// <summary>
        /// mobile number
        /// </summary>
        public string mobile_number { get; set; }
        /// <summary>
        /// driver email
        /// </summary>
        public string driver_email { get; set; }
        /// <summary>
        /// Model year
        /// </summary>
        public string Modelyear { get; set; }
        /// <summary>
        /// registration
        /// </summary>
        public string registration { get; set; }
        /// <summary>
        /// driver permit number
        /// </summary>
        public string driver_permit_number { get; set; }
        /// <summary>
        /// Vehicle_status
        /// </summary>
        public string driver_license_number { get; set; }
        /// <summary>
        /// Vehicle_enabled
        /// </summary>
        public string license_valid_to { get; set; }
        /// <summary>
        /// passport_number
        /// </summary>
        public string passport_number { get; set; }
        /// <summary>
        /// driver enabled
        /// </summary>
        public bool driver_enabled { get; set; }
        /// <summary>
        /// hotel driver
        /// </summary>
        public bool hotel_driver { get; set; }
        /// <summary>
        /// photo valid
        /// </summary>
        public bool photo_valid { get; set; }
        /// <summary>
        /// franchisee user name
        /// </summary>
        public string franchisee_user_name { get; set; }
    }
}