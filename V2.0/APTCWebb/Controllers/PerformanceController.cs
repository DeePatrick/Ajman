//using APTCWebb.App_Start;
//using APTCWebb.Common;
//using APTCWebb.Models;
//using Couchbase;
//using Couchbase.Core;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Formatting;
//using System.Threading.Tasks;
//using System.Web.Http;
//using System.Web.Http.Description;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Performance Controller
//    /// </summary>
//    [RoutePrefix("api")]
//    //[BasicAuthentication]
//    public class PerformanceController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
//        #endregion

//        /// <summary>
//        /// Post Performance Message
//        /// </summary>
//        /// <param name="model"></param>
//        /// <returns></returns>
//        [Route("aptc_perfmc")]
//        [Route("car_perfmc")]
//        [HttpPost]
//        [ResponseType(typeof(MessageModel))]
//        public async Task<IActionResult> Performance(Performance model)
//        {
//            try
//            {
              
//                List<DriverScore> driverScoreList = new List<DriverScore>();
//                var strPath = @"G:\Projects\APTCAPI\APTCWEB\Performance.json";
//                string localPath = new Uri(strPath).LocalPath;
//                Performance performance = new Performance();
//                using (StreamReader read = new StreamReader(strPath))
//                {
//                    string json = read.ReadToEnd();
//                    performance = JsonConvert.DeserializeObject<Performance>(json);
//                }
//                foreach (var score in performance.DriverScore)
//                {
//                    DriverScore driverScore = new DriverScore();
//                    driverScore.DriverId = score.DriverId;
//                    driverScore.KmsTravelled = score.KmsTravelled;
//                    driverScore.Braking = score.Braking;
//                    driverScore.Accel = score.Accel;
//                    driverScore.Corner = score.Corner;
//                    driverScore.Idle = score.Idle;
//                    driverScore.Speeding = score.Speeding;
//                    driverScore.AverageTotal = score.Speeding;
//                    driverScoreList.Add(score);
//                }

//                var performanceDoc = new Document<Performance>()
//                {
//                    Id = CreateUserKey(),
//                    Content = new Performance
//                    {
//                        Id = CreateUserKey(),
//                        StartDateTime = performance.StartDateTime,
//                        EndDateTime = performance.EndDateTime,
//                        Created_On = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()),
//                        DriverScore = driverScoreList
//                    }
//                };
//                //IBucket _bucketperformance = ClusterHelper.GetBucket("DriverPerfoemance");
//                var result = await _bucket.InsertAsync(performanceDoc);

//                if (!result.Success)
//                {
//                    return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), result.Message), new JsonMediaTypeFormatter());
//                }
//                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(),MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
//            }
//        }
//        private static string CreateUserKey()
//        {
//            var key = Guid.NewGuid(); ; //$"user:{username}";
//            return key.ToString();
//        }
//    }
//}
