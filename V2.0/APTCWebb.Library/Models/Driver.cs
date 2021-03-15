using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Driver Model
    /// </summary>
    public class DriverModel:CommonModel
    {
        /// <summary>
        /// ID
        /// </summary>
        public string ID { get; set; }

        ///// <summary>
        ///// Emirati Id
        ///// </summary>
        //[Required(ErrorMessage = "143-Emirati Id is required")]
        //public string EmiratiId { get; set; }

        /// <summary>
        /// Name in English [Changed by Arvind on 23-07-2018 as per joe email]
        /// </summary>
        public string NameEN { get; set; }

        /// <summary>
        /// Name in Arabic [Changed by Arvind on 23-07-2018 as per joe email]
        /// </summary>
        public string NameAR { get; set; }

        /// <summary>
        /// Franchise [Added New Field as per joe email on 23-07-2018]
        /// </summary>
        [RegularExpression(@"^(\d*)$", ErrorMessage = "178-invalid Franchise, only numeric values allowed")]
        public string Franchise { get; set; }

        /// <summary>
        /// Mobile Number
        /// </summary>
        [Required(ErrorMessage = "111-mobile number is required")]
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "144-mobile number should be 10 digit only.")]
        public string MobileNumber { get; set; }

        /// <summary>
        /// Email Address
        /// </summary>
        [Required(ErrorMessage = "164-email address is required")]
        [EmailAddress(ErrorMessage = "164-invalid email address")]
        public string EmailAddress { get; set; }

        /// <summary>
        /// Vehicle Type
        /// </summary>
        [Required(ErrorMessage = "128-vehicle type is required")]
        public string VehicleType { get; set; }

        /// <summary>
        /// Permit Number
        /// </summary>
        [Required(ErrorMessage = "145-permit number is required")]
        public string PermitNumber { get; set; }

        /// <summary>
        /// License Number
        /// </summary>
        [Required(ErrorMessage = "146-license number is required")]
        public string LicenseNumber { get; set; }

        /// <summary>
        /// Passport Number
        /// </summary>
        [Required(ErrorMessage = "147-passport number is required")]
        public string PassportNumber { get; set; }

        /// <summary>
        /// Photo
        /// </summary>
        public string Photo { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Driver Valid [Third Party Verification]
        /// </summary>
        public string DriverValid { get; set; }

        /// <summary>
        /// User Name
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Car Track Driver Response
        /// </summary>
        public CarTrackDriverResponse CarTrackDriverResponse { get; set; }
        
    }

    /// <summary>
    /// Car Track Driver Response Model
    /// </summary>
    public class CarTrackDriverResponse
    {

        public string CTStatus { get; set; }

        public string CTDescription { get; set; }
    }
}