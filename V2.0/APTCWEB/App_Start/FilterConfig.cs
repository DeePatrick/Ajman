using APTCWEB.App_Start;
using System.Web;
using System.Web.Mvc;

namespace APTCWEB
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            //filters.Add(new BasicAuthenticationAttribute());
            //filters.Add(new Startup());
        }
    }
}
