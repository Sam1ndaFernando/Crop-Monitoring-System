const API_URL = "http://localhost:8080/cropBackend/api/v1/equipment";

$(document).ready(function () {
    let editEquipmentCode = null; // Track the equipment being edited

    // Load equipment data on page load
    loadEquipment();

    // Handle form submission for adding or updating equipment
    $("#equipmentForm").on("submit", function (event) {
        event.preventDefault();

        const equipmentCode = $("#equipmentCode").val().trim();
        const equipmentName = $("#equipmentName").val().trim();
        const equipmentType = $("#equipmentType").val().trim();
        const equipmentStatus = $("#equipmentStatus").val().trim();
        const availableCount = $("#availableCount").val().trim();
        const equipmentImage = $("#equipmentImage")[0].files[0]; // Get selected image file

        // Basic validation for required fields
        if (!equipmentCode || !equipmentName || !equipmentType || !equipmentStatus || !availableCount) {
            alert("Please fill in all the required fields.");
            return;
        }

        // Ensure availableCount is a valid number
        if (isNaN(availableCount) || availableCount <= 0) {
            alert("Please enter a valid number for Available Count.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("equipmentCode", equipmentCode);
        formData.append("equipmentName", equipmentName);
        formData.append("equipmentType", equipmentType);
        formData.append("equipmentStatus", equipmentStatus);
        formData.append("availableCount", availableCount);

        if (equipmentImage) {
            formData.append("equipmentImage", equipmentImage);
        }

        // Add or update equipment based on the current mode
        const method = editEquipmentCode ? "PUT" : "POST";
        const url = editEquipmentCode ? `${API_URL}/${editEquipmentCode}` : API_URL;

        $.ajax({
            url,
            method,
            processData: false,
            contentType: false,
            data: formData,
            success: function () {
                alert(editEquipmentCode ? "Equipment updated successfully." : "Equipment added successfully.");
                resetForm();
                loadEquipment(); // Refresh the equipment list
            },
            error: function (xhr) {
                console.error("Error saving equipment:", xhr.responseText);
                alert(`Error saving equipment: ${xhr.responseText}`);
            }
        });
    });

    // Load equipment from the backend and populate the table
    function loadEquipment() {
        $.ajax({
            url: API_URL,
            method: "GET",
            success: function (equipmentList) {
                const tbody = $("#equipmentTable tbody");
                tbody.empty(); // Clear existing rows

                equipmentList.forEach((equipment) => {
                    const equipmentRow = `
                        <tr data-equipment-code="${equipment.equipmentCode}">
                            <td>${equipment.equipmentCode}</td>
                            <td>${equipment.name}</td>
                            <td>${equipment.type}</td>
                            <td>${equipment.status}</td>
                            <td>${equipment.availableCount}</td>
                            <td>
                                ${equipment.equipmentImage ? `<img src="${equipment.equipmentImage}" alt="Image" style="max-width: 50px;" />` : "No Image"}
                            </td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-equipment">Edit</button>
                                <button class="btn btn-danger btn-sm delete-equipment">Delete</button>
                            </td>
                        </tr>
                    `;
                    tbody.append(equipmentRow);
                });
            },
            error: function (xhr) {
                console.error("Error loading equipment:", xhr.responseText);
                alert(`Error loading equipment: ${xhr.responseText}`);
            }
        });
    }

    // Edit equipment: populate form with equipment details
    $(document).on("click", ".edit-equipment", function () {
        const row = $(this).closest("tr");
        const equipmentCode = row.data("equipment-code");

        $.ajax({
            url: `${API_URL}/${equipmentCode}`,
            method: "GET",
            success: function (equipment) {
                if (equipment) {
                    editEquipmentCode = equipmentCode;
                    $("#equipmentCode").val(equipment.equipmentCode).prop("readonly", true);
                    $("#equipmentName").val(equipment.name);
                    $("#equipmentType").val(equipment.type);
                    $("#equipmentStatus").val(equipment.status);
                    $("#availableCount").val(equipment.availableCount);

                    if (equipment.equipmentImage) {
                        $("#equipmentImagePreview").attr("src", equipment.equipmentImage).show();
                    } else {
                        $("#equipmentImagePreview").hide();
                    }

                    $("#submitEquipment").text("Update Equipment");
                }
            },
            error: function (xhr) {
                console.error("Error fetching equipment:", xhr.responseText);
                alert(`Error fetching equipment: ${xhr.responseText}`);
            }
        });
    });

    // Delete equipment
    $(document).on("click", ".delete-equipment", function () {
        const row = $(this).closest("tr");
        const equipmentCode = row.data("equipment-code");

        if (confirm("Are you sure you want to delete this equipment?")) {
            $.ajax({
                url: `${API_URL}/${equipmentCode}`,
                method: "DELETE",
                success: function () {
                    alert("Equipment deleted successfully.");
                    loadEquipment(); // Refresh the equipment list
                },
                error: function (xhr) {
                    console.error("Error deleting equipment:", xhr.responseText);
                    alert(`Error deleting equipment: ${xhr.responseText}`);
                }
            });
        }
    });

    // Preview image when selected
    $("#equipmentImage").on("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                $("#equipmentImagePreview").attr("src", reader.result).show();
            };
            reader.readAsDataURL(file);
        }
    });

    // Reset form and clear edit state
    function resetForm() {
        $("#equipmentForm")[0].reset();
        $("#equipmentCode").prop("readonly", false);
        $("#equipmentImagePreview").hide();
        editEquipmentCode = null;
        $("#submitEquipment").text("Submit Equipment");
    }
});
