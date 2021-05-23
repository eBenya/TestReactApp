using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestTask.DataBaseContext;
using TestTask.Helpers;
using TestTask.Models;

namespace TestTask.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private ApplicationContext db;
        public List<UserRazorView> UsersView { get; set; }
        public IndexModel(ILogger<IndexModel> logger, ApplicationContext db)
        {
            _logger = logger;
            this.db = db;
            UsersView = new List<UserRazorView>();
        }

        public void OnGet()
        {
            UsersView = UserHelpers.GetUserRazorView(db);
        }

        public IActionResult OnPost(int? userId, DateTime? date)
        {
            if (date == null)
            {
                return NotFound();
            }
            UserHelpers.CreateOrEditUser(userId, date, db);

            string url = Url.Page("Index");
            return Redirect(url);
        }
    }
}
