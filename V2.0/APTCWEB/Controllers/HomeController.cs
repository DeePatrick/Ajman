using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using APTCWEB.App_Start;
using APTCWEB.Filter;
using System.Web.Configuration;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Home Controller
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Index
        /// </summary>
        /// <returns></returns>
        public RedirectResult Index()
        {
            return Redirect("~/Help/Index");
        }

        //public ActionResult Index()
        //{
        //    ViewBag.Title = "Home";

        //    return View();
        //}
        /// <summary>
        /// Driver
        /// </summary>
        /// <returns></returns>
        public ActionResult Driver()
        {
            ViewBag.Title = "Driver";

            return View();
        }

        /// <summary>
        /// Vehicle
        /// </summary>
        /// <returns></returns>
        public ActionResult Vehicle()
        {
            ViewBag.Title = "Vehicle";

            return View();
        }

        /// <summary>
        /// PassengerMessage
        /// </summary>
        /// <returns></returns>
        public ActionResult PassengerMessage()
        {
            ViewBag.Title = "Passenger Message";

            return View();
        }
        /// <summary>
        /// Driver Status
        /// </summary>
        /// <returns></returns>
        public ActionResult DriverStatus()
        {
            ViewBag.Title = "Driver Status";

            return View();
        }

        /// <summary>
        /// Incident Message
        /// </summary>
        /// <returns></returns>
        public ActionResult IncidentMessage()
        {
            ViewBag.Title = "Incident Message";

            return View();
        }

        /// <summary>
        /// APIWSDL
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult APIWSDL(string param)
        {
            ViewBag.Title = "API WSDL";

            return View();
        }

        /// <summary>
        /// CTAPIWSDL
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public ActionResult CTAPIWSDL(string param)
        {
            ViewBag.Title = "CT API WSDL";

            return View();
        }

        ///// <summary>
        ///// Login
        ///// </summary>
        ///// <param name="param"></param>
        ///// <returns></returns>
        //[ActionName("Login")]
        //public string Login1(string param)
        //{
        //    var userName = WebConfigurationManager.AppSettings["userid"];
        //    var passwordweb = WebConfigurationManager.AppSettings["password"];
        //    string strReturn = string.Empty;
        //    if (string.IsNullOrEmpty(param))
        //    {
        //        strReturn = "E";
        //    }
        //    else
        //    {
        //        var userId = param.Split('|')[0];
        //        var password = param.Split('|')[1];
        //        if (userId == userName && password == passwordweb)
        //        {
        //            strReturn = "T";
        //        }
        //        else
        //        {
        //            strReturn = "F";
        //        }
        //    }
        //    return strReturn;

        //}

        /// <summary>
        /// Login
        /// </summary>
        /// <returns></returns>
        public ActionResult Login()
        {
            ViewBag.Title = "Login";
            return View();
        }
    }
}
