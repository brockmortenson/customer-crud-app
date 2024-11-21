namespace CustomerCrudApp.Controllers;
using CustomerCrudApp.Models;
using Microsoft.AspNetCore.Mvc;

/// <summary>
/// Customer controller.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static List<Customer> _customers = new List<Customer>();

    /// <summary>
    /// Creates a list of 20 generic customers
    /// </summary>
    static CustomersController()
    {
        // Generate 20 generic customers when the app starts
        for (int i = 0; i < 20; i++)
        {
            var customer = new Customer
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Generic",
                LastName = "Customer " + (i + 1),
                Email = $"first.last{i + 1}@email.com",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            _customers.Add(customer);
        }
    }

    /// <summary>
    /// Gets all customers.
    /// </summary>
    /// <returns>A list of customers</returns>
    [HttpGet]
    public ActionResult<List<Customer>> GetCustomers()
    {
        return Ok(_customers);
    }

    /// <summary>
    /// Gets a single customer.
    /// </summary>
    /// <param name="id">The customer id.</param>
    /// <returns>The matching customer.</returns>
    [HttpGet("{id}")]
    public ActionResult<Customer> GetCustomer(string id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }

        return Ok(customer);
    }

    /// <summary>
    /// Creates a customer.
    /// </summary>
    /// <param name="customer">The customer information.</param>
    /// <returns>The created customer.</returns>
    [HttpPost]
    public ActionResult<Customer> CreateCustomer(Customer customer)
    {
        customer.Id = Guid.NewGuid().ToString();
        customer.CreatedAt = DateTime.Now;
        customer.UpdatedAt = DateTime.Now;
        _customers.Add(customer);
        return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
    }

    /// <summary>
    /// Updates a customers information.
    /// </summary>
    /// <param name="id">The id of the customer to update.</param>
    /// <param name="customer">The customer info to update the customer to.</param>
    /// <returns>Response.</returns>
    [HttpPut("{id}")]
    public ActionResult UpdateCustomer(string id, Customer customer)
    {
        var existingCustomer = _customers.FirstOrDefault(c => c.Id == id);
        if (existingCustomer == null)
        {
            return NotFound();
        }

        existingCustomer.FirstName = customer.FirstName;
        existingCustomer.LastName = customer.LastName;
        existingCustomer.Email = customer.Email;
        existingCustomer.UpdatedAt = DateTime.Now;

        return NoContent();
    }

    /// <summary>
    /// Deletes a customer.
    /// </summary>
    /// <param name="id">The customer id.</param>
    /// <returns>Response.</returns>
    [HttpDelete("{id}")]
    public ActionResult DeleteCustomer(string id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }

        _customers.Remove(customer);
        return NoContent();
    }
}
