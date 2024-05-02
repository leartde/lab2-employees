using System.Text.Json.Serialization;

namespace api.Models;

public class Contract
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    [JsonIgnore]
    public Employee? Employee { get; set; }
    public int EmployeeId { get; set; }
}