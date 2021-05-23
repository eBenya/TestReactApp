using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTask.DataBaseContext;
using TestTask.Models;

namespace TestTask.Helpers
{
    public class UserHelpers
    {
        public static List<UserRazorView> GetUserRazorView(ApplicationContext db)
        {
            var usersView = new List<UserRazorView>();
            var users = db.Users.Include(u => u.userActivities).ToList();
            foreach (var user in users)
            {
                usersView.Add(new UserRazorView
                {
                    Id = user.Id,
                    DateRegistration = user.DateRegistration,
                    DateLastActivitys = user.userActivities.Select(o => o.DateLastActivity).ToList(),
                });
            }
            return usersView;
        }
        public static List<UserReactView> GetUserReactView(ApplicationContext db)
        {
            var usersView = new List<UserReactView>();
            var users = db.Users.Include(u => u.userActivities).ToList();
            foreach (var user in users)
            {
                foreach (var ua in user.userActivities)
                {
                    usersView.Add(new UserReactView
                    {
                        UserId = user.Id,
                        DateRegistration = user.DateRegistration,
                        DateLastActivity = ua.DateLastActivity,
                    });
                }
            }
            return usersView;
        }
        public static void CreateOrEditUser(int? userId, DateTime? date, ApplicationContext db)
        {
            if(userId == null || userId == 0)
            {
                CreateUser(userId, date, db);
            }
            else
            {
                EditUser(userId, date, db);
            }
        }

        private static void EditUser(int? userId, DateTime? date, ApplicationContext db)
        {
            db.UserActivities.Add(new UserActivity
            {
                UserId = userId.Value,
                DateLastActivity = date.Value,
            });
            db.SaveChanges();
        }

        private static void CreateUser(int? userId, DateTime? date, ApplicationContext db)
        {
            userId = userId ?? 0;

            var userActivities = new List<UserActivity>();
            userActivities.Add(new UserActivity
            {
                DateLastActivity = date.Value,//timeNow
            });
            var newUser = new User
            {
                DateRegistration = date.Value,//timeNow,
                userActivities = userActivities,
            };

            db.Users.Add(newUser);
            db.UserActivities.AddRange(userActivities);

            db.SaveChanges();
        }
    }
}
