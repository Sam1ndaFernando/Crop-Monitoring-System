const API_URL = "http://localhost:8080/cropBackend/api/v1/field";

// Handle the form submission (Save or Update)
document.getElementById("fieldForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const fieldCode = document.getElementById("fieldCode").value.trim();
    const fieldName = document.getElementById("name").value.trim();
    const location = document.getElementById("location").value.trim();
    const extentSize = document.getElementById("extentSize").value.trim();
    const fieldImage1 = document.getElementById("imagePreview1").src;
    const fieldImage2 = document.getElementById("imagePreview2").src;

    const fieldData = {
        fieldCode,
        name: fieldName,
        location,
        extentSize,
        fieldImage1,
        fieldImage2,
    };

    // Determine if this is a new field or an update
    const isUpdating = document.getElementById("submitField").textContent === "Update Field";

    if (isUpdating) {
        // Update existing field
        fetch(`${API_URL}/${fieldCode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fieldData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update field.");
                }
                alert("Field updated successfully!");
                resetForm();
                updateFieldsTable();
            })
            .catch((error) => {
                console.error(error);
                alert("Error updating field.");
            });
    } else {
        // Add new field
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fieldData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add field.");
                }
                alert("Field added successfully!");
                resetForm();
                updateFieldsTable();
            })
            .catch((error) => {
                console.error(error);
                alert("Error adding field.");
            });
    }
});

// Preview selected image
function previewImage(event, imagePreviewId) {
    const imagePreview = document.getElementById(imagePreviewId);
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
        imagePreview.src = reader.result;
        imagePreview.style.display = "block"; // Show the image preview
    };

    reader.readAsDataURL(file); // Read the image file as a data URL
}

// Reset form and hide image previews
function resetForm() {
    document.getElementById("fieldForm").reset();
    document.getElementById("imagePreview1").style.display = "none";
    document.getElementById("imagePreview2").style.display = "none";
    document.getElementById("submitField").textContent = "Add Field";
    document.getElementById("fieldCode").value = ""; // Ensure the field code is cleared
}

// Fetch and populate the fields table
function updateFieldsTable() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((fields) => {
            const fieldsTableBody = document.getElementById("fieldsTable").getElementsByTagName("tbody")[0];
            fieldsTableBody.innerHTML = ""; // Clear table body

            fields.forEach((field) => {
                const row = fieldsTableBody.insertRow();
                row.innerHTML = `
                    <td>${field.fieldCode}</td>
                    <td>${field.name}</td> <!-- Fixed property name -->
                    <td>${field.location}</td> <!-- Fixed property name -->
                    <td>${field.extentSize}</td> <!-- Fixed property name -->
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
        })
        .catch((error) => {
            console.error("Error fetching fields:", error);
            alert("Error loading fields.");
        });
}

// Event delegation for editing and deleting a field
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
        const fieldCode = event.target.getAttribute("data-field-code");
        if (confirm("Are you sure you want to delete this field entry?")) {
            fetch(`${API_URL}/${fieldCode}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to delete field.");
                    }
                    alert("Field deleted successfully!");
                    updateFieldsTable();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error deleting field.");
                });
        }
    }

    if (event.target && event.target.classList.contains("edit-btn")) {
        const fieldCode = event.target.getAttribute("data-field-code");
        fetch(`${API_URL}/${fieldCode}`)
            .then((response) => response.json())
            .then((field) => {
                if (field) {
                    // Pre-fill the form with the field data for editing
                    document.getElementById("fieldCode").value = field.fieldCode;
                    document.getElementById("name").value = field.name;
                    document.getElementById("location").value = field.location;
                    document.getElementById("extentSize").value = field.extentSize;
                    document.getElementById("imagePreview1").src = field.fieldImage1;
                    document.getElementById("imagePreview1").style.display = "block";
                    document.getElementById("imagePreview2").src = field.fieldImage2;
                    document.getElementById("imagePreview2").style.display = "block";

                    // Change the button text to indicate the form is in "Update" mode
                    document.getElementById("submitField").textContent = "Update Field";
                }
            })
            .catch((error) => {
                console.error("Error fetching field:", error);
                alert("Error loading field for editing.");
            });
    }
});

// Call this function to populate the fields table on page load
updateFieldsTable();
