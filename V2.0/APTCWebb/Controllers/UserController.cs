//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Linq;
//using System.Net;
//using System.Threading.Tasks;

//using APTCWebb.Models;
//using System.Net.Mail;
//using APTCWebb.Common;

//namespace APTCWebb.Controllers
//{
//    [RoutePrefix("api")]
//    public class UserController : ApiController
//    {
//        private readonly IBucket _bucket = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseUserBucket"));
//        private readonly string _secretKey = ConfigurationManager.AppSettings["JWTTokenSecret"];
//        string baseFilePath = ConfigurationManager.AppSettings["BaseFilePath"];
//        SendEmail sendEmail = new SendEmail();

//        [Route("aptc.user/{id}")]
//        [HttpGet]
//        public IActionResult GetUser(string id)
//        {
//            try
//            {
//                var userDocument = _bucket.Query<object>(@"SELECT * From ICADB where id= '" + id + "'").ToList();
//                if (userDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, "plaese enter valid emiratid");
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, userDocument);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.Message);
//            }

//        }

//        [Route("aptc.user/customer/{id}")]
//        [HttpGet]
//        public IActionResult GetCustomerById(string id)
//        {
//            try
//            {
//                var userDocument = _bucket.Query<object>(@"SELECT * From `APTCCRM` as Customer Where emiratId ='" + id + "'").ToList();
//                if (userDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.NoContent, "No record found");
//                }
//                else
//                {
//                    return Content(HttpStatusCode.OK, userDocument);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.Message);
//            }


//        }

//        [Route("aptc.individual11/register")]
//        [HttpPost]
//        public async Task<IActionResult> Register(Individual model)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                {
//                    var modelErrors = new List<string>();
//                    foreach (var modelState in ModelState.Values)
//                    {
//                        foreach (var modelError in modelState.Errors)
//                        {
//                            modelErrors.Add(modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, modelErrors[0].ToString());
//                }

//                string phone = model.MobNum.CountryCode.ToString().Trim() + model.MobNum.Num.ToString().Trim();

//                if (await _bucket.ExistsAsync(model.EmiratiID))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"EmiratiId already exists"));
//                }
//                if (await _bucket.ExistsAsync(model.Email))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"The e-mail already exists "));
//                }
//                if (await _bucket.ExistsAsync(phone))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"Mobile number already exists"));
//                }

//                Individual individual = new Individual();
//                MobNum mobNum = new MobNum();
//                mobNum.CountryCode = model.MobNum.CountryCode;
//                mobNum.Num = model.MobNum.Num;

//                TelNum telNum = new TelNum();
//                telNum.CountryCode = model.MobNum.CountryCode;
//                telNum.Num = model.MobNum.Num;

//                AuditInfo auditInfo = new AuditInfo();
//                auditInfo.Version = "1";
//                auditInfo.Status = "true";
//                auditInfo.LastChangeDate = DateTime.Now.ToString();
//                auditInfo.LastChangeBy = model.Email;

//                List<Roles> lstRoles = new List<Roles>();
//                foreach (var role in model.Roles)
//                {
//                    Roles roles = new Roles();
//                    roles.Code = role.Code;
//                    roles.Name = role.Name;
//                    lstRoles.Add(roles);
//                }
//                List<Fines> lstFines = new List<Fines>();

//                foreach (var fine in model.Fines)
//                {
//                    Fines fines = new Fines();
//                    fines.Amount = fine.Amount;
//                    fines.Date = fine.Date;
//                    fines.Remark = fine.Remark;
//                    lstFines.Add(fines);
//                }
//                List<Documents> lstDocuments = new List<Documents>();
//                foreach (var document in model.Documents)
//                {
//                    Documents documents = new Documents();
//                    documents.Date = document.Date;
//                    documents.Name = document.Name;
//                    documents.Path = document.Path;
//                    lstDocuments.Add(document);
//                }
//                List<Vehicles> lstVehicles = new List<Vehicles>();
//                foreach (var vehicle in model.Vehicles)
//                {
//                    Vehicles vehicles = new Vehicles();
//                    vehicles.Name = vehicle.Name;
//                    vehicles.Model = vehicle.Model;
//                    vehicles.Type = vehicle.Type;
//                    lstVehicles.Add(vehicles);
//                }


//                Name name = new Name();
//                EN en = new EN();
//                en.FullName = model.Name.EN.FullName;
//                name.EN = en;
//                AR ar = new AR();
//                ar.FullName = model.Name.EN.FullName;
//                name.AR = ar;
//                var eotp = GenerateOtp();
//                var motp = GenerateOtp();
//                sendEmail.SendOtpViaEmail(model.Email, model.Name.EN.FullName, eotp);
//                SendOtpViaMobile(model.MobNum, motp);
//                string password = Guid.NewGuid().ToString("d").Substring(1, 4);
//                var individualDoc = new Document<Individual>()
//                {
//                    Id = "individual_" + model.EmiratiID,
//                    Content = new Individual
//                    {
//                        KeyID = "individual_" + model.EmiratiID,
//                        Name = name,
//                        DOB = model.DOB,
//                        Nationality = model.Nationality,
//                        Gender = model.Gender,
//                        Fines = lstFines,
//                        Language = model.Language,
//                        MaritalStatus = model.MaritalStatus,
//                        MobNum = mobNum,
//                        AuditInfo = auditInfo,
//                        Vehicles = lstVehicles,
//                        Roles = lstRoles,
//                        TelNum = model.TelNum,
//                        DocType = model.DocType,
//                        Documents = lstDocuments,
//                        Email = model.Email,
//                        Notes = model.Notes,
//                    },

//                };

//                var result = await _bucket.InsertAsync(individualDoc);
//                if (!result.Success)
//                {
//                    return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
//                }
//                else
//                {
//                    //sendEmail.SendUserIdAndPassword(model.Email, password);
//                    var userDocLogin = new Document<Login>()
//                    {
//                        Id = "Login_" + model.Email,
//                        Content = new Login
//                        {
//                            Created_by = model.Email,
//                            Created_on = DateTime.Now.ToString(),
//                            UserId = model.Email,
//                            Password = password,
//                            Pre_language = model.Language,
//                            Status = "A",
//                            Type = "CAST",
//                            Role = "User",
//                        },

//                    };
//                    IBucket _bucketLogin = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseLoginBucket"));
//                    var resultLogin = await _bucketLogin.InsertAsync(userDocLogin);
//                    return Content(HttpStatusCode.Accepted, result.Document.Id);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.StackTrace);
//            }
//        }

//        [Route("aptc.user/register")]
//        [HttpPost]
//        public async Task<IActionResult> Register(UserRegistrationModel model)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                {
//                    var modelErrors = new List<string>();
//                    foreach (var modelState in ModelState.Values)
//                    {
//                        foreach (var modelError in modelState.Errors)
//                        {
//                            modelErrors.Add(modelError.ErrorMessage);
//                        }
//                    }
//                    return Content(HttpStatusCode.BadRequest, modelErrors[0].ToString());
//                }

//                if (await _bucket.ExistsAsync(model.Email))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"Email '{model.Email}' already exists"));
//                }
//                if (await _bucket.ExistsAsync(model.EmiratId))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"EmiratId '{model.EmiratId}' already exists"));
//                }
//                if (await _bucket.ExistsAsync(model.Phone))
//                {
//                    return Content(HttpStatusCode.Conflict, new Error($"Phone '{model.EmiratId}' already exists"));
//                }
//                Body body = new Body();
//                body.UniFiedNumber = model.Body.UniFiedNumber;
//                body.PlaceOfBirthAr = model.Body.PlaceOfBirthAr;
//                body.PlaceOfBirthEn = model.Body.PlaceOfBirthEn;
//                body.DateOfBirth = model.Body.DateOfBirth;

//                if (model.Body.IdentityCard != null)
//                {
//                    IdentityCard identityCard = new IdentityCard();
//                    identityCard.Number = model.Body.IdentityCard.Number;
//                    identityCard.IssueDate = DateTime.Today;
//                    identityCard.ExpiryDate = DateTime.Today;
//                    body.IdentityCard = identityCard;
//                }

//                if (model.Body.Nationality != null)
//                {
//                    Nationality nationality = new Nationality();
//                    nationality.ArDesc = model.Body.Nationality.ArDesc;
//                    nationality.EnDesc = model.Body.Nationality.EnDesc;
//                    body.Nationality = nationality;
//                }

//                if (model.Body.PersonName != null)
//                {
//                    PersonName personName = new PersonName();
//                    personName.FullArabicName = model.Body.PersonName.FirstNameArabic;
//                    personName.FirstNameArabic = model.Body.PersonName.FirstNameArabic;
//                    personName.SecondNameArabic = model.Body.PersonName.SecondNameArabic;
//                    personName.ThirdNameArabic = model.Body.PersonName.ThirdNameArabic;
//                    personName.FourthNameArabic = model.Body.PersonName.FourthNameArabic;
//                    personName.FamilyNameArabic = model.Body.PersonName.FamilyNameArabic;
//                    personName.FullEnglishName = model.Body.PersonName.FullEnglishName;
//                    personName.FirstNameEnglish = model.Body.PersonName.FirstNameEnglish;
//                    personName.SecondNameEnglish = model.Body.PersonName.SecondNameEnglish;
//                    personName.ThirdNameEnglish = model.Body.PersonName.ThirdNameEnglish;
//                    personName.FourthNameEnglish = model.Body.PersonName.FourthNameEnglish;
//                    personName.FamilyNameEnglish = model.Body.PersonName.FamilyNameEnglish;
//                    Tribe tribe = new Tribe();
//                    tribe.ArDesc = model.Body.PersonName.Tribe.ArDesc;
//                    tribe.EnDesc = model.Body.PersonName.Tribe.EnDesc;
//                    personName.Tribe = tribe;
//                    body.PersonName = personName;
//                }
//                if (model.Body.Gender != null)
//                {
//                    Gender gender = new Gender();
//                    gender.ArDesc = model.Body.Gender.ArDesc;
//                    gender.EnDesc = model.Body.Gender.EnDesc;
//                    body.Gender = gender;
//                }

//                if (model.Body.CountryOfBirth != null)
//                {
//                    CountryOfBirth countryOfBirth = new CountryOfBirth();
//                    countryOfBirth.ArDesc = model.Body.CountryOfBirth.ArDesc;
//                    countryOfBirth.EnDesc = model.Body.CountryOfBirth.EnDesc;
//                    body.CountryOfBirth = countryOfBirth;
//                }

//                if (model.Body.EmirateOfBirth != null)
//                {
//                    EmirateOfBirth emirateOfBirth = new EmirateOfBirth();
//                    emirateOfBirth.ArDesc = model.Body.EmirateOfBirth.ArDesc;
//                    emirateOfBirth.EnDesc = model.Body.EmirateOfBirth.EnDesc;
//                    body.EmirateOfBirth = emirateOfBirth;
//                }

//                if (model.Body.EmirateOfBirth != null)
//                {
//                    CityOfBirth cityOfBirth = new CityOfBirth();
//                    cityOfBirth.ArDesc = model.Body.CityOfBirth.ArDesc;
//                    cityOfBirth.EnDesc = model.Body.CityOfBirth.EnDesc;
//                    body.CityOfBirth = cityOfBirth;
//                }

//                if (model.Body.MaritalStatus != null)
//                {
//                    MaritalStatus maritalStatus = new MaritalStatus();
//                    maritalStatus.EnDesc = model.Body.MaritalStatus.EnDesc;
//                    maritalStatus.ArDesc = model.Body.MaritalStatus.ArDesc;
//                    body.MaritalStatus = maritalStatus;
//                }

//                if (model.Body.Address != null)
//                {
//                    Address address = new Address();
//                    address.AddressLine1 = model.Body.Address.AddressLine1;
//                    address.AddressLine1 = model.Body.Address.AddressLine1;
//                    address.City = model.Body.Address.City;
//                    address.State = model.Body.Address.State;
//                    address.Country = model.Body.Address.Country;
//                    body.Address = address;
//                }

//                if (model.Body.Religion != null)
//                {
//                    Religion religion = new Religion();
//                    religion.ArDesc = model.Body.Religion.ArDesc;
//                    religion.EnDesc = model.Body.Religion.EnDesc;
//                    body.Religion = religion;
//                }
//                TrnHeader trnHeader = new TrnHeader();
//                if (model.Body.Religion != null)
//                {

//                    trnHeader.ServiceProviderEntity = "APTC";
//                }

//                var eotp = GenerateOtp();
//                var motp = GenerateOtp();
//                sendEmail.SendOtpViaEmail(model.Email, model.Body.PersonName.FirstNameEnglish, eotp);
//                //SendOtpViaMobile(model.Phone, motp);
//                string password = Guid.NewGuid().ToString("d").Substring(1, 4);
//                var userDoc = new Document<UserRegistrationModel>()
//                {
//                    Id = "Customer_" + model.EmiratId,
//                    Content = new UserRegistrationModel
//                    {
//                        IsVerifiedOtp = false,
//                        EmailOtp = eotp,
//                        MobileOtp = motp,
//                        Language = model.Language,
//                        Email = model.Email,
//                        Password = password,
//                        Phone = model.Phone,
//                        OtherPhone = model.OtherPhone,
//                        EmiratId = model.EmiratId,
//                        PassPort = model.PassPort,
//                        Body = body,
//                        TrnHeader = trnHeader
//                    },

//                };

//                var result = await _bucket.InsertAsync(userDoc);
//                if (!result.Success)
//                {
//                    return Content(HttpStatusCode.InternalServerError, new Error(result.Message));
//                }
//                else
//                {
//                    //sendEmail.SendUserIdAndPassword(model.Email, password);
//                    var userDocLogin = new Document<Login>()
//                    {
//                        Id = "Login_" + model.Email,
//                        Content = new Login
//                        {
//                            Created_by = model.Email,
//                            Created_on = DateTime.Now.ToString(),
//                            UserId = model.Email,
//                            Password = password,
//                            Pre_language = model.Language,
//                            Status = "A",
//                            Type = "CAST",
//                            Role = "User",
//                        },

//                    };
//                    IBucket _bucketLogin = ClusterHelper.GetBucket(ConfigurationManager.AppSettings.Get("CouchbaseLoginBucket"));
//                    var resultLogin = await _bucketLogin.InsertAsync(userDocLogin);
//                    return Content(HttpStatusCode.Accepted, result.Document.Id);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.StackTrace);
//            }
//        }

//        public void UserLoginDetails(Login loginDetails)
//        {
//            var userDoc = new Document<Login>()
//            {
//                Id = "Login" + loginDetails.UserId,
//                Content = new Login
//                {
//                    Created_by = loginDetails.Id,
//                    Created_on = DateTime.Now.ToString(),
//                    UserId = loginDetails.UserId,
//                    Password = loginDetails.Password,
//                    Pre_language = loginDetails.Pre_language,
//                    Status = "A",
//                    Type = "CAST",
//                    Role = "User",
//                },

//            };
//        }
//        [Route("aptc.user/getall")]
//        [HttpGet]
//        public IActionResult GetAllUser()
//        {
//            var userDocument = _bucket.Query<object>(@"SELECT * From `APTCCRM` as Customer Where META(Customer).id LIKE 'Customer_%' ").ToList();
//            return Content(HttpStatusCode.OK, userDocument);
//        }

//        [Route("aptc.user/resendotp")]
//        [HttpPost]
//        public IActionResult Resendotp(ResendOtp model)
//        {
//            try
//            {
//                string eOtp = GenerateOtp();
//                string mOtp = GenerateOtp();
//                sendEmail.SendOtpViaEmail(model.Email, model.UserName, eOtp);
//                SendOtpViaMobile(model.MobileNo, mOtp);
//                string queryString = @"update APTCCRM set isVerifiedOtp=false, emailOtp='" + eOtp + "',mobileOtp='" + mOtp + "' where emiratId= '" + model.CustomeDocumentId.Split('_')[1] + "'";
//                var result = _bucket.Query<object>(queryString).ToList();
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, new Error(ex.StackTrace));
//            }
//            return Content(HttpStatusCode.OK, "success");
//        }

//        [Route("aptc.user/matchotp")]
//        [HttpPost]
//        public IActionResult MatchOtp(ResendOtp model)
//        {
//            try
//            {
//                var query = "SELECT emailOtp,mobileOtp From APTCCRM where emiratId = stremiratId";
//                query = query.Replace("stremiratId", "'" + model.CustomeDocumentId.Split('_')[1] + "'");
//                var userDocument = _bucket.Query<object>(query).ToList();
//                if (userDocument.Count == 0)
//                {
//                    return Content(HttpStatusCode.OK, "invalid otp");
//                }
//                foreach (var item in userDocument)
//                {
//                    //if (model.EmailOtp == ((Newtonsoft.Json.Linq.JToken)item).Root["emailOtp"].ToString() && model.MobileOtp == ((Newtonsoft.Json.Linq.JToken)item).Root["mobileOtp"].ToString())
//                    //{
//                    if (model.EmailOtp == ((Newtonsoft.Json.Linq.JToken)item).Root["emailOtp"].ToString())
//                    {
//                        string queryString = @" update APTCCRM set isVerifiedOtp=true, emailOtp=null,mobileOtp=null where emiratId= '" + model.CustomeDocumentId.Split('_')[1] + "'";
//                        var result = _bucket.Query<object>(queryString).ToList();
//                        return Content(HttpStatusCode.OK, "valid");
//                    }
//                    else
//                    {
//                        return Content(HttpStatusCode.OK, "invalid otp");
//                    }
//                }

//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, new Error(ex.StackTrace));
//            }
//            return Content(HttpStatusCode.OK, "valid");
//        }

//        [Route("aptc.user/expireotp")]
//        [HttpPost]
//        public IActionResult ExpireOtp(ResendOtp model)
//        {
//            try
//            {
//                string queryString = @"update APTCCRM set isVerifiedOtp=false, emailOtp=null,mobileOtp=null where emiratId= '" + model.CustomeDocumentId.Split('_')[1] + "'";
//                var result = _bucket.Query<object>(queryString).ToList();
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, new Error(ex.StackTrace));
//            }
//            return Content(HttpStatusCode.OK, "success");
//        }

//        [Route("aptc.user/delete/emirati/{id}")]
//        [HttpDelete]
//        public IActionResult Delete(string id)
//        {
//            try
//            {
//                var userDocument = _bucket.Remove("Customer_" + id);
//                return Content(HttpStatusCode.OK, "success");
//            }
//            catch (Exception ex)
//            {
//                return Content(HttpStatusCode.Forbidden, ex.Message);
//            }
//        }

//        public string SendOtpViaMobile(MobNum mobileno, string otp)
//        {
//            return otp;
//        }
//        public string GenerateOtp()
//        {
//            int _min = 1000;
//            int _max = 9999;
//            Random _rdm = new Random();
//            return (_rdm.Next(_min, _max)).ToString();
//        }
//        private static string CreateUserKey(string username)
//        {
//            var key = Guid.NewGuid(); ; //$"user:{username}";
//            return key.ToString();
//        }
//    }
//}
