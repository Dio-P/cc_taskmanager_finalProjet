import React, { useState, useEffect } from 'react';
import taskList from "./helpers/dummyTasksApi.json";
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
import GoalsPage from './components/GoalsPage';
import CategoriesPage from './containers/CategoriesPage';
import DistinctCategoryPage from './containers/DistinctCategoryPage';


import './styles/App.css';
import RequestContext from './context/RequestContext';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [get, setGet] = useState();
  const [post, setPost] = useState();

  // const [fetchedTasks, setFetchedTasks] = useState([]);

    useEffect(() => {
      if(!isLoaded){
        return
      }
      const requestHelper = createRequestHelper(accessToken);
      console.log(accessToken)
      setGet(()=> requestHelper.get);
      setPost(()=> requestHelper.post);

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

    // useEffect(() => {
    //   // the api call that will get the initial data
    //   setAllTasks(taskList)
    // }, []);

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
    }, [get, post]);

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
    console.log("categories called");////////////
    get("categories")
      // .then(res=> (console.log("categoriesGotten", res)))
    .then(data=> (setCategories(data)))
  }

    useEffect(() => {
      // setting the comleted and unclompleted tasks 
      // in different states.
      if(allTasks){
      // console.log("allTasks", allTasks);////////////
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
      console.log("categories", categories);
      // setCategories(dummyCategoriesList)
      
    }, [allTasks, categories]);

    useEffect(() => {
      // get the categories from api
      const dummyPrioritiesList = ["LOW", "MEDIUM", "HIGH"]
      console.log("Priorities must have been gotten");
      setPriorities(dummyPrioritiesList)
      
    }, [allTasks]);

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
    <RequestContext.Provider value={{get, post}}>
      <Routes>
        <Route path="/" element={<WholeMainPageContainer 
        uncompletedTasks={ uncompletedTasks } 
        completedTasks={ completedTasks } 
        categories={ categories }
        priorities={ priorities }
        user = { user }
        />}/>
        <Route path="/task/:task_title" element={ <DistinctTaskPage/> }/>
        <Route path="/task/createNewTask" element={ <AddNewTaskPage/> }/>
        <Route path="/goals" element={ <GoalsPage/> }/>
        <Route path="/categories" element={ <CategoriesPage/> }/>
        <Route path="/category/:category_title" element={ <DistinctCategoryPage/> }/>
        <Route path="/profile" element={ <ProfilePage/> }/>
      </Routes>
    </RequestContext.Provider>
  );
}

export default App;
