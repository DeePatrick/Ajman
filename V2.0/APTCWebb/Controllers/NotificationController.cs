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
using System.Web.Script.Serialization;
using System.Web.Http.Description;
using System.Net.Http.Formatting;
using APTCWebb.OutPutDto;

namespace APTCWebb.Controllers
{
    [RoutePrefix("api")]
    public class NotificationController : ApiController
    {
        #region PrviavteFields
            private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
            private readonly IBucket _bucketRef = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion 
        SendEmail sendEmail = new SendEmail();

        // POST: api/aptc_SaveNotificationRolewiseUserwise
        /// <summary>
        /// aptc Save Notification Rolewise Userwise
        /// </summary>
        /// <param name="notificationObj">notificationObj</param>
        /// <returns>Return notificationObj Details of newly inserted</returns>
        [Route("aptc_SaveNotificationRolewiseUserwise")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public IActionResult SaveNotificationRoleWiseUserWise(Notification notificationObj)
        {
            try
            {

                var NotificationDoc = new Document<Notification>()
                {
                    Id = "notification_" + DateTime.Now.Ticks.ToString(),
                    Content = new Notification
                    {
                        NotificationDescription = notificationObj.NotificationDescription,
                        NotificationType = notificationObj.NotificationType,
                        RoleCode = notificationObj.RoleCode,
                        DeptCode = notificationObj.DeptCode,
                        UserCode = notificationObj.UserCode,
                        NotificationText = notificationObj.NotificationText,
                        NotificationCreatedDate = DateTime.Now.ToString(),
                        ReadReceipt = false,
                        Validity = notificationObj.Validity,
                    },
                };

                var result = _bucket.Insert(NotificationDoc);

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

        // POST: api/aptc_GetNotificationRolewiseUserwise
        /// <summary>
        /// aptc Save Notification Rolewise Userwise
        /// </summary>
        /// <param name="notificationObj">notificationObj</param>
        /// <returns>Return notificationObj Details of newly inserted</returns>
        [Route("aptc_GetNotificationRolewiseUserwise")]
        [HttpPost]
        [ResponseType(typeof(Notification))]
        public IActionResult GetNotificationRolewiseUserwise(NotificationInputParameters notificationInputObj)
        {
            try
            {
                //Notification objNotification = new Notification();
                string query = string.Empty;

                //For Individual Query : SELECT n.* FROM APTCCRM  r UNNEST r.['notification'] n where  n.['UserCode'] = "individual_12332"
                //For RoleCode Query : SELECT n.* FROM APTCCRM  r UNNEST r.['notification'] n where n.['RoleCode'] = 'HODP'  and n.['DeptCode'] = 'CMOW'
                if (!string.IsNullOrEmpty(notificationInputObj.UserCode))
                {
                    // query = @"SELECT n.*  From " + _bucket.Name + " r UNNEST r.['notification'] n where n.['UserCode'] = '" + notificationInputObj.UserCode + "'";
                    query = @"select meta().id as notificationID,r.deptCode,r.roleCode,r.validity,r.notificationType, r.notificationText,r.notificationDescription ,notificationCreatedDate, readReceipt
                    from " + _bucket.Name + " r where meta().id like '%notification_%' and userCode = '" + notificationInputObj.UserCode + "' and notificationType = " + notificationInputObj.NotificationType + " and readReceipt=false";
                }
                else
                {
                    //query = @"SELECT n.*  From " + _bucket.Name + " r UNNEST r.['notification'] n where n.['RoleCode'] = '" + notificationInputObj.RoleCode + "' and n.['DeptCode'] = '" + notificationInputObj.DeptCode + "'";
                    query = @"select meta().id as notificationID,r.deptCode,r.roleCode,r.validity,r.notificationType, r.notificationText,r.notificationDescription,notificationCreatedDate, readReceipt
                    from " + _bucket.Name + " r where meta().id like '%notification_%' and deptCode = '" + notificationInputObj.DeptCode + "' and roleCode ='" + notificationInputObj.RoleCode + "' and notificationType = " + notificationInputObj.NotificationType + " and readReceipt=false";
                }

                var objNotification = _bucket.Query<Notification>(query).ToList();

                if (objNotification.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "213-please enter valid RoleCode/DeptCode/UserCode.");
                }
                else return Content(HttpStatusCode.OK, objNotification);

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, ex.Message);
            }
        }


        // POST: api/aptc_GetNotificationRolewiseUserwise
        /// <summary>
        /// aptc Save Notification Rolewise Userwise
        /// </summary>
        /// <param name="notificationObj">notificationObj</param>
        /// <returns>Return notificationObj Details of newly inserted</returns>
        [Route("aptc_GetNotificationMessage")]
        [HttpPost]
        [ResponseType(typeof(Notification))]
        public IActionResult GetNotificationMessage(NotificationInputParameters notificationInputObj)
        {
            try
            {
                //Notification objNotification = new Notification();
                string query = string.Empty;
                //For Individual Query : SELECT n.* FROM APTCCRM  r UNNEST r.['notification'] n where  n.['UserCode'] = "individual_12332"
                //For RoleCode Query : SELECT n.* FROM APTCCRM  r UNNEST r.['notification'] n where n.['RoleCode'] = 'HODP'  and n.['DeptCode'] = 'CMOW'
                if (notificationInputObj.NotificationType >= 1)
                {
                    query = @"SELECT NM.notificationText, NM.notificationType, NM.notificationDescription FROM " + _bucketRef.Name + " r use keys 'NotificationTypeMaster' " +
                        "unnest r.['notificationTypeMaster'] NM where NM.['roleCode'] = '" + notificationInputObj.RoleCode + "' " +
                        "and NM.['deptCode'] = '" + notificationInputObj.DeptCode + "' and NM.notificationType = " + notificationInputObj.NotificationType + "";

                    var objNotification = _bucket.Query<NotificationMessage>(query).ToList();

                    if (objNotification == null)
                    {
                        return Content(HttpStatusCode.NoContent, "214-please enter valid RoleCode/DeptCode/NotificationType.");
                    }
                    else return Content(HttpStatusCode.OK, objNotification);

                }
                return Content(HttpStatusCode.Forbidden, "Error");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, ex.Message);
            }
        }

        /// <summary>
        /// this is for read  notification
        /// </summary>
        /// <param name="model">Notification</param>
        /// <returns>success or fail message according to action</returns>
        [Route("aptc_Notification_MarkTRead/{notificationID}")]
        [HttpPut]
        [ResponseType(typeof(MessageModel))]
        public async Task<IActionResult> ApprovedIndividual(string notificationID)
        {
            string query = string.Empty;
            try
            {
                query = @"Update " + _bucket.Name + " set readReceipt=true where meta().id like 'notification_%' and meta().id='" + notificationID + "'";
                _bucket.Query<object>(query).ToList();
                return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Update, notificationID + " has been approved successfully"), new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
    }
}
