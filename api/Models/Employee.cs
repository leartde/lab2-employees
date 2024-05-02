namespace api.Models;

public class Employee
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty ;
    public bool IsActive { get; set; } = false;
}