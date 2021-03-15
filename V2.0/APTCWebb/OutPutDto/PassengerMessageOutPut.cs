namespace APTCWebb.OutPutDto
{
    using System;
    using APTCWebb.Common;
    /// <summary>
    /// Passenger Message OutPut
    /// </summary>
    public class PassengerMessageOutPut
    {
        /// <summary>
        /// Action
        /// </summary>
        public string Action { get; set; } = "ADD";
        /// <summary>
        /// Passenger ID
        /// </summary>
        public string PassengerID { get; set; } = "784-2020-9871234-1";
        /// <summary>
        /// Name in English
        /// </summary>
        public string NameEN { get; set; } = "Abdul Rahman";
        /// <summary>
        /// Name in Arabic
        /// </summary>
        public string NameAR { get; set; } = "عبد الرحمن";
        /// <summary>
        /// Mobile Number
        /// </summary>
        public string MobileNumber { get; set; } = "9876543210";
        /// <summary>
        /// Email Address
        /// </summary>
        public string EmailAddress { get; set; } = "abdul.rahman@qlc.com";
    }
}