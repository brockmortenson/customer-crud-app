namespace CustomerCrudApp.Controllers;
// using CustomerCrudApp.Models;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static List<Customer> _customers = new List<Customer>();

    // GET: api/customers
    [HttpGet]
    public ActionResult<IEnumerable<Customer>> GetCustomers()
    {
        return Ok(_customers);
    }

    // GET: api/customers/{id}
    [HttpGet("{id}")]
    public ActionResult<Customer> GetCustomer(string id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);
        if (customer == null)
            return NotFound();
        return Ok(customer);
    }

    // POST: api/customers
    [HttpPost]
    public ActionResult<Customer> CreateCustomer(Customer customer)
    {
        customer.Id = Guid.NewGuid().ToString();
        customer.CreatedAt = DateTime.UtcNow;
        customer.UpdatedAt = DateTime.UtcNow;
        _customers.Add(customer);
        return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
    }

    // PUT: api/customers/{id}
    [HttpPut("{id}")]
    public ActionResult UpdateCustomer(string id, Customer customer)
    {
        var existingCustomer = _customers.FirstOrDefault(c => c.Id == id);
        if (existingCustomer == null)
            return NotFound();

        existingCustomer.FirstName = customer.FirstName;
        existingCustomer.LastName = customer.LastName;
        existingCustomer.Email = customer.Email;
        existingCustomer.UpdatedAt = DateTime.UtcNow;

        return NoContent();
    }

    // DELETE: api/customers/{id}
    [HttpDelete("{id}")]
    public ActionResult DeleteCustomer(string id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);
        if (customer == null)
            return NotFound();

        _customers.Remove(customer);
        return NoContent();
    }
}
