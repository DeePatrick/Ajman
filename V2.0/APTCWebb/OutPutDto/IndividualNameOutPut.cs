namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWebb.Library.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Individual Name OutPut
    /// </summary>
    public class IndividualNameOutPut
    {
        [JsonProperty("keyID")]
        public string KeyID { get; set; }

        [JsonProperty("fullName")]
        public FullName FullName { get; set; }
    }
}