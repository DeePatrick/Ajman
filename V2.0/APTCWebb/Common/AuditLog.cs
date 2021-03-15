//using APTCWebb.Library.Models;
//using Couchbase;
//using Couchbase.Core;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Web;
//using System.Text;
//using System.Web.Http.Tracing;
//using System.Web.Http.Filters;
//using System.Web.Http.Controllers;
//using APTCWEB.Helpers;
//using System.Net;
//using System.Threading.Tasks;
//using System.IO;

//namespace APTCWebb.Common
//{
//    public class AuditLog
//    {
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAuditLogBucket"));
//        //string LogFilePath = ConfigurationManager.AppSettings.Get("LogFileUrl");
//        public AuditLog()
//        {

//        }

//        public void SaveRequestAuditLog(HttpActionContext filterContext)
//        {
//            string requestParameter;
//            using (var stream = filterContext.Request.Content.ReadAsStreamAsync().Result)
//            {
//                if (stream.CanSeek)
//                {
//                    stream.Position = 0;
//                }
//                requestParameter = filterContext.Request.Content.ReadAsStringAsync().Result;
//            }
//            AuditLogs auditLogs = new AuditLogs();

//            auditLogs.Method = filterContext.Request.Method.ToString();
//            auditLogs.URL = filterContext.Request.RequestUri.ToString();
//            auditLogs.ControllerName = filterContext.ControllerContext.ControllerDescriptor.ControllerName;
//            auditLogs.Action = filterContext.ActionDescriptor.ActionName;
//            auditLogs.RequestParameter = JSONHelper.ToJSON(requestParameter);
//            auditLogs.LogDate = DataConversion.ConvertDateYMD(DateTime.Now.ToString());
//            auditLogs.LogTime = DateTime.Now.ToLongTimeString();
            
//            var auditLogsDocs = new Document<AuditLogs>()
//            {
//                Id = "Log_Request_" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                Content = auditLogs
//            };
//            //WriteLog(auditLogs, "request");
//            var result = _bucket.InsertAsync(auditLogsDocs);
//        }

//        public void SaveResonseAuditLog(HttpActionExecutedContext context)
//        {
//            string requestParameter = context.Request.Content.ReadAsStringAsync().Result;
//            string responseParameter = context.Response.Content.ReadAsStringAsync().Result;
//            AuditLogs auditLogs = new AuditLogs();
//            auditLogs.Method = context.Request.Method.ToString();
//            auditLogs.URL = context.Request.RequestUri.AbsoluteUri;
//            auditLogs.ControllerName = context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName;
//            auditLogs.Action = context.ActionContext.ActionDescriptor.ActionName;
//            auditLogs.StatusCode = context.Response.ToString().Split(',')[0].ToString().Split(':')[1];
//            auditLogs.Status = context.Response.ReasonPhrase;
//            auditLogs.RequestParameter = JSONHelper.ToJSON(requestParameter);
//            auditLogs.Response = JSONHelper.ToJSON(responseParameter);
//            auditLogs.LogDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString());
//            auditLogs.LogTime = DateTime.Now.ToLongTimeString();
//            var auditLogsDoc = new Document<AuditLogs>()
//            {
//                Id = "Log_Response_" + DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                Content = auditLogs
//            };
//            var result = _bucket.Insert(auditLogsDoc);

//        }
//        public void WriteLog(AuditLogs auditLogs, string type)
//        {
//            StringBuilder sb =new StringBuilder();
//            if (type == "request")
//            {
//                sb.Append(DataConversion.ConvertYMDHMS(DateTime.Now.ToString()));
//                sb.Append(Environment.NewLine);
//                sb.Append("Method:"+" " +auditLogs.Method);
//                sb.Append("Url:" + " " + auditLogs.URL);
//                sb.Append("Controller:" + " " + auditLogs.ControllerName);
//                sb.Append("Action:" + " " + auditLogs.Action);
//                sb.Append("Request Parameter:" + " " + auditLogs.RequestParameter);
//                sb.Append("LogDate:" + " " + DataConversion.ConvertDateYMD(DateTime.Now.ToString()));
//                sb.Append("LogTime:" + " " + DateTime.Now.ToLongTimeString());
//            }
//            else
//            {
//                sb.Append("log something");
//            }
//            //File.AppendAllText(LogFilePath + DataConversion.ConvertDateYMD(DateTime.Now.ToShortDateString()) + "-api.txt", sb.ToString());
//            sb.Clear();
//        }
//    }
//}
////Content = new AuditLogs
////{
////    Method = context.Request.Method.ToString(),
////    URL = context.Request.RequestUri.AbsoluteUri,
////    ControllerName = context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName,
////    Action = context.ActionContext.ActionDescriptor.ActionName,
////    LogDate = DateTime.Now.ToShortDateString(),
////    LogTime = DateTime.Now.ToLongTimeString(),
////    StatusCode = context.Response.ToString().Split(',')[0].ToString().Split(':')[1],
////    ResponseMessage = context.Response.ReasonPhrase,
////    RequestParameter = JSONHelper.ToJSON(requestParameter),
////    ResponseParameter = JSONHelper.ToJSON(responseParameter),
////}