namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Driver ScoreCards OutPut
    /// </summary>
    public class DriverScoreCardsOutPut
    {

        [JsonProperty("fullName")]
        public FullName FullName { get; set; }
        [JsonProperty("emiratiId")]
        public string KeyID { get; set; }

        [JsonProperty("scoreCards")]
        public List<ScoreCards> ScoreCards { get; set; }

        [JsonProperty("roles")]
        public List<Roles> Roles { get; set; }
    }
}