using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Driver Status Model
    /// </summary>
    public class DriverStatus
    {
        public string DriverID { get; set; }

        [Required(ErrorMessage = "150-Driver State is required")]
        public string DriverState { get; set; }

        [Required(ErrorMessage = "151-Date is required")]
        public string Date { get; set; }

        [Required(ErrorMessage = "152-Time is required")]
        public string Time { get; set; }

        [Required(ErrorMessage = "153-Vehicle ID is required")]
        public string VehicleID { get; set; }
    }
}