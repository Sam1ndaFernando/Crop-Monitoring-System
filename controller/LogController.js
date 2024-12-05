$(document).ready(function () {
    const API_BASE_URL = "http://localhost:8080/api/v1/logs"; // Update with your actual API base URL

    // Load logs on page load
    loadLogs();

    // Handle the form submission for adding or updating a log
    $("#log-form").on("submit", function (event) {
        event.preventDefault();

        // Get form values
        const logCode = $("#logCode").val().trim();
        const date = $("#date").val().trim();
        const logDetails = $("#logDetails").val().trim();
        const observedImage = $("#observedImage")[0].files[0]; // Get the file object from input
        const staffOfLog = $("#staffOfLog").val().trim();
        const cropOfLog = $("#cropOfLog").val().trim();
        const fieldOfLog = $("#fieldOfLog").val().trim();

        // Prepare form data
        const formData = new FormData();
        formData.append("logCode", logCode);
        formData.append("date", date);
        formData.append("logDetails", logDetails);
        if (observedImage) {
            formData.append("observedImage", observedImage);
        }
        formData.append("staffList", staffOfLog);
        formData.append("cropList", cropOfLog);
        formData.append("fieldList", fieldOfLog);

        // Determine if this is an "add" or "update" operation
        const isUpdate = logCode && logList.some(log => log.logCode === logCode);
        const url = isUpdate ? `${API_BASE_URL}/${logCode}` : API_BASE_URL;
        const method = isUpdate ? "PUT" : "POST";

        // Make the AJAX request
        $.ajax({
            url: url,
            method: method,
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert(isUpdate ? "Log entry updated successfully." : "Log entry added successfully.");
                $("#log-form")[0].reset();
                $("#observedImagePreview").remove();
                $("#submitLog").text("Add Log");
                loadLogs(); // Reload the logs
            },
            error: function (xhr) {
                console.error("Error:", xhr);
                alert("An error occurred while processing your request.");
            }
        });
    });

    // Load logs from the backend and display them
    function loadLogs() {
        $.ajax({
            url: API_BASE_URL,
            method: "GET",
            success: function (data) {
                const tbody = $("#logTable tbody");
                tbody.empty(); // Clear existing rows

                data.forEach((log) => {
                    const logRow = `
                        <tr data-log-code="${log.logCode}">
                            <td>${log.logCode}</td>
                            <td>${log.date}</td>
                            <td>${log.logDetails}</td>
                            <td>${log.staffList.join(", ")}</td>
                            <td>${log.cropList.join(", ")}</td>
                            <td>${log.fieldList.join(", ")}</td>
                            <td>
                                ${log.observedImage ? `<img src="${log.observedImage}" class="img-thumbnail" width="100" />` : 'No Image'}
                            </td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-log">Delete</button>
                                <button class="btn btn-warning btn-sm update-log">Update</button>
                            </td>
                        </tr>
                    `;
                    tbody.append(logRow);
                });
            },
            error: function (xhr) {
                console.error("Error fetching logs:", xhr);
                alert("Failed to load logs.");
            }
        });
    }

    // Handle deleting a log entry
    $(document).on("click", ".delete-log", function () {
        const row = $(this).closest("tr");
        const logCode = row.data("log-code");

        if (confirm("Are you sure you want to delete this log entry?")) {
            $.ajax({
                url: `${API_BASE_URL}/${logCode}`,
                method: "DELETE",
                success: function () {
                    alert("Log entry deleted successfully.");
                    row.remove(); // Remove row from the table
                },
                error: function (xhr) {
                    console.error("Error deleting log:", xhr);
                    alert("Failed to delete log.");
                }
            });
        }
    });

    // Handle updating a log entry
    $(document).on("click", ".update-log", function () {
        const row = $(this).closest("tr");
        const logCode = row.data("log-code");

        $.ajax({
            url: `${API_BASE_URL}/${logCode}`,
            method: "GET",
            success: function (log) {
                // Pre-fill the form with the log data for editing
                $("#logCode").val(log.logCode);
                $("#date").val(log.date);
                $("#logDetails").val(log.logDetails);
                $("#staffOfLog").val(log.staffList.join(", "));
                $("#cropOfLog").val(log.cropList.join(", "));
                $("#fieldOfLog").val(log.fieldList.join(", "));

                // Optionally, handle image preview (not required but can be useful)
                if (log.observedImage) {
                    // Remove previous image preview (if any)
                    $("#observedImagePreview").remove();
                    $("#observedImage").after(`<img id="observedImagePreview" src="${log.observedImage}" class="img-thumbnail mt-2" width="100" />`);
                }

                // Change the button text to indicate the form is in "Update" mode
                $("#submitLog").text("Update Log");
            },
            error: function (xhr) {
                console.error("Error fetching log:", xhr);
                alert("Failed to fetch log details.");
            }
        });
    });
});
