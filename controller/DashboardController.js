$(document).ready(function () {

    // Handle the Logout link
    $('#navLogout').on('click', function () {
        // Perform any logout logic here
        alert('Logging out...');
        // Redirect or clear session data
        window.location.href = '/login'; // Example: Redirect to login page
    });

    // Navigate to Crops section
    $('#navCrops').on('click', () => {
        $('#cropSection').css('display', 'block');
        $('#logSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Crops section clicked");
    });

    // Navigate to Dashboard section
    $('#navDashboard').on('click', () => {
        $('#dashboardSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#logSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Dashboard section clicked");
    });

    // Navigate to Fields section
    $('#navFields').on('click', () => {
        $('#fieldSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#logSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Fields section clicked");
    });

    // Navigate to Staff section
    $('#navStaff').on('click', () => {
        $('#staffSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#logSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Staff section clicked");
    });

    // Navigate to Logs section
    $('#navLogs').on('click', () => {
        $('#logSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Logs section clicked");
    });

    // Navigate to Vehicle section
    $('#navVehicle').on('click', () => {
        $('#vehicleSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#logSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Vehicle section clicked");
    });

    // Navigate to Equipment section
    $('#navEquipment').on('click', () => {
        $('#equipmentSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#logSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#userSection').css('display', 'none');
        console.log("Equipment section clicked");
    });


    // Navigate to User section
    $('#navUser').on('click', () => {
        $('#userSection').css('display', 'block');
        $('#cropSection').css('display', 'none');
        $('#logSection').css('display', 'none');
        $('#dashboardSection').css('display', 'none');
        $('#fieldSection').css('display', 'none');
        $('#staffSection').css('display', 'none');
        $('#vehicleSection').css('display', 'none');
        $('#equipmentSection').css('display', 'none');
        console.log("User section clicked");
    });

});
