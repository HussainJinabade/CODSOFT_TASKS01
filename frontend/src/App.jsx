import { useEffect, useState } from "react";

import Student from "./components/Student";
import Teacher from "./components/Teacher";
import Attendance from "./components/Attendance";
import Examination from "./components/Examination";
import Fees from "./components/Fees";
import AcademicRecords from "./components/AcademicRecords";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [pendingFees, setPendingFees] = useState(0);

  useEffect(() => {
    function updateDashboard() {
      // Students from backend
      fetch("http://localhost:5000/api/students")
        .then((response) => response.json())
        .then((students) => {
          setStudentCount(students.length);
        })
        .catch((error) => {
          console.log("Student count error:", error);
        });

      // Teachers from backend
      fetch("http://localhost:5000/api/teachers")
        .then((response) => response.json())
        .then((teachers) => {
          setTeacherCount(teachers.length);
        })
        .catch((error) => {
          console.log("Teacher count error:", error);
        });

      // Attendance from backend
      fetch("http://localhost:5000/api/attendance")
        .then((response) => response.json())
        .then((records) => {
          const present = records.filter(
            (record) => record.status === "Present"
          ).length;

          const total = records.length;

          if (total > 0) {
            setAttendance(
              Math.round((present / total) * 100)
            );
          } else {
            setAttendance(0);
          }
        })
        .catch((error) => {
          console.log("Attendance count error:", error);
        });

      // Pending Fees from backend
      fetch("http://localhost:5000/api/fees")
        .then((response) => response.json())
        .then((fees) => {
          const totalPending = fees.reduce(
            (total, fee) =>
              total + (fee.total - fee.paid),
            0
          );

          setPendingFees(totalPending);
        })
        .catch((error) => {
          console.log("Pending fees error:", error);
        });
    }

    // Initial dashboard update
    updateDashboard();

    // Update dashboard when data changes
    window.addEventListener(
      "studentsUpdated",
      updateDashboard
    );

    window.addEventListener(
      "teachersUpdated",
      updateDashboard
    );

    window.addEventListener(
      "attendanceUpdated",
      updateDashboard
    );

    window.addEventListener(
      "feesUpdated",
      updateDashboard
    );

    return () => {
      window.removeEventListener(
        "studentsUpdated",
        updateDashboard
      );

      window.removeEventListener(
        "teachersUpdated",
        updateDashboard
      );

      window.removeEventListener(
        "attendanceUpdated",
        updateDashboard
      );

      window.removeEventListener(
        "feesUpdated",
        updateDashboard
      );
    };
  }, []);

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            🎓
          </div>

          <div>
            <h2>EduManage</h2>
            <span>Admin Portal</span>
          </div>

        </div>

        <nav>

          <a
            href="#"
            className={
              activePage === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("dashboard")
            }
          >
            <span>▣</span>
            Dashboard
          </a>

          <a
            href="#students"
            className={
              activePage === "students"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("students")
            }
          >
            <span>👨‍🎓</span>
            Students
          </a>

          <a
            href="#teachers"
            className={
              activePage === "teachers"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("teachers")
            }
          >
            <span>👨‍🏫</span>
            Teachers
          </a>

          <a
            href="#attendance"
            className={
              activePage === "attendance"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("attendance")
            }
          >
            <span>✓</span>
            Attendance
          </a>

          <a
            href="#examinations"
            className={
              activePage === "examinations"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("examinations")
            }
          >
            <span>📝</span>
            Examinations
          </a>

          <a
            href="#fees"
            className={
              activePage === "fees"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("fees")
            }
          >
            <span>💳</span>
            Fees
          </a>

          <a
            href="#academic-records"
            className={
              activePage === "academic-records"
                ? "active"
                : ""
            }
            onClick={() =>
              setActivePage("academic-records")
            }
          >
            <span>📚</span>
            Academic Records
          </a>

        </nav>

      </aside>

      <main className="main-content">

        <header className="topbar">

          <div>

            <p className="page-label">
              OVERVIEW
            </p>

            <h1>Dashboard</h1>

            <p className="subtitle">
              Welcome back! Here's what's
              happening today.
            </p>

          </div>

        </header>

        <section className="dashboard-cards">

          <div className="card blue-card">

            <div className="card-top">

              <div className="card-icon">
                👨‍🎓
              </div>

              <span className="growth">
                +12%
              </span>

            </div>

            <h3>Total Students</h3>

            <p>{studentCount}</p>

            <span className="card-bottom">
              Compared to last month
            </span>

          </div>

          <div className="card purple-card">

            <div className="card-top">

              <div className="card-icon">
                👨‍🏫
              </div>

              <span className="growth">
                +5%
              </span>

            </div>

            <h3>Total Teachers</h3>

            <p>{teacherCount}</p>

            <span className="card-bottom">
              Active teaching staff
            </span>

          </div>

          <div className="card green-card">

            <div className="card-top">

              <div className="card-icon">
                ✓
              </div>

              <span className="growth">
                +3%
              </span>

            </div>

            <h3>Attendance</h3>

            <p>{attendance}%</p>

            <span className="card-bottom">
              Average attendance
            </span>

          </div>

          <div className="card orange-card">

            <div className="card-top">

              <div className="card-icon">
                ₹
              </div>

              <span className="pending">
                Pending
              </span>

            </div>

            <h3>Pending Fees</h3>

            <p>
              ₹
              {pendingFees.toLocaleString(
                "en-IN"
              )}
            </p>

            <span className="card-bottom">
              Fees to be collected
            </span>

          </div>

        </section>

        <section
          className="activity-section"
          id="activity"
        >

          <div className="section-heading">

            <div>

              <h2>Recent Activity</h2>

              <p>
                Latest updates from your
                institution
              </p>

            </div>

            <a
              href="#activity"
              className="view-all"
            >
              View All
            </a>

          </div>

          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-icon blue">
                👨‍🎓
              </div>

              <div>

                <strong>
                  New student record added
                </strong>

                <p>
                  Rahul was added to the
                  student list
                </p>

              </div>

              <span>10 min ago</span>

            </div>

            <div className="activity-item">

              <div className="activity-icon green">
                ₹
              </div>

              <div>

                <strong>
                  Fee payment received
                </strong>

                <p>
                  Ayesha paid ₹20,000
                  towards fees
                </p>

              </div>

              <span>1 hour ago</span>

            </div>

            <div className="activity-item">

              <div className="activity-icon purple">
                ✓
              </div>

              <div>

                <strong>
                  Attendance updated
                </strong>

                <p>
                  BCA attendance was
                  updated
                </p>

              </div>

              <span>2 hours ago</span>

            </div>

            <div className="activity-item">

              <div className="activity-icon orange">
                📝
              </div>

              <div>

                <strong>
                  Examination scheduled
                </strong>

                <p>
                  Web Development
                  examination was added
                </p>

              </div>

              <span>Today</span>

            </div>

          </div>

        </section>

        <section className="welcome">

          <div>

            <p className="welcome-label">
              EDUMANAGE
            </p>

            <h2>
              Manage your institution
              <br />
              <span>
                smarter and easier.
              </span>
            </h2>

            <p>
              Manage students, teachers,
              attendance, examinations,
              fees and academic records
              from one simple dashboard.
            </p>

          </div>

          <div className="welcome-icon">
            🎓
          </div>

        </section>

        <Student />

        <Teacher />

        <Attendance />

        <Examination />

        <Fees />

        <AcademicRecords />

      </main>

    </div>
  );
}

export default App;