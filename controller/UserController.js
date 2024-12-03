$(document).ready(function() {
    const userList = []; // Array to store users

    // Show the user section when a button is clicked (or on other trigger)
    $("#showUserSectionBtn").on("click", function() {
        $("#userSection").show(); // Show the user section
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
            userEmail,
            userPassword,
            userRole
        };

        // Add the new user to the list
        userList.push(userData);
        alert("User added successfully.");

        // Reset the form
        $("#user-form")[0].reset();

        // Reload the user table
        loadUsers();
    });

    // Function to load and display users in the table
    function loadUsers() {
        const tbody = $("#user-table tbody");
        tbody.empty(); // Clear existing rows

        userList.forEach((user) => {
            const userRow = `
                    <tr data-user-email="${user.userEmail}">
                        <td>${user.userEmail}</td>
                        <td>******</td> <!-- Hide password for security reasons -->
                        <td>${user.userRole}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-user">Delete</button>
                            <button class="btn btn-warning btn-sm update-user">Update</button>
                        </td>
                    </tr>
                `;
            tbody.append(userRow);
        });
    }

    // Handle deleting a user
    $(document).on("click", ".delete-user", function() {
        const row = $(this).closest("tr");
        const userEmail = row.data("user-email");

        if (confirm("Are you sure you want to delete this user?")) {
            const userIndex = userList.findIndex(user => user.userEmail === userEmail);
            if (userIndex !== -1) {
                userList.splice(userIndex, 1); // Remove user from list
                alert("User deleted successfully.");
                row.remove(); // Remove row from the table
            }
        }
    });

    // Handle updating a user (you can pre-fill the form with existing data)
    $(document).on("click", ".update-user", function() {
        const row = $(this).closest("tr");
        const userEmail = row.data("user-email");
        const user = userList.find(user => user.userEmail === userEmail);

        if (user) {
            // Pre-fill the form with the user's data for editing
            $("#userEmail").val(user.userEmail);
            $("#userPassword").val(user.userPassword);
            $("#userRole").val(user.userRole);

            // Optionally, change the button text for "Update" mode
            $("#submitUser").text("Update User");
        }
    });
});