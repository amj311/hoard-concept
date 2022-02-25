import React, {useState, useContext} from 'react';

import { globalContext } from '../App';
import { Category } from '../core/models';
import idGenerator from '../util/idGenerator';

const NewCategoryForm = (props) => {
  const [categories, setCategories] = useContext(globalContext).categories;
  const [name, setName] = useState("");

  const reset = () => {
    setName("");
  };

  const createCategory = (event) => {
    event.preventDefault();
    if (name === "") {
      alert('Please provide a category name.');
      return;
    }

    const id = idGenerator();
    const newCategory = new Category(id, name);
    setCategories(categories.concat([newCategory]));

    reset();
    props.close();
  };

  return (
    <form class="create-category-container" onSubmit={createCategory}>
      <label htmlFor="name">Name: </label>
      <input placeholder="category name" type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
      <input type="submit" class="hoardButton" id="createCatergoryButton" value="Create Category"></input>
    </form>
  )
};

export default NewCategoryForm;
