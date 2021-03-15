using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Staff
    /// </summary>

    public class Staff : Person
    {
     
    }

    public class UserDetails: Person
    {

        [JsonProperty("emirateId")]
        public string emirateId { get; set; }


        [JsonProperty("department")]
        public string Department { get; set; }


        [JsonProperty("otherRoles")]
        public List<OtherRole> otherRoles { get; set; }


        [JsonProperty("primaryRole")]
        public string PrimaryRole { get; set; }


    }


}
