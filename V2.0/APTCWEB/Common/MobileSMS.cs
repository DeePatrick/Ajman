using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace APTCWEB.Common
{
    /// <summary>
    ///  Class MobileSMS
    /// </summary>
    public class MobileSMS
    {
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        string SmsApiUserId = ConfigurationManager.AppSettings.Get("SmsApiUserId");
        string SmsApiPassword = ConfigurationManager.AppSettings.Get("SmsApiPassword");
        string SmsFrom = ConfigurationManager.AppSettings.Get("SmsFrom");
        string SmsMaxsplit = ConfigurationManager.AppSettings.Get("SmsMaxsplit");
        string SmsMessage = ConfigurationManager.AppSettings.Get("SmsMessage");

        /// <summary>
        /// send otp on mobile  for varified
        /// </summary>
        /// <param name="mobileNo"></param>
        /// <param name="otp"></param>
        /// /// <param name="emiratiId"></param>
        /// <returns>otp</returns>
        ///  public string SendOtpViaMobile(MobNum mobileNo, string otp)
        public string SendOtpViaMobile(string mobileNo, string otp, string email)
        {
            string msg = string.Empty;
            try
            {
                msg = "200";
                string Id = "otp_" + email;
                _bucket.Remove(Id);
                var otpDoc = new Document<Otp>()
                {
                    Id = Id,
                    Content = new Otp
                    {
                        MobileNo = mobileNo,
                        MobileOtp = otp
                    }
                };
                var result = _bucket.Insert(otpDoc);
                //commented by arvind for by pass mobile sms
                //SmsMessage = SmsMessage.Replace("otpnum", otp);
                //string mobileNoWithCountryCode = mobileNo;
                //HttpClient client = new HttpClient();
                //client.BaseAddress = new Uri(ConfigurationManager.AppSettings.Get("SmsApiBaseUrl"));
                //client.DefaultRequestHeaders.Accept.Clear();
                //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //HttpResponseMessage response = client.GetAsync("http-api.php?action=sendsms&user=" + SmsApiUserId + "&password=" + SmsApiPassword + "&from=" + SmsFrom + "&to=" + mobileNoWithCountryCode + "&text=" + SmsMessage + "&maxsplit=" + SmsMaxsplit + "").Result;
                //if (response.IsSuccessStatusCode)
                //{
                //    msg = "200";
                //    string Id = "otp_" + email;
                //    _bucket.Remove(Id);
                //    var otpDoc = new Document<Otp>()
                //    {
                //        Id = Id,
                //        Content = new Otp
                //        {
                //            MobileNo = mobileNo,
                //            MobileOtp = otp
                //        }
                //    };
                //    var result = _bucket.Insert(otpDoc);
                //}
                //else
                //{
                //    msg = "400";
                //}
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
    }
}