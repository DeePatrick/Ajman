using System;
using APTCWEB.Common;

namespace APTCWEB.OutPutDto
{
    /// <summary>
    /// Sawari Booking OutPut Model
    /// </summary>
    public class SawariBookingOutPut
    {
        /// <summary>
        /// Passenger ID
        /// </summary>
        public string PassengerID { get; set; } = "784-2020-9871234-1";
        /// <summary>
        /// Mobile Number
        /// </summary>
        public string MobileNumber { get; set; } = "9876543210";
        /// <summary>
        /// From Location
        /// </summary>
        public string FromLocation { get; set; } = "Ghaziabad";
        /// <summary>
        /// To Location
        /// </summary>
        public string ToLocation { get; set; } = "Noida";
        /// <summary>
        /// Date Time Required
        /// </summary>
        public string DateTimeRequired { get; set; }
        /// <summary>
        /// Comments
        /// </summary>
        public string Comments { get; set; } = "Trip has been completed.";
        /// <summary>
        /// Audit Info
        /// </summary>
        public AuditInfoOutPut AuditInfo { get; set; } = new AuditInfoOutPut { Version = "1.0", Status = "", Remarks = "", LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString()), LastChangeBy = "", IsDeleted = false, DateCreated = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString()), CreatedBy = "" };
    }
}