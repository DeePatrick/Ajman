using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Driver Status Model
    /// </summary>
    public class DriverStatus
    {
        /// <summary>
        /// Driver ID
        /// </summary>
        public string DriverID { get; set; }
        /// <summary>
        /// Driver State
        /// </summary>
        [Required(ErrorMessage = "150-Driver State is required")]
        public string DriverState { get; set; }
        /// <summary>
        /// Date
        /// </summary>
        [Required(ErrorMessage = "151-Date is required")]
        public string Date { get; set; }
        /// <summary>
        /// Time
        /// </summary>
        [Required(ErrorMessage = "152-Time is required")]
        public string Time { get; set; }
        /// <summary>
        /// Vehicle ID
        /// </summary>
        [Required(ErrorMessage = "153-Vehicle ID is required")]
        public string VehicleID { get; set; }
    }
}