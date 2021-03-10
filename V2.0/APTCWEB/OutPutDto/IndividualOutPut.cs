namespace APTCWEB.OutPutDto
{
    using System;
    using System.Collections.Generic;
    using APTCWEB.Common;
    using APTCWEB.Models;
    using Newtonsoft.Json;

    /// <summary>
    /// Individual OutPut Model
    /// </summary>
    public class IndividualOutPut
    {
        [JsonProperty("fullName")]
        public FullName FullName { get; set; }
        [JsonProperty("dob")]
        public string DOB { get; set; }
        [JsonProperty("docType")]
        public string DocType { get; set; }
       
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("address")]
        public Address Address { get; set; }
        [JsonProperty("gender")]
        public string Gender { get; set; }
        [JsonProperty("isActive")]
        public bool IsActive { get; set; }
        [JsonProperty("keyID")]
        public string KeyID { get; set; }
        [JsonProperty("language")]
        public string Language { get; set; }
        [JsonProperty("maritalStatus")]
        public string MaritalStatus { get; set; }
        [JsonProperty("notes")]
        public string Notes { get; set; }
        [JsonProperty("mobNum")]
        public MobNum MobNum { get; set; }
        [JsonProperty("telNum")]
        public TelNum TelNum { get; set; }
        [JsonProperty("nationality")]
        public string Nationality { get; set; }
        [JsonProperty("religion")]
        public string Religion { get; set; }
        [JsonProperty("emirateId")]
        public string EmirateId { get; set; }
        [JsonProperty("department")]
        public string Department { get; set; }
        [JsonProperty("otherRoles", NullValueHandling = NullValueHandling.Ignore)]
        public List<OtherRole> OtherRoles { get; set; }
        [JsonProperty("primaryRole")]
        public string PrimaryRole { get; set; }
        [JsonProperty("status")]
        public Status Status { get; set; }
       
        [JsonProperty("roles", NullValueHandling = NullValueHandling.Ignore)]
        public List<Roles>Roles { get; set; }

        [JsonProperty("vehicles", NullValueHandling = NullValueHandling.Ignore)]
        public List<Vehicles> Vehicles { get; set; }


        [JsonProperty("fines", NullValueHandling = NullValueHandling.Ignore)]
        public List<Fines> Fines { get; set; }


        [JsonProperty("scoreCards", NullValueHandling = NullValueHandling.Ignore)]
        public List<ScoreCards> ScoreCards { get; set; }


        [JsonProperty("incidents", NullValueHandling = NullValueHandling.Ignore)]
        public List<Incidents> Incidents { get; set; }


        [JsonProperty("driverStatus", NullValueHandling = NullValueHandling.Ignore)]
        public List<DriverStatus> DriverStatus { get; set; }

        [JsonProperty("documents", NullValueHandling = NullValueHandling.Ignore)]
        public List<Documents> Documents { get; set; }

        [JsonProperty("profilePhoto")]
        public ProfilePhoto ProfilePhoto { get; set; }

        [JsonProperty("rolesCount",NullValueHandling = NullValueHandling.Ignore)]
        public int RolesCount { get; set; }

        [JsonProperty("vehiclesCount", NullValueHandling = NullValueHandling.Ignore)]
        public int VehiclesCount { get; set; }

        [JsonProperty("documentsCount", NullValueHandling = NullValueHandling.Ignore)]
        public int DocumentsCount { get; set; }

        [JsonProperty("finesCount", NullValueHandling = NullValueHandling.Ignore)]
        public int FinesCount { get; set; }

        [JsonProperty("scoreCardsCount", NullValueHandling = NullValueHandling.Ignore)]
        public int ScoreCardsCount { get; set; }

        [JsonProperty("incidentsCount", NullValueHandling = NullValueHandling.Ignore)]
        public int IncidentsCount { get; set; }

        [JsonProperty("driverStatusCount", NullValueHandling = NullValueHandling.Ignore)]
        public int DriverStatusCount { get; set; }

        [JsonProperty("roleName")]
        public string RoleName { get; set; }

        [JsonProperty("roleCode")]
        public string RoleCode { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("companyCode")]
        public string CompanyCode { get; set; }
    }
}