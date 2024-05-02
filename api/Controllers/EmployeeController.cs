using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;
[ApiController]
[Route("/api/employees")]
public class EmployeeController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EmployeeController(ApplicationDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllEmployees()
    {
        var employees = await _context.Employees.ToListAsync();
        return Ok(employees);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee is null) return NotFound("Employee not found");
        return Ok(employee);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddEmployee(Employee employee)
    {
        if (string.IsNullOrWhiteSpace(employee.FullName)) return BadRequest("Name can't be empty");
        await _context.Employees.AddAsync(employee);
        await _context.SaveChangesAsync();
        return Ok(employee);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee is null) return NotFound("Employee not found");
         _context.Employees.Remove(employee);
         await _context.SaveChangesAsync();
         return Ok("Employee successfully deleted");
         
    }
    
    
}