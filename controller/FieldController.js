import { fieldList } from '../db/db.js';

// Handle the form submission (Save or Update)
document.getElementById('fieldForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const fieldCode = document.getElementById('fieldCode').value.trim();
    const fieldName = document.getElementById('name').value.trim();
    const location = document.getElementById('location').value.trim();
    const extentSize = document.getElementById('extentSize').value.trim();
    const fieldImage1 = document.getElementById('imagePreview1').src;
    const fieldImage2 = document.getElementById('imagePreview2').src;

    // Check if the field already exists in the database
    const existingFieldIndex = fieldList.findIndex(field => field.fieldCode === fieldCode);

    if (existingFieldIndex !== -1) {
        // Update existing field
        fieldList[existingFieldIndex] = { fieldCode, fieldName, location, extentSize, fieldImage1, fieldImage2 };
        alert('Field updated successfully!');
    } else {
        // Save new field
        fieldList.push({ fieldCode, fieldName, location, extentSize, fieldImage1, fieldImage2 });
        alert('Field added successfully!');
    }

    // Clear form and reset image previews
    resetForm();

    // Update fields table
    updateFieldsTable();
});

// Preview selected image
function previewImage(event, imagePreviewId) {
    const imagePreview = document.getElementById(imagePreviewId);
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
        imagePreview.src = reader.result;
        imagePreview.style.display = 'block';  // Show the image preview
    }

    reader.readAsDataURL(file);  // Read the image file as a data URL
}


// Reset form and hide image previews
function resetForm() {
    document.getElementById('fieldForm').reset();
    document.getElementById('imagePreview1').style.display = 'none';
    document.getElementById('imagePreview2').style.display = 'none';
}

// Update the fields table
function updateFieldsTable() {
    const fieldsTableBody = document.getElementById('fieldsTable').getElementsByTagName('tbody')[0];
    fieldsTableBody.innerHTML = ''; // Clear table body

    fieldList.forEach(field => {
        const row = fieldsTableBody.insertRow();
        row.innerHTML = `
            <td>${field.fieldCode}</td>
            <td>${field.fieldName}</td>
            <td>${field.location}</td>
            <td>${field.extentSize}</td>
            <td>
                <img src="${field.fieldImage1}" style="width: 100px;" />
                <img src="${field.fieldImage2}" style="width: 100px;" />
            </td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-field-code="${field.fieldCode}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-field-code="${field.fieldCode}">Delete</button>
            </td>
        `;
    });
}

// Event delegation for editing and deleting a field
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
        const fieldCode = event.target.getAttribute('data-field-code');
        if (confirm("Are you sure you want to delete this field entry?")) {
            const fieldIndex = fieldList.findIndex(field => field.fieldCode === fieldCode);
            if (fieldIndex !== -1) {
                fieldList.splice(fieldIndex, 1); // Remove field from database
                alert('Field deleted successfully!');
                updateFieldsTable(); // Refresh the table
            }
        }
    }

    if (event.target && event.target.classList.contains("edit-btn")) {
        const fieldCode = event.target.getAttribute('data-field-code');
        const field = fieldList.find(f => f.fieldCode === fieldCode);

        if (field) {
            // Pre-fill the form with the field data for editing
            document.getElementById('fieldCode').value = field.fieldCode;
            document.getElementById('name').value = field.fieldName;
            document.getElementById('location').value = field.location;
            document.getElementById('extentSize').value = field.extentSize;
            document.getElementById('imagePreview1').src = field.fieldImage1;
            document.getElementById('imagePreview1').style.display = 'block';
            document.getElementById('imagePreview2').src = field.fieldImage2;
            document.getElementById('imagePreview2').style.display = 'block';

            // Change the button text to indicate the form is in "Update" mode
            document.getElementById("submitField").textContent = "Update Field";
        }
    }
});

// Call this function to populate the fields table on page load
updateFieldsTable();


