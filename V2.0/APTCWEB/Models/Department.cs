using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Models
{
    /// <summary>
    /// Department Model
    /// </summary>
    public class Department
    {
        /// <summary>
        /// DepartmentName
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Role { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> FrontOffice { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> FranchiseDepartment { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> PrivateTransportDepartment { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> PublicTransportDepartment { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> CustomerCare { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> External { get; set; }
        ///// <summary>
        ///// FranchiseDepartment
        ///// </summary>
        //public List<DepartMentRole> Admin { get; set; }
    }


    /// <summary>
    /// Role
    /// </summary>
    public class FranchiseDepartment
    {
        List<DepartMentRole> Role { get; set; }
    }
    /// <summary>
    /// DeportMentRole
    /// </summary>
    public class DepartMentRole
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// DepartMentRoleName
        /// </summary>
         public string DepartMentRoleName { get; set; }
        /// <summary>
        /// RoleServices
        /// </summary>
        public List<RoleServices> RoleServices { get; set; }
    }
    /// <summary>
    /// RoleServices
    /// </summary>
    public class RoleServices
    {
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Entity
        /// </summary>
        public string Entity { get; set; }
        /// <summary>
        /// IsStatus
        /// </summary>
        public bool IsStatus { get; set; }
        /// <summary>
        /// Permissions list
        /// </summary>
        List<Permission> Permissions { get; set; }
    }
    /// <summary>
    /// Permissions Class
    /// </summary>
    public class Permission
    {
        /// <summary>
        /// ADD
        /// </summary>
        public bool ADD { get; set; }
        /// <summary>
        /// Update
        /// </summary>
        public bool Update { get; set; }
        /// <summary>
        /// Approve
        /// </summary>
        public bool Approve { get; set; }
        /// <summary>
        /// Delete
        /// </summary>
        public bool Delete { get; set; }
        /// <summary>
        /// Cancel
        /// </summary>
        public bool Cancel { get; set; }
        /// <summary>
        /// Refund
        /// </summary>
        public bool Refund { get; set; }
    }
}