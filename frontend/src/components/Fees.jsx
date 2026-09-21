import { useEffect, useState } from "react";

function Fees() {
  const [fees, setFees] = useState([]);

  // Get fees from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/fees")
      .then((response) => response.json())
      .then((data) => {
        setFees(data);
      })
      .catch((error) => {
        console.log(
          "Backend connection error:",
          error
        );
      });
  }, []);

  // Update paid amount
  function updatePaid(id) {
    const fee = fees.find(
      (item) => item.id === id
    );

    const amount = prompt(
      "Enter paid amount:",
      fee.paid
    );

    if (amount === null) {
      return;
    }

    fetch(`http://localhost:5000/api/fees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fee.name,
        course: fee.course,
        total: fee.total,
        paid: Number(amount),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFees(
          fees.map((item) =>
            item.id === id
              ? data.fee
              : item
          )
        );

        window.dispatchEvent(
          new Event("feesUpdated")
        );
      })
      .catch((error) => {
        console.log(
          "Error updating fee:",
          error
        );
      });
  }

  return (
    <div
      className="students-section"
      id="fees"
    >
      <div className="students-header">
        <div>
          <h2>Fees</h2>
          <p>Manage student fee details</p>
        </div>
      </div>

      {fees.length === 0 ? (
        <p>No fee records found.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.name}</td>

                <td>{fee.course}</td>

                <td>₹{fee.total}</td>

                <td>₹{fee.paid}</td>

                <td>
                  {fee.paid >= fee.total
                    ? "Paid"
                    : "Pending"}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() =>
                      updatePaid(fee.id)
                    }
                  >
                    Update
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

export default Fees;