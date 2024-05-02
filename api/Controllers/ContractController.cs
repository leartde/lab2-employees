using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("/api/contracts")]
public class ContractController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContractController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllContracts()
    {
        var contracts = await _context.Contracts.ToListAsync();
        return Ok(contracts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetContract(int id)
    {
        var contract = await _context.Contracts.FindAsync(id);
        if (contract is null) return NotFound("Contract not found");
        return Ok(contract);
    }

    [HttpPost]
    public async Task<IActionResult> AddContract(Contract contract)
    {
        if (string.IsNullOrWhiteSpace(contract.Name))
            return BadRequest("Contract name can't be empty");
        var employee = await _context.Employees.FindAsync(contract.EmployeeId);
        if (employee is null) return NotFound("Employee not found");
        employee.IsActive = true;
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync();
        await _context.Contracts.AddAsync(contract);
        await _context.SaveChangesAsync();
        return Ok(contract);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateContract(int id, string name, DateTime startDate)
    {
        var contract = await _context.Contracts.FindAsync(id);
        if (contract is null) return NotFound("Contract not found");
        contract.Name = name;
        contract.StartDate = startDate;
        _context.Contracts.Update(contract);
        await _context.SaveChangesAsync();
        return Ok(contract);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteContract(int id)
    {
        var contract = await _context.Contracts.FindAsync(id);
        if (contract is null) return NotFound("Contract not found");
         _context.Contracts.Remove(contract);
         await _context.SaveChangesAsync();
         return Ok("Contract successfully deleted");
    }

    [HttpGet("employee")]
    public async Task<IActionResult> GetContractsForEmployee(int employeeId)
    {
        var contracts = await _context.Contracts
            .Where(c => c.EmployeeId == employeeId)
            .ToListAsync();
        return Ok(contracts);
    }

    [HttpGet("date")]
    public async Task<IActionResult> GetContractsByDate(DateTime date)
    {
        var contracts = await _context.Contracts
            .Where(c => c.StartDate == date)
            .ToListAsync();
        return Ok(contracts);
    }
    
}