using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CTAPI.Models
{
    public class Performance: CommonModel
    {
        public string Id  { get; set; }
        public string StartDateTime { get; set; }
        public string EndDateTime { get; set; }
        public List<DriverScore> DriverScore { get; set; }
    }
    public  class DriverScore
    {
        public string DriverId { get; set; }
        public int KmsTravelled { get; set; }
        public int Braking { get; set; }
        public int Accel { get; set; }
        public int Corner { get; set; }
        public int Idle { get; set; }
        public int Speeding { get; set; }
        public int AverageTotal { get; set; }
    }
    //public class Login
    //{
    //    public string UserId { get; set; }
    //    public string Password { get; set; }
    //}
}