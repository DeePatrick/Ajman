﻿using System;
using System.Collections.Generic;
using System.Text;

namespace APTCWebb.Library.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
