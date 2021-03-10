using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Model Class Otp
    /// </summary>
    public class Otp
    {
        /// <summary>
        /// Emiratid
        /// </summary>

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Emiratid { get; set; }

        /// <summary>
        /// Emiratid
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string KeyId { get; set; }

        /// <summary>
        /// MobileNo
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MobileNo { get; set; }
       
        /// <summary>
        /// MobileOtp
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MobileOtp { get; set; }

        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //public string EmailOtp { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FullName { get; set; }
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //public string Message { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Email { get; set; }
    }

    /// <summary>
    /// MatchOtp
    /// </summary>
    public class MatchOtp
    {
        /// <summary>
        /// EmiratiId
        /// </summary>
        [JsonProperty("id")]
        public  string Id { get; set; }

        /// <summary>
        /// IsLogin
        /// </summary>
        [JsonProperty("isICA")]
        public bool IsIca { get; set; }

        /// <summary>
        /// otp
        /// </summary>
        [JsonProperty("otp")]
        public string otp { get; set; }

        /// <summary>
        /// docType
        /// </summary>
        [JsonProperty("docType")]
        public string DocType { get; set; }
    }
}