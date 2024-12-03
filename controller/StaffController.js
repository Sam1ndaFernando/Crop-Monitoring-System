// Initialize staff list from localStorage or use an empty array if not available
const staffList = JSON.parse(localStorage.getItem('staffData')) || [];

$(document).ready(function () {
    let editStaffId = null; // Initialize editStaffId to null

    // Load staff data from localStorage on page load
    loadStaff();

    // Form submission handler for adding or updating staff
    $("#staff-form").on("submit", function (event) {
        event.preventDefault();

        // Gather form data
        const memberCode = $("#memberCode").val().trim();
        const firstName = $("#firstName").val().trim();
        const lastName = $("#lastName").val().trim();
        const joinedDate = $("#joinedDate").val().trim();
        const dateOfBirth = $("#dateOfBirth").val().trim();
        const gender = $("#gender").val().trim();
        const designation = $("#designation").val().trim();
        const addressLine1 = $("#addressLine1").val().trim();
        const addressLine2 = $("#addressLine2").val().trim();
        const contactNo = $("#contactNo").val().trim();
        const email = $("#email").val().trim();
        const role = $("#role").val().trim();

        // Create staff data object
        const staffData = {
            memberCode,
            firstName,
            lastName,
            joinedDate,
            dateOfBirth,
            gender,
            designation,
            addressLine1,
            addressLine2,
            contactNo,
            email,
            role
        };

        const isEdit = !!editStaffId; // Check if it's an edit operation

        if (isEdit) {
            // Update existing staff record
            editStaff(editStaffId, staffData);
        } else {
            // Add new staff record
            addStaff(staffData);
        }
    });

    // Load staff data into the table
    function loadStaff() {
        const tbody = $("#staffTable tbody");
        tbody.empty();

        // Loop through staff list and populate the table rows
        staffList.forEach((staff) => {
            const staffRow = `
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
                        <button class="btn btn-warning btn-sm edit-staff">Update</button>
                        <button class="btn btn-danger btn-sm delete-staff">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(staffRow);
        });
    }

    // Add new staff to the list and save to localStorage
    function addStaff(staffData) {
        staffList.push(staffData); // Add new staff data to the list
        localStorage.setItem('staffData', JSON.stringify(staffList)); // Save to localStorage
        alert("Staff added successfully.");
        $("#staff-form")[0].reset(); // Reset form
        loadStaff(); // Reload staff table
    }

    // Edit existing staff data and update localStorage
    function editStaff(memberCode, staffData) {
        const staffIndex = staffList.findIndex(s => s.memberCode === memberCode);
        if (staffIndex === -1) {
            alert("Staff not found.");
            return;
        }

        staffList[staffIndex] = staffData; // Update staff data
        localStorage.setItem('staffData', JSON.stringify(staffList)); // Save to localStorage
        alert("Staff updated successfully.");
        $("#staff-form")[0].reset(); // Reset form
        editStaffId = null; // Reset edit ID
        loadStaff(); // Reload staff table
    }

    // Delete staff data from localStorage and update the table
    $(document).on("click", ".delete-staff", function () {
        const row = $(this).closest("tr");
        const memberCode = row.data("member-code");

        if (confirm("Are you sure you want to delete this staff?")) {
            const staffIndex = staffList.findIndex(s => s.memberCode === memberCode);
            if (staffIndex !== -1) {
                staffList.splice(staffIndex, 1); // Remove staff from the list
                localStorage.setItem('staffData', JSON.stringify(staffList)); // Save updated list to localStorage
                alert("Staff deleted successfully.");
                row.remove(); // Remove row from the table
            }
        }
    });

    // Edit staff: populate form with staff data for editing
    $(document).on("click", ".edit-staff", function () {
        const row = $(this).closest("tr");
        const memberCode = row.data("member-code");

        const staff = staffList.find(s => s.memberCode === memberCode);
        if (staff) {
            editStaffId = staff.memberCode; // Set edit ID

            // Populate the form with the staff data
            $("#memberCode").val(staff.memberCode).prop("readonly", true);
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

            $("#staffSection").show(); // Show the form for editing
            $('#submitStaff').text('Update Staff');

        }
    });

    // Optionally show the form if hidden initially
    $('#showStaffForm').on('click', function () {
        $('#staffSection').show();
    });
});
