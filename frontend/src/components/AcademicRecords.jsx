import { useEffect, useState } from "react";

function AcademicRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/academic-records")
      .then((response) => response.json())
      .then((data) => {
        console.log("Academic records:", data);
        setRecords(data);
      })
      .catch((error) => {
        console.log("Academic records error:", error);
      });
  }, []);

  function getGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    return "C";
  }

  function updateMarks(id) {
    const record = records.find(
      (item) => item.id === id
    );

    const marks = prompt(
      "Enter marks:",
      record.marks
    );

    if (marks === null) {
      return;
    }

    fetch(
      `http://localhost:5000/api/academic-records/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          marks: Number(marks)
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "Updated academic record:",
          data
        );

        setRecords(
          records.map((item) =>
            item.id === id
              ? data.record
              : item
          )
        );
      })
      .catch((error) => {
        console.log(
          "Update marks error:",
          error
        );
      });
  }

  return (
    <div
      className="students-section"
      id="academic-records"
    >

      <div className="students-header">
        <div>
          <h2>Academic Records</h2>

          <p>
            Manage student academic performance
          </p>
        </div>
      </div>

      {records.length === 0 ? (
        <p>No academic records found.</p>
      ) : (
        <table className="students-table">

          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {records.map((record) => (

              <tr key={record.id}>

                <td>{record.name}</td>

                <td>{record.course}</td>

                <td>{record.semester}</td>

                <td>{record.marks}</td>

                <td>
                  {getGrade(record.marks)}
                </td>

                <td>

                  <button
                    type="button"
                    onClick={() =>
                      updateMarks(record.id)
                    }
                  >
                    Update Marks
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default AcademicRecords;