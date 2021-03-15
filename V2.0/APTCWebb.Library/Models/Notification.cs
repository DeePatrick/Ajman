using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;


namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Notification Class
    /// </summary>
    public class Notification
    {
        /// <summary>
        /// Notification ID
        /// </summary>
        [JsonProperty("notificationID", NullValueHandling = NullValueHandling.Ignore)]
        public string NotificationID { get; set; }

        /// <summary>
        /// Notification Description
        /// </summary>
        [JsonProperty("notificationDescription", NullValueHandling = NullValueHandling.Ignore)]
        public string NotificationDescription { get; set; } = "";

        /// <summary>
        /// NotificationType
        /// </summary>
        [JsonProperty("notificationType", NullValueHandling = NullValueHandling.Ignore)]
        public int NotificationType { get; set; }

        /// <summary>
        /// Role Code
        /// </summary>
        [JsonProperty("roleCode", NullValueHandling = NullValueHandling.Ignore)]
        public string RoleCode { get; set; } = "";

        /// <summary>
        /// Dept Code
        /// </summary>
        [JsonProperty("deptCode", NullValueHandling = NullValueHandling.Ignore)]
        public string DeptCode { get; set; }

        /// <summary>
        /// UserCode
        /// </summary>
        [JsonProperty("userCode", NullValueHandling = NullValueHandling.Ignore)]
        public string UserCode { get; set; }

        /// <summary>
        /// Notification Text
        /// </summary>
        [JsonProperty("notificationText", NullValueHandling = NullValueHandling.Ignore)]
        public string NotificationText { get; set; }


        //[JsonProperty("notificationCreatedDate", NullValueHandling = NullValueHandling.Ignore)]
        //public string NotificationCreatedDate { get; set; } = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());



        /// <summary>
        /// Read Receipt
        /// </summary>
        [JsonProperty("readReceipt", NullValueHandling = NullValueHandling.Ignore)]
        public bool ReadReceipt { get; set; } = false;

        /// <summary>
        /// Validity
        /// </summary>
        [JsonProperty("validity", NullValueHandling = NullValueHandling.Ignore)]
        public int Validity { get; set; } = 24;

    }

    /// <summary>
    /// Class Notification Input Parameters
    /// </summary>
    public class NotificationInputParameters
    {
        /// <summary>
        /// Notification CreatedDate
        /// </summary>
        [JsonProperty("deptCode", NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "210-Dept Code is required")]
        public string DeptCode { get; set; }

        /// <summary>
        /// Read Receipt
        /// </summary>
        [JsonProperty("roleCode", NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "211-Role Code is required")]
        public string RoleCode { get; set; } = string.Empty;

        /// <summary>
        /// UserCode
        /// </summary>
        [JsonProperty("userCode", NullValueHandling = NullValueHandling.Ignore)]
        public string UserCode { get; set; }

        /// <summary>
        /// UserCode
        /// </summary>
        [JsonProperty("notificationType", NullValueHandling = NullValueHandling.Ignore)]
        public int NotificationType { get; set; }
    }

    public class NotificationMessage
    {
        /// <summary>
        /// Notification Description
        /// </summary>
        [JsonProperty("notificationDescription", NullValueHandling = NullValueHandling.Ignore)]
        public string NotificationDescription { get; set; } = "";

        /// <summary>
        /// NotificationType
        /// </summary>
        [JsonProperty("notificationType", NullValueHandling = NullValueHandling.Ignore)]
        public int NotificationType { get; set; }

        /// <summary>
        /// Notification Text
        /// </summary>
        [JsonProperty("notificationText", NullValueHandling = NullValueHandling.Ignore)]
        public string NotificationText { get; set; }
    }
}