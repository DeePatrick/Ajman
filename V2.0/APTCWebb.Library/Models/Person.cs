using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace APTCWebb.Library.Models
{
    public class Person : CommonModel
    {
        [JsonProperty(PropertyName = "keyID")]
        public string KeyID { get; set; }


        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "224-dob is required")]
        public string DOB { get; set; }

        /// </summary>
        [Required(ErrorMessage = "225-nationality is required")]
        public string Nationality { get; set; }

        [JsonProperty(PropertyName = "docType")]
        public string DocType { get; set; }

        [JsonProperty(PropertyName = "religion")]
        [Required(ErrorMessage = "226-religion is required")]
        public string Religion { get; set; }

        [JsonProperty(PropertyName = "notes")]
        public string Notes { get; set; }

        [JsonProperty(PropertyName = "gender")]
        [Required(ErrorMessage = "227-gender is required")]
        public string Gender { get; set; }


        [Required(ErrorMessage = "223-language is required")]
        public string Language { get; set; }

        [JsonProperty(PropertyName = "maritalStatus")]
        [Required(ErrorMessage = "229-maritalstatus is required")]
        public string MaritalStatus { get; set; }

        [Required(ErrorMessage = "163-full name is required")]
        public FullName FullName { get; set; }


        [JsonProperty(PropertyName = "mobNum")]
        public MobNum MobNum { get; set; }


        [JsonProperty(PropertyName = "telNum")]
        public TelNum TelNum { get; set; }

        [JsonProperty(PropertyName = "documents")]
        public List<Documents> Documents { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Login LoginDetails { get; set; }

        [JsonProperty(PropertyName = "auditInfo")]
        public List<AuditInfo> AuditInfo { get; set; }

        [JsonProperty(PropertyName = "address")]
        public Address Address { get; set; }

        [JsonProperty("profilePhoto")]
        public string ProfilePhoto { get; set; }


        public Person()
        {
            Type = "Person";
        }

        public string Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }


    }
}
