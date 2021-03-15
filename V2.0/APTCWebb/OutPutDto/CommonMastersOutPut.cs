using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.OutPutDto
{
    /// <summary>
    /// Common Masters OutPut
    /// </summary>
    public class CommonMastersOutPut
    {
        [JsonProperty("r.Code")]
        public string Code { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}