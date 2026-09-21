const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const filePath = "./students.json";
const teacherFilePath = "./teachers.json";
const attendanceFilePath = "./attendance.json";
const examinationFilePath = "./examinations.json";
const feesFilePath = "./fees.json";
const academicRecordFilePath = "./academicRecords.json";

// Get students from JSON file
function getStudents() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Save students to JSON file
function saveStudents(students) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(students, null, 2)
  );
}

// Get teachers from JSON file
function getTeachers() {
  const data = fs.readFileSync(
    teacherFilePath,
    "utf-8"
  );

  return JSON.parse(data);
}

// Save teachers to JSON file
function saveTeachers(teachers) {
  fs.writeFileSync(
    teacherFilePath,
    JSON.stringify(teachers, null, 2)
  );
}

function getAttendance() {
  const data = fs.readFileSync(
    attendanceFilePath,
    "utf-8"
  );

  return JSON.parse(data);
}

// Save attendance to JSON file
function saveAttendance(attendance) {
  fs.writeFileSync(
    attendanceFilePath,
    JSON.stringify(attendance, null, 2)
  );
}

// Get examinations from JSON file
function getExaminations() {
  const data = fs.readFileSync(
    examinationFilePath,
    "utf-8"
  );

  return JSON.parse(data);
}

// Save examinations to JSON file
function saveExaminations(examinations) {
  fs.writeFileSync(
    examinationFilePath,
    JSON.stringify(examinations, null, 2)
  );
}

// Get fees from JSON file
function getFees() {
  const data = fs.readFileSync(
    feesFilePath,
    "utf-8"
  );

  return JSON.parse(data);
}

function getAcademicRecords() {
  const data = fs.readFileSync(
    academicRecordFilePath,
    "utf-8"
  );

  return JSON.parse(data);
}

function saveAcademicRecords(records) {
  fs.writeFileSync(
    academicRecordFilePath,
    JSON.stringify(records, null, 2)
  );
}

// Save fees to JSON file
function saveFees(fees) {
  fs.writeFileSync(
    feesFilePath,
    JSON.stringify(fees, null, 2)
  );
}
// Home
app.get("/", (req, res) => {
  res.send("Student Management System Backend is working");
});

// Get all students
app.get("/api/students", (req, res) => {
  const students = getStudents();

  res.json(students);
});

// Add student
app.post("/api/students", (req, res) => {
  const students = getStudents();

  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    course: req.body.course,
    email: req.body.email
  };

  students.push(newStudent);

  saveStudents(students);

  console.log("Student added:", newStudent);

  res.json({
    message: "Student added successfully",
    student: newStudent
  });
});

// Update student
app.put("/api/students/:id", (req, res) => {
  const students = getStudents();

  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name;
  student.course = req.body.course;
  student.email = req.body.email;

  saveStudents(students);

  console.log("Student updated:", student);

  res.json({
    message: "Student updated successfully",
    student: student
  });
});

// Delete student
app.delete("/api/students/:id", (req, res) => {
  const students = getStudents();

  const id = Number(req.params.id);

  let updatedStudents = students.filter(
    (student) => student.id !== id
  );

  // Re-number student IDs
  updatedStudents = updatedStudents.map(
    (student, index) => ({
      ...student,
      id: index + 1
    })
  );

  saveStudents(updatedStudents);

  console.log("Student deleted:", id);

  res.json({
    message: "Student deleted successfully",
    students: updatedStudents
  });
});

// Get all teachers
app.get("/api/teachers", (req, res) => {
  const teachers = getTeachers();

  res.json(teachers);
});

// Add teacher
app.post("/api/teachers", (req, res) => {
  const teachers = getTeachers();

  const newTeacher = {
    id: teachers.length + 1,
    name: req.body.name,
    subject: req.body.subject,
    email: req.body.email
  };

  teachers.push(newTeacher);
  saveTeachers(teachers);

  console.log("Teacher added:", newTeacher);

  res.json({
    message: "Teacher added successfully",
    teacher: newTeacher
  });
});

// Update teacher
app.put("/api/teachers/:id", (req, res) => {
  const teachers = getTeachers();

  const id = Number(req.params.id);

  const teacher = teachers.find(
    (teacher) => teacher.id === id
  );

  if (!teacher) {
    return res.status(404).json({
      message: "Teacher not found"
    });
  }

  teacher.name = req.body.name;
  teacher.subject = req.body.subject;
  teacher.email = req.body.email;

  saveTeachers(teachers);

  console.log("Teacher updated:", teacher);

  res.json({
    message: "Teacher updated successfully",
    teacher: teacher
  });
});

