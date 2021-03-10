using System;
using System.Configuration;
using System.Net.Mail;

namespace APTCWEB.Common
{
    public class SendEmail
    {
        string SMTP = ConfigurationManager.AppSettings.Get("SMTP");
        string SMTPUserId = ConfigurationManager.AppSettings.Get("SMTPUserId");
        string SMTPPassword = ConfigurationManager.AppSettings.Get("SMTPPassword");
        string From = ConfigurationManager.AppSettings.Get("From");
        string SMTPPORT = ConfigurationManager.AppSettings.Get("SMTPPORT");

        public string SendOtpViaEmail(string emailAddress, string userName, string otp)
        {

            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(emailAddress);
                mail.From = new MailAddress(From);
                mail.Subject = "Registration Otp from APTC Admin";
                string msgBody = @"Dear UserName,
                    <br /><br /> 
                    One Time Password (OTP) for your APTC Ajman for registration is Otp. 
                    <br />
                    This password is valid only for 20 mins whichever is earlier. Do not share it with anyone.<br /> <br /> 
                    Warm regards,<br /> 
                    APTC Ajman";
                string Body = msgBody.Replace("UserName", userName).Replace("Otp", otp);
                mail.Body = Body;
                mail.IsBodyHtml = true;
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Host = SMTP;   // We use gmail as our smtp client
                smtpClient.Port =Convert.ToInt32(SMTPPORT);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = new System.Net.NetworkCredential(SMTPUserId, SMTPPassword);
                smtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return otp;
        }
        public string SendUserIdAndPassword(string emailAddress, string userName)
        {

            //try
            //{
            //    MailMessage mail = new MailMessage();
            //    mail.To.Add(emailAddress);
            //    mail.From = new MailAddress("admin@aptc.com");
            //    mail.Subject = "Registration Otp from APTC Admin";
            //    string msgBody = @"Dear UserName,
            //        <br /><br /> 
            //        One Time Password (OTP) for your APTC Ajman for registration is Otp. 
            //        <br />
            //        This password is valid only for 20 mins whichever is earlier. Do not share it with anyone.<br /> <br /> 
            //        Warm regards,<br /> 
            //        APTC Ajman";
            //    string Body = msgBody.Replace("UserName", userName).Replace("Otp", otp);
            //    mail.Body = Body;
            //    mail.IsBodyHtml = true;
            //    SmtpClient smtpClient = new SmtpClient();
            //    smtpClient.Host = "smtp.gmail.com";   // We use gmail as our smtp client
            //    smtpClient.Port = 587;
            //    smtpClient.EnableSsl = true;
            //    smtpClient.UseDefaultCredentials = true;
            //    smtpClient.Credentials = new System.Net.NetworkCredential("akjs005", "aniketjaiswal2008");
            //    smtpClient.Send(mail);
            //}
            //catch (Exception ex)
            //{

            //}

            return "";
        }
    }
}