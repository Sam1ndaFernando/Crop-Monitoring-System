$(document).ready(function () {
    const API_BASE_URL = "http://localhost:8080/api/v1/staff"; // Replace with your actual API URL

    // Load staff data when the page loads
    loadStaff();

    // Handle form submission
    $("#staff-form").on("submit", function (event) {
        event.preventDefault();

        const formData = {
            memberCode: $("#memberCode").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            joinedDate: $("#joinedDate").val(),
            dateOfBirth: $("#dateOfBirth").val(),
            gender: $("#gender").val(),
            designation: $("#designation").val(),
            addressLine1: $("#addressLine1").val(),
            addressLine2: $("#addressLine2").val(),
            contactNo: $("#contactNo").val(),
            email: $("#email").val(),
            role: $("#role").val(),
        };

        const isUpdate = formData.memberCode; // Assuming the memberCode is set for updates
        const url = isUpdate ? `${API_BASE_URL}/${formData.memberCode}` : API_BASE_URL;
        const method = isUpdate ? "PUT" : "POST";

        $.ajax({
            url: url,
            method: method,
            data: formData,
            success: function () {
                alert(isUpdate ? "Staff updated successfully" : "Staff added successfully");
                $("#staff-form")[0].reset(); // Reset the form
                loadStaff(); // Reload staff data
                $("#submitStaff").text("Submit Staff"); // Reset the button text
            },
            error: function (xhr) {
                console.error("Error:", xhr);
                alert("An error occurred while processing your request.");
            }
        });
    });

    // Load staff from the backend
    function loadStaff() {
        $.ajax({
            url: API_BASE_URL,
            method: "GET",
            success: function (data) {
                const tbody = $("#staffTable tbody");
                tbody.empty(); // Clear any existing rows

                data.forEach((staff) => {
                    const row = `
                        <tr data-member-code="${staff.memberCode}">
                            <td>${staff.memberCode}</td>
                            <td>${staff.firstName}</td>
                            <td>${staff.lastName}</td>
                            <td>${staff.joinedDate}</td>
                            <td>${staff.dateOfBirth}</td>
                            <td>${staff.gender}</td>
                            <td>${staff.designation}</td>
                            <td>${staff.contactNo}</td>
                            <td>${staff.email}</td>
                            <td>${staff.role}</td>
                            <td>
                                <button class="btn btn-warning btn-sm update-staff">Update</button>
                                <button class="btn btn-danger btn-sm delete-staff">Delete</button>
                            </td>
                        </tr>
                    `;
                    tbody.append(row);
                });
            },
            error: function (xhr) {
                console.error("Error loading staff data:", xhr);
                alert("Failed to load staff data.");
            }
        });
    }

    // Handle updating a staff entry
    $(document).on("click", ".update-staff", function () {
        const row = $(this).closest("tr");
        const memberCode = row.data("member-code");

        $.ajax({
            url: `${API_BASE_URL}/${memberCode}`,
            method: "GET",
            success: function (staff) {
                // Prefill the form with the staff data
                $("#memberCode").val(staff.memberCode);
                $("#firstName").val(staff.firstName);
                $("#lastName").val(staff.lastName);
                $("#joinedDate").val(staff.joinedDate);
                $("#dateOfBirth").val(staff.dateOfBirth);
                $("#gender").val(staff.gender);
                $("#designation").val(staff.designation);
                $("#addressLine1").val(staff.addressLine1);
                $("#addressLine2").val(staff.addressLine2);
                $("#contactNo").val(staff.contactNo);
                $("#email").val(staff.email);
                $("#role").val(staff.role);

                $("#submitStaff").text("Update Staff"); // Change button text for update
            },
            error: function (xhr) {
                console.error("Error fetching staff data:", xhr);
                alert("Failed to fetch staff data.");
            }
        });
    });

    // Handle deleting a staff entry
    $(document).on("click", ".delete-staff", function () {
        const row = $(this).closest("tr");
        const memberCode = row.data("member-code");

        if (confirm("Are you sure you want to delete this staff entry?")) {
            $.ajax({
                url: `${API_BASE_URL}/${memberCode}`,
                method: "DELETE",
                success: function () {
                    alert("Staff deleted successfully.");
                    row.remove(); // Remove the row from the table
                },
                error: function (xhr) {
                    console.error("Error deleting staff:", xhr);
                    alert("Failed to delete staff.");
                }
            });
        }
    });
});
