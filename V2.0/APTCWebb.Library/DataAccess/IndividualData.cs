using APTCWebb.Library.Internal.DataAccess;
using APTCWebb.Library.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace APTCWebb.Library.DataAccess
{
    public class IndividualData
    {
        private readonly IConfiguration _config;
        public IndividualData()
        {

        }
        public IndividualData(IConfiguration config)
        {
            _config = config;
        }
        public List<UserModel> GetUserById(string Id)
        {
            SqlDataAccess sql = new SqlDataAccess(_config);
            var p = new { pId = Id };
            var output = sql.LoadData<UserModel, dynamic>("[dbo].[spUserLookUp]", p, "DefaultConnection");
            return output;
        }
    }
}

