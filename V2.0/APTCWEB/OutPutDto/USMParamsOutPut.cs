using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.OutPutDto
{
    public class USMParamsOutPut
    {
        /// <summary>
        /// Lang
        /// </summary>
        public string Lang { get; set; } = "en_US";
        /// <summary>
        /// DocType
        /// </summary>
        public string DocType { get; set; } = "User Parameters Setting";
        /// <summary>
        /// Collection of roleUsmParams
        /// </summary>
        public List<RoleOutPut> Role { get; set; }
    }

    public class ParamsOutPut
    {
        /// <summary>
        /// PassMIn
        /// </summary>
        public int PassMIn { get; set; } = 8;
        /// <summary>
        /// PassMax
        /// </summary>
        public int PassMax { get; set; } = 12;
        /// <summary>
        /// PassUCase
        /// </summary>
        public int PassUCase { get; set; } = 1;
        /// <summary>
        /// PassLCase
        /// </summary>
        public int PassLCase { get; set; } = 1;
        /// <summary>
        /// PassNum
        /// </summary>
        public int PassNum { get; set; } = 1;
        /// <summary>
        /// PassSpec
        /// </summary>
        public int PassSpec { get; set; } = 1;
        /// <summary>
        /// PassSpChrs
        /// </summary>
        public string PassSpChrs { get; set; } = "!@#$%^&*()";
        /// <summary>
        /// TimeoutMins
        /// </summary>
        public int TimeoutMins { get; set; } = 15;
        /// <summary>
        /// EMailOTP
        /// </summary>
        public bool EMailOTP { get; set; } = true;
        /// <summary>
        /// EmailOTPMins
        /// </summary>
        public int EmailOTPMins { get; set; } = 10;
        /// <summary>
        /// MohileOTP
        /// </summary>
        public bool MohileOTP { get; set; } = true;
        /// <summary>
        /// MohileOTPMins
        /// </summary>
        public int MohileOTPMins { get; set; } = 5;
        /// <summary>
        /// SignOnow
        /// </summary>
        public bool SignOnow { get; set; } = false;
        /// <summary>
        /// SOnOTPFreq
        /// </summary>
        public int SOnOTPFreq { get; set; } = 30;
        /// <summary>
        /// SOnOTPEmaiI
        /// </summary>
        public bool SOnOTPEmaiI { get; set; } = false;
        /// <summary>
        /// Senowsms
        /// </summary>
        public bool SOnOTPSMS { get; set; } = true;
        /// <summary>
        /// AllowSSO
        /// </summary>
        public bool AllowSSO { get; set; } = true;
    }

    /// <summary>
    /// Role for UsmParams
    /// </summary>
    public class RoleOutPut
    {
        /// <summary>
        /// RoleID
        /// </summary>
        public string roleCode { get; set; } = "1";
        /// <summary>
        /// Role Name
        /// </summary>
        public string Name { get; set; } = "Front Office Employee";

        public ParamsOutPut Params { get; set; }
    }
}