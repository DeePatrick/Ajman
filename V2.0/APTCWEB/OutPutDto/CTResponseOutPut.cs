using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.OutPutDto
{
    /// <summary>
    /// CT Response OutPut
    /// </summary>
    public class CTResponseOutPut
    {
        /// <summary>
        /// CT Status
        /// </summary>
        public bool CTStatus { get; set; }
        /// <summary>
        /// CT Response Id
        /// </summary>
        public string CTResponseId { get; set; }
        /// <summary>
        /// CT Remarks
        /// </summary>
        public string CTRemarks { get; set; }
    }
}