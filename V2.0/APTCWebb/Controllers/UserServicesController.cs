using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using APTCWebb.Common;
using APTCWebb.Models;
using Couchbase;
using Couchbase.Core;
using APTCWebb.OutPutDto;

namespace APTCWebb.Controllers
{
    /// <summary>
    /// User Services Controller
    /// </summary>
    public class UserServicesController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion



    }
}
