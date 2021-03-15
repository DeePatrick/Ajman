using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Role and Permissions class 
    /// </summary>
    public class RolePermissions
    {
        /// <summary>
        /// Language
        /// </summary>
        public string Lang { get; set; }
        /// <summary>
        /// DocType
        /// </summary>
        public string DocType { get; set; }
        /// <summary>
        /// DeptCode
        /// </summary>
        public string DeptCode { get; set; }
        /// <summary>
        /// RoleCode
        /// </summary>
        public string RoleCode { get; set; }
        /// <summary>
        /// Level
        /// </summary>
        public string Level { get; set; }
        /// <summary>
        /// fnctns
        /// </summary>
        public Fnctns fnctns { get; set; }
        /// <summary>
        /// subFnctn
        /// </summary>
        public SubFnctn subFnctn { get; set; }

        public Help help { get; set; }
    }

    /// <summary>
    /// Functions
    /// </summary>
    public class Fnctns
    {
        /// <summary>
        /// Text
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// Type
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Link
        /// </summary>
        public string Link { get; set; }

        /// <summary>
        /// operations
        /// </summary>
        public Oper oper { get; set; }
    }

    /// <summary>
    /// Sub Function
    /// </summary>
    public class SubFnctn
    {
        /// <summary>
        /// Text
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// Type
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Link
        /// </summary>
        public string Link { get; set; }

        /// <summary>
        /// oper
        /// </summary>
        public Oper oper { get; set; }
    }

    /// <summary>
    /// Operations
    /// </summary>
    public class Oper
    {
        /// <summary>
        /// Add
        /// </summary>
        public bool Add { get; set; }
        /// <summary>
        /// Modify
        /// </summary>
        public bool Mod { get; set; }
        /// <summary>
        /// Cancel
        /// </summary>
        public bool Cncl { get; set; }
        /// <summary>
        /// Delete
        /// </summary>
        public bool Del { get; set; }
        /// <summary>
        /// Refund
        /// </summary>
        public bool Rfund { get; set; }
    }
}