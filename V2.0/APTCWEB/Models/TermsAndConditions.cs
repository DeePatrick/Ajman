using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    public class TermsAndConditions
    {
        /// <summary>
        /// Contents
        /// </summary>
        [Required(ErrorMessage = "185-Terms and conditions us is required")]
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