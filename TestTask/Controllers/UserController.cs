using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTask.DataBaseContext;
using TestTask.Helpers;
using TestTask.Models;

namespace TestTask.Controllers
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
        public IEnumerable<UserReactView> Get()
        {
            return UserHelpers.GetUserReactView(db);
            
            //var temp = db.UserActivities.ToList();
            //return temp;
        }
        [HttpPost]
        public IActionResult Post(UserActivity userActivity)    // Пусть будет одна модель на два дела..
        {
            UserHelpers.CreateOrEditUser(userActivity.UserId, userActivity.DateLastActivity, db);

            return Ok(userActivity);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            UserActivity userActivity = db.UserActivities.FirstOrDefault(x => x.UserId == id);
            //data.FirstOrDefault(x => x.UserId == id);
            if (userActivity == null)
            {
                return NotFound();
            }

            db.Remove(userActivity);
            await db.SaveChangesAsync();

            return Ok(userActivity);
        }
    }
}
