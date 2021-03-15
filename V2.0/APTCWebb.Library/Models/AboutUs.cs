using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace APTCWebb.Library.Models
{
    /// <summary>
    /// About Us
    /// </summary>
    public class AboutUs
    {
        [Required(ErrorMessage = "184-About us is required")]
        public string Contents { get; set; }
        public string Created_On { get; set; }
        public string Modify_On { get; set; }
    }
}