using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace APTCWebbb.Library
{
    public class ConfigHelper
    {
        // TODO: Move this fromconfig to API
        public static decimal GetTaxRate()
        {

            string rateText = ConfigurationManager.AppSettings["taxRate"];
            bool IsValidTaxRate = decimal.TryParse(rateText, out decimal output);
            if (IsValidTaxRate == false)
            {
                throw new ConfigurationErrorsException("tax rate not setup properly");
            }
            return output;
        }
    }
}
