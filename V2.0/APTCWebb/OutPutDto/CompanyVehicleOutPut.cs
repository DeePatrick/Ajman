namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWebb.Library.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Company Vehicle OutPut
    /// </summary>
    public class CompanyVehicleOutPut
    {
        [JsonProperty("vehicles")]
        public List<Vehicles> Vehicles { get; set; }
    }
}