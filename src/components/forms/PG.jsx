import React, { useState, useEffect } from "react";
import { ref, set, push, remove, onValue, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../../firebase";
import "./PG.css";
import SingleServiceLayout from "../SingleServiceLayout/SingleServiceLayout";
import { Form } from "react-router-dom";

const PGForm = () => {
  const [formState, setFormState] = useState({
    id: "", // Add id field for editing
    name: "",
    address: "",
    location: "",
    contact: "",
    description: "",
    priority: "",
    type: "",
    imageFile: null,
    images: "",
  });
  const [pgData, setPgData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const dataRef = ref(database, "pg");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setPgData(data);
    });

    return () => unsubscribe();
  }, []);

  const locationTypeMapping = {
    "Karol Bagh": "kb",
    "Rajinder Nagar": "rj",
    "Patel Nagar": "pn",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "location" && { type: locationTypeMapping[value] || "" }), // Update type based on location
    }));
  };

  const handleImageChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      imageFile: e.target.files[0],
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return "";
    try {
      const imageRef = storageRef(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Error uploading image.");
      return "";
    }
  };

  const handleEdit = (key) => {
    const item = pgData[key];
    setFormState({
      id: key,
      name: item.name,
      address: item.address,
      location: item.location,
      contact: item.contact,
      type: item.type,
      description: item.description,
      images: item.images, // Adjusted for image URL
      priority: item.priority,
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormState({
      id: "",
      name: "",
      address: "",
      location: "",
      contact: "",
      type: "",
      description: "",
      images: "",
      priority: "",
      imageFile: null, // Reset image file
    });
    setIsEditing(false);
  };

  const getNextId = async () => {
    try {
      const snapshot = await get(ref(database, "pg"));
      const data = snapshot.val() || {};
      const ids = Object.keys(data)
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id));
      const maxId = Math.max(...ids, 0);
      return maxId + 1;
    } catch (err) {
      console.error("Error getting next ID:", err);
      setError("Error getting next ID.");
      return null;
    }
  };

  const handleSubmit = async () => {
    const {
      id,
      name,
      address,
      location,
      contact,
      type,
      description,
      imageFile,
    } = formState;

    setLoading(true);

    try {
      const imageURL = imageFile
        ? await handleImageUpload(imageFile)
        : formState.images;

      if (isEditing && id) {
        // Update existing entry
        await set(ref(database, `pg/${id}`), {
          name,
          address,
          location,
          type,
          description,
          images: imageURL,
          contact,
          priority: formState.priority,
        });
      } else {
        // Add new entry with incremented ID
        const newId = await getNextId();
        if (newId !== null) {
          await set(ref(database, `pg/${newId}`), {
            name,
            address,
            location,
            type,
            description,
            images: imageURL,
            contact,
            priority: formState.priority,
          });
          setFormState((prevState) => ({ ...prevState, id: newId }));
        }
      }
      resetForm();
      setError("");
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Error saving data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await remove(ref(database, `pg/${key}`));
        alert("Record deleted successfully.");
      } catch (err) {
        console.error("Error deleting record:", err);
        setError("Error deleting record.");
      }
    }
  };

  return (
    <div className="dashboard">
      <p className="form_heading">PGs & Apartments</p>
      <p className="description">
        All details directly comes to the form in the left side when you click
        "Edit Button".
      </p>

      <div className="form_services">
        <div className="add_pg">
          <div className="form_contents">
            <p>Add & Edit services in ORN</p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formState.name}
              onChange={handleInputChange}
            />

            <select
              name="location"
              className="location_select"
              value={formState.location}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                Select a location
              </option>
              <option value="Karol Bagh">Karol Bagh</option>
              <option value="Rajinder Nagar">Rajinder Nagar</option>
              <option value="Patel Nagar">Patel Nagar</option>
            </select>

            <input
              type="text"
              name="contact"
              placeholder="Phone number"
              value={formState.contact}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formState.address}
              onChange={handleInputChange}
            ></textarea>

            <textarea
              name="description"
              placeholder="Description"
              value={formState.description}
              onChange={handleInputChange}
            />

            <input
              type="file"
              placeholder="Image of Location"
              onChange={handleImageChange}
            />

            <div className="add_pg_btn">
              <button
                className="pg_btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : isEditing ? "Update" : "Add"}
              </button>
              <button className="pg_btn" onClick={resetForm}>
                Cancel
              </button>
            </div>

            {error && <p className="error">{error}</p>}
          </div>
        </div>

        <div className="remove_pg">
          {Object.keys(pgData)
            .reverse()
            .map((id) => (
              <SingleServiceLayout
                id={id}
                serviceData={pgData[id]}
                handleEdit={handleEdit}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PGForm;
