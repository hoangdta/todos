using Microsoft.EntityFrameworkCore;
using todos_back_end.Models;

namespace todos_back_end.Seeders
{
    public static class DatabaseSeeder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().HasData(
                new Todo() { Id = 1, Name = "Task 1", IsComplete = false },
                new Todo() { Id = 2, Name = "Task 2", IsComplete = false }
            );
        }
    }
}
