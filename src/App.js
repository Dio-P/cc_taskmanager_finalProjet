import React, { useState, useEffect } from 'react';
import taskList from "./helpers/dummyTasksApi.json";
import WholeMainPageContainer from './containers/WholeMainPageContainer';


import './App.css';

function App() {
  const [allTasks, setAllTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(null);
  const [uncompletedTasks, setUncompletedTasks] = useState(null);


    useEffect(() => {
      // the api call that will get the initial data
      setAllTasks(taskList)
    }, []);

    useEffect(() => {
      // setting the comleted and unclompleted tasks 
      // in different states.
      console.log("allTasks", allTasks);////////////
      let completedHelper = [];
      let uncompletedHelper = [];
      if(allTasks){
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
    <WholeMainPageContainer completedTasks={ completedTasks } uncompletedTasks={ uncompletedTasks }/>
  );
}

export default App;
