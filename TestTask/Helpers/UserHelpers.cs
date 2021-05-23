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
        public static List<UserView> GetUserView(ApplicationContext db)
        {
            var usersView = new List<UserView>();
            var users = db.Users.Include(u => u.userActivities).ToList();
            foreach (var user in users)
            {
                usersView.Add(new UserView
                {
                    UserId = user.Id,
                    DateRegistration = user.DateRegistration.ToShortDateString(),
                    DateLastActivity = user.userActivities.Max(o => o?.DateLastActivity)?.ToShortDateString() ?? string.Empty,
                });
            }
            return usersView;
        }
        public static void CreateOrEditUser(UserView userView, ApplicationContext db)
        {
            if (userView.UserId == 0)
            {
                CreateUser(userView, db);
            }
            else
            {
                EditUser(userView, db);
            }
        }

        private static void CreateUser(UserView userView, ApplicationContext db)
        {
            var userActivities = new List<UserActivity>();
            userActivities.Add(new UserActivity
            {
                DateLastActivity = DateTime.Parse(userView.DateLastActivity),
            });
            var newUser = new User
            {
                DateRegistration = DateTime.Parse(userView.DateRegistration),
                userActivities = userActivities,
            };

            db.Users.Add(newUser);
            db.UserActivities.AddRange(userActivities);

            db.SaveChanges();
        }

        private static void EditUser(UserView userView, ApplicationContext db)
        {
            db.UserActivities.Add(new UserActivity
            {
                UserId = userView.UserId,
                DateLastActivity = DateTime.Parse(userView.DateLastActivity),
            });
            db.SaveChanges();
        }

        public static void CreateOrEditUser(int? userId, DateTime? date, ApplicationContext db)
        {
            if (userId == null || userId == 0)
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
