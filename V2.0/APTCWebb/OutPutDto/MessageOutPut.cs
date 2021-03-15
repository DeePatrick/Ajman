using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.OutPutDto
{
    /// <summary>
    /// Message OutPut
    /// </summary>
    public class MessageOutPut
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; } = "5";
        /// <summary>
        /// Status Code
        /// </summary>
        public string StatusCode { get; set; } = "200";
        /// <summary>
        /// Response Message
        /// </summary>
        public string ResponseMessage { get; set; } = "Response Message";
        /// <summary>
        /// Response Type
        /// </summary>
        public string ResponseType { get; set; } = "Response Type";
        /// <summary>
        /// IsSuccess
        /// </summary>
        public bool IsSuccess { get; set; } = true;
    }
}