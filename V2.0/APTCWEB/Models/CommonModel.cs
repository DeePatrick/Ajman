using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using APTCWEB.Common;

namespace APTCWEB.Models
{
    /// <summary>
    /// Common Model
    /// </summary>
    public class CommonModel
    {
        ///// <summary>
        ///// IsDeleted
        ///// </summary>
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// IsActive
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool IsActive { get; set; } = true;

        /// <summary>
        /// Action
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Action { get; set; }

        /// <summary>
        /// Created_On
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Created_On { get; set; } = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());

        /// <summary>
        /// Modified_On
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Modified_On { get; set; }

        /// <summary>
        /// Created_By
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Created_By { get; set; }

        /// <summary>
        /// Modified_By
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Modified_By { get; set; }
    }
}