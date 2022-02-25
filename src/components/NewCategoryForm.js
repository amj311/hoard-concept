import React, {useState, useContext} from 'react';

import { authContext, globalContext } from '../App';
import api from '../core/api';

const NewCategoryForm = (props) => {
  const {userID} = useContext(authContext);
  const {setCategories} = useContext(globalContext);
  const [name, setName] = useState("");
  const [startingBalance, setStartingBalance] = useState(0);

  const reset = () => {
    setName("");
  };

  const createCategory = async (event) => {
    event.preventDefault();
    if (name === "") {
      alert('Please provide a category name.');
      return;
    }

    try {
      await api.addCategory(userID, {name, currentBalance: startingBalance});
      const categories = await api.getCategories(userID);
      setCategories(categories);
    } catch (err) {
      alert(err);
    }

    reset();
    props.close();
  };

  return (
    <form className="create-category-container" onSubmit={createCategory}>
      <label htmlFor='name'>Name: </label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
      <br />
      <label htmlFor='startingBalance'>Starting balance: </label>
      <input id="startingBalance" type="number" step={0.01} min="0" value={startingBalance / 100} onChange={(event) => setStartingBalance(event.target.valueAsNumber * 100)} ></input>
      <br />
      <input type="submit" className="hoardButton" id="createCatergoryButton" value="Create Category"></input>
    </form>
  )
};

export default NewCategoryForm;
