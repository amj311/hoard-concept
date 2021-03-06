import React, {useState, useContext} from 'react';

import { authContext, globalContext } from '../App';
import api from '../core/api';

import './CategoryList.css';
import '../global.css';
import NewCategoryForm from './NewCategoryForm';

const CategoryList = () => {
  const {userID} = useContext(authContext);
  const {categories, setCategories} = useContext(globalContext);
  const [createCategory, setCreateCategory] = useState(false);

  const removeCategory = async (id) => {
    try {
      await api.deleteCategory(id);
      const categories = await api.getCategories(userID);
      setCategories(categories);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div id="category">
      <div className='header-with-button'>
        <h2>Categories</h2>
        <button className='hoard-button button-in-header' onClick={() => setCreateCategory(!createCategory)}>{createCategory ? '×' : '+'}</button>
      </div>
      {createCategory &&
        <NewCategoryForm close={() => setCreateCategory(false)}/>
      }
      <div className='category-list'>
        {categories.map((category) => (
          <div className='category' key={category.id}>
            <div className='category-name'>
              {category.name}
            </div>
            <div className='category-balance'>${(category.balance / 100).toLocaleString('en-US')}</div>
            <button id="categoryDeleteButton" className='delete-button' onClick={()=>removeCategory(category.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
