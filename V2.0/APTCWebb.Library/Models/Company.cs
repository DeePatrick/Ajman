using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{

    public class Company
    {
        public string KeyID { get; set; }
        public string DocType { get; set; }

        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        public string Email { get; set; }

        public FullName CompanyName { get; set; }

        public List<Roles> Roles { get; set; }

        public List<Fines> Fines { get; set; }

        public List<Documents> Documents { get; set; }

        public List<Vehicles> Vehicles { get; set; }

        public MobNum MobNum { get; set; }

        public TelNum TelNum { get; set; }

        public List<AuditInfo> AuditInfo { get; set; }

        public string Website { get; set; }

        public CompanyAddress Address { get; set; }

    }



    public class CompanyAddress
    {

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AddressLine1 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string AddressLine2 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "138-city is required")]
        public string City { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "139-zip is required")]
        public string Zip { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "140-state is required")]
        public string State { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "141-country is required")]
        public string Country { get; set; }

        public Line Line { get; set; }
    }


    public class Line
    {

        [Required(ErrorMessage = "142-address line1 is required")]
        public string Line1 { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Line2 { get; set; }
    }
}