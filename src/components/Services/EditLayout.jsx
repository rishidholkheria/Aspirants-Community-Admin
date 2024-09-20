import React, { useState } from 'react';
import { ref, update } from 'firebase/database';
import { database } from '../../firebase';
import "./EditLayout.css";

const EditLayout = (props) => {
  const [newPriority, setNewPriority] = useState("");

  const applyEdit = async () => {
    try {
      const dbRef = ref(database, `${props.type}/${props.id}`);
      await update(dbRef, { priority: newPriority });
      console.log('Priority updated successfully');
      setNewPriority("");
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  return (
    <div className="deleteLayout">
      <p className="dlName">{props.sno}. {props.name}</p>
      <input
        type="number"
        placeholder="Priority"
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
      />
      <button onClick={applyEdit}>Apply</button>
    </div>
  );
};

export default EditLayout;
