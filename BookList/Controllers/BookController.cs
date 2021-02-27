using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookList.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookList.Controllers
{
    [Route("api/Book")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDbContext _db;
        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = await _db.Book.ToListAsync() });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var DeleteFromBook = await _db.Book.FirstOrDefaultAsync(x => x.Id == id);
            if (DeleteFromBook == null)
                return Json(new { success = false, message = "Error while deleting" });
            _db.Book.Remove(DeleteFromBook);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Delete Successful" });

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
