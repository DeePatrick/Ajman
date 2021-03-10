namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
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