const API_URL = "http://localhost:8080/cropBackend/api/v1/crops";

let editCropId = null; // Track the crop being edited

// Fetch crop details by cropCode on pressing Enter
$('#cropCode').on('keydown', function (event) {
    if (event.key === 'Enter') {
        const cropCode = $('#cropCode').val().trim();
        if (cropCode) {
            fetchCropDetails(cropCode);
        }
    }
});

// Fetch crop details based on a specific cropCode
function fetchCropDetails(cropCode) {
    const encodedCropCode = encodeURIComponent(cropCode); // Encode the crop code to handle special characters
    $.ajax({
        url: `${API_URL}/${encodedCropCode}`,
        method: 'GET',
        success: (crop) => {
            if (crop) {
                // Populate the form with fetched data
                $('#cropName').val(crop.cropName);
                $('#scientificName').val(crop.scientificName);
                $('#cropCategory').val(crop.category);
                $('#season').val(crop.season);
                $('#imagePreview').attr('src', crop.cropImage || 'default-image.jpg').show(); // Fallback for empty image
                $('#submitCrop').hide(); // Hide Add button
                $('#updateCrop').show(); // Show Update button
                editCropId = crop.cropCode; // Set ID for editing
            } else {
                alert('Crop not found');
            }
        },
        error: (xhr) => {
            console.error("Error fetching crop details:", xhr.responseText);
            alert(`Error fetching crop details: ${xhr.responseText}`);
        }
    });
}

// Delete a crop
$(document).on('click', '.delete-crop', function () {
    const cropCode = $(this).closest('tr').data('crop-code');
    const encodedCropCode = encodeURIComponent(cropCode);

    if (confirm('Are you sure you want to delete this crop?')) {
        $.ajax({
            url: `${API_URL}/${encodedCropCode}`,
            method: 'DELETE',
            success: () => {
                alert('Crop deleted successfully!');
                fetchCrops(); // Refresh the crops list
            },
            error: (xhr) => {
                console.error("Error deleting crop:", xhr.responseText);
                alert(`Error deleting crop: ${xhr.responseText}`);
            }
        });
    }
});

// Update or Create a crop
$('#cropForm').on('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cropName', $('#cropName').val().trim());
    formData.append('scientificName', $('#scientificName').val().trim());
    formData.append('category', $('#cropCategory').val().trim());
    formData.append('season', $('#season').val().trim());

    const cropImage = $('#cropImage')[0].files[0];
    if (cropImage) {
        formData.append('cropImage', cropImage);
    }

    formData.append('fieldList', JSON.stringify(getFieldCodes()));

    if (editCropId) {
        const encodedCropId = encodeURIComponent(editCropId);
        $.ajax({
            url: `${API_URL}/${encodedCropId}`,
            method: 'PUT',
            processData: false,
            contentType: false,
            data: formData,
            success: () => {
                alert('Crop updated successfully!');
                resetForm();
                fetchCrops(); // Refresh the crops list
            },
            error: (xhr) => {
                console.error("Error updating crop:", xhr.responseText);
                alert(`Error updating crop: ${xhr.responseText}`);
            }
        });
    } else {
        $.ajax({
            url: API_URL,
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: () => {
                alert('Crop added successfully!');
                resetForm();
                fetchCrops(); // Refresh the crops list
            },
            error: (xhr) => {
                console.error("Error adding crop:", xhr.responseText);
                alert(`Error adding crop: ${xhr.responseText}`);
            }
        });
    }
});

// Utility function to fetch field codes
function getFieldCodes() {
    const fieldCodes = $('#fieldCodes').val(); // Assuming the field codes are entered in a field with id="fieldCodes"
    return fieldCodes ? fieldCodes.split(',') : [];
}

// Reset the form after submission
function resetForm() {
    $('#cropForm')[0].reset();
    $('#imagePreview').hide();
    $('#submitCrop').show(); // Show Add button
    $('#updateCrop').hide(); // Hide Update button
    editCropId = null; // Clear edit ID
}

// Preview selected image
$('#cropImage').on('change', function (event) {
    const reader = new FileReader();
    reader.onload = function () {
        $('#imagePreview').attr('src', reader.result).show();
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Fetch all crops and update the table
function fetchCrops() {
    $.ajax({
        url: API_URL,
        method: 'GET',
        success: (crops) => {
            updateCropsTable(crops);
        },
        error: (xhr) => {
            console.error("Error fetching crops:", xhr.responseText);
            alert(`Error fetching crops: ${xhr.responseText}`);
        }
    });
}

// Update the crops table
function updateCropsTable(crops) {
    const cropsTableBody = $('#cropsTable tbody');
    cropsTableBody.empty(); // Clear existing rows

    crops.forEach(crop => {
        const row = $(` 
            <tr data-crop-code="${crop.cropCode}">
                <td>${crop.cropCode}</td>
                <td>${crop.cropName}</td>
                <td>${crop.scientificName}</td>
                <td>${crop.category}</td>
                <td>${crop.season}</td>
                <td><img src="${crop.cropImage || 'default-image.jpg'}" alt="Crop Image" style="max-width: 100px; max-height: 100px;"></td>
                <td>
                    <button class="btn btn-primary btn-sm edit-crop">Edit</button>
                    <button class="btn btn-danger btn-sm delete-crop">Delete</button>
                </td>
            </tr>
        `);
        cropsTableBody.append(row);
    });
}

// Edit a crop
$(document).on('click', '.edit-crop', function () {
    const cropCode = $(this).closest('tr').data('crop-code');
    fetchCropDetails(cropCode);
});

// Fetch crops on page load
$(document).ready(fetchCrops);
