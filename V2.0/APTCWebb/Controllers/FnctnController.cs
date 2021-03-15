using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Couchbase;
using Couchbase.Core;
using APTCWebb.Models;
using System.Net.Mail;
using APTCWebb.Common;
using System.Web.Http.Description;
using System.Net.Http.Formatting;
using APTCWebb.OutPutDto;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// Fnctn Controller
    /// </summary>
    [RoutePrefix("api")]
    public class FnctnController : ApiController
    {
        #region PrviavteFields
            private readonly Couchbase.Core.IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion

        /// <summary>
        /// Get data by Id
        /// </summary>
        /// <param name="id">Fnctn_9087654321</param>
        /// <returns>Return Fnctn Details for id=Fnctn_5</returns>
        [Route("aptc_fnctn/{id}")]
        [HttpGet]
        public IActionResult GetFnctn(string id)
        {
            try
            {
                var docInDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Fnctn where meta().id='" + id + "'").ToList();
                if (docInDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "182-please enter valid function id.");
                }
                else
                {
                    return Content(HttpStatusCode.OK, docInDocument);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Get All data
        /// </summary>
        /// <param name="id">Fnctn_9087654321</param>
        /// <returns>Return Fnctn Details for id=Fnctn_5</returns>
        [Route("aptc_fnctn")]
        [HttpGet]
        public IActionResult GetAllFnctn()
        {
            try
            {
                var docInDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Fnctn where meta().id like 'fnctn_%'").ToList();
                if (docInDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "182-please enter valid function id.");
                }
                else
                {
                    return Content(HttpStatusCode.OK, docInDocument);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }

        /// <summary>
        /// Post function API Data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_fnctn")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> Register(Fnctn model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var modelErrors = new List<string>();
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            modelErrors.Add(modelError.ErrorMessage);
                        }
                    }
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
                }

                Labels labels = new Labels();
                if (labels != null)
                {
                    labels.code = model.Labels.code;
                    labels.Value = model.Labels.Value;
                }

                Messages messages = new Messages();
                if (labels != null)
                {
                    messages.Code = model.Messages.Code;
                    messages.Value = model.Messages.Value;
                }

                Buttons buttons = new Buttons();
                if (labels != null)
                {
                    buttons.Code = model.Buttons.Code;
                    buttons.Value = model.Buttons.Value;
                }

                Help help = new Help();
                if (labels != null)
                {
                    help.Code = model.Help.Code;
                    help.Value = model.Help.Value;
                }

                var docID = "fnctn_" + Guid.NewGuid().ToString("d").Substring(1, 5);
                var fnctnDocument = new Document<Fnctn>()
                {
                    Id = docID,
                    Content = new Fnctn
                    {
                        DocType = model.DocType,
                        Lang = model.Lang,
                        Labels = labels,
                        Messages=messages,
                        Buttons=buttons,
                        Help=help
                    },
                };

                var result = await _bucket.InsertAsync(fnctnDocument);

                if (!result.Success)
                {
                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
                }

                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }

        }
    }
}
