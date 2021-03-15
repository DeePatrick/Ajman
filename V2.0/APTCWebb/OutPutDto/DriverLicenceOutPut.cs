namespace APTCWebb.OutPutDto
{
    using System;
    using APTCWebb.Common;

    /// <summary>
    ///  Driver Licence OutPut
    /// </summary>
    public class DriverLicenceOutPut
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; } = "784-2020-9871234-1";

        /// <summary>
        /// Action
        /// </summary>
        public string Action { get; set; } = "ADD";

        /// <summary>
        /// License Number
        /// </summary>
        public string LicenseNumber { get; set; } = "DE3138275";

        /// <summary>
        /// License Issue Date
        /// </summary>
        public string IssueDate { get; set; } = "2015-07-01";

        /// <summary>
        /// License Expiry Date
        /// </summary>
        public string ExpiryDate { get; set; } = "2025-07-01";

        /// <summary>
        /// HotelPickup [Added on 23-07-2018 as per joe email]
        /// </summary>
        public bool HotelPickup { get; set; } = false;
    }
}