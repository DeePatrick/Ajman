namespace APTCWebb.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWebb.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Company OutPut Model
    /// </summary>
    public class CompanyOutPut
    {
        /// <summary>
        /// CR Number
        /// </summary>
        [JsonProperty("cRNum")]
        public string CRNum { get; set; }

        /// <summary>
        /// DED
        /// </summary>
         [JsonProperty("dED")]
        public string DED { get; set; } // the Emirate// DED_REF_NO//

        /// <summary>
        /// Chamber Num
        /// </summary>
        [JsonProperty("chamberNum")]
        public string ChamberNum { get; set; }

        /// <summary>
        /// Legal Form
        /// </summary>
        [JsonProperty("legalForm")]
        public string LegalForm { get; set; }

        /// <summary>
        /// Est Date
        /// </summary>
         [JsonProperty("estDate")]
        public string EstDate { get; set; }



        /// <summary>
        /// Web site
        /// </summary>
        [JsonProperty("website")]
        public string Website { get; set; }

        /// <summary>
        /// Com Type
        /// </summary>
        [JsonProperty("comType")]
        public string ComType { get; set; }

        /// <summary>
        /// Franshisee
        /// </summary>
        [JsonProperty("franshisee")]
        public Boolean Franshisee { get; set; }

        /// <summary>
        /// TelNum
        /// </summary>
        [JsonProperty("telNum")]
        public TelNum TelNum { get; set; }


        /// <summary>
        /// Notes
        /// </summary>
        [JsonProperty("notes")]
        public string Notes { get; set; }

        /// <summary>
        /// Activities
        /// </summary>
        [JsonProperty("activities", NullValueHandling = NullValueHandling.Ignore)]
        public List<Activities> Activities { get; set; }

        /// <summary>
        /// NumEmployees
        /// </summary>
        [JsonProperty("numEmployees", NullValueHandling = NullValueHandling.Ignore)]
        public List<NumEmployees> NumEmployees { get; set; }


        // <summary>
        // Fines
        // </summary>
        [JsonProperty("fines", NullValueHandling = NullValueHandling.Ignore)]
        public List<Fines> Fines { get; set; }

        // <summary>
        // Documents
        // </summary>
        [JsonProperty("documents", NullValueHandling = NullValueHandling.Ignore)]
        public List<Documents> Documents { get; set; }

        // <summary>
        // Vehicles
        // </summary>
        [JsonProperty("vehicles", NullValueHandling = NullValueHandling.Ignore)]
        public List<Vehicles> Vehicles { get; set; }

        /// <summary>
        /// MobNum
        /// </summary>
        [JsonProperty("comStatus")]
        public ComStatus ComStatus { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [JsonProperty("email")]
        public string Email { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty("name")]
        public Name Name { get; set; }

        [JsonProperty("address")]
        public Address Address { get; set; }

        [JsonProperty("ownerRoles", NullValueHandling = NullValueHandling.Ignore)]
        public List<OwnerRoles> OwnerRoles { get; set; }


        [JsonProperty("companyPhoto")]
        public string CompanyPhoto { get; set; }

        [JsonProperty("vehiclesCount", NullValueHandling = NullValueHandling.Ignore)] //vehicles Count
        public int VehiclesCount { get; set; }


        [JsonProperty("documentsCount", NullValueHandling = NullValueHandling.Ignore)] //Documents Count
        public int DocumentsCount { get; set; }


        [JsonProperty("finesCount", NullValueHandling = NullValueHandling.Ignore)] //Fines Count
        public int FinesCount { get; set; }


        [JsonProperty("ownerRolesCount", NullValueHandling = NullValueHandling.Ignore)] //OwnerRoles Count
        public int OwnerRolesCount { get; set; }


        [JsonProperty("activitiesCount", NullValueHandling = NullValueHandling.Ignore)] //Activities Count
        public int ActivitiesCount { get; set; }

    }
}