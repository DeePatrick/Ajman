using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    public class DriverModel:CommonModel
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "143-Emirati Id is required")]
        public string EmiratiId { get; set; }
        /// <summary>
        /// Changed by Arvind on 23-07-2018 as per joe email.
        /// </summary>
        public string NameEN { get; set; }
        /// <summary>
        /// Changed by Arvind on 23-07-2018 as per joe email.
        /// </summary>
        public string NameAR { get; set; }
        /// <summary>
        /// Added by Arvind on 23-07-2018 as per joe email.
        /// </summary>
        [RegularExpression(@"^(\d*)$", ErrorMessage = "178-invalid Franchise, only numeric values allowed")]
        public string Franchise { get; set; }
        [Required(ErrorMessage = "111-mobile number is required")]
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "144-mobile number should be 10 digit only.")]
        public string MobileNumber { get; set; }
        [Required(ErrorMessage = "164-email address is required")]
        [EmailAddress(ErrorMessage = "invalid email")]
        public string EmailAddress { get; set; }
        [Required(ErrorMessage = "128-vehicle type is required")]
        public string VehicleType { get; set; }
        [Required(ErrorMessage = "145-permit number is required")]
        public string PermitNumber { get; set; }
        [Required(ErrorMessage = "146-license number is required")]
        public string LicenseNumber { get; set; }
        [Required(ErrorMessage = "147-passport number is required")]
        public string PassportNumber { get; set; }
        [Required(ErrorMessage = "148-issue date is required")]
        public string LicenseIssueDate { get; set; }
        [Required(ErrorMessage = "149-expiry date is required")]
        public string LicenseExpiryDate { get; set; }
        public string Photo { get; set; }
        public string Password { get; set; }
        public string DriverValid { get; set; }
        public CarTrackDriverResponse CarTrackDriverResponse { get; set; }
        /// <summary>
        /// HotelPickup // Add on 23-07-2018 as per joe email.
        /// </summary>
        public bool HotelPickup { get; set; } = false;
    }
    public class CarTrackDriverResponse
    {
        public string CTStatus { get; set; }
        public string CTDescription { get; set; }
    }
}