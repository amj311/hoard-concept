import React, {useState, useContext} from 'react';

import { authContext, globalContext } from '../App';
import api from '../core/api';

import './CategoryList.css';
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
    <div>
      <div className='category-list-header'>
        <h3>Categories</h3>
        <button className='create-category-button' onClick={() => setCreateCategory(!createCategory)}>{createCategory ? '✖' : '➕'}</button>
      </div>
      {createCategory &&
        <NewCategoryForm close={() => setCreateCategory(false)}/>
      }
      <div className='category-list'>
        {categories.map((category) => (
          <div className='category' key={category.id}>
            <button className='delete-category-button' onClick={()=>removeCategory(category.id)}>❌</button>
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
