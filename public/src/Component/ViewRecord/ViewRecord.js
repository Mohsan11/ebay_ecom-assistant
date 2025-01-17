import React, { useState, useEffect } from "react";
import "./viewrecord.css";
import DataTable from "react-data-table-component";
import EditRecord from "../EditRecord/EditRecord";

const ViewRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/fetch-record/")
      .then((response) => response.json())
      .then((data) => {
        // Ensure all records have an 'items' array to prevent undefined errors
        const processedData = data.map((record) => ({
          ...record,
          items: Array.isArray(record.items) ? record.items : [],
        }));
        setRecords(processedData);
        setFilteredData(processedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Update filtered data based on search
  const filterData = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = records.filter((item) =>
      item.name?.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  // Handle row selection
  const handleSelection = (state) => {
    setSelectedRecord(state.selectedRows[0] || null);
  };

  // Handle edit button click
  const handleEdit = (selectedRow) => {
    setSelectedRecord(selectedRow);
    setIsEditing(true);
  };

  // Save edited record
  const handleSaveEdit = (editedRecord) => {
    console.log("Saved Record:", editedRecord);
    setIsEditing(false);
  };

  // Cancel edit action
  const handleCancelEdit = () => {
    setSelectedRecord(null);
    setIsEditing(false);
  };

  // Define table columns
  const columns = [
    { name: "ID", selector: (row) => row._id || "N/A", sortable: true },
    { name: "Name", selector: (row) => row.name || "N/A", sortable: true },
    { name: "Listing Type", selector: (row) => row.listingType || "N/A", sortable: true },
    { name: "Value Percentage", selector: (row) => row.valuePercentage || "N/A", sortable: true },
    { name: "Cost Notes", selector: (row) => row.costNotes || "N/A", sortable: true },
    { name: "Price Method", selector: (row) => row.priceMethod || "N/A", sortable: true },
    { name: "Date Expense", selector: (row) => row.dateExpense || "N/A", sortable: true },
    { name: "Expense Type", selector: (row) => row.expenseType || "N/A", sortable: true },
    { name: "Expense Details", selector: (row) => row.expenseDetails || "N/A", sortable: true },
    { name: "Invoice Source", selector: (row) => row.invoiceSource || "N/A", sortable: true },
    { name: "Mileage", selector: (row) => row.mileage || "N/A", sortable: true },
    { name: "Mileage Notes", selector: (row) => row.mileageNotes || "N/A", sortable: true },
    { name: "Amount", selector: (row) => row.amount || "N/A", sortable: true },
    { name: "Price Notes", selector: (row) => row.priceNotes || "N/A", sortable: true },
    { name: "From Location", selector: (row) => row.fromLocation || "N/A", sortable: true },
    { name: "To Location", selector: (row) => row.toLocation || "N/A", sortable: true },

    // Items Column (handles missing or empty items properly)
    {
      name: "Items",
      cell: (row) =>
        row.items.length > 0 ? (
          <div style={{ maxHeight: "100px", overflowY: "auto" }}>
            <ul>
              {row.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name || "Unnamed Item"}</strong>: 
                  Cost - {item.cost || "N/A"}, 
                  Mileage - {item.mileage || "N/A"}, 
                  Notes - {item.notes || "N/A"}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <span style={{ color: "gray" }}>No items available</span>
        ),
    },
  ];

  return (
    <div className="Hero2">
      {!isEditing ? (
        <div>
          <div className="nav">
            <h2>Main Menu</h2>
          </div>
          <div className="actionContainer">
            <div className="actionBtn">
              <button
                className="btns"
                onClick={() => handleEdit(selectedRecord)}
                disabled={!selectedRecord}
              >
                Edit
              </button>
              <button className="btns">Delete</button>
              <input
                className="searchbox"
                type="text"
                placeholder="Enter item to search"
                onChange={filterData}
              />
              <div className="icon">
                <i className="fa fa-search fa-2x"></i>
              </div>
            </div>
          </div>

          <div className="table">
            {loading ? (
              <h1 className="loading">Loading...</h1>
            ) : (
              <DataTable
                columns={columns}
                data={filteredData.length > 0 ? filteredData : records}
                selectableRows
                onSelectedRowsChange={handleSelection}
                fixedHeader
                fixedHeaderScrollHeight="80vh"
                progressComponent={<h1>Loading...</h1>}
                defaultSortFieldId={1}
                pagination
                selectableRowsSingle
              />
            )}
          </div>
        </div>
      ) : (
        <EditRecord
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          selectedRecord={selectedRecord}
        />
      )}
    </div>
  );
};

export default ViewRecord;
