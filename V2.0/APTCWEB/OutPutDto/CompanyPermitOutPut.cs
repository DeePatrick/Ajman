namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
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