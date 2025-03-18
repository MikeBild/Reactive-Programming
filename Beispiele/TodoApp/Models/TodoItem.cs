namespace TodoApp.Models
{

    /// <summary>
    /// This is our Model for a simple ToDoItem.
    /// </summary>
    public class TodoItem
    {
        /// <summary>
        /// Gets or sets the checked status of each item
        /// </summary>
        public bool IsCompleted { get; set; }

        /// <summary>
        /// Gets or sets the description of the to-do item
        /// </summary>
        public string? Description { get; set; }
    }
}