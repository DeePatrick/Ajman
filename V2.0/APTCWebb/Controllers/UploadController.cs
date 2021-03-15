//using Couchbase;
//using Couchbase.Core;
//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web;
//using System.Web.Http;

//namespace APTCWebb.Controllers
//{
//    /// <summary>
//    /// Upload Controller
//    /// </summary>
//    [RoutePrefix("api/upload")]
//    public class UploadController : ApiController
//    {
//        #region PrviavteFields
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
//        #endregion

//        /// <summary>
//        /// Post File 
//        /// </summary>
//        /// <param name="type"></param>
//        /// <param name="id"></param>
//        /// <param name="abc"></param>
//        /// <returns></returns>
//        [Route("file/{type}/{id}")]
//        [HttpPost]
//        public IActionResult UploadFile(string type, string id, [FromBody] string abc)
//        {
//            id = id.Split('_')[1].ToString();
//            List<string> lstPath = new List<string>();
//            //var jsonContent = Request.Content.ReadAsStringAsync().Result;
//            //var filesToDelete = HttpContext.Current.Request.Params["filesToDelete"];
//            //var clientContactId = HttpContext.Current.Request.Params["clientContactId"];
//            string destinationPath = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("FilePath"));
//            destinationPath = destinationPath + "/" + type;
//            string root = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("TempFilePath"));
//            var tempPath = Path.GetTempPath();

//            if (!Request.Content.IsMimeMultipartContent("form-data"))
//            {
//                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.UnsupportedMediaType));
//            }

//            if (!Directory.Exists(destinationPath))
//            {
//                Directory.CreateDirectory(destinationPath);
//            }

//            if (!Directory.Exists(destinationPath + "/" + id))
//            {
//                Directory.CreateDirectory(destinationPath + "/" + id);
//            }
//            destinationPath = destinationPath + "/" + id;
//            MultipartFormDataStreamProvider streamProvider = new MultipartFormDataStreamProvider(tempPath);

//            Request.Content.ReadAsMultipartAsync(streamProvider);
//            if (streamProvider.FileData.Count == 0)
//            {
//                return BadRequest("please select atlaest one file.");
//            }
//            else
//            {

//                if (!Directory.Exists(destinationPath))
//                {
//                    Directory.CreateDirectory(destinationPath);
//                }
//                foreach (MultipartFileData fileData in streamProvider.FileData)
//                {
//                    string fileName = "";
//                    if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
//                    {
//                        fileName = Guid.NewGuid().ToString();
//                    }
//                    fileName = fileData.Headers.ContentDisposition.FileName;

//                    if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
//                    {
//                        fileName = fileName.Trim('"');
//                    }

//                    if (fileName.Contains(@"/") || fileName.Contains(@"\"))
//                    {
//                        fileName = Path.GetFileName(fileName);
//                    }

//                    var newFileName = destinationPath + "/" + fileName;
//                    var fileInfo = new FileInfo(newFileName);
//                    if (fileInfo.Extension.ToLower() != ".png" && fileInfo.Extension.ToLower() != ".jpg")
//                    {
//                        return BadRequest(fileName + " shoud be jpg or png formate.");
//                    }
//                    if (File.Exists(newFileName))
//                    {
//                        File.Delete(newFileName);
//                    }

//                    File.Move(fileData.LocalFileName, newFileName);
//                    lstPath.Add(fileName);
//                }
//                if (type == "customer")
//                {

//                    string savedPath = ConfigurationManager.AppSettings.Get("BaseFilePath") + type + "/" + id + "/";
//                    string queryString = @"select " + _bucket.Name + ".body.nationality.enDesc from  " + _bucket.Name + " where emiratId= '" + id + "'";
//                    var result = _bucket.Query<object>(queryString);
//                    foreach (var item in result.ToList())
//                    {
//                        string updatequeryString = string.Empty;
//                        if ((item).ToString().Split(':')[1] == "Individual")
//                        {
//                            updatequeryString = @"update " + _bucket.Name + " set PassPort ='" + savedPath + lstPath[0] + "', Visa = '" + savedPath + lstPath[0] + "' where emiratId= '" + id + "'";
//                        }
//                        else
//                        {
//                            updatequeryString = @"update " + _bucket.Name + " set Photo ='" + savedPath + lstPath[0] + "' where emiratId= '" + id + "'";
//                        }
//                    }
//                }
//                return Json("success");
//            }
//        }
//    }
//}
