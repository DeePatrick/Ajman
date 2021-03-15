using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// USMParams for user configuration settings
    /// </summary>
    public class USMParams
    {

        public string Lang { get; set; }
        public string DocType { get; set; }
        public List<Role> Role { get; set; }
}

    public class Params
    {

        public int PassMIn { get; set; }

        public int PassMax { get; set; }

        public int PassUCase { get; set; }

        public int PassLCase { get; set; }

        public int PassNum { get; set; }

        public int PassSpec { get; set; }

        public string PassSpChrs { get; set; }

        public int TimeoutMins { get; set; }

        public bool EMailOTP { get; set; }

        public int EmailOTPMins { get; set; }

        public bool MohileOTP { get; set; }

        public int MohileOTPMins { get; set; }

        public bool SignOnow { get; set; }

        public int SOnOTPFreq { get; set; }

        public bool SOnOTPEmaiI { get; set; }

        public bool Senowsms { get; set; }

        public bool AllowSSO { get; set; }
    }

    /// <summary>
    /// Role for UsmParams
    /// </summary>
    public class Role
    {
        public string RoleID { get; set; }

        public int Name { get; set; }

        public Params Params { get; set; }
    }
}