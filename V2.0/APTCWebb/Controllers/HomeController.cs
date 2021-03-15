using APTCWebb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace APTCWebb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UserManager<IdentityUser> _usermanager;
        private readonly RoleManager<IdentityRole> _rolemanager;

        public HomeController(ILogger<HomeController> logger, RoleManager<IdentityRole> rolemanager, UserManager<IdentityUser> usermanager)
        {
            _logger = logger;
            _rolemanager = rolemanager;
            _usermanager = usermanager;
        }

        public IActionResult Index()
        {
            return Redirect("~/Help/Index");
        }

        public async Task<IActionResult> Privacy()
        {
            string[] roles = { "Admin", "Staff", "Driver", "Customer" };

            foreach (var role in roles)
            {
                var roleExist = await _rolemanager.RoleExistsAsync(role);

                if (roleExist == false)
                {
                    await _rolemanager.CreateAsync(new IdentityRole(role));
                }
            }



            var user = await _usermanager.FindByEmailAsync("okudopato@gmail.com");

            if (user.EmailConfirmed)
            {
                await _usermanager.AddToRoleAsync(user, "Admin");
                await _usermanager.AddToRoleAsync(user, "Staff");
                await _usermanager.AddToRoleAsync(user, "Driver");
                await _usermanager.AddToRoleAsync(user, "Customer");
            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        public ActionResult Driver()
        {
            ViewBag.Title = "Driver";

            return View();
        }

        public ActionResult Vehicle()
        {
            ViewBag.Title = "Vehicle";

            return View();
        }


        public ActionResult PassengerMessage()
        {
            ViewBag.Title = "Passenger Message";

            return View();
        }

        public ActionResult DriverStatus()
        {
            ViewBag.Title = "Driver Status";

            return View();
        }

        public ActionResult IncidentMessage()
        {
            ViewBag.Title = "Incident Message";

            return View();
        }

        public ActionResult APIWSDL(string param)
        {
            ViewBag.Title = "API WSDL";

            return View();
        }

        public ActionResult CTAPIWSDL(string param)
        {
            ViewBag.Title = "CT API WSDL";

            return View();
        }

        public ActionResult Login()
        {
            ViewBag.Title = "Login";
            return View();
        }
    }
}
