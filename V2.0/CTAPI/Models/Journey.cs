using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    public class Journey:CommonModel
    {
        public string BookingId { get; set; }

        [Required(ErrorMessage = "102-vehicle ID required.")]
        public string VehicleID { get; set; }

        public string PassengerID { get; set; }

        [Required(ErrorMessage = "103-driver ID required.")]
        public string DriverID { get; set; }

        public string PickupDateTime { get; set; }
        public string PickupAddress { get; set; }
        public string PickupLon { get; set; }
        public string PickupLat { get; set; }
        public string DestinationAddress { get; set; }
        public string DestinationLon { get; set; }
        public string DestinationLat { get; set; }
        public string Waypoints { get; set; }

        [Required(ErrorMessage = "109-Number of passengers must be greater than zero")]
        public string NumPassengers { get; set; }

        [Required(ErrorMessage = "108-Taxi type code required.")]
        public string TaxiType { get; set; }
    }
}