using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    public class IncidentMessageModel
    {
        public string ID { get; set; }
        [Required(ErrorMessage = "154-Driver ID is required")]
        public string DriverID { get; set; }
        public string DateTime { get; set; }
        [Required(ErrorMessage = "155-Notes is required")]
        public string Notes { get; set; }
    }
}