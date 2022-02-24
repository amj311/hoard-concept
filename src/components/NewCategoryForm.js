import React, {useState, useContext} from 'react';

import { authContext, globalContext } from '../App';
import api from '../core/api';

const NewCategoryForm = (props) => {
  const {userID} = useContext(authContext);
  const {setCategories} = useContext(globalContext);
  const [name, setName] = useState("");

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
      await api.addCategory(userID, {name, currentBalance: 0});
      const categories = api.getCategories(userID);
      setCategories(categories);
    } catch (err) {
      alert(err);
    }

    reset();
    props.close();
  };

  return (
    <form onSubmit={createCategory}>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
      <br></br>
      <input type="submit" value="Create Category"></input>
    </form>
  )
};

export default NewCategoryForm;
