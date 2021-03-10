using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// USMParams for user configuration settings
    /// </summary>
    public class USMParams
    {
        /// <summary>
        /// Lang
        /// </summary>
        public string Lang { get; set; }
        /// <summary>
        /// DocType
        /// </summary>
        public string DocType { get; set; }
        /// <summary>
        /// roleUsmParams
        /// </summary>
        public List<Role> Role { get; set; }
}

    public class Params
    {
        /// <summary>
        /// PassMIn
        /// </summary>
        public int PassMIn { get; set; }
        /// <summary>
        /// PassMax
        /// </summary>
        public int PassMax { get; set; }
        /// <summary>
        /// PassUCase
        /// </summary>
        public int PassUCase { get; set; }
        /// <summary>
        /// PassLCase
        /// </summary>
        public int PassLCase { get; set; }
        /// <summary>
        /// PassNum
        /// </summary>
        public int PassNum { get; set; }
        /// <summary>
        /// PassSpec
        /// </summary>
        public int PassSpec { get; set; }
        /// <summary>
        /// PassSpChrs
        /// </summary>
        public string PassSpChrs { get; set; }
        /// <summary>
        /// TimeoutMins
        /// </summary>
        public int TimeoutMins { get; set; }
        /// <summary>
        /// EMailOTP
        /// </summary>
        public bool EMailOTP { get; set; }
        /// <summary>
        /// EmailOTPMins
        /// </summary>
        public int EmailOTPMins { get; set; }
        /// <summary>
        /// MohileOTP
        /// </summary>
        public bool MohileOTP { get; set; }
        /// <summary>
        /// MohileOTPMins
        /// </summary>
        public int MohileOTPMins { get; set; }
        /// <summary>
        /// SignOnow
        /// </summary>
        public bool SignOnow { get; set; }
        /// <summary>
        /// SOnOTPFreq
        /// </summary>
        public int SOnOTPFreq { get; set; }
        /// <summary>
        /// SOnOTPEmaiI
        /// </summary>
        public bool SOnOTPEmaiI { get; set; }
        /// <summary>
        /// Senowsms
        /// </summary>
        public bool Senowsms { get; set; }
        /// <summary>
        /// AllowSSO
        /// </summary>
        public bool AllowSSO { get; set; }
    }

    /// <summary>
    /// Role for UsmParams
    /// </summary>
    public class Role
    {
        /// <summary>
        /// RoleID
        /// </summary>
        public string RoleID { get; set; }
        /// <summary>
        /// Role Name
        /// </summary>
        public int Name { get; set; }

        public Params Params { get; set; }
    }
}