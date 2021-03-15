using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace APTCWebb.Library.Models
{
    public class UserRegistrationModel
    {
        public string EmiratId { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "112-email is required")]
        [EmailAddress(ErrorMessage = "120-please enter valid email address")]
        public string Email { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "121-phone is required")]
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "122-please enter valid phone number")]
        public string Phone { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [Required(ErrorMessage = "123-language is required")]
        public string Language { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string OtherPhone { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PassPort { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Visa { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ComPhoto { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool IsVerifiedOtp { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EmailOtp { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string MobileOtp { get; set; }
        public TrnHeader TrnHeader { get; set; }
        public Body Body { get; set; }
        public string Password { get; internal set; }
    }
    public class TrnHeader
    {
        public string ServiceProviderEntity { get; set; }
    }
    public class Body
    {
        public string UniFiedNumber { get; set; }
        public IdentityCard IdentityCard { get; set; }
        public Nationality Nationality { get; set; }
        public PersonName PersonName { get; set; }
        public Gender Gender { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime DateOfBirth { get; set; }
        public CountryOfBirth CountryOfBirth { get; set; }
        public EmirateOfBirth EmirateOfBirth { get; set; }
        public CityOfBirth CityOfBirth { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PlaceOfBirthAr { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string PlaceOfBirthEn { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public Religion Religion { get; set; }
        public Address Address { get; set; }

    }
    public class IdentityCard
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Number { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime IssueDate { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public DateTime ExpiryDate { get; set; }

    }
    public class Nationality
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ArDesc { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EnDesc { get; set; }
    }
    public class PersonName
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FullArabicName { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FirstNameArabic { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SecondNameArabic { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ThirdNameArabic { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FourthNameArabic { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FamilyNameArabic { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CleanNameArabic { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FullEnglishName { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FirstNameEnglish { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SecondNameEnglish { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ThirdNameEnglish { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FourthNameEnglish { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FamilyNameEnglish { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string CleanNameEnglish { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Tribe Tribe { get; set; }
    }
    public class Tribe
    {

        public string ArDesc { get; set; }
        public string EnDesc { get; set; }
    }
    public class Gender
    {

        public string ArDesc { get; set; }
        public string EnDesc { get; set; }
    }
    public class CountryOfBirth
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ArDesc { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EnDesc { get; set; }
    }
    public class EmirateOfBirth
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ArDesc { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EnDesc { get; set; }
    }
    public class CityOfBirth
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ArDesc { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EnDesc { get; set; }
    }
    public class MaritalStatus
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ArDesc { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EnDesc { get; set; }
    }
    public class Religion
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string ArDesc { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string EnDesc { get; set; }
    }
    public class Register
    {
        public Register()
        {
            Type = "user";
        }
        //[Key]
        public string Id { get; set; }
        public string Type { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        public Address Address { get; set; }
    }
   
    public class Log
    {
        public string Id { get; set; }
        public string OldData { get; set; }
        public string NewData { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
