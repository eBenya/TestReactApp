using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTask.Models
{
    public class UserRazorView
    {
        public int Id { get; set; }
        public DateTime DateRegistration { get; set; }
        public List<DateTime> DateLastActivitys { get; set; }
    }
}
