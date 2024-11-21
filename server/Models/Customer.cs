namespace CustomerCrudApp.Models;

/// <summary>
/// Customer model
/// </summary>
public class Customer
{
    /// <summary>
    /// Gets or sets Id.
    /// </summary>
    public string Id { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets FirstName.
    /// </summary>
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets LastName.
    /// </summary>
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets Email.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets CreatedAt.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets UpdatedAt.
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}
