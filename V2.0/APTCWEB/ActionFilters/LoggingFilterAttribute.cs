using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;
using System.Web.Http.Tracing;
using System.Web.Http;
using WebApi.Helpers;
using APTCWEB.Helpers;
using System.Net.Http;
using Newtonsoft.Json;
using APTCWEB.Common;
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
using System.Configuration;
using System.Text;
using System.Web.Script.Serialization;

namespace APTCWEB.ActionFilters
{
    public class LoggingFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            string LogFileandDB = ConfigurationManager.AppSettings.Get("LogFileandDB");
            AuditLog auditLog = new AuditLog();
            if (string.IsNullOrEmpty(LogFileandDB) || LogFileandDB == "2")
            {
                AuditLogExecuting(filterContext);
                auditLog.SaveRequestAuditLog(filterContext);
            }
            else if (LogFileandDB == "0")
            {
                AuditLogExecuting(filterContext);
            }
            else if (LogFileandDB == "1")
            {
                auditLog.SaveRequestAuditLog(filterContext);
            }
        }
        public void AuditLogExecuting(HttpActionContext filterContext)
        {
            
            StringBuilder sb = new StringBuilder();
             sb.Append("Controller:" + " " + filterContext.ControllerContext.ControllerDescriptor.ControllerType.FullName);
            sb.Append(Environment.NewLine);
            sb.Append("Action:" + " " + filterContext.ActionDescriptor.ActionName);
            sb.Append(Environment.NewLine);
            sb.Append("LogDate:" + " " + DataConversion.ConvertDateYMD(DateTime.Now.ToString()));
            sb.Append(Environment.NewLine);
            sb.Append("LogTime:" + " " + DateTime.Now.ToLongTimeString());
            GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new NLogger());
            var trace = GlobalConfiguration.Configuration.Services.GetTraceWriter();
            trace.Info(filterContext.Request, sb.ToString(), "JSON", filterContext.ActionArguments);
        }
        public override void OnActionExecuted(HttpActionExecutedContext context)
        {
            string LogFileandDB = ConfigurationManager.AppSettings.Get("LogFileandDB");
            AuditLog auditLog = new AuditLog();
            if (string.IsNullOrEmpty(LogFileandDB) || LogFileandDB == "2")
            {
                AuditLogExecuted(context);
                auditLog.SaveResonseAuditLog(context);
            }
            else if (LogFileandDB == "0")
            {
                AuditLogExecuted(context);
            }
            else if (LogFileandDB == "1")
            {
                auditLog.SaveResonseAuditLog(context);
            }
            base.OnActionExecuted(context);
        }
        public void AuditLogExecuted(HttpActionExecutedContext context)
        {
            var objectContent = context.Response.Content as ObjectContent;
            if (objectContent != null)
            {
                string requestParameter = context.Request.Content.ReadAsStringAsync().Result;
                string responseParameter = context.Response.Content.ReadAsStringAsync().Result;
                var type = objectContent.ObjectType; //type of the returned object
                var values = objectContent.Value; //holding the returned value
                StringBuilder sb = new StringBuilder();
                sb.Append("Controller:" + " " + context.ActionContext.ControllerContext.ControllerDescriptor.ControllerName);
                sb.Append(Environment.NewLine);
                sb.Append("Action:" + " " + context.ActionContext.ActionDescriptor.ActionName);
                sb.Append(Environment.NewLine);
                sb.Append("StatusCode:" + " " + context.Response.ToString().Split(',')[0].ToString().Split(':')[1]);
                sb.Append(Environment.NewLine);
                sb.Append("Status:" + " " + context.Response.ReasonPhrase);
                sb.Append(Environment.NewLine);
                sb.Append("Response:" + " " + (JSONHelper.ToJSON(responseParameter))).ToString().Replace("\r\n", "").Replace("\n", "").Replace("\r", "");
                sb.Append(Environment.NewLine);
                sb.Append("LogDate:" + " " + DataConversion.ConvertDateYMD(DateTime.Now.ToString()));
                sb.Append(Environment.NewLine);
                sb.Append("LogTime:" + " " + DateTime.Now.ToLongTimeString());
                string jsonResult = JsonConvert.SerializeObject(values, Formatting.None);
                GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new NLogger());
                var trace = GlobalConfiguration.Configuration.Services.GetTraceWriter();
                trace.Info(context.Request, sb.ToString(), "JSON", context.ActionContext.ActionArguments
               );
                //trace.Info(context.Request, "Response : " + context.Response.ReasonPhrase.ToString() + Environment.NewLine
                //+ "Response Details : " + context.ActionContext.Response.ToString() + Environment.NewLine
                //+ "Action : " + context.ActionContext.ActionDescriptor.ActionName, "JSON", context.ActionContext.ActionArguments
                //+ Environment.NewLine + "Response Result : " + jsonResult
                //);

            }
        }
    }
}