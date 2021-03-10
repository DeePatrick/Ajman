namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
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