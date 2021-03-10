﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http;
using System.Web.Http.Tracing;
using WebApi.Helpers;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Net;
using APTCWEB.ErrorHelper;
using APTCWEB.Helpers;
using System.Text;
using APTCWEB.Common;
using System.IO;
using System.Configuration;

namespace APTCWEB.ActionFilters
{
    /// <summary>
    /// Action filter to handle for Global application errors.
    /// </summary>
    public class GlobalExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            //GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new NLogger());
            //var trace = GlobalConfiguration.Configuration.Services.GetTraceWriter();
            //StringBuilder sb = new StringBuilder();
            //sb.Append(Environment.NewLine);
            //sb.Append("Controller:" + " " + context.ActionContext.ControllerContext.ControllerDescriptor.ControllerType.FullName);
            //sb.Append(Environment.NewLine);
            //sb.Append("Action:" + " " + context.ActionContext.ActionDescriptor.ActionName);
            //sb.Append(Environment.NewLine);
            //sb.Append("LogDate:" + " " + DataConversion.ConvertDateYMD(DateTime.Now.ToString()));
            //sb.Append(Environment.NewLine);
            //sb.Append("LogTime:" + " " + DateTime.Now.ToLongTimeString());
            //trace.Error(context.Request, sb.ToString(), context.Exception);

            var exceptionType = context.Exception.GetType();

            if (context.Response.StatusCode.ToString()== "Unauthorized")
            {
                throw new HttpResponseException(context.Request.CreateResponse(HttpStatusCode.Unauthorized, new ServiceStatus() { StatusCode = (int)HttpStatusCode.Unauthorized, StatusMessage = "UnAuthorized", ReasonPhrase = "UnAuthorized Access" }));
            }
            if (exceptionType == typeof(ValidationException))
            {
                var resp = new HttpResponseMessage(HttpStatusCode.BadRequest) { Content = new StringContent(context.Exception.Message), ReasonPhrase = "ValidationException", };
                throw new HttpResponseException(resp);

            }
            else if (exceptionType == typeof(UnauthorizedAccessException))
            {
                throw new HttpResponseException(context.Request.CreateResponse(HttpStatusCode.Unauthorized, new ServiceStatus() { StatusCode = (int)HttpStatusCode.Unauthorized, StatusMessage = "UnAuthorized", ReasonPhrase = "UnAuthorized Access" }));
            }
            else if (exceptionType == typeof(ApiException))
            {
                var webapiException = context.Exception as ApiException;
                if (webapiException != null)
                    throw new HttpResponseException(context.Request.CreateResponse(webapiException.HttpStatus, new ServiceStatus() { StatusCode = webapiException.ErrorCode, StatusMessage = webapiException.ErrorDescription, ReasonPhrase = webapiException.ReasonPhrase }));
            }
            else if (exceptionType == typeof(ApiBusinessException))
            {
                var businessException = context.Exception as ApiBusinessException;
                if (businessException != null)
                    throw new HttpResponseException(context.Request.CreateResponse(businessException.HttpStatus, new ServiceStatus() { StatusCode = businessException.ErrorCode, StatusMessage = businessException.ErrorDescription, ReasonPhrase = businessException.ReasonPhrase }));
            }
            else if (exceptionType == typeof(ApiDataException))
            {
                var dataException = context.Exception as ApiDataException;
                if (dataException != null)
                    throw new HttpResponseException(context.Request.CreateResponse(dataException.HttpStatus, new ServiceStatus() { StatusCode = dataException.ErrorCode, StatusMessage = dataException.ErrorDescription, ReasonPhrase = dataException.ReasonPhrase }));
            }
            else
            {
                throw new HttpResponseException(context.Request.CreateResponse(HttpStatusCode.InternalServerError));
            }
        }
    }
}