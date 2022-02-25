import React, {useState, useContext} from 'react';

import { globalContext } from '../App';

import './CategoryList.css';
import NewCategoryForm from './NewCategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useContext(globalContext).categories;
  const [createCategory, setCreateCategory] = useState(false);

  const removeCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div id="category">
      <div>
        <h3 className='category-list-header' >Categories</h3>
        <div class="categoryButtonContainer">
          <button className='hoardButton' onClick={() => setCreateCategory(!createCategory)}>{createCategory ? '×' : '+'}</button>
        </div>
      </div>
      {createCategory &&
        <NewCategoryForm close={() => setCreateCategory(false)}/>
      }
      <div className='category-list'>
        {categories.map((category) => (
          <div className='category' key={category.id}>
            <button id="categoryDeleteButton" className='deleteButton' onClick={()=>removeCategory(category.id)}>×</button>
            <div className='category-name'>
              {category.displayName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
