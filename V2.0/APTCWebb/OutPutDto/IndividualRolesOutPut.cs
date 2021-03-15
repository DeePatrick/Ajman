namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWebb.Library.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Individual Roles OutPut
    /// </summary>
    public class IndividualRolesOutPut
    {
       // [JsonProperty("keyID")] // This is emirati Id. 
      //  public string KeyID { get; set; }

        [JsonProperty("roles", NullValueHandling = NullValueHandling.Ignore)]
        public List<Roles> Roles { get; set; }
    }
}