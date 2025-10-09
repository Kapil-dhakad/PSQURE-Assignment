import React from "react";

const TripTable = ({ trips }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h3>Trip Management</h3>
        <button>+ Add Trip</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Total Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.route}</td>
              <td>{trip.departure}</td>
              <td>{trip.arrival}</td>
              <td>${trip.price.toFixed(2)}</td>
              <td>{trip.seats}</td>
              <td>
                <button className="action edit">✏️</button>
                <button className="action delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripTable;
