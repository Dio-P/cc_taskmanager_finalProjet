import React, { useState, useEffect } from 'react';
import taskList from "./helpers/dummyTasksApi.json";
import WholeMainPageContainer from './containers/WholeMainPageContainer';
import DistinctTaskPage from './containers/DistinctTaskPage';
import {
  Route,
  Routes,
  Outlet,
  useNavigate
} from "react-router-dom";


import './App.css';

function App() {
  const [allTasks, setAllTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(null);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);


    useEffect(() => {
      // the api call that will get the initial data
      setAllTasks(taskList)
    }, []);

    useEffect(() => {
      // setting the comleted and unclompleted tasks 
      // in different states.
      if(allTasks){
      console.log("allTasks", allTasks);////////////
      let completedHelper = [];
      let uncompletedHelper = [];
      
        for(let task of allTasks){
          if(task.completed){
            completedHelper.push(task);

          }else{
            uncompletedHelper.push(task);

          }
        }
        setCompletedTasks(completedHelper);
        setUncompletedTasks(uncompletedHelper);
      }
      
    }, [allTasks]);

  return (
    <Routes>
      <Route path="/" element={<WholeMainPageContainer completedTasks={ completedTasks } uncompletedTasks={ uncompletedTasks }/>}/>
      <Route path="/task/:task_title" element={<DistinctTaskPage completedTasks={ completedTasks } uncompletedTasks={ uncompletedTasks }/>}/>
    </Routes>
  );
}

export default App;
