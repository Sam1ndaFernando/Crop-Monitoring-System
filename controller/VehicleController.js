const vehiclesDatabase = [];

// Dummy data for staff, this can be fetched from an API or backend
const staffList = ['John Doe', 'Jane Smith', 'Michael Brown', 'Sarah Williams'];

// Populate the staff options dynamically when the page loads
function populateStaffOptions() {
    const staffSelect = document.getElementById('staff');
    staffList.forEach(staff => {
        const option = document.createElement('option');
        option.value = staff;
        option.textContent = staff;
        staffSelect.appendChild(option);
    });
}

// Handle the form submission (Save or Update)
document.getElementById('vehicleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const vehicleCode = document.getElementById('vehicleCode').value.trim();
    const licensePlateNumber = document.getElementById('licensePlateNumber').value.trim();
    const vehicleName = document.getElementById('vehicleName').value.trim();
    const category = document.getElementById('category').value.trim();
    const fuelType = document.getElementById('fuelType').value.trim();
    const status = document.getElementById('status').value.trim();
    const remark = document.getElementById('remark').value.trim();
    const staff = document.getElementById('staff').value.trim();

    // Check if the vehicle already exists in the database for update
    const existingVehicleIndex = vehiclesDatabase.findIndex(vehicle => vehicle.vehicleCode === vehicleCode);

    if (existingVehicleIndex !== -1) {
        // Update existing vehicle
        vehiclesDatabase[existingVehicleIndex] = { vehicleCode, licensePlateNumber, vehicleName, category, fuelType, status, remark, staff };
        alert('Vehicle updated successfully!');
    } else {
        // Save new vehicle
        vehiclesDatabase.push({ vehicleCode, licensePlateNumber, vehicleName, category, fuelType, status, remark, staff });
        alert('Vehicle added successfully!');
    }

    // Clear form and reset
    document.getElementById('vehicleForm').reset();

    // Reset the submit button text back to "Submit"
    document.getElementById('submitVehicle').textContent = "Submit";

    // Update vehicle table
    updateVehicleTable();
});

// Update the vehicle table
function updateVehicleTable() {
    const vehicleTableBody = document.getElementById('vehicleTable').getElementsByTagName('tbody')[0];
    vehicleTableBody.innerHTML = ''; // Clear table body

    vehiclesDatabase.forEach(vehicle => {
        const row = vehicleTableBody.insertRow();
        row.innerHTML = `
            <td>${vehicle.vehicleCode}</td>
            <td>${vehicle.licensePlateNumber}</td>
            <td>${vehicle.vehicleName}</td>
            <td>${vehicle.category}</td>
            <td>${vehicle.fuelType}</td>
            <td>${vehicle.status}</td>
            <td>${vehicle.remark || '-'}</td>
            <td>${vehicle.staff}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-vehicle-code="${vehicle.vehicleCode}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-vehicle-code="${vehicle.vehicleCode}">Delete</button>
            </td>
        `;
    });
}

// Handle deleting a vehicle entry
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
        const vehicleCode = event.target.getAttribute('data-vehicle-code');
        if (confirm("Are you sure you want to delete this vehicle entry?")) {
            const vehicleIndex = vehiclesDatabase.findIndex(vehicle => vehicle.vehicleCode === vehicleCode);
            if (vehicleIndex !== -1) {
                vehiclesDatabase.splice(vehicleIndex, 1); // Remove vehicle from "database"
                alert("Vehicle entry deleted successfully.");
                updateVehicleTable(); // Re-render the table after deletion
            }
        }
    }
});

// Handle updating a vehicle entry
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("edit-btn")) {
        const vehicleCode = event.target.getAttribute('data-vehicle-code');
        const vehicle = vehiclesDatabase.find(vehicle => vehicle.vehicleCode === vehicleCode);

        if (vehicle) {
            // Pre-fill the form with the vehicle data for editing
            document.getElementById("vehicleCode").value = vehicle.vehicleCode;
            document.getElementById("licensePlateNumber").value = vehicle.licensePlateNumber;
            document.getElementById("vehicleName").value = vehicle.vehicleName;
            document.getElementById("category").value = vehicle.category;
            document.getElementById("fuelType").value = vehicle.fuelType;
            document.getElementById("status").value = vehicle.status;
            document.getElementById("remark").value = vehicle.remark || '';
            document.getElementById("staff").value = vehicle.staff;

            // Change the button text to indicate the form is in "Update" mode
            document.getElementById("submitVehicle").textContent = "Update Vehicle";
        }
    }
});

// Call this function to populate the staff select options when the page loads
populateStaffOptions();
