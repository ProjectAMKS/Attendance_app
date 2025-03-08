document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const markAttendanceForm = document.getElementById("mark-attendance-form");
    const viewAttendanceForm = document.getElementById("view-attendance-form");

    let users = {}; // Store user credentials
    let attendanceRecords = {}; // Store attendance data
    let loggedInUser = null;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (users[username] && users[username].password === password) {
            alert("Login successful!");
            loggedInUser = username;

            if (users[username].role === "teacher") {
                showSection("mark-attendance-section");
            } else {
                showSection("view-attendance-section");
            }
        } else {
            alert("Invalid username or password.");
        }
    });

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;
        const role = document.getElementById("role").value;

        if (users[newUsername]) {
            alert("Username already exists.");
        } else {
            users[newUsername] = { password: newPassword, role: role };
            alert("Signup successful! Please log in.");
            showSection("login-section");
        }
    });

    markAttendanceForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const code = document.getElementById("attendance-code").value;
        const date = document.getElementById("attendance-date").value;
        const studentName = document.getElementById("student-name").value;
        const rollNumber = document.getElementById("roll-number").value;
        const status = document.getElementById("attendance-status").value;

        if (!attendanceRecords[code]) {
            attendanceRecords[code] = [];
        }
        attendanceRecords[code].push({ date, studentName, rollNumber, status });
        alert("Attendance marked successfully!");
    });

    viewAttendanceForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const code = document.getElementById("view-attendance-code").value;
        const attendanceTable = document.getElementById("attendance-table");

        attendanceTable.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Status</th>
            </tr>
        `;

        if (attendanceRecords[code]) {
            attendanceRecords[code].forEach(record => {
                const row = `
                    <tr>
                        <td>${record.date}</td>
                        <td>${record.rollNumber}</td>
                        <td>${record.studentName}</td>
                        <td>${record.status}</td>
                    </tr>
                `;
                attendanceTable.innerHTML += row;
            });
        } else {
            attendanceTable.innerHTML += `<tr><td colspan="4">No attendance records found.</td></tr>`;
        }
    });
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

function logout() {
    alert("Logged out!");
    loggedInUser = null;
    showSection("login-section");
                                }
