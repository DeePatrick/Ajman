using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Journey/Trip Model
    /// </summary>
    public class Journey:CommonModel
    {
        /// <summary>
        /// Booking Id
        /// </summary>
        public string BookingId { get; set; }

        /// <summary>
        /// Vehicle ID
        /// </summary>
        [Required(ErrorMessage = "102-Invalid vehicle ID")]
        public string VehicleID { get; set; }

        /// <summary>
        /// Passenger ID
        /// </summary>
        public string PassengerID { get; set; }

        /// <summary>
        /// Driver ID
        /// </summary>
        [Required(ErrorMessage = "103-Invalid driver ID")]
        public string DriverID { get; set; }

        /// <summary>
        /// Pickup Date Time
        /// </summary>
        public string PickupDateTime { get; set; }

        /// <summary>
        /// Pickup Address
        /// </summary>
        public string PickupAddress { get; set; }

        /// <summary>
        /// Pickup Lon
        /// </summary>
        public string PickupLon { get; set; }

        /// <summary>
        /// Pickup Lat
        /// </summary>
        public string PickupLat { get; set; }

        /// <summary>
        /// Destination Address
        /// </summary>
        public string DestinationAddress { get; set; }

        /// <summary>
        /// Destination Lon
        /// </summary>
        public string DestinationLon { get; set; }

        /// <summary>
        /// Destination Lat
        /// </summary>
        public string DestinationLat { get; set; }

        /// <summary>
        /// Waypoints
        /// </summary>
        public string Waypoints { get; set; }

        /// <summary>
        /// Num Passengers
        /// </summary>
        [Required(ErrorMessage = "109-Number of passengers must be greater than zero")]
        public string NumPassengers { get; set; }

        /// <summary>
        /// Taxi Type
        /// </summary>
        [Required(ErrorMessage = "108-Invalid taxi type code")]
        public string TaxiType { get; set; }
    }
}