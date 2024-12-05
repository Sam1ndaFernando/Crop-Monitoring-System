// Define API base URLs
const API_URL = "http://localhost:8081/cropBackend/api/v1/vehicles";
const STAFF_API_URL = "http://localhost:8081/cropBackend/api/v1/staff";

// Fetch and display vehicles in the table
function fetchVehicles() {
    $.get(API_URL, function (vehicles) {
        const vehicleTableBody = $('#vehicleTable tbody');
        vehicleTableBody.empty();
        vehicles.forEach((vehicle) => {
            vehicleTableBody.append(`
                <tr>
                    <td>${vehicle.vehicleCode}</td>
                    <td>${vehicle.licensePlateNumber}</td>
                    <td>${vehicle.name}</td>
                    <td>${vehicle.category}</td>
                    <td>${vehicle.fuelType}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.remark}</td>
                    <td>${vehicle.memberCode}</td>
                    <td>
                        <button class="edit-btn btn btn-warning btn-sm" data-id="${vehicle.vehicleCode}">Edit</button>
                        <button class="delete-btn btn btn-danger btn-sm" data-id="${vehicle.vehicleCode}">Delete</button>
                    </td>
                </tr>
            `);
        });
    });
}

// Populate staff dropdown and set up a change listener
function populateStaffOptions() {
    $.get(STAFF_API_URL, function (staffList) {
        const staffDropdown = $('#staff');
        staffDropdown.empty();
        staffDropdown.append(`<option value="" disabled selected>Select staff</option>`);
        staffList.forEach((staff) => {
            staffDropdown.append(`<option value="${staff.code}">${staff.name}</option>`);
        });

        // Event listener for dropdown change
        staffDropdown.change(function () {
            const selectedStaffCode = $(this).val();
            if (selectedStaffCode) {
                fetchStaffDetails(selectedStaffCode);
            }
        });
    });
}

// Fetch details of the selected staff and populate the fields
function fetchStaffDetails(staffCode) {
    $.get(`${STAFF_API_URL}/${staffCode}`, function (staff) {
        // Assuming the staff object contains fields like `name`, `email`, and `department`
        $('#staffDetails').html(`
            <div><strong>Name:</strong> ${staff.name}</div>
            <div><strong>Email:</strong> ${staff.email}</div>
            <div><strong>Department:</strong> ${staff.department}</div>
        `);
    });
}

// Add or update vehicle
$('#vehicleForm').submit(function (event) {
    event.preventDefault();

    const vehicleData = {
        vehicleCode: $('#vehicleCode').val().trim(),
        licensePlateNumber: $('#licensePlateNumber').val().trim(),
        name: $('#vehicleName').val().trim(),
        category: $('#category').val().trim(),
        fuelType: $('#fuelType').val().trim(),
        status: $('#status').val().trim(),
        remark: $('#remark').val().trim(),
        memberCode: $('#staff').val().trim(),
    };

    const isUpdate = $('#submitVehicle').text() === 'Update Vehicle';

    if (isUpdate) {
        $.ajax({
            url: `${API_URL}/${vehicleData.vehicleCode}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(vehicleData),
            success: function () {
                alert('Vehicle updated successfully!');
                fetchVehicles();
            },
            error: function () {
                alert('Failed to update vehicle.');
            }
        });
    } else {
        $.ajax({
            url: API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(vehicleData),
            success: function () {
                alert('Vehicle added successfully!');
                fetchVehicles();
            },
            error: function () {
                alert('Failed to add vehicle.');
            }
        });
    }

    $('#vehicleForm')[0].reset();
    $('#vehicleCode').prop('disabled', false);
    $('#submitVehicle').text('Submit');
});

// Edit vehicle (prefill form)
$(document).on('click', '.edit-btn', function () {
    const vehicleCode = $(this).data('id');
    $.get(`${API_URL}/${vehicleCode}`, function (vehicle) {
        $('#vehicleCode').val(vehicle.vehicleCode).prop('disabled', true);
        $('#licensePlateNumber').val(vehicle.licensePlateNumber);
        $('#vehicleName').val(vehicle.name);
        $('#category').val(vehicle.category);
        $('#fuelType').val(vehicle.fuelType);
        $('#status').val(vehicle.status);
        $('#remark').val(vehicle.remark);
        $('#staff').val(vehicle.memberCode);
        $('#submitVehicle').text('Update Vehicle');
    });
});

// Delete vehicle
$(document).on('click', '.delete-btn', function () {
    const vehicleCode = $(this).data('id');
    if (confirm('Are you sure you want to delete this vehicle?')) {
        $.ajax({
            url: `${API_URL}/${vehicleCode}`,
            method: 'DELETE',
            success: function () {
                alert('Vehicle deleted successfully!');
                fetchVehicles();
            },
            error: function () {
                alert('Failed to delete vehicle.');
            }
        });
    }
});

// Initialize on page load
$(document).ready(function () {
    populateStaffOptions();
    fetchVehicles();
});
