namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Driver Incident sOutPut
    /// </summary>
    public class DriverIncidentsOutPut
    {
        [JsonProperty("fullName")]
        public FullName FullName { get; set; }
        [JsonProperty("emiratiId")]
        public string KeyID { get; set; }

        [JsonProperty("incidents")]
        public List<Incidents> Incidents { get; set; }

        [JsonProperty("roles")]
        public List<Roles> Roles { get; set; }
    }
}