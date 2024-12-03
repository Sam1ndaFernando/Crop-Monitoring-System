import {cropList} from '../db/db.js';

let editCropId = null; // To track the crop being edited

// Handle the form submission (Save or Update)
$('#cropForm').on('submit', function (event) {
    event.preventDefault();

    // Get form values
    const cropCode = $('#cropCode').val().trim();
    const cropName = $('#cropName').val().trim();
    const scientificName = $('#scientificName').val().trim();
    const cropCategory = $('#cropCategory').val().trim();
    const season = $('#season').val().trim();
    const imagePreview = $('#imagePreview').attr('src'); // Get the image URL from the preview

    // Update existing crop if editCropId is set
    if (editCropId !== null) {
        cropList[editCropId] = {cropCode, cropName, scientificName, cropCategory, season, imagePreview};
        alert('Crop updated successfully!');
    } else {
        // Add new crop
        cropList.push({cropCode, cropName, scientificName, cropCategory, season, imagePreview});
        alert('Crop added successfully!');
    }

    // Reset form and image preview after saving
    $('#cropForm')[0].reset();
    $('#imagePreview').hide();
    editCropId = null; // Reset the edit state

    // Update crops table
    updateCropsTable();
});

// Preview selected image
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        $('#imagePreview').attr('src', reader.result).show(); // Display the selected image as a preview
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Update the crops table
function updateCropsTable() {
    const cropsTableBody = $('#cropsTable tbody');
    cropsTableBody.empty(); // Clear the table body before rendering

    cropList.forEach((crop, index) => {
        const row = $('<tr></tr>').attr('data-crop-code', crop.cropCode);
        row.append(`
            <td>${crop.cropCode}</td>
            <td>${crop.cropName}</td>
            <td>${crop.scientificName}</td>
            <td>${crop.cropCategory}</td>
            <td>${crop.season}</td>
            <td><img src="${crop.imagePreview}" alt="Crop Image" style="max-width: 100px; max-height: 100px; display: block;"></td> <!-- Display the saved image -->
            
            <td>
                <button class="btn btn-primary btn-sm update-crop">Edit</button>&nbsp; &nbsp;
                 <button class="btn btn-danger btn-sm delete-crop">Delete</button>
            </td>


        `);
        cropsTableBody.append(row);
    });
}

// Handle updating a crop entry
$(document).on("click", ".update-crop", function () {
    const row = $(this).closest("tr");
    const cropCode = row.data("crop-code");
    const crop = cropList.find(c => c.cropCode === cropCode);

    if (crop) {
        // Pre-fill the form with the crop data for editing
        $('#cropCode').val(crop.cropCode);
        $('#cropName').val(crop.cropName);
        $('#scientificName').val(crop.scientificName);
        $('#cropCategory').val(crop.cropCategory);
        $('#season').val(crop.season);
        $('#imagePreview').attr('src', crop.imagePreview).show();

        // Change the button text to indicate the form is in "Update" mode
        $('#submitCrop').text('Update Crop');

        // Set editCropId to the index of the crop being edited
        editCropId = cropList.indexOf(crop);
    }
});

// Delete a crop
$(document).on("click", ".delete-crop", function () {
    const row = $(this).closest("tr");
    const cropCode = row.data("crop-code");

    if (confirm("Are you sure you want to delete this crop?")) {
        const cropIndex = cropList.findIndex(c => c.cropCode === cropCode);
        if (cropIndex !== -1) {
            cropList.splice(cropIndex, 1); // Remove the crop from the list
            alert('Crop deleted successfully!');
            updateCropsTable(); // Refresh the crops table
        }
    }
});
