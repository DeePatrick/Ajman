using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CTAPI.Common;
using CTAPI.Models;

namespace CTAPI.Controllers
{
    /// <summary>
    /// EncryptDecrypt API
    /// </summary>
    [RoutePrefix("api")]
    public class EncryptDecryptController : ApiController
    {
        /// <summary>
        /// EncryptDecryptString
        /// </summary>
        /// <param name="value"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [Route("aptc_EncryptDecryptString")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public IHttpActionResult EncryptDecryptString(string value, int type)
        {
            try
            {
                string errorMsg = "Internal server error";

                if (string.IsNullOrEmpty(value))
                {
                    errorMsg = "Value is blank or empty";
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), errorMsg), new JsonMediaTypeFormatter());
                }
                else if (type >= 3 || type <= 0)
                {
                    errorMsg = "Invalid type";
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), errorMsg), new JsonMediaTypeFormatter());
                }
                else
                {
                    switch (type)
                    {
                        case 1:
                            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, EncryptDecrypt.Encryptword(value)), new JsonMediaTypeFormatter());
                        case 2:
                            return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, EncryptDecrypt.Decryptword(value)), new JsonMediaTypeFormatter());
                    }
                }
                
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), errorMsg), new JsonMediaTypeFormatter());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
