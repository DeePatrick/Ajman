using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    public class TermsAndConditions
    {
        [Required(ErrorMessage = "185-Terms and conditions us is required")]
        public string Contents { get; set; }
        public string Created_On { get; set; }
        public string Modify_On { get; set; }
    }
}