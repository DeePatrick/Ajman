using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.OutPutDto
{
    /// <summary>
    /// Audit Info OutPut
    /// </summary>
    public class AuditInfoOutPut
    {
        /// <summary>
        /// Version
        /// </summary>
        public string Version { get; set; }
        /// <summary>
        /// Status
        /// </summary>
        public string Status { get; set; }
        /// <summary>
        /// Remarks
        /// </summary>
        public string Remarks { get; set; }
        /// <summary>
        /// Last Change Date
        /// </summary>
        public string LastChangeDate { get; set; }
        /// <summary>
        /// Last Change By
        /// </summary>
        public string LastChangeBy { get; set; }
        /// <summary>
        /// IsDeleted
        /// </summary>
        public bool IsDeleted { get; set; }
        /// <summary>
        /// Date Created
        /// </summary>
        public string DateCreated { get; set; }
        /// <summary>
        /// Created By
        /// </summary>
        public string CreatedBy { get; set; }
    }
}