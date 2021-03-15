namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Veh Plate OutPut
    /// </summary>
    public class VehPlateOutPut
    {
        [JsonProperty("plateNumber")]
        public string PlateNumber { get; set; }
    }
}