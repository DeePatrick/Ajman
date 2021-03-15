using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APTCWebb.Library.Models
{
    /// <summary>
    /// Fnc tn
    /// </summary>
    public class Fnctn
    {
        public string Lang       { get; set; }
        public string DocType    { get; set; }
        public Labels Labels     { get; set; }
        public Messages Messages { get; set; }
        public Buttons Buttons   { get; set; }
        public Help Help         { get; set; }
      }
}

public class Labels
{
    [Required(ErrorMessage = "192-code is required")]
    public string code { get; set; }
    public string Value { get; set; }
}
public class Messages
{
    [Required(ErrorMessage = "192-code is required")]
    public string Code { get; set; }
    public string Value { get; set; }
}
public class Buttons
{
    [Required(ErrorMessage = "192-code is required")]
    public string Code { get; set; }
    public string Value { get; set; }
}
public class Help
{
    [Required(ErrorMessage = "192-code is required")]
    public string Code { get; set; }
    public string Value { get; set; }
}