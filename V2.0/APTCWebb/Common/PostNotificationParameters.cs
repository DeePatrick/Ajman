using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace APTCWebb.Common
{
    /// <summary>
    /// PostNotificationParameters
    /// </summary>
    public class PostNotificationParameters
    {
        /// <summary>
        /// UserCode
        /// </summary>
        [JsonProperty("userCode")]
        public string UserCode { get; set; }

        /// <summary>
        /// Role Code
        /// </summary>
        [JsonProperty("roleCode")]
        public string RoleCode { get; set; }

        /// <summary>
        /// Dept Code
        /// </summary>
        [JsonProperty("deptCode")]
        public string DeptCode { get; set; }

        /// <summary>
        /// Notification Type
        /// </summary>
        [JsonProperty("notificationType")]
        public int NotificationType { get; set; }

        /// <summary>
        /// Key ID [Unique ID]
        /// </summary>
        [JsonProperty("keyID")]
        public string KeyID { get; set; }

        /// <summary>
        /// Registration Numnber
        /// </summary>
        [JsonProperty("registrationNumnber")]
        public string Value { get; set; } //For registration No/Amount etc

        /// <summary>
        /// Status
        /// </summary>
        [JsonProperty("status")]
        public string Status { get; set; }
    }
}