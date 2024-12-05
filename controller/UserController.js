$(document).ready(function() {
    const API_BASE_URL = "http://localhost:8080/api/v1/users"; // Replace with your API URL

    // Show the user section when a button is clicked
    $("#showUserSectionBtn").on("click", function() {
        $("#userSection").show(); // Show the user section
        loadUsers(); // Load the users when the section is shown
    });

    // Handle the user form submission
    $("#user-form").on("submit", function(event) {
        event.preventDefault();

        // Get form values
        const userEmail = $("#userEmail").val().trim();
        const userPassword = $("#userPassword").val().trim();
        const userRole = $("#userRole").val().trim();

        // Validate form inputs
        if (!userEmail || !userPassword || !userRole) {
            alert("All fields are required.");
            return;
        }

        // Create the user entry object
        const userData = {
            email: userEmail,
            password: userPassword,
            role: userRole
        };

        // Send the request to the backend (POST for creating)
        $.ajax({
            url: API_BASE_URL,
            method: "POST",
            data: userData,
            success: function(response) {
                alert("User added successfully.");
                $("#user-form")[0].reset(); // Reset the form
                loadUsers(); // Reload the user table
            },
            error: function(xhr) {
                console.error("Error adding user:", xhr);
                alert("An error occurred while adding the user.");
            }
        });
    });

    // Function to load and display users in the table
    function loadUsers() {
        $.ajax({
            url: API_BASE_URL,
            method: "GET",
            success: function(data) {
                const tbody = $("#user-table tbody");
                tbody.empty(); // Clear existing rows

                data.forEach((user) => {
                    const userRow = `
                        <tr data-user-email="${user.email}">
                            <td>${user.email}</td>
                            <td>******</td> <!-- Hide password for security reasons -->
                            <td>${user.role}</td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-user">Delete</button>
                                <button class="btn btn-warning btn-sm update-user">Update</button>
                            </td>
                        </tr>
                    `;
                    tbody.append(userRow);
                });
            },
            error: function(xhr) {
                console.error("Error loading users:", xhr);
                alert("Failed to load users.");
            }
        });
    }

    // Handle deleting a user
    $(document).on("click", ".delete-user", function() {
        const row = $(this).closest("tr");
        const userEmail = row.data("user-email");

        if (confirm("Are you sure you want to delete this user?")) {
            $.ajax({
                url: `${API_BASE_URL}/${userEmail}`,
                method: "DELETE",
                success: function() {
                    alert("User deleted successfully.");
                    row.remove(); // Remove the row from the table
                },
                error: function(xhr) {
                    console.error("Error deleting user:", xhr);
                    alert("Failed to delete user.");
                }
            });
        }
    });

    // Handle updating a user (you can pre-fill the form with existing data)
    $(document).on("click", ".update-user", function() {
        const row = $(this).closest("tr");
        const userEmail = row.data("user-email");

        $.ajax({
            url: `${API_BASE_URL}/${userEmail}`,
            method: "GET",
            success: function(user) {
                // Pre-fill the form with the user's data for editing
                $("#userEmail").val(user.email);
                $("#userPassword").val(user.password); // This might need hashing in production
                $("#userRole").val(user.role);

                // Optionally, change the button text for "Update" mode
                $("#submitUser").text("Update User");

                // Update user on submit
                $("#user-form").on("submit", function(event) {
                    event.preventDefault();

                    const updatedData = {
                        email: $("#userEmail").val(),
                        password: $("#userPassword").val(),
                        role: $("#userRole").val()
                    };

                    $.ajax({
                        url: `${API_BASE_URL}/${userEmail}`,
                        method: "PUT",
                        data: updatedData,
                        success: function() {
                            alert("User updated successfully.");
                            $("#user-form")[0].reset();
                            loadUsers(); // Reload users table
                            $("#submitUser").text("Submit User");
                        },
                        error: function(xhr) {
                            console.error("Error updating user:", xhr);
                            alert("Failed to update user.");
                        }
                    });
                });
            },
            error: function(xhr) {
                console.error("Error fetching user data:", xhr);
                alert("Failed to fetch user data for update.");
            }
        });
    });
});
