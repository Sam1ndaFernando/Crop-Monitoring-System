import { equipmentList as initialEquipmentList } from "../db/db.js";

$(document).ready(function () {
    let editEquipmentIndex = null; // Initialize editEquipmentIndex to null.

    // Initialize equipmentList from localStorage or use the initial data
    let equipmentList = JSON.parse(localStorage.getItem('equipmentData')) || initialEquipmentList;

    // Load equipment data on page load
    loadEquipment();

    // Form submission handler for adding/updating equipment
    $("#equipmentForm").on("submit", function (event) {
        event.preventDefault();

        const equipmentCode = $("#equipmentCode").val().trim();
        const equipmentName = $("#equipmentName").val().trim();
        const equipmentType = $("#equipmentType").val().trim();
        const equipmentStatus = $("#equipmentStatus").val().trim();
        const availableCount = $("#availableCount").val().trim();
        const equipmentImage = $("#equipmentImage")[0].files[0]; // Get selected image file

        // Validate form inputs
        if (!equipmentCode || !equipmentName || !equipmentType || !equipmentStatus || !availableCount) {
            alert("All fields are required.");
            return;
        }

        let imageBase64 = null;
        if (equipmentImage) {
            // Convert the image to base64 string
            const reader = new FileReader();
            reader.onload = function () {
                imageBase64 = reader.result;
                const equipmentData = {
                    equipmentCode,
                    equipmentName,
                    equipmentType,
                    equipmentStatus,
                    availableCount,
                    equipmentImage: imageBase64 // Add image to equipment data
                };

                if (editEquipmentIndex !== null) {
                    // Update existing equipment
                    editEquipment(editEquipmentIndex, equipmentData);
                } else {
                    // Add new equipment
                    addEquipment(equipmentData);
                }
            };
            reader.readAsDataURL(equipmentImage); // Read the image file
        } else {
            const equipmentData = {
                equipmentCode,
                equipmentName,
                equipmentType,
                equipmentStatus,
                availableCount
            };

            if (editEquipmentIndex !== null) {
                // Update existing equipment without an image
                editEquipment(editEquipmentIndex, equipmentData);
            } else {
                // Add new equipment without an image
                addEquipment(equipmentData);
            }
        }
    });

    // Load equipment and populate the table from the simulated database
    function loadEquipment() {
        const tbody = $("#equipmentTable tbody");
        if (!tbody.length) return; // Prevent errors if the table doesn't exist
        tbody.empty();

        equipmentList.forEach((equipment, index) => {
            const equipmentRow = `
                <tr data-equipment-code="${equipment.equipmentCode}">
                    <td>${equipment.equipmentCode}</td>
                    <td>${equipment.equipmentName}</td>
                    <td>${equipment.equipmentType}</td>
                    <td>${equipment.equipmentStatus}</td>
                    <td>${equipment.availableCount}</td>
                    <td>
                        ${equipment.equipmentImage ? `<img src="${equipment.equipmentImage}" alt="Image" style="max-width: 50px;"/>` : 'No Image'}
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-equipment">Edit</button>
                        <button class="btn btn-danger btn-sm delete-equipment">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(equipmentRow);
        });
    }

    // Add a new equipment to the simulated database
    function addEquipment(equipmentData) {
        equipmentList.push(equipmentData);
        localStorage.setItem('equipmentData', JSON.stringify(equipmentList));
        alert("Equipment added successfully.");
        $("#equipmentForm")[0].reset();
        $("#imagePreview").hide(); // Hide the preview after adding equipment
        loadEquipment();
    }

    // Edit an existing equipment in the simulated database
    function editEquipment(index, equipmentData) {
        equipmentList[index] = equipmentData;
        localStorage.setItem('equipmentData', JSON.stringify(equipmentList));
        alert("Equipment updated successfully.");
        $("#equipmentForm")[0].reset();
        $("#imagePreview").hide(); // Hide the preview after editing equipment
        editEquipmentIndex = null; // Reset the edit index
        $("#equipmentCode").prop("readonly", false); // Reset the readonly status
        loadEquipment();
    }

    // Delete an equipment from the simulated database
    $(document).on("click", ".delete-equipment", function () {
        const row = $(this).closest("tr");
        const equipmentCode = row.data("equipment-code");

        if (confirm("Are you sure you want to delete this equipment?")) {
            const equipmentIndex = equipmentList.findIndex(e => e.equipmentCode === equipmentCode);
            if (equipmentIndex !== -1) {
                equipmentList.splice(equipmentIndex, 1);
                localStorage.setItem('equipmentData', JSON.stringify(equipmentList));
                alert("Equipment deleted successfully.");
                row.remove();
            }
        }
    });

    // Edit equipment: populate form with equipment details
    $(document).on("click", ".edit-equipment", function () {
        const row = $(this).closest("tr");
        const equipmentCode = row.data("equipment-code");

        const equipment = equipmentList.find(e => e.equipmentCode === equipmentCode);
        if (equipment) {
            editEquipmentIndex = equipmentList.findIndex(e => e.equipmentCode === equipmentCode); // Set the edit index
            $("#equipmentCode").val(equipment.equipmentCode).prop("readonly", true);
            $("#equipmentName").val(equipment.equipmentName);
            $("#equipmentType").val(equipment.equipmentType);
            $("#equipmentStatus").val(equipment.equipmentStatus);
            $("#availableCount").val(equipment.availableCount);
            if (equipment.equipmentImage) {
                $("#imagePreview").attr("src", equipment.equipmentImage).show(); // Show the saved image
            }
            $("#equipmentSection").show();
            $('#submitEquipment').text('Update Equipment');

        }
    });

    // Optionally show the form (if it's hidden initially)
    $('#showEquipmentForm').on('click', function () {
        $('#equipmentSection').show();
        $("#equipmentForm")[0].reset(); // Reset form when toggling
        $("#equipmentCode").prop("readonly", false); // Ensure code is editable
        $("#imagePreview").hide(); // Hide the image preview initially
        editEquipmentIndex = null; // Reset edit index
    });

    // Preview the image before submission
    function previewImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = reader.result;
            imagePreview.style.display = 'block';
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
});
