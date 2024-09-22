import React from "react";
import "./SingleServiceLayout.css";
import { ref, remove } from "firebase/database";
import { database } from "../../firebase";

const SingleServiceLayout = ({ id, serviceData, handleEdit }) => {
  const handleDelete = async (key) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await remove(ref(database, `pg/${key}`));
        alert("Record deleted successfully.");
      } catch (err) {
        console.error("Error deleting record:", err);
      }
    }
  };

  return (
    <div className="singleServ">
      <img className="servImg" src={serviceData.images} alt="RoomImage" />
      <p className="servTitle">{serviceData.name}</p>
      <p className="servAddressPg">{serviceData.address}</p>
      <p className="servDescPg">{serviceData.description}</p>
      <div className="layoutBtns">
        <button id="editBtn" onClick={() => handleEdit(id)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button id="deleteBtn" onClick={() => handleDelete(id)}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

{
  /* <div className="singleLayout">
<img src={serviceData.images} alt="img" />
<div className="serviceDesc">
  <h3>{serviceData.name}</h3>
  <p>Location</p>
</div>
<div className="layoutBtns">
  <button className="edit-button" onClick={() => handleEdit(id)}>
    <i className="fa-solid fa-pen-to-square"></i>
  </button>
  <button className="delete-button" onClick={() => handleDelete(id)}>
    <i class="fa-solid fa-trash"></i>
  </button>
</div>
</div> */
}

export default SingleServiceLayout;
