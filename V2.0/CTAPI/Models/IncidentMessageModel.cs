using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    /// <summary>
    /// IncidentMessageModel
    /// </summary>
    public class IncidentMessageModel:CommonModel
    {
        /// <summary>
        /// DriverID
        /// </summary>
        [Required(ErrorMessage = "154-Driver ID is required")]
        public string DriverID { get; set; }

        /// <summary>
        /// DateTime
        /// </summary>
        public string DateTime { get; set; }

        /// <summary>
        /// Notes
        /// </summary>
        [Required(ErrorMessage = "155-Notes is required")]
        public string Notes { get; set; }
    }
}