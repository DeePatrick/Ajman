using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CTAPI.Models
{
    public class RoadsideAssistanceModel:CommonModel
    {
        [Required(ErrorMessage = "113-Passenger ID is required")]
        public string PassengerID { get; set; }

        [Required(ErrorMessage = "111-mobile number is required")]
        public string MobileNumber { get; set; }

        [Required(ErrorMessage = "114-Latitude ID is required")]
        public string Latitude { get; set; }

        [Required(ErrorMessage = "115-Longitute ID is required")]
        public string Longitude { get; set; }

        [Required(ErrorMessage = "116-Service Required is required")]
        public string ServiceRequired { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Comments { get; set; }

        //public AuditInfo AuditInfo { get; set; }
    }
    public class RoadsideAssistanceModelOutPut
    {
        public string RequestRefID { get; set; }
        public string Message { get; set; }
        public string Telephone { get; set; }
    }
}