namespace APTCWEB.OutPutDto
{
    using System;
    using APTCWEB.Common;
    /// <summary>
    /// Incident Message OutPut
    /// </summary>
    public class IncidentMessageOutPut
    {
        /// <summary>
        /// ID
        /// </summary>
        public string ID { get; set; } = "IncidentMessage_784-2020-1234567-1";
        /// <summary>
        /// Driver ID
        /// </summary>
        public string DriverID { get; set; } = "784-2020-1234567-1";
        /// <summary>
        /// Date Time
        /// </summary>
        public string DateTime { get; set; } = "2018-06-06 19:48:02";
        /// <summary>
        /// Notes
        /// </summary>
        public string Notes { get; set; } = "Incident reported,please contact as earliest to driver.";
    }
}