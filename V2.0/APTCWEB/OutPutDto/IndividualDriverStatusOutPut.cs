namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Individual Driver Status
    /// </summary>
    public class IndividualDriverStatusOutPut
    {
        [JsonProperty("fullName")]
        public FullName FullName { get; set; }
        [JsonProperty("emiratiId")]
        public string KeyID { get; set; }

        [JsonProperty("driverStatus")]
        public List<DriverStatus> DriverStatus { get; set; }

        [JsonProperty("roles")]
        public List<Roles> Roles { get; set; }
    }
}