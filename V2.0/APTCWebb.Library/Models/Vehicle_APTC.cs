using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
{
    public class Vehicle_APTC : CommonModel
    {
        //public string Id { get; set; }
        /// <summary>
        /// KeyID is VIN
        /// </summary>
        [Required(ErrorMessage = "133-Key number is required")]
        [JsonProperty("keyID")]
        public string KeyID { get; set; } // This is vehicle chassNumber.

        [JsonProperty("docType")]
        public string DocType { get; set; }

        [Required(ErrorMessage = "126-engine number is required")]
        [JsonProperty("engineNum")]
        public string EngineNum { get; set; }

        [JsonProperty("numSeats")]
        public string NumSeats { get; set; }

        /// <summary>
        ///Registration number is TrafficNum
        /// </summary>
        [JsonProperty("trafficNum")]
        public string TrafficNum { get; set; } //Registration number is TrafficNum

        [JsonProperty("firstRegData")]
        public string FirstRegData { get; set; }

        [Required(ErrorMessage = "134-year manufacture is required")]
        [JsonProperty("yearManufacture")]
        public string YearManufacture { get; set; }

        [Required(ErrorMessage = "135-make is required")]
        [JsonProperty("make")]
        public string Make { get; set; }

        [Required(ErrorMessage = "135-model is required")]
        [JsonProperty("model")]
        public string Model { get; set; }

        [Required(ErrorMessage = "132-color is required")]
        [JsonProperty("colour")]
        public string Colour { get; set; }

        [Required(ErrorMessage = "128-vehicle type is required")]
        [JsonProperty("vehType")]
        public string VehType { get; set; }

        [Required(ErrorMessage = "136-fuel type is required")]
        [JsonProperty("fuelType")]
        public string FuelType { get; set; }

        [Required(ErrorMessage = "137-trans type is required")]
        [JsonProperty("transType")]
        public string TransType { get; set; }

        [JsonProperty("vehValid")]
        public bool VehValid { get; set; }

        [JsonProperty("disabledFriendly")]
        public bool DisabledFriendly { get; set; }

        [JsonProperty("vehPlate")]
        public VehPlate VehPlate { get; set; }

        /// <summary>
        /// Audit Info
        /// </summary>
        public List<AuditInfo> AuditInfo { get; set; }

        public CTResponse CTResponse { get; set; }

        ///////////// New Json Come from mosaab on 18-Sep-2018
        [JsonProperty("remarks")]
        public string Remarks { get; set; }

        [JsonProperty("ownership")]
        public Ownership Ownership { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }
    public class VehPlate
    {
        [JsonProperty("plateNumber")]
        public string PlateNumber { get; set; }

        [JsonProperty("plateCategory")]
        public string PlateCategory { get; set; }

        [JsonProperty("plateSource")]
        public string PlateSource { get; set; }

        [JsonProperty("plateCode")]
        public string PlateCode { get; set; }
    }
    public class Ownership
    {
        [JsonProperty("ownershipType")]
        public string OwnershipType { get; set; }

        [JsonProperty("ownerID")]
        public string OwnerID { get; set; }

        [JsonProperty("ownerName")]
        public string OwnerName { get; set; }

        [JsonProperty("leasorName")] // Add New filed LeasorName in Ownership of vehicle Json as discussed with Vinay & Brajesh on 25-Oct-2018 
        public string LeasorName { get; set; }
    }
}