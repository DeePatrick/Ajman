namespace APTCWebb.OutPutDto
{
    using System;
    using APTCWebb.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Vehicle APTC OutPut
    /// </summary>
    public class Vehicle_APTCOutPut
    {
        ///// <summary>
        ///// Id
        ///// </summary>
        //public string Id { get; set; } = "Vehicle_3UGBH71JXRY109122";

        /// <summary>
        /// Key ID
        /// </summary>
        [JsonProperty("keyID")]
        public string KeyID { get; set; } = "3UGBH71JXRY109122";
        /// <summary>
        /// DocType
        /// </summary>
        [JsonProperty("docType")]
        public string DocType { get; set; } = "";
        /// <summary>
        /// EngineNum
        /// </summary>
        [JsonProperty("engineNum")]
        public string EngineNum { get; set; } = "44WPQ10335";
        /// <summary>
        /// NumSeats
        /// </summary>
        [JsonProperty("numSeats")]
        public string NumSeats { get; set; } = "05";
        /// <summary>
        /// TrafficNum
        /// </summary>
        [JsonProperty("trafficNum")]
        public string TrafficNum { get; set; } = "636NH";
        /// <summary>
        /// FirstRegData
        /// </summary>
        [JsonProperty("firstRegData")]
        public string FirstRegData { get; set; } = "2015-07-19";
        /// <summary>
        /// YearManufacture
        /// </summary>
        [JsonProperty("yearManufacture")]
        public string YearManufacture { get; set; } = "2018";

        /// <summary>
        /// Make
        /// </summary>
        [JsonProperty("make")]
        public string Make { get; set; } = "toyota";

        /// <summary>
        /// Model
        /// </summary>
        [JsonProperty("model")]
        public string Model { get; set; } = "Altima";

        /// <summary>
        /// Colour
        /// </summary>
        [JsonProperty("colour")]
        public string Colour { get; set; } = "red";
        /// <summary>
        /// VehType
        /// </summary>
        [JsonProperty("vehType")]
        public string VehType { get; set; } = "car";
        /// <summary>
        /// FuelType
        /// </summary>
        [JsonProperty("fuelType")]
        public string FuelType { get; set; } = "F";
        /// <summary>
        /// TransType
        /// </summary>
        [JsonProperty("transType")]
        public string TransType { get; set; } = "SN";
        /// <summary>
        /// VehValid
        /// </summary>
        [JsonProperty("vehValid")]
        public bool VehValid { get; set; } = true;
        /// <summary>
        /// DisabledFriendly
        /// </summary>
        [JsonProperty("disabledFriendly")]
        public bool DisabledFriendly { get; set; } = true;

        /// <summary>
        /// Veh Plate OutPut
        /// </summary>
        [JsonProperty("vehPlate")]
        public VehPlate VehPlate { get; set; } = new VehPlate { PlateNumber = "", PlateCategory = "", PlateSource = "", PlateCode = "" };

        ///////////// New vehicle Json Come from mosaab on 18-Sep-2018
        [JsonProperty("remarks")]
        public string Remarks { get; set; }


        /// <summary>
        /// Veh Ownership OutPut
        /// </summary>
        [JsonProperty("ownership")]
        public Ownership Ownership { get; set; } = new Ownership { OwnershipType = "", OwnerID = "", OwnerName = "",LeasorName="" };

        [JsonProperty("isActive")]
        public bool IsActive { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }
}