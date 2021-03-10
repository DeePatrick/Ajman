using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{

   public class Vehicle
    {
        
        public string Action { get; set; }

        public string Id { get; set; }

        public bool VehicleValid { get; set; }

        [Required(ErrorMessage = "125-VIN number is required")] 
        public string Vin { get; set; } // This is vehicle chassNumber.

        [Required(ErrorMessage = "126-engine number is required")]
        public string EngineNumber { get; set; }

        [Required(ErrorMessage = "127-registration number is required")]
        public string Registration { get; set; }

        [Required(ErrorMessage = "128-vehicle type is required")]
        public string Vehicletype { get; set; }

        [Required(ErrorMessage = "129-make is required")]
        public string Make { get; set; }

        [Required(ErrorMessage = "130-model number is required")]
        public string Model { get; set; }

        [Required(ErrorMessage = "131-model year is required")]
        public string ModelYear { get; set; }

        [Required(ErrorMessage = "132-color is required")]
        public string Colour { get; set; }

        /// <summary>
        /// //////// Add two new field as per new vehicle schema [APTCCRM]
        /// </summary>
        public bool DisabledFriendly { get; set; }
       
        public string PassengerCapacity { get; set; }

        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public CarTrackVehicleResponse CarTrackVehicleResponse { get; set; }
        /// <summary>
        /// Added by Arvind on 23-07-2018 as per joe email.
        /// </summary>
        [RegularExpression(@"^(\d*)$", ErrorMessage = "178-invalid Franchise, only numeric values allowed")]
        public string Franchise { get; set; }
    }

   public class CarTrackVehicleResponse
    {
        public string CTStatus { get; set; }
        public string CTDescription { get; set; }
    }
}