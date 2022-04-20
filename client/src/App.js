import React, { useState, useEffect } from 'react';
import taskList from "./helpers/dummyTasksApi.json";
import WholeMainPageContainer from './containers/WholeMainPageContainer';
import DistinctTaskPage from './containers/DistinctTaskPage';
import AddNewTaskPage from './containers/AddNewTaskPage';
import {
  Route,
  Routes
} from "react-router-dom";


import './App.css';

function App() {
  const [allTasks, setAllTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);


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

    useEffect(() => {
      // get the categories from api
      const dummyCategoriesList = ["studieng", "playing", "making something beautiful", "get bored", "play tetris"]
      console.log("categories must have been gotten");
      setCategories(dummyCategoriesList)
      
    }, [allTasks]);

    useEffect(() => {
      // get the categories from api
      const dummyPrioritiesList = ["low", "medium", "high"]
      console.log("Priorities must have been gotten");
      setPriorities(dummyPrioritiesList)
      
    }, [allTasks]);

    

  return (
    <Routes>
      <Route path="/" element={<WholeMainPageContainer 
      uncompletedTasks={ uncompletedTasks } 
      completedTasks={ completedTasks } 
      categories={ categories }
      priorities={ priorities }
      />}/>
      
      <Route path="/task/:task_title" element={ <DistinctTaskPage/> }/>
      <Route path="/task/createNewTask" element={ <AddNewTaskPage/> }/>
    </Routes>
  );
}

export default App;
