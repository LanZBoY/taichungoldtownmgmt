import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './Page/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import TaskListPage from './Page/TaskListPage';
import LoginPage from './Page/LoginPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/tasklist' element={<TaskListPage/>}/>
    </Routes>
  </BrowserRouter>
);
