import React from "react";

const AddItem2 = ({ handleAddItem2, handleItemChange2, formData }) => {
  return (
    <div className="form-group">
      <h1>Items</h1>
      {formData.items.map((item, index) => (
        <div key={index}>
          <label>Item Details</label>
          <textarea
            name={`items[${index}].itemDetail`}
            placeholder={`Enter details for Item ${index + 1}`}
            value={item.itemDetail}
            onChange={(e) =>
              handleItemChange2(index, "itemDetail", e.target.value)
            }
          />

          <label>Location</label>
          <input
            type="text"
            name={`items[${index}].location`}
            placeholder={`Enter Item location (PostCode) for item ${index + 1}`}
            required
            value={item.location}
            onChange={(e) =>
              handleItemChange2(index, "location", e.target.value)
            }
          />

          <label>Cost (Value)</label>
          <input
            type="number"
            name={`items[${index}].value`}
            placeholder={`Enter value for Item ${index + 1}`}
            value={item.cost}
            onChange={(e) =>
              handleItemChange2(index, "value", parseFloat(e.target.value))
            }
          />
        </div>
      ))}

      <button className="add-item-button" onClick={handleAddItem2}>
        + Add Item
      </button>
    </div>
  );
};

export default AddItem2;