// Delete teacher
app.delete("/api/teachers/:id", (req, res) => {
  const teachers = getTeachers();

  const id = Number(req.params.id);

  const updatedTeachers = teachers.filter(
    (teacher) => teacher.id !== id
  );

  saveTeachers(updatedTeachers);

  console.log("Teacher deleted:", id);

  res.json({
    message: "Teacher deleted successfully"
  });
});

// Get all attendance records
app.get("/api/attendance", (req, res) => {
  const attendance = getAttendance();

  res.json(attendance);
});

// Add attendance record
app.post("/api/attendance", (req, res) => {
  const attendance = getAttendance();

  const newRecord = {
    id: attendance.length + 1,
    name: req.body.name,
    status: req.body.status
  };

  attendance.push(newRecord);
  saveAttendance(attendance);

  console.log("Attendance added:", newRecord);

  res.json({
    message: "Attendance added successfully",
    attendance: newRecord
  });
});

// Update attendance
app.put("/api/attendance/:id", (req, res) => {
  const attendance = getAttendance();

  const id = Number(req.params.id);

  const record = attendance.find(
    (item) => item.id === id
  );

  if (!record) {
    return res.status(404).json({
      message: "Attendance record not found"
    });
  }

  record.name = req.body.name;
  record.status = req.body.status;

  saveAttendance(attendance);

  console.log("Attendance updated:", record);

  res.json({
    message: "Attendance updated successfully",
    attendance: record
  });
});

// Get all examinations
app.get("/api/examinations", (req, res) => {
  const examinations = getExaminations();

  res.json(examinations);
});

// Add examination
app.post("/api/examinations", (req, res) => {
  const examinations = getExaminations();

  const newExamination = {
    id: examinations.length + 1,
    name: req.body.name,
    subject: req.body.subject,
    date: req.body.date,
    status: req.body.status
  };

  examinations.push(newExamination);
  saveExaminations(examinations);

  console.log(
    "Examination added:",
    newExamination
  );

  res.json({
    message: "Examination added successfully",
    examination: newExamination
  });
});

// Update examination
app.put("/api/examinations/:id", (req, res) => {
  const examinations = getExaminations();

  const id = Number(req.params.id);

  const examination = examinations.find(
    (exam) => exam.id === id
  );

  if (!examination) {
    return res.status(404).json({
      message: "Examination not found"
    });
  }

  examination.name = req.body.name;
  examination.subject = req.body.subject;
  examination.date = req.body.date;
  examination.status = req.body.status;

  saveExaminations(examinations);

  console.log(
    "Examination updated:",
    examination
  );

  res.json({
    message: "Examination updated successfully",
    examination: examination
  });
});

// Delete examination
app.delete("/api/examinations/:id", (req, res) => {
  const examinations = getExaminations();

  const id = Number(req.params.id);

  const updatedExaminations =
    examinations.filter(
      (exam) => exam.id !== id
    );

  saveExaminations(updatedExaminations);

  console.log(
    "Examination deleted:",
    id
  );

  res.json({
    message: "Examination deleted successfully"
  });
});

// Get all fees
app.get("/api/fees", (req, res) => {
  const fees = getFees();

  res.json(fees);
});

// Add fee record
app.post("/api/fees", (req, res) => {
  const fees = getFees();

  const newFee = {
    id: fees.length + 1,
    name: req.body.name,
    course: req.body.course,
    total: req.body.total,
    paid: req.body.paid
  };

  fees.push(newFee);
  saveFees(fees);

  console.log("Fee added:", newFee);

  res.json({
    message: "Fee added successfully",
    fee: newFee
  });
});

// Update fee
app.put("/api/fees/:id", (req, res) => {
  const fees = getFees();

  const id = Number(req.params.id);

  const fee = fees.find(
    (item) => item.id === id
  );

  if (!fee) {
    return res.status(404).json({
      message: "Fee record not found"
    });
  }

  fee.name = req.body.name;
  fee.course = req.body.course;
  fee.total = req.body.total;
  fee.paid = req.body.paid;

  saveFees(fees);

  console.log("Fee updated:", fee);

  res.json({
    message: "Fee updated successfully",
    fee: fee
  });
});

// Academic Records routes

app.get("/api/academic-records", (req, res) => {
  const records = getAcademicRecords();

  res.json(records);
});

app.put(
  "/api/academic-records/:id",
  (req, res) => {
    const records = getAcademicRecords();

    const id = Number(req.params.id);

    const recordIndex = records.findIndex(
      (record) => record.id === id
    );

    if (recordIndex === -1) {
      return res.status(404).json({
        message: "Academic record not found"
      });
    }

    records[recordIndex] = {
      ...records[recordIndex],
      marks: Number(req.body.marks)
    };

    saveAcademicRecords(records);

    res.json({
      message: "Academic record updated",
      record: records[recordIndex]
    });
  }
);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});