using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CTAPI.Controllers
{
    /// <summary>
    /// Home Controller
    /// </summary>
    public class HomeController : Controller
    {
        public RedirectResult Index()
        {
            return Redirect("~/Help/CarTrackApiList");
        }
        //public ActionResult Index()
        //{
        //    ViewBag.Title = "Home Page";
        //    return View();
        //}
    }
}
