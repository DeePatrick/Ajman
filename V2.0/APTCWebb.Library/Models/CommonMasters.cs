using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
{
    public class CommonMasters
    {

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "185-Code is required")]
        public string Code { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "186-Value is required")]
        public string Value { get; set; }


        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Rank { get; set; }
    }
}