using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Performance Model
    /// </summary>
    public class Performance: CommonModel
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id  { get; set; }

        /// <summary>
        /// Start Date Time
        /// </summary>
        public string StartDateTime { get; set; }

        /// <summary>
        /// End Date Time
        /// </summary>
        public string EndDateTime { get; set; }

        /// <summary>
        /// Driver Score
        /// </summary>
        public List<DriverScore> DriverScore { get; set; }
    }

    /// <summary>
    /// Driver Score Model
    /// </summary>
    
    public class DriverScore
    {
        /// <summary>
        /// Driver Id
        /// </summary>
        public string DriverId { get; set; }

        /// <summary>
        /// Kms Travelled
        /// </summary>
        public int KmsTravelled { get; set; }

        /// <summary>
        /// Braking
        /// </summary>
        public int Braking { get; set; }

        /// <summary>
        /// Accel
        /// </summary>
        public int Accel { get; set; }

        /// <summary>
        /// Corner
        /// </summary>
        public int Corner { get; set; }

        /// <summary>
        /// Idle
        /// </summary>
        public int Idle { get; set; }

        /// <summary>
        /// Speeding
        /// </summary>
        public int Speeding { get; set; }

        /// <summary>
        /// Average Total
        /// </summary>
        public int AverageTotal { get; set; }
    }

}