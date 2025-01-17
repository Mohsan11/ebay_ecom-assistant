import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Form1 from "./Forms/Form1";
import Form2 from "./Forms/Form2";
import "./react-tabs.css";
import { useNavigate, Link } from "react-router-dom";
const FormsHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    from: "",
    toLocation: [],
    Calculate_Milage: false,
    mileage: "",
    type: "",
    invoice: "",
    milageItems: [],
    items: [],
    recordNotes: "",
    formType: "",
  });
  // const [formData2, setFormData2] = useState({
  //   date: "",
  //   type: "",
  //   items: [],
  //   recordDetails: "",
  //   formType: "",
  // });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddItem = () => {
    setFormData({
      ...formData,
      milageItems: [
        ...formData.milageItems,
        { name: "", cost: 0, mileage: 0, notes: "" },
      ],
    });
  };
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.milageItems];
    updatedItems[index][field] = value;

    setFormData({
      ...formData,
      milageItems: updatedItems,
    });
  };
  // const handleInputChange2 = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData2,
  //     [name]: value,
  //   });
  // };
  const handleAddItem2 = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemDetail: "", value: 0, location: "" }],
    });
  };

  const handleItemChange2 = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };
  const handleCalculateMileage = () => {
    const data = {
      locations: [formData.from, ...formData.toLocation],
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

  const handleSave = () => {
    if (!formData.date || !formData.from) {
      showAlert("error", "Please fill out all required fields.");
      return;
    }
    console.log("Saved Data: ", formData);
    const data = {
      date: formData.date,
      from: formData.from,
      toLocation: formData.toLocation,
      Calculate_Milage: formData.Calculate_Milage,
      mileage: formData.mileage,
      type: formData.type,
      invoice: formData.invoice,
      milageItems: formData.milageItems,
      items: formData.items,
      recordNotes: formData.recordNotes,
      formType: formData.formType,
    };
    console.log("Data:", data);
    fetch(
      "http://localhost:5000/api/api/save-form",
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
    // console.log(formData2);
    console.log("Deleted");
  };
  return (
    <Tabs>
      <TabList>
        <Link className="backBtn" to="/">
          {"<-"}Back
        </Link>
        <Tab>Purchase with milage</Tab>
        <Tab>Purchase without milage</Tab>
      </TabList>

      <TabPanel>
        <Form1
          handleInputChange={handleInputChange}
          formData={formData}
          handleAddItem={handleAddItem}
          handleItemChange={handleItemChange}
          handleAddDestination={handleAddDestination}
          handleDestinationChange={handleDestinationChange}
          handleCalculateMileage={handleCalculateMileage}
          totalMileage={totalMileage}
          totalDuration={totalDuration}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          alert={alert}
        />
      </TabPanel>
      <TabPanel>
        <Form2
          handleInputChange={handleInputChange}
          formData={formData}
          handleAddItem2={handleAddItem2}
          handleItemChange2={handleItemChange2}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          alert={alert}
        />
      </TabPanel>
    </Tabs>
  );
};
export default FormsHome;
