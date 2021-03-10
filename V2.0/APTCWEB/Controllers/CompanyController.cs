using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Couchbase;
using Couchbase.Core;
using APTCWEB.Models;
using System.Net.Mail;
using APTCWEB.Common;
using System.Web.Script.Serialization;
using System.Web.Http.Description;
using System.Net.Http.Formatting;
using APTCWEB.OutPutDto;

namespace APTCWEB.Controllers
{
    /// <summary>
    /// Company Controller
    /// </summary>
    [RoutePrefix("api")]
    public class CompanyController : ApiController
    {
        #region PrviavteFields
        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseCRMBucket"));
        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
        string baseFilePath = ConfigurationManager.AppSettings["BaseFilePath"];
        #endregion 

        // GET: api/aptccompany/5
        /// <summary>
        /// Get data by Id
        /// </summary>
        /// <param name="id">Company_5</param>
        /// <returns>Return Company Details for id=Company_5</returns>
        [Route("aptc_company/{id}")]
        [HttpGet]
        [ResponseType(typeof(CompanyOutPut))]
        public IHttpActionResult GetCompany(string id)
        {
            try
            {
                var userDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as company where meta().id='" + id + "'").ToList();
                if (userDocument.Count == 0)
                {
                    return Content(HttpStatusCode.NoContent, "182-please enter valid company id.");
                }
                else
                {
                    return Content(HttpStatusCode.OK, userDocument);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.Forbidden, ex.Message);
            }
        }

        /// <summary>
        /// Get all data
        /// </summary>
        /// <returns>Return list of company details</returns>
        [Route("aptc_company/getall")]
        [HttpGet]
        [ResponseType(typeof(CompanyOutPut))]
        public IHttpActionResult GetAllCompany()
        {
            var driverStatusDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " as Company where meta().id LIKE 'company_%' and auditInfo.isDeleted=false").ToList();
            return Content(HttpStatusCode.OK, driverStatusDocument);
        }

        SendEmail sendEmail = new SendEmail();
        /// <summary>
        /// Post Company
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Route("aptc_company")]
        [HttpPost]
        [ResponseType(typeof(MessageModel))]
        public async Task<IHttpActionResult> Register(Company model)
        {
            var serializer = new JavaScriptSerializer();
            try
            {
                string keyId = "company_" + model.Email;
                var userDocument = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where keyID= '" + keyId + "'").ToList();

                if (userDocument.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "The e-mail already exists"), new JsonMediaTypeFormatter());
                }
                if (!ModelState.IsValid)
                {
                    var modelErrors = new List<string>();
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            //modelErrors.Add(modelError.ErrorMessage);
                            modelErrors.Add(modelError.ErrorMessage == "" ? modelError.Exception.Message : modelError.ErrorMessage);
                        }
                    }
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), modelErrors[0].ToString()), new JsonMediaTypeFormatter());
                }

                var userDocumentPhone = _bucket.Query<object>(@"SELECT * From " + _bucket.Name + " where " + _bucket.Name + ".mobNum.num= '" + model.MobNum.NumM + "'").ToList();

                if (userDocumentPhone.Count > 0)
                {
                    return Content(HttpStatusCode.Conflict, MessageResponse.Message(HttpStatusCode.Conflict.ToString(), "104-Mobile number already exists"), new JsonMediaTypeFormatter());
                }

                MobNum mobNum = new MobNum();
                mobNum.CountryCodeM = model.MobNum.CountryCodeM;
                mobNum.NumM = model.MobNum.NumM;

                TelNum telNum = new TelNum();
                telNum.CountryCodeT = model.TelNum.CountryCodeT;
                telNum.NumT = model.TelNum.NumT;

                AuditInfo auditInfo = new AuditInfo();
                auditInfo.Version = "1";
                auditInfo.Status = "true";
                auditInfo.LastChangeDate = DataConversion.ConvertYMDHMS(DateTime.Now.ToString()); ;
                auditInfo.LastChangeBy = model.Email;


                List<Roles> lstRoles = new List<Roles>();

                foreach (var role in model.Roles)
                {
                    Roles roles = new Roles();
                    roles.RoleID = role.RoleID;
                    roles.Link = role.Link;
                    lstRoles.Add(roles);
                }
                /*List<CompanyRoles> lstRoles = new List<CompanyRoles>();

                foreach (var role in model.Roles)
                {
                    CompanyRoles roles = new CompanyRoles();
                    roles.RoleID = role.RoleID;
                    roles.Link = role.Link;
                    lstRoles.Add(roles);
                }*/

                List<Fines> lstFines = new List<Fines>();

                foreach (var fine in model.Fines)
                {
                    Fines fines = new Fines();
                    fines.FineID = fine.FineID;
                    fines.DateTime = fine.DateTime;
                    fines.Amount = fine.Amount;
                    fines.Status = fine.Status;
                    fines.Remark = fine.Remark;
                    lstFines.Add(fines);
                }

                List<Documents> lstDocuments = new List<Documents>();

                foreach (var document in model.Documents)
                {
                    Documents addnewDocument = new Documents();
                    addnewDocument.DocumentID = document.DocumentID;
                    addnewDocument.Type = document.Type;
                    addnewDocument.Version = document.Version;
                    addnewDocument.ExpDate = document.ExpDate;
                    addnewDocument.DocStatus = document.DocStatus;
                    lstDocuments.Add(document);
                }

                List<Vehicles> lstVehicles = new List<Vehicles>();
                foreach (var vehicle in model.Vehicles)
                {
                    Vehicles vehicles = new Vehicles();
                    vehicles.VehicleID = vehicle.VehicleID;
                    vehicles.Make = vehicle.Make;
                    vehicles.ModelYear = vehicle.ModelYear;
                    vehicles.VehType = vehicle.VehType;
                    vehicles.Status = vehicle.Status;
                    lstVehicles.Add(vehicles);
                }

                CompanyAddress address = new CompanyAddress();
                address.City = model.Address.City;
                address.Zip = model.Address.Zip;
                address.State = model.Address.State;
                address.Country = model.Address.Country;

                Line line = new Line();
                line.Line1 = model.Address.Line.Line1;
                line.Line2 = model.Address.Line.Line2;
                address.Line = line;


                FullName fullname = new FullName();

                fullname.En_US = model.fullName.En_US;

                fullname.Ar_SA = model.fullName.Ar_SA;

                var eotp = GenerateOtp();
                var motp = GenerateOtp();
                sendEmail.SendOtpViaEmail(model.Email, fullname.En_US, eotp);

                SendOtpViaMobile(model.MobNum, motp);

                string password = Guid.NewGuid().ToString("d").Substring(1, 4);
                var companyDoc = new Document<Company>()
                {
                    Id = "company_" + model.Email,
                    Content = new Company
                    {
                        KeyID = "company_" + model.Email,
                        fullName = fullname,
                        Fines = lstFines,
                        MobNum = mobNum,
                        AuditInfo = auditInfo,
                        Vehicles = lstVehicles,
                        Roles = lstRoles,
                        TelNum = model.TelNum,
                        DocType = model.DocType,
                        Documents = lstDocuments,
                        Email = model.Email,
                        Address = address,
                        Website = model.Website
                    },
                };

                var result = await _bucket.InsertAsync(companyDoc);
                if (!result.Success)
                {
                    return Content(HttpStatusCode.BadRequest, MessageResponse.Message(HttpStatusCode.BadRequest.ToString(), result.Message), new JsonMediaTypeFormatter());
                }
                else
                {
                    return Content(HttpStatusCode.OK, MessageResponse.Message(HttpStatusCode.OK.ToString(), MessageDescriptions.Add, result.Document.Id), new JsonMediaTypeFormatter());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, MessageResponse.Message(HttpStatusCode.InternalServerError.ToString(), ex.StackTrace), new JsonMediaTypeFormatter());
            }
        }
        /// <summary>
        /// Send OTP to Users
        /// </summary>
        /// <param name="mobileno"></param>
        /// <param name="otp"></param>
        /// <returns></returns>
        public string SendOtpViaMobile(MobNum mobileno, string otp)
        {
            return otp;
        }
        /// <summary>
        /// Generate Otp
        /// </summary>
        /// <returns></returns>
        public string GenerateOtp()
        {
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();
            return (_rdm.Next(_min, _max)).ToString();
        }
        private static string CreateUserKey(string username)
        {
            var key = Guid.NewGuid(); ; //$"user:{username}";
            return key.ToString();
        }
    }
}
