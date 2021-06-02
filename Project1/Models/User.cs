using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project1.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime DateRegistration { get; set; }
        public List<UserActivity> userActivities { get; set; }
    }
}
