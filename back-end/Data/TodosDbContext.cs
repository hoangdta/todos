using Microsoft.EntityFrameworkCore;
using todos_back_end.Configuration;
using todos_back_end.Models;
using todos_back_end.Seeders;

namespace todos_back_end.Data
{
    public class TodosDbContext : DbContext
    {
        public TodosDbContext(DbContextOptions<TodosDbContext> options) : base(options) 
        { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TodoConfiguration());

            modelBuilder.Seed();
        }
        public DbSet<Todo> Todos { get; set; }
    }
}
