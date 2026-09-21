import { useEffect, useState } from "react";

function Student() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Get students from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log("Backend connection error:", error);
      });
  }, []);

  // Add or update student
  function addStudent(e) {
    e.preventDefault();

    if (!email.toLowerCase().endsWith("@gmail.com")) {
  alert("Please enter a valid Gmail address ending with @gmail.com");
  return;
}

    // Update student
    if (editId !== null) {
      fetch(`http://localhost:5000/api/students/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          course: course,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Backend response:", data);

          setStudents(
            students.map((student) =>
              student.id === editId
                ? data.student
                : student
            )
          );
        })
        .catch((error) => {
          console.log("Error updating student:", error);
        });
    }

    // Add student
    else {
      fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          course: course,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Backend response:", data);

          setStudents([
            ...students,
            data.student,
          ]);
        })
        .catch((error) => {
          console.log("Error adding student:", error);
        });
    }

    setName("");
    setCourse("");
    setEmail("");
    setEditId(null);
  }

  // Edit student
  function editStudent(id) {
    const student = students.find(
      (student) => student.id === id
    );

    setName(student.name);
    setCourse(student.course);
    setEmail(student.email);
    setEditId(id);
  }

  // Delete student
  function deleteStudent(id) {
  fetch(`http://localhost:5000/api/students/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      return response.json();
    })
    .then((data) => {
      console.log("Delete response:", data);

      // Remove student from the frontend
      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => student.id !== id
        )
      );
    })
    .catch((error) => {
      console.log("Error deleting student:", error);
    });
}

  return (
    <div
      className="students-section"
      id="students"
    >
      <div className="students-header">
        <div>
          <h2>Students</h2>
          <p>Manage all students</p>
        </div>
      </div>

      <form
        className="student-form"
        onSubmit={addStudent}
      >
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) =>
            setCourse(e.target.value)
          }
          required
        />

        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
  title="Please enter a valid Gmail address ending with @gmail.com"
  required
/>

        <button type="submit">
          {editId !== null
            ? "Update Student"
            : "Add Student"}
        </button>
      </form>

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>

              <td>{student.name}</td>

              <td>{student.course}</td>

              <td>{student.email}</td>

              <td>
                <button
                  type="button"
                  onClick={() =>
                    editStudent(student.id)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;