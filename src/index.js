import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './Page/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import TaskListPage from './Page/TaskListPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/tasklist' element={<TaskListPage/>}/>
    </Routes>
  </BrowserRouter>
);
