using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CTAPI.OutPutDto
{
    public class MessageOutPut
    {
        public string Id { get; set; } = "sample1 string 1";
        public string StatusCode { get; set; } = "sample1 string 2";
        public string ResponseMessage { get; set; } = "sample1 string 3";
        public string ResponseType { get; set; } = "sample1 string 6";
        public bool IsSuccess { get; set; } = true;
    }
}