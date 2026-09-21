import { useEffect, useState } from "react";

function Teacher() {
  const [teachers, setTeachers] = useState([]);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Get teachers from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
      })
      .catch((error) => {
        console.log("Backend connection error:", error);
      });
  }, []);

  // Add or update teacher
  function addTeacher(e) {
    e.preventDefault();
    if (!email.toLowerCase().endsWith("@gmail.com")) {
  alert("Please enter a valid Gmail address ending with @gmail.com");
  return;
}

    // Update teacher
    if (editId !== null) {
      fetch(`http://localhost:5000/api/teachers/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          subject: subject,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Backend response:", data);

          setTeachers(
            teachers.map((teacher) =>
              teacher.id === editId
                ? data.teacher
                : teacher
            )
          );

          window.dispatchEvent(
            new Event("teachersUpdated")
          );
        })
        .catch((error) => {
          console.log("Error updating teacher:", error);
        });
    }

    // Add teacher
    else {
      fetch("http://localhost:5000/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          subject: subject,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Backend response:", data);

          setTeachers([
            ...teachers,
            data.teacher,
          ]);

          window.dispatchEvent(
            new Event("teachersUpdated")
          );
        })
        .catch((error) => {
          console.log("Error adding teacher:", error);
        });
    }

    setName("");
    setSubject("");
    setEmail("");
    setEditId(null);
  }

  // Edit teacher
  function editTeacher(id) {
    const teacher = teachers.find(
      (teacher) => teacher.id === id
    );

    setName(teacher.name);
    setSubject(teacher.subject);
    setEmail(teacher.email);
    setEditId(id);
  }

  // Delete teacher
  function deleteTeacher(id) {
    fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Backend response:", data);

        setTeachers(
          teachers.filter(
            (teacher) => teacher.id !== id
          )
        );

        window.dispatchEvent(
          new Event("teachersUpdated")
        );
      })
      .catch((error) => {
        console.log("Error deleting teacher:", error);
      });
  }

  return (
    <div
      className="students-section"
      id="teachers"
    >
      <div className="students-header">
        <div>
          <h2>Teachers</h2>
          <p>Manage all teachers</p>
        </div>
      </div>

      <form
        className="student-form"
        onSubmit={addTeacher}
      >
        <input
          type="text"
          placeholder="Teacher Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
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
            ? "Update Teacher"
            : "Add Teacher"}
        </button>
      </form>

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>

              <td>{teacher.name}</td>

              <td>{teacher.subject}</td>

              <td>{teacher.email}</td>

              <td>
                <button
                  type="button"
                  onClick={() =>
                    editTeacher(teacher.id)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteTeacher(teacher.id)
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

export default Teacher;