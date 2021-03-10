namespace CTAPI.OutPutDto
{
    using System;
    using CTAPI.Common;
    public class LoginOutPut
    {
        public LoginOutPut()
        {

            //Id = "1";
            //UserId = "akjs005";
            //Password = "asdsadad";
            //Type = "sadasda";
            //Status = "adsada";
         }
        public string Id { get; set; } = "1";
        public string UserId { get; set; } = "arvind";
        public string Password { get; set; } = "123456";
        public string Type { get; set; } = "user";
        public string Status { get; set; } = "active";
        public string Role { get; set; } = "driver";
        public string Pre_language { get; set; } = "english";
        public string Created_on { get; set; } = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString());
        public string Created_by { get; set; } = "arvind";
        public string Modify_by { get; set; } = "arvind";
        public string Modify_on { get; set; } = DataConversion.ConvertYMDHMS(DateTime.Now.ToShortTimeString());
    }
}