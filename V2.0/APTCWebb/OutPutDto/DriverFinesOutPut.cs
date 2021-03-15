namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Driver Fines OutPut
    /// </summary>
    public class DriverFinesOutPut
    {

        [JsonProperty("fullName")]
        public FullName FullName { get; set; }

        [JsonProperty("emiratiId")]
        public string KeyID { get; set; }

        [JsonProperty("fines")]
        public List<Fines> Incidents { get; set; }

        [JsonProperty("roles")]
        public List<Roles> Roles { get; set; }
    }
}