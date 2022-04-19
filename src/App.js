import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [allTasks, setAllTasks] = useState(null);
  const [completedTask, setCompletedTasks] = useState(null);
  const [uncompletedTasks, setUncompletedTasks] = useState(null);


    useEffect(() => {
      // the api call that will get the initial data
      // setAllTasks()
    }, []);

    useEffect(() => {
      // setting the comleted and unclompleted tasks 
      // in different states.
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
    <div>
      
    </div>
  );
}

export default App;
