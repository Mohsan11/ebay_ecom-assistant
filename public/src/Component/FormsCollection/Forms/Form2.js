import React from "react";
import AddItem2 from "../../CreateRecord/AddItem2";
const Form2 = ({
  handleInputChange,
  formData,
  handleAddItem2,
  handleItemChange2,
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

      <AddItem2
        handleAddItem2={handleAddItem2}
        handleItemChange2={handleItemChange2}
        formData={formData}
        mileage={formData.mileage}
      />

      <div className="form-group">
        <label>Record Notes</label>
        <input
          type="text"
          name="recordNotes"
          placeholder="Enter Record Notes/ Details."
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
          value={(formData.formType = "Calculated without milage")}
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

export default Form2;
