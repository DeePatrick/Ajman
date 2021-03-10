using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Common
{
    public static class  DataConversion
    {
        /// <summary>
        /// Convert Date Time format Date 1999-01-01 00:00:00
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static string ConvertYMDHMS(string datetime)
        {
            string convertedDateTime = datetime;
            try
            {
                return convertedDateTime = Convert.ToDateTime(datetime).ToString("yyyy-MM-dd HH:mm:ss");
            }
            catch (Exception ex)
            {

                return convertedDateTime;
            }
        }

        /// <summary>
        /// Convert Date Time format - Date 1999-01-01
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static string ConvertDateYMD(string datetime)
        {
            string convertedDateTime = datetime;
            try
            {
                return convertedDateTime = Convert.ToDateTime(datetime).ToString("yyyy-MM-dd");
            }
            catch (Exception ex)
            {
                return convertedDateTime;
            }
            
        }
    }
}