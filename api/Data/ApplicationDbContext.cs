using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options){}
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Contract> Contracts { get; set; }
}