using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CTAPI.Common
{
    public static class  DataConversion
    {
        public static string ConvertYMDHMS(string datetime)
        {
            var dateTime = Convert.ToDateTime(datetime).ToString("yyyy-MM-dd HH:mm:ss");
            return dateTime;
        }
        public static string ConvertDateYMD(string datetime)
        {
            var dateTime = Convert.ToDateTime(datetime).ToString("yyyy-MM-dd");
            return dateTime;
        }
    }
}