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
using APTCWEB.Common;
using APTCWEB.Models;
using Couchbase;
using Couchbase.Core;
using APTCWEB.OutPutDto;


namespace APTCWEB.Common
{

    public class SendNotification
    {
        #region PrviavteFields
            private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
            private readonly IBucket _bucketRef = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseAPTCREFBucket"));
        #endregion
        string strnotificationDescription = string.Empty;

        public string PostNotification(PostNotificationParameters objPostNotificationParameters)
        {
                 strnotificationDescription = @"SELECT NM.notificationText, NM.notificationType, NM.notificationDescription FROM " + _bucketRef.Name + " r use keys 'NotificationTypeMaster' " +
                "unnest r.['notificationTypeMaster'] NM where NM.['roleCode'] = '" + objPostNotificationParameters.RoleCode + "' " +
                "and NM.['deptCode'] = '" + objPostNotificationParameters.DeptCode + "' and NM.notificationType = " + objPostNotificationParameters.NotificationType + "";

                 var notificationDescriptionDocument = _bucket.Query<NotificationMessage>(strnotificationDescription).FirstOrDefault();


                if (notificationDescriptionDocument != null)
                {
                string notificationText = string.Empty;

                switch (notificationDescriptionDocument.NotificationType)
                {
                    case (int) AspectEnums.NotificationType.IndividualCreation:
                        notificationText = string.Format(notificationDescriptionDocument.NotificationText, objPostNotificationParameters.KeyID, objPostNotificationParameters.Status);
                        break;
                    case (int)AspectEnums.NotificationType.VehicleRegistration:
                        notificationText = string.Format(notificationDescriptionDocument.NotificationText, objPostNotificationParameters.KeyID, objPostNotificationParameters.Value, objPostNotificationParameters.Status);
                        break;
                    case (int)AspectEnums.NotificationType.PermitRequest:
                        notificationText = string.Format(notificationDescriptionDocument.NotificationText, objPostNotificationParameters.KeyID, objPostNotificationParameters.Value, objPostNotificationParameters.Status);
                        break;
                    case (int)AspectEnums.NotificationType.CompanyRegistration:
                        notificationText = string.Format(notificationDescriptionDocument.NotificationText, objPostNotificationParameters.KeyID, objPostNotificationParameters.Value, objPostNotificationParameters.Status);
                        break;
                    case (int)AspectEnums.NotificationType.FineRequest:
                        notificationText = string.Format(notificationDescriptionDocument.NotificationText, objPostNotificationParameters.KeyID, objPostNotificationParameters.Value, objPostNotificationParameters.Status);
                        break;
                }
                var NotificationDoc = new Document<Notification>()
                    {
                        Id = "notification_" + DateTime.Now.Ticks.ToString(),
                        Content = new Notification
                        {
                            NotificationDescription = notificationDescriptionDocument.NotificationDescription,
                            NotificationType = objPostNotificationParameters.NotificationType,
                            RoleCode = objPostNotificationParameters.RoleCode,
                            DeptCode = objPostNotificationParameters.DeptCode,
                            UserCode = objPostNotificationParameters.UserCode,
                            //NotificationText = string.Format(notificationDescriptionDocument.NotificationText, objPostNotificationParameters.KeyID, objPostNotificationParameters.RegistrationNumnber, objPostNotificationParameters.Status),
                            NotificationText = notificationText,
                            NotificationCreatedDate = DateTime.Now.ToString(),
                            ReadReceipt = false,
                            Validity = 24,
                        },
                    };
                    var NotificationResult = _bucket.Insert(NotificationDoc);
                }
                else
                {
                    return "notification not configured for Dept Code "+ objPostNotificationParameters.DeptCode + " and Role Code "+ objPostNotificationParameters.RoleCode + "";
                }
            return "notification has been created";
        }
    }
}