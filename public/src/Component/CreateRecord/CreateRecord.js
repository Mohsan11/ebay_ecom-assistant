import React, { useState } from "react";
import "./createRecord.css";
import { useNavigate } from "react-router-dom";
import AddItem from "./AddItem";
const CreateRecord = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    listingType: "Select",
    valuePercentage: "",
    costNotes: "",
    priceMethod: "Select",
    dateExpense: "",
    expenseType: "",
    expenseDetails: "",
    invoiceSource: "",
    mileage: "",
    mileageNotes: "",
    amount: "",
    priceNotes: "",
    fromLocation: "",
    toLocation: [],
    items: [],
    purpose: "Select",
    Calculate_Milage: false,
    Total_Milage: "",
    milageItems: [], 
  });
  

  const [totalMileage, setTotalMileage] = useState(null);
  const [totalDuration, settotalDuration] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (type, messages) => {
    setAlert({ type, messages });

    // Automatically hide the alert after 5 seconds (adjust as needed)
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleCalculateMileage = () => {
    const data = {
      locations: [formData.fromLocation, ...formData.toLocation],
      // locations: ["London", "Manchester", "Birmingham", "Stoke-on-Trent"],
    };
    fetch(
      "http://localhost:5000/api/calculate-milage/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const { totalDistance, totalDuration } = data;
        setTotalMileage(totalDistance);
        settotalDuration(totalDuration);
        setFormData({
          ...formData,
          mileage: totalDistance.toFixed(2),
        });
        console.log("Total Mileage Calculated: ", totalDistance);
        console.log("Total Duration Calculated: ", totalDuration);
      })
      .catch((error) => {
        console.error("Error while calculating mileage:", error);
      });
  };

  const handleSave = () => {
    console.log("Saved Data: ", formData);
    const data = {
      name: formData.name,
      listingType: formData.listingType,
      valuePercentage: formData.valuePercentage,
      costNotes: formData.costNotes,
      priceMethod: formData.priceMethod,
      dateExpense: formData.dateExpense,
      expenseType: formData.expenseType,
      expenseDetails: formData.expenseDetails,
      invoiceSource: formData.invoiceSource,
      mileage: formData.mileage,
      mileageNotes: formData.mileageNotes,
      amount: formData.amount,
      priceNotes: formData.priceNotes,
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      purpose: formData.purpose,
      items: formData.items,
    };
    console.log("Data:", data);
    fetch(
      "http://localhost:5000/api/create-record/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log("Server Response Status:", response.status);
        if (response.ok || (response.status >= 200 && response.status <= 300)) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        showAlert("success", "Record saved successfully.");
        console.log("Record Saved Successfully.", data);
      })
      .catch((errors) => {
        showAlert("error", "Error while saving record.");
        console.log("Error while saving record:", errors);
      });
  };

  const handleCancel = () => {
    navigate("/");
    console.log("Cancelled");
  };

  const handleDelete = () => {
    console.log(formData);
    console.log("Deleted");
  };
  //Add Destination button
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddDestination = () => {
    setFormData({
      ...formData,
      toLocation: [...formData.toLocation, ""],
    });
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...formData.toLocation];
    updatedDestinations[index] = value;

    setFormData({
      ...formData,
      toLocation: updatedDestinations,
    });
  };
  //Add Item button
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", cost: 0, mileage: 0, notes: "" }],
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  return (
    <div className="create-record-container">
      <nav>
        <h1>Create Record</h1>
      </nav>
      <section>
        <h1 className="recordHeadings">Item Record Log</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Listing Type</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleInputChange}
          >
            <option value="Select">Select</option>
            <option value="Normal Bin">Normal Bin</option>
            <option value="Multi BIN LEGO Boxes">Multi BIN LEGO Boxes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Value Percentage</label>
          <input
            type="number"
            name="valuePercentage"
            placeholder="Enter Percentage"
            required
            value={formData.valuePercentage}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Cost Notes</label>
          <textarea
            name="costNotes"
            rows={5}
            cols={20}
            placeholder="Enter Notes"
            required
            value={formData.costNotes}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Price Calculation Method</label>
          <select
            name="priceMethod"
            value={formData.priceMethod}
            onChange={handleInputChange}
          >
            <option value="Select">Select</option>
            <option value="Direct">Direct</option>
            <option value="Value Based">Value Based</option>
            <option value="Divide">Divide</option>
            <option value="Pool">Pool</option>
          </select>
        </div>
        <AddItem
          handleAddItem={handleAddItem}
          handleItemChange={handleItemChange}
          formData={formData}
          mileage={formData.mileage}
        />
        <h1 className="recordHeadings">Expense Log</h1>
        <div className="form-group">
          <label>Date (Expense)</label>
          <input
            type="date"
            name="dateExpense"
            required
            value={formData.dateExpense}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            name="expenseType"
            placeholder="Enter Expense Type"
            required
            value={formData.expenseType}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Expense Details</label>
          <textarea
            name="expenseDetails"
            rows={5}
            cols={20}
            placeholder="Enter Expense Details"
            required
            value={formData.expenseDetails}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Invoice (Source Location, Link) </label>
          <input
            type="text"
            name="invoiceSource"
            placeholder="Enter Source Location"
            required
            value={formData.invoiceSource}
            onChange={handleInputChange}
          />
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
          <label>Milage Notes</label>
          <input
            type="text"
            name="mileageNotes"
            placeholder="Enter Milage Notes"
            required
            value={formData.mileageNotes}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            required
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            name="priceNotes"
            placeholder="Enter Price Notes"
            value={formData.priceNotes}
            onChange={handleInputChange}
          />
        </div>
        <h1 className="recordHeadings">Milage Log</h1>
        <div className="form-group">
          <label>From (Location)</label>
          <input
            type="text"
            name="fromLocation"
            placeholder="Enter Location"
            required
            value={formData.fromLocation}
            onChange={handleInputChange}
          />
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
          <label>Purpose</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
          >
            <option value="Select">Select</option>
            <option value="Sell">Sell</option>
            <option value="Purchase">Purchase</option>
          </select>
        </div>
        {/* Display alert */}
        {alert && (
          <div
            style={{
              color: alert.type === "success" ? "green" : "red",
              fontWeight: "600",
            }}
            className={`alert ${
              alert.type === "success" ? "success" : "error"
            }`}
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
      </section>
    </div>
  );
};

export default CreateRecord;
