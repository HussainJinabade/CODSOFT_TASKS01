import { useEffect, useState } from "react";

function Examination() {
  const [examinations, setExaminations] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/examinations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Examinations from backend:", data);
        setExaminations(data);
      })
      .catch((error) => {
        console.log("Examination error:", error);
      });
  }, []);

    function addExamination(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/examinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        subject: subject,
        date: date,
        status: "Upcoming"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setExaminations([
          ...examinations,
          data.examination
        ]);

        setName("");
        setSubject("");
        setDate("");
      })
      .catch((error) => {
        console.log(
          "Error adding examination:",
          error
        );
      });
  }

  function toggleStatus(id) {
    const exam = examinations.find(
      (item) => item.id === id
    );

    const newStatus =
      exam.status === "Upcoming"
        ? "Completed"
        : "Upcoming";

    fetch(`http://localhost:5000/api/examinations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: exam.name,
        subject: exam.subject,
        date: exam.date,
        status: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setExaminations(
          examinations.map((item) =>
            item.id === id
              ? data.examination
              : item
          )
        );
      })
      .catch((error) => {
        console.log("Update error:", error);
      });
  }

  function deleteExamination(id) {
    fetch(`http://localhost:5000/api/examinations/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setExaminations(
          examinations.filter(
            (item) => item.id !== id
          )
        );
      })
      .catch((error) => {
        console.log("Delete error:", error);
      });
  }

  return (
    <div
      className="students-section"
      id="examinations"
    >
      <div className="students-header">
        <div>
          <h2>Examinations</h2>
          <p>Manage examination schedules</p>
        </div>
      </div>

      <form
  className="student-form"
  onSubmit={addExamination}
>
  <input
    type="text"
    placeholder="Exam Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

  <input
    type="text"
    placeholder="Subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    required
  />

  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    required
  />

  <button type="submit">
    Add Examination
  </button>
</form>

      {examinations.length === 0 ? (
        <p>No examinations found.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Exam</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {examinations.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.name}</td>
                <td>{exam.subject}</td>
                <td>{exam.date}</td>
                <td>{exam.status}</td>

                <td>
                  <button
                    type="button"
                    onClick={() =>
                      toggleStatus(exam.id)
                    }
                  >
                    Change Status
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteExamination(exam.id)
                    }
                  >
                    Delete
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

export default Examination;