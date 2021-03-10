using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    /// <summary>
    /// Vehicle_CT_Data
    /// </summary>
    public class Vehicle_CT_Data  : CommonModel
    {
        /// <summary>
        /// Vehicle Registration Number 
        /// </summary>
        [Required(ErrorMessage = "127-registration number is required")]
        public string Registration { get; set; } // Unique ID

        /// <summary>
        /// Taxi_type
        /// </summary>
        public string Taxi_type { get; set; }
        /// <summary>
        /// Manufacturer
        /// </summary>
        public string Manufacturer { get; set; }
        /// <summary>
        /// Model
        /// </summary>
        public string Model { get; set; }
        /// <summary>
        /// Modelyear
        /// </summary>
        public string Modelyear { get; set; }
        /// <summary>
        /// Colour
        /// </summary>
        public string Colour { get; set; }
        /// <summary>
        /// Passenger_capacity
        /// </summary>
        public string Passenger_capacity { get; set; }
        /// <summary>
        /// Vehicle_status
        /// </summary>
        public string Vehicle_status { get; set; }
        /// <summary>
        /// Vehicle_enabled
        /// </summary>
        public string Vehicle_enabled { get; set; }
        /// <summary>
        /// Franchisee_user_name
        /// </summary>
        public string Franchisee_user_name { get; set; }
    }
}