import React, { useState, useEffect } from 'react';
import WholeMainPageContainer from './containers/WholeMainPageContainer';
import DistinctTaskPage from './containers/DistinctTaskPage';
import AddNewTaskPage from './containers/AddNewTaskPage';
import {
  Route,
  Routes
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import configData from "./config.json";
import { createRequestHelper } from './helpers/requestHelper';
import ProfilePage from './containers/ProfilePage';
import GoalsPage from './containers/GoalsPage';
import DistinctGoalPage from './containers/DistinctGoalPage';
import AddNewGoalPage from './containers/AddNewGoalPage';
import CategoriesPage from './containers/CategoriesPage';
import DistinctCategoryPage from './containers/DistinctCategoryPage';
import AddNewCategoryPage from './containers/AddNewCategoryPage';


import './styles/App.css';
import RequestContext from './context/RequestContext';
import dummyGoals from "./helpers/dummyGoalApi.json"

function App() {

  const {
    isLoading,
    error,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState(null);
  const [allTasks, setAllTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [users, setUsers] = useState([]);
  const [goalTypesList, setGoalTypesList] = useState([]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [get, setGet] = useState();
  const [post, setPost] = useState();
  const [put, setPut] = useState();

  // const [fetchedTasks, setFetchedTasks] = useState([]);

  //   useEffect(() => {

  //   let test = new Date("2022-05-03".split("-").toString())
  //   console.log("test!!!!!!!!!!!!!!!", test);
  //   console.log("test.toLocaleDateString!!!!!!!!!!!!!!!", test.toLocaleDateString());

      
  // }, []);

    useEffect(() => {
      if(!isLoaded){
        return
      }
      const requestHelper = createRequestHelper(accessToken);
      // console.log(accessToken)///////
      setGet(()=> requestHelper.get);
      setPost(()=> requestHelper.post);
      setPut(()=> requestHelper.put);

    }, [accessToken]);

    useEffect(() => {
      const getAccessToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: configData.audience,
            scope: configData.scope,
          });
          setAccessToken(accessToken);
          setIsLoaded(true);
        } catch (e) {
          console.log(e.message);
        }
      };
      getAccessToken();
    }, [getAccessTokenSilently]);

    useEffect(() => {
      if (!isLoaded) {
        return;
      }

      const getTasks =  async (authId) => {
        get("tasks")
          .then(function (resJson) {
            setAllTasks(resJson);
          })
          .catch((e) => console.log(e));
        }
        getTasks();
        postUser();
        getCategories();
        getGoals();
        getUsers();
    }, [get, post, put]);

    const postUser = (payload) => {
      fetch('http://localhost:8080/auth0/users', {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        })
      })
      .then(res => res.json())
      .catch((e) => console.log(e));
  }

  const getCategories = () => {
    get("categories")
    .then(data=> (setCategories(data)))
  }

  const getGoals = () => {
    // console.log("goals called", dummyGoals);////////////
    // setGoals(dummyGoals)///////////Delete after getting it from api"
    get("goals")
    .then(data=> (setGoals(data)))
  }

  const getUsers = () => {
    get("users")
    .then(data=> (setUsers(data)))
  }

  const updateAppMainStateTasksFromComponent =(task) => {
    let allTasksUpdateHelper = allTasks.filter(taskInAll => taskInAll.id!==task.id);
    console.log("allTasksUpdateHelper", allTasksUpdateHelper);
    console.log("task", task);
    setAllTasks([...allTasksUpdateHelper, task]);

  } 

  const updateAppGoalsFromComponent =(goalToChange) => {
    let allIdInGoals = goals.map(goal=> goal.id);
    if(allIdInGoals.includes(goalToChange.id)){
      goals.filter(goal => {
        return goal.id!==goalToChange.id
      })
      setGoals([...goals, goalToChange]);

    }else{
      setGoals([...goals, goalToChange]);
    }
     
  }

  const updateAppMainStateCategoryFromComponent =(category) => {
    let allCategoriesUpdateHelper = categories.filter(categoryInAll => categoryInAll.id!==category.id);
    console.log("allCategoriesUpdateHelper", allCategoriesUpdateHelper);///////
    console.log("category", category);/////////
    setCategories([...allCategoriesUpdateHelper, category]);

  } 

    useEffect(() => {
      // setting the comleted and unclompleted tasks 
      // in different states.
      if(allTasks){
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

    // useEffect(() => {
    //   const dummyCategoriesList = ["studieng", "playing", "making something beautiful", "get bored", "play tetris"]
      
    // }, [allTasks, categories]);

    useEffect(() => {
      const prioritiesList = [ "LOW", "MEDIUM", "HIGH" ];
      setPriorities(prioritiesList);
      
    }, [allTasks]);

    useEffect(() => {
      const goalTypesList = [ "DAILY", "WEEKLY", "MONTHLY" ];
      setGoalTypesList(goalTypesList);
      
    }, [goals]);

    if (error) {
      return <div>Oops... {error.message}</div>;
    }
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return loginWithRedirect();
    }

    

  return (
    <RequestContext.Provider value={{get, post, put}}>
      <Routes>
        <Route path="/" element={<WholeMainPageContainer 
          uncompletedTasks={ uncompletedTasks } 
          completedTasks={ completedTasks } 
          categories={ categories }
          priorities={ priorities }
          user = { user }
          goals = { goals }
          goalTypesList ={ goalTypesList }
        />}/>
        <Route path="/task/:task_title" element={ <DistinctTaskPage
          categories={ categories }
          priorities={ priorities }
          goals = { goals }
          goalTypesList ={ goalTypesList }
          users= { users }
          updateWholeMainPageTasksFromComponent={(task)=>updateAppMainStateTasksFromComponent(task)}
        /> }/>
        <Route path="/task/createNewTask" element={ <AddNewTaskPage
          categories={ categories }
          priorities={ priorities }
          goals = { goals }
          goalTypesList ={ goalTypesList }
          users= { users }
          updateWholeMainPageTasksFromComponent={(task)=>updateAppMainStateTasksFromComponent(task)}

        /> }/>
        <Route path="/goals" element={ <GoalsPage
          categories={ categories }
          priorities={ priorities }
          goals = { goals }
          goalTypesList ={ goalTypesList }
          completedTasks={ completedTasks } 
        /> }/>
        <Route path="/goal/:goal_title" element={ <DistinctGoalPage
          categories={ categories }
          priorities={ priorities }
          goals = { goals }
          goalTypesList ={ goalTypesList }
          users= { users }
          updateAppMainStateFromComponent={ updateAppGoalsFromComponent }

        /> }/>
        <Route path="/goal/createNewGoal" element={ <AddNewGoalPage
          categories={ categories }
          priorities={ priorities }
          goals = { goals }
          goalTypesList ={ goalTypesList }
          updateAppMainStateFromComponent={ updateAppGoalsFromComponent }
        /> }/>
        <Route path="/categories" element={ <CategoriesPage
          categories={ categories }
          priorities={ priorities }
        /> }/>
        <Route path="/category/:category_title" element={ <DistinctCategoryPage
          categories={ categories }
          priorities={ priorities }
          updateAppMainStateFromComponent={(category)=> updateAppMainStateCategoryFromComponent(category)}
        /> }/>
        <Route path="/category/createNewCategory" element={ <AddNewCategoryPage
          categories={ categories }
          priorities={ priorities }
          updateAppMainStateFromComponent={(category)=> updateAppMainStateCategoryFromComponent(category)}
        /> }/>
        <Route path="/profile" element={ <ProfilePage/> }/>
      </Routes>
    </RequestContext.Provider>
  );
}

export default App;
