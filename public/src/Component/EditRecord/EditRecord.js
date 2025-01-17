import React, { useEffect, useState } from "react";

const EditRecord = ({ onSave, onCancel, selectedRecord }) => {
  const [editedRecord, setEditedRecord] = useState({ ...selectedRecord });

  useEffect(() => {
    setEditedRecord({ ...selectedRecord });
  }, [selectedRecord]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
    console.log(editedRecord);
  };

  return (
    <div className="create-record-container">
      <div className="edit-record-container">
        <nav>
          <h1>Edit Record</h1>
        </nav>
        {Object.keys(editedRecord).map((key) => (
          <div key={key} className="form-group">
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={editedRecord[key]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <div className="action-buttons">
          <button className="save-button" onClick={() => onSave(editedRecord)}>
            Save
          </button>
          <button className="delete-button">Delete</button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecord;
