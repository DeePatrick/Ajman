using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    ///  Login Model
    /// </summary>
    public class LoginOld : CommonModel
    {

        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Key Id 
        /// </summary>
        [Required(ErrorMessage = "133-Key number is required")]
        public string KeyId { get; set; }

        /// <summary>
        /// User Id
        /// </summary>
        [Required(ErrorMessage = "157-User Id is required")]
        public string UserId { get; set; }
        
        /// <summary>
        /// Mobile No
        /// </summary>
        [Required(ErrorMessage = "190-Password Id is required")]
        public string MobileNo { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [Required(ErrorMessage = "158-Password is required")]
        public string Password { get; set; }

        /// <summary>
        /// Type
        /// </summary>
        [Required(ErrorMessage = "159-User type is required")]
        public string Type { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Role
        /// </summary>
        [Required(ErrorMessage = "160-Role required")]
        public string Role { get; set; }

        /// <summary>
        /// Pre_language
        /// </summary>
        [Required(ErrorMessage = "161-Pre. language is required")]
        public string Pre_language { get; set; }
        //public string Created_on { get; set; }
        //public string Created_by { get; set; }
        //public string Modify_by { get; set; }
        //public string Modify_on { get; set; }
    }

    //By Vinay
    //  "Lang" : "en_US",
    //"DocType" : "user",
    //"Name" : "mosaab24"
    //"Email" : "mosaab.elemam@quicklinkconsultancy.com"
    //"Mobile" : 97338912182,
    //"LastLogin" : "09/04/2018 10:13:34",
    //"Password" : "Qw123456",
    //"PrevPass" : [
    //		{Sr : 1 , "Password" : "123123", "ChangedOn" : "07/14/2018 12:13:14"},
    //		{Sr : 2 , "Password" : "123qq3", "ChangedOn" : "07/13/2018 09:13:14"}
    //		] 

    //"PassSetDate" : "09/04/2018 10:13:34",
    //"IndLink" : "132-465456-2222",
    //"PrimaryRole" : "BA"
    //"OtherRoles" : [
    //		{"DBA"},
    //		{"FOE"}
    //	]


    //By Arvind 
//    {
//  "Lang": "en_US",
//  "DocType": "user",
//  "Name": "mosaab24",
//  "Email": "vishnu1.nm@partner.samsung.com",
//  "Mobile": "973389121821",
//  "Active": true,
//  "Deleted": false,
//  "LastLogin": "09/04/2018 10:13:34",
//  "Password": "Qw1234561",
//  "PrevPass": [
//    {
//      "SrNo": 1,
//      "Password": "123123",
//      "ChangedOn": "07/14/2018 12:13:14"
//    },
//    {
//      "SrNo": 2,
//      "Password": "123qq3",
//      "ChangedOn": "07/13/2018 09:13:14"
//    }
//  ],
//  "PassSetDate": "09/04/2018 10:13:34",
//  "IndLink": "132-465456-2222",
//  "Department": "Back Office",
//  "Roles": {
//    "PrimaryRole": "HODF",
//    "OtherRoles": [
//      {
//        "Name": "FOF"
//      },
//      {
//        "Name": "BOF"
//      }
//    ]
//  }
//}
    /// <summary>
    ///  Login Model
    /// </summary>
    public class Login :CommonModel
    {
        public string Id { get; set; }
        /// <summary>
        /// Lang
        /// </summary>
        [JsonProperty("lang")]
        public string Lang { get; set; }

        /// <summary>
        /// DocType
        /// </summary>
        [JsonProperty("docType")]
        public string DocType { get; set; }


        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        //[Required(ErrorMessage = "158-Password is require")]
        [JsonProperty("password")]
        public string Password { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [JsonProperty("email")]
        public string Email { get; set; }

        /// <summary>
        /// Mobile
        /// </summary>
        [JsonProperty("mobile")]
        public string Mobile { get; set; }

        /// <summary>
        /// MobNum
        /// </summary>
        [JsonProperty("mobNum")]
        public MobNum MobNum { get; set; }

        /// <summary>
        /// TelNum
        /// </summary>
        [JsonProperty("telNum")]
        public TelNum TelNum { get; set; }

        /// <summary>
        /// PassSetDate
        /// </summary>
        [JsonProperty("passSetDate")]
        public string PassSetDate { get; set; }


        /// <summary>
        /// EmirateId
        /// </summary
        [JsonProperty("emirateId")]
        public string EmirateId { get; set; }

        /// <summary>
        /// EmirateId
        /// </summary>
        [JsonProperty("department")]
        public string Department { get; set; }

        /// <summary>
        /// Roles
        /// </summary>
        [JsonProperty("roles")]
        public UserRole Roles { get; set; }

        /// <summary>
        /// PrevPass
        /// </summary>
        [JsonProperty("prevPass")]
        public List<PrevPassword> PrevPass { get; set; }

        /// <summary>
        /// Documents
        /// </summary>
        [JsonProperty("userPhoto")]
        public string UserPhoto { get; set; }

    }

    public class UserRole
    {
        /// <summary>
        /// PrimaryRole
        /// </summary>
        [Required(ErrorMessage = "222-Primary role is require")]
        [JsonProperty("primaryRole")]
        public string PrimaryRole { get; set; }

        /// <summary>
        /// OtherRoles
        /// </summary>
        [JsonProperty("otherRoles")]
        public List<OtherRole> OtherRoles { get; set; }
    }
    public class OtherRole
    {
        /// <summary>
        /// Name
        /// </summary>
        [JsonProperty("name")]
        public string Name { get; set; }
    }

    /// <summary>
    /// OtherRoles
    /// </summary>
    public class PrevPassword
    {
        /// <summary>
        /// SrNo
        /// </summary>
        [JsonProperty("srNo")]
        public string SrNo { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [JsonProperty("password")]
        public string Password { get; set; }

        /// <summary>
        /// ChangedOn
        /// </summary>
        [JsonProperty("changedOn")]
        public string ChangedOn { get; set; }
    }
}