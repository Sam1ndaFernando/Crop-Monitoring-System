import { logList } from "../db/db.js";

$(document).ready(function () {
    // Simulated database as an array

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

        // Validate form inputs
        if (!logCode || !date || !logDetails || !staffOfLog || !cropOfLog || !fieldOfLog) {
            alert("All fields are required.");
            return;
        }

        // Create the log entry object
        const logData = {
            logCode,
            date,
            logDetails,
            observedImage: observedImage ? URL.createObjectURL(observedImage) : null, // Handle image URL
            staffOfLog,
            cropOfLog,
            fieldOfLog
        };

        // Check if the log entry already exists (update instead of adding)
        const existingLogIndex = logList.findIndex(log => log.logCode === logCode);
        if (existingLogIndex !== -1) {
            // Update the existing log entry
            logList[existingLogIndex] = logData;
            alert("Log entry updated successfully.");
        } else {
            // Add the log entry to the "database" array
            logList.push(logData);
            alert("Log entry added successfully.");
        }

        // Reset the form and change button text back to "Add Log"
        $("#log-form")[0].reset();
        $("#observedImagePreview").remove();  // Remove any existing image preview
        $("#submitLog").text("Add Log");

        // Reload the table with the updated log entries
        loadLogs();
    });

    // Function to load and display logs in the table
    function loadLogs() {
        const tbody = $("#logTable tbody");
        tbody.empty(); // Clear existing rows

        logList.forEach((log) => {
            const logRow = `
                <tr data-log-code="${log.logCode}">
                    <td>${log.logCode}</td>
                    <td>${log.date}</td>
                    <td>${log.logDetails}</td>
                    <td>${log.staffOfLog}</td>
                    <td>${log.cropOfLog}</td>
                    <td>${log.fieldOfLog}</td>
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
    }

    // Handle deleting a log entry
    $(document).on("click", ".delete-log", function () {
        const row = $(this).closest("tr");
        const logCode = row.data("log-code");

        if (confirm("Are you sure you want to delete this log entry?")) {
            const logIndex = logList.findIndex(log => log.logCode === logCode);
            if (logIndex !== -1) {
                logList.splice(logIndex, 1); // Remove log from "database"
                alert("Log entry deleted successfully.");
                row.remove(); // Remove row from the table
            }
        }
    });

    // Handle updating a log entry
    $(document).on("click", ".update-log", function () {
        const row = $(this).closest("tr");
        const logCode = row.data("log-code");
        const log = logList.find(log => log.logCode === logCode);

        if (log) {
            // Pre-fill the form with the log data for editing
            $("#logCode").val(log.logCode);
            $("#date").val(log.date);
            $("#logDetails").val(log.logDetails);
            $("#staffOfLog").val(log.staffOfLog);
            $("#cropOfLog").val(log.cropOfLog);
            $("#fieldOfLog").val(log.fieldOfLog);

            // Optionally, handle image preview (not required but can be useful)
            if (log.observedImage) {
                // Remove previous image preview (if any)
                $("#observedImagePreview").remove();
                $("#observedImage").after(`<img id="observedImagePreview" src="${log.observedImage}" class="img-thumbnail mt-2" width="100" />`);
            }

            // Change the button text to indicate the form is in "Update" mode
            $("#submitLog").text("Update Log");
        }
    });
});
