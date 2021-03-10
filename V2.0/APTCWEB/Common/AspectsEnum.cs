using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Common
{
    public static class AspectEnums
    {

        public static readonly string StatusPS = "PE";
        public static readonly string DeptCodeFROE = "FROE";
        public static readonly string DeptCodeEXTN = "EXTN";
        public static readonly string RoleCodeHODP = "HODP";
        public static readonly string RoleCodeBCKO = "BCKO";
        public static readonly string RoleCodeCOWN = "COWN";
        public static readonly string RoleCodeDRIV = "DRIV";
        public static readonly string StatusAS = "AP";
        public static readonly string StatusRS = "RE";

        /// <summary>
        /// This enum is used to define the Notification Type for Notification 
        /// </summary>
        public enum NotificationType
        {
            UserCreation = 1,
            IndividualCreation = 2,
            PermitRequest = 3,
            CompanyRegistration = 4,
            VehicleRegistration = 5,
            FineRequest = 6,
            Payments = 7
        }
   }
}