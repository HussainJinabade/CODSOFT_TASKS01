import { useEffect, useState } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);

  // Get attendance from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        setAttendance(data);
      })
      .catch((error) => {
        console.log(
          "Backend connection error:",
          error
        );
      });
  }, []);

  // Toggle attendance status
  function toggleStatus(id) {
    const record = attendance.find(
      (item) => item.id === id
    );

    const newStatus =
      record.status === "Present"
        ? "Absent"
        : "Present";

    fetch(`http://localhost:5000/api/attendance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: record.name,
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Backend response:", data);

        setAttendance(
          attendance.map((item) =>
            item.id === id
              ? data.attendance
              : item
          )
        );

        window.dispatchEvent(
          new Event("attendanceUpdated")
        );
      })
      .catch((error) => {
        console.log(
          "Error updating attendance:",
          error
        );
      });
  }

  return (
    <div
      className="students-section"
      id="attendance"
    >
      <div className="students-header">
        <div>
          <h2>Attendance</h2>
          <p>Manage student attendance</p>
        </div>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>

              <td>{record.name}</td>

              <td>{record.status}</td>

              <td>
                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(record.id)
                  }
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;