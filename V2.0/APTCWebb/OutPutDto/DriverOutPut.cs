namespace APTCWebb.OutPutDto
{
    using System;
    using APTCWebb.Common;

    /// <summary> 
    /// Driver OutPut Model
    /// </summary>
    public class DriverOutPut
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; } = "784-2020-9871234-1";
        /// <summary>
        /// Name in English
        /// </summary>
        public string NameEN { get; set; } = "Abdul Rahman";
        /// <summary>
        /// Name in Arabic
        /// </summary>
        public string NameAR { get; set; } = "عبد الرحمن";
        /// <summary>
        /// Franchise [Nunber Only - Added on 23-07-2018 as per joe email]
        /// </summary>
        public string Franchise { get; set; } = "93432532245";
        /// <summary>
        /// Mobile Number
        /// </summary>
        public string MobileNumber { get; set; } = "9876543210";
        /// <summary>
        /// Email Address
        /// </summary>
        public string EmailAddress { get; set; } = "v.s@qlc.com";
        /// <summary>
        /// Vehicle Type
        /// </summary>
        public string VehicleType { get; set; } = "car";
        /// <summary>
        /// Permit Number
        /// </summary>
        public string PermitNumber { get; set; } = "DL6HW 5652";
        /// <summary>
        /// License Number
        /// </summary>
        public string LicenseNumber { get; set; } = "DE3138275";
        /// <summary>
        /// Passport Number
        /// </summary>
        public string PassportNumber { get; set; } = "P46RGWFQGF";
        /// <summary>
        /// Photo
        /// </summary>
        public string Photo { get; set; } = "Abdul_Rahman_784-2020-9871234-1.png";
        /// <summary>
        /// Password
        /// </summary>
        public string Password { get; set; } = "aWe4";
        /// <summary>
        /// DriverValid [Third Party Verification]
        /// </summary>
        public string DriverValid { get; set; } = "true";
        /// <summary>
        /// Action
        /// </summary>
        public string Action { get; set; } = "ADD";
        /// <summary>
        /// IsDeleted
        /// </summary>
        public bool IsDeleted { get; set; } = false;
        /// <summary>
        /// IsActive
        /// </summary>
        public bool IsActive { get; set; } = true;
        /// <summary>
        /// Created Date
        /// </summary>
        public string CreatedDate { get; set; } = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString());
        /// <summary>
        /// Modified Date
        /// </summary>
        public string ModifiedDate { get; set; } = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString());
        /// <summary>
        /// Created By
        /// </summary>
        public string CreatedBy { get; set; } = "Abdul Rahman";
        /// <summary>
        /// Modified By
        /// </summary>
        public string ModifiedBy { get; set; } = "";
        /// <summary>
        /// Car Track Driver Response OutPut
        /// </summary>
        public CarTrackDriverResponseOutPut CarTrackDriverResponse { get; set; } = new CarTrackDriverResponseOutPut { CTStatus = "No", CTDescription = "" };
    }
    /// <summary>
    /// Car Track Driver Response OutPut Model
    /// </summary>
    public class CarTrackDriverResponseOutPut
    {
        /// <summary>
        /// CT Status
        /// </summary>
        public string CTStatus { get; set; }
        /// <summary>
        /// CT Description
        /// </summary>
        public string CTDescription { get; set; } 
    }
}