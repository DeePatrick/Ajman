using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    public class Error
    {
        public Error(string failure)
        {
            Failure = failure;
        }

        [JsonProperty("failure")]
        public string Failure { get; }
    }
}