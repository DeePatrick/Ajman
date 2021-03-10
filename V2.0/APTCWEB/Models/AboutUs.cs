using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace APTCWEB.Models
{
    /// <summary>
    /// About Us
    /// </summary>
    public class AboutUs
    {
        /// <summary>
        /// Content
        /// </summary>
        [Required(ErrorMessage = "184-About us is required")]
        public string Contents { get; set; }

        /// <summary>
        /// Created On
        /// </summary>
        public string Created_On { get; set; }

        /// <summary>
        /// Modify On
        /// </summary>
        public string Modify_On { get; set; }
    }
}