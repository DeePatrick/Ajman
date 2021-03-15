using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Reset Password Model
    /// </summary>
    public class ResetPassword:CommonModel
    {

        public string Email { get; set; }

        public string MobileNo { get; set; }

        public string VarificationCode { get; set; }
    }
}