namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWebb.Library.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Company Permit OutPut
    /// </summary>
    public class CompanyPermitOutPut
    {
        [JsonProperty("documents")]
        public List<Documents> Documents { get; set; }
    }
}