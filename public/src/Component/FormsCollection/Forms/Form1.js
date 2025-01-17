import React from "react";
import AddItem from "../../CreateRecord/AddItem";
const Form1 = ({
  handleInputChange,
  formData,
  handleAddItem,
  handleItemChange,
  handleAddDestination,
  handleDestinationChange,
  handleCalculateMileage,
  totalMileage,
  totalDuration,
  handleSave,
  handleDelete,
  handleCancel,
  alert,
}) => {
  return (
    <div className="create-record-container">
      <h1 className="recordHeadings">Item Record Log</h1>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>From</label>
        <input
          name="from"
          value={formData.from}
          onChange={handleInputChange}
          placeholder="Enter Location"
        ></input>
      </div>
      <div className="form-group">
        <label>To</label>
        {formData.toLocation.map((destination, index) => (
          <div key={index}>
            <input
              type="text"
              name={`toLocation[${index}]`}
              placeholder={`Enter Destination ${index + 1}`}
              required
              value={destination}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          className="add-destination-button"
          onClick={handleAddDestination}
        >
          + Add Destination
        </button>
        <button
          style={{ padding_left: "5px" }}
          name="fromLocation"
          placeholder="Enter Location"
          required
          onClick={handleCalculateMileage}
        >
          Calculate Milage
        </button>
        {totalMileage !== null && (
          <div className="total-mileage">
            <h3> Total Mileage: {totalMileage.toFixed(2)}</h3>
            <h3>Total Duration: {totalDuration.toFixed(2)} secounds</h3>
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Milage </label>
        <input
          type="number"
          name="mileage"
          placeholder="Enter milage (if applicable and reduced if multiple collections) (round trip)"
          required
          value={formData.mileage}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <input
          type="text"
          name="type"
          placeholder=" Fb/Ebay etc."
          required
          value={formData.type}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Invoice</label>
        <input
          type="text"
          name="invoice"
          placeholder="Enter location/url/ notes."
          required
          value={formData.invoice}
          onChange={handleInputChange}
        />
      </div>
      <AddItem
        handleAddItem={handleAddItem}
        handleItemChange={handleItemChange}
        formData={formData}
        mileage={formData.mileage}
      />

      <div className="form-group">
        <label>Record Notes</label>
        <input
          type="text"
          name="recordNotes"
          placeholder="Enter Record Notes"
          required
          value={formData.recordNotes}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Form Type</label>
        <input
          type="text"
          name="formType"
          required
          value={(formData.formType = "Calculated with milage")}
          onChange={handleInputChange}
        />
      </div>
      {alert && (
        <div
          style={{
            color: alert.type === "success" ? "green" : "red",
            fontWeight: "600",
          }}
          className={`alert ${alert.type === "success" ? "success" : "error"}`}
        >
          {alert.messages}
        </div>
      )}
      <div className="action-buttons">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Form1;
