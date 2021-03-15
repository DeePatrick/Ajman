namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWebb.Library.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Driver Vehicles OutPut
    /// </summary>
    public class DriverVehiclesOutPut
    {
        [JsonProperty("fullName")]
        public FullName FullName { get; set; }

        [JsonProperty("emiratiId")]
        public string KeyID { get; set; }

        [JsonProperty("vehicles")]
        public List<Vehicles> Vehicles { get; set; }

        [JsonProperty("roles")]
        public List<Roles> Roles { get; set; }
    }
}