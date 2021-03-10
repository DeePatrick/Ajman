using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    public class ResendOtp
    {
        public string CustomeDocumentId { get; set; }
        public string Email { get; set; }
        public MobNum MobileNo { get; set; }
        public string EmailOtp { get; set; }
        public string MobileOtp { get; set; }
        public string  UserName { get; set; }
        public string Message { get; set; }
    }
}