namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;
    /// <summary>
    /// Company Name OutPut
    /// </summary>
    public class CompanyNameOutPut
    {
        /// <summary>
        /// CR Number
        /// </summary>
        [JsonProperty("cRNum")]
        public string CRNum { get; set; }


        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty("name")]
        public Name Name { get; set; }
    }
}