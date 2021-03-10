using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Reset Password Model
    /// </summary>
    public class ResetPassword:CommonModel
    {
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Mobile No
        /// </summary>
        public string MobileNo { get; set; }
        /// <summary>
        /// Varification Code
        /// </summary>
        public string VarificationCode { get; set; }
    }
}