using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project1.DataBaseContext;
using Project1.Helpers;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private ApplicationContext db;
        
        public UserController(ApplicationContext dbContext)
        {
            this.db = dbContext;
        }
        
        [HttpGet]
        public IEnumerable<UserView> Get()
        {
            return UserHelpers.GetUserView(db);
        }
        
        [HttpPost]
        public IActionResult Post(UserView userActivity)    // Пусть будет одна модель на два дела..
        {
            UserHelpers.CreateOrEditUser(userActivity, db);

            return Ok(userActivity);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            UserActivity userActivity = db.UserActivities.FirstOrDefault(x => x.UserId == id);
           
            if (userActivity == null)
            {
                return NotFound();
            }
            var user = db.Users.FirstOrDefault(x => x.Id == id);
            db.Remove(user);
            db.Remove(userActivity);
            await db.SaveChangesAsync();

            return Ok(userActivity);
        }
    }
}
