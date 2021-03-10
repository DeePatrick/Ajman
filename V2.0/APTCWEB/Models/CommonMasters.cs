using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWEB.Models
{
    /// <summary>
    /// Common Masters
    /// </summary>
    public class CommonMasters
    {
        /// <summary>
        /// Code
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "185-Code is required")]
        public string Code { get; set; }

        /// <summary>
        /// Value
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "186-Value is required")]
        public string Value { get; set; }

        /// <summary>
        /// Rank
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Rank { get; set; }
    }
}