//using System;
//using System.Configuration;
//using Couchbase;
//using Couchbase.Core;
//using APTCWebb.Library.Models;

//namespace APTCWebb.Common
//{
//    /// <summary>
//    /// common class SendOtp
//    /// </summary>
//    public class SendOtp
//    {
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        SendEmail sendEmail = new SendEmail();
//        MobileSMS mobileSMS = new MobileSMS();
//        /// <summary>
//        /// 
//        /// </summary>
//        /// <param name="mobileNo"></param>
//        /// /// <param name="emiratiId"></param>
//        /// <returns></returns>
//        public string Sendotp(string mobileNo, string emiratiId)
//        {
//            try
//            {
//                string Otp = GenerateOtp();
//                string Id = "otp_" + emiratiId;
//                _bucket.Remove(Id);
//               // mobileSMS.SendOtpViaMobile(mobileNo, Otp);
//                var otpDoc = new Document<Otp>()
//                {
//                    Id = Id,
//                    Content = new Otp
//                    {
//                        MobileNo = mobileNo,
//                        MobileOtp = Otp
//                    }
//                };
//                var result = _bucket.Insert(otpDoc);
//                return "ok";
//            }
//            catch (Exception ex)
//            {
//                return ex.Message;
//            }

//        }
//        /// <summary>
//        /// GenerateOtp
//        /// </summary>
//        /// <returns></returns>
//        public string GenerateOtp()
//        {
//            int _min = 1000;
//            int _max = 9999;
//            Random _rdm = new Random();
//            return (_rdm.Next(_min, _max)).ToString();
//        }
//    }
//}