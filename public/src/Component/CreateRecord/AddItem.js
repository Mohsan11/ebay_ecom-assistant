import React from "react";

const AddItem = ({ handleAddItem, handleItemChange, formData, mileage }) => {
  const calculateMileage = (cost) => {
    return cost !== 0 ? cost / mileage : 0;
  };

  return (
    <div className="form-group">
      <h1>Items</h1>
      {formData.milageItems.map((item, index) => (
        <div key={index}>
          <label>Name</label>
          <input
            type="text"
            name={`items[${index}].name`}
            placeholder={`Enter Item ${index + 1}`}
            required
            value={item.name}
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
          />

          <label>Cost</label>
          <input
            type="number"
            name={`items[${index}].cost`}
            placeholder={`Enter Cost for Item ${index + 1}`}
            value={item.cost}
            onChange={(e) =>
              handleItemChange(index, "cost", parseFloat(e.target.value))
            }
          />

          <label>Mileage</label>
          <p>{calculateMileage(item.cost, item.mileage)} miles per dollar</p>

          <label>Item Notes</label>
          <textarea
            name={`items[${index}].notes`}
            placeholder={`Enter Notes for Item ${index + 1}`}
            value={item.notes}
            onChange={(e) => handleItemChange(index, "notes", e.target.value)}
          />
        </div>
      ))}

      <button className="add-item-button" onClick={handleAddItem}>
        + Add Item
      </button>
    </div>
  );
};

export default AddItem;
