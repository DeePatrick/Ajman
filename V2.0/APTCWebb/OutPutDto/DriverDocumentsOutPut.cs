namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWebb.Library.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Driver Documents OutPut
    /// </summary>
    public class DriverDocumentsOutPut
    {

        [JsonProperty("fullName")]
        public FullName FullName { get; set; }

        [JsonProperty("emiratiId")]
        public string KeyID { get; set; }

        [JsonProperty("documents")]
        public List<Documents> Documents { get; set; }

        [JsonProperty("roles")]
        public List<Roles> Roles { get; set; }
    }
}