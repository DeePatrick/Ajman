using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Department Model
    /// </summary>
    public class Department
    {
        public string DepartmentName { get; set; }

        public string Role { get; set; }

    }


    public class FranchiseDepartment
    {
        List<DepartMentRole> Role { get; set; }
    }

    public class DepartMentRole
    {
        public string Id { get; set; }
        public string DepartMentRoleName { get; set; }
        public List<RoleServices> RoleServices { get; set; }
    }
    /// <summary>
    /// RoleServices
    /// </summary>
    public class RoleServices
    {
        public string Id { get; set; }

        public string Entity { get; set; }

        public bool IsStatus { get; set; }

        List<Permission> Permissions { get; set; }
    }

    public class Permission
    {
        public bool ADD { get; set; }
        public bool Update { get; set; }
        public bool Approve { get; set; }
        public bool Delete { get; set; }
        public bool Cancel { get; set; }
        public bool Refund { get; set; }
    }
}