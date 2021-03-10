namespace APTCWEB.OutPutDto
{
    using System;
    using APTCWEB.Common;

    /// <summary>
    /// Roadside Assistance OutPut Model
    /// </summary>
    public class RoadsideAssistanceOutPut
    {
        /// <summary>
        /// Passenger ID
        /// </summary>
        public string PassengerID { get; set; } = "7654321";
        /// <summary>
        /// Mobile Number
        /// </summary>
        public string MobileNumber { get; set; } = "9876543210";
        /// <summary>
        /// Latitude
        /// </summary>
        public string Latitude { get; set; } = "11.33333";
        /// <summary>
        /// Longitude
        /// </summary>
        public string Longitude { get; set; } = "12.44333";
        /// <summary>
        /// Service Required
        /// </summary>
        public string ServiceRequired { get; set; } = "api test by mohan.";
        /// <summary>
        /// Comments
        /// </summary>
        public string Comments { get; set; } = "done";
        /// <summary>
        /// Audit Info
        /// </summary>
        public AuditInfoOutPut AuditInfo { get; set; } = new AuditInfoOutPut { Version = "1.0", Status = "", Remarks = "", LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString()), LastChangeBy = "", IsDeleted = false, DateCreated = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString()), CreatedBy = "" };
    }
}