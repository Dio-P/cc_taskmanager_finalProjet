import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import AllTasksContainer from './AllTasksContainer';
import TasksBoxMainMenuBar from '../components/TasksBoxMainMenuBar';
import Menu from '../components/Menu';
import RequestContext from '../context/RequestContext';
import { FaBars, FaPlus } from "react-icons/fa";

const WholeMainPageContainer= ({ categories, priorities, user, goals, goalTypesList}) => {
    const [allTasks, setAllTasks] = useState([]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categoriesTitles, setCategoriesTitles] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);

    const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
    const [prioritiesToDisplay, setPrioritiesToDisplay] = useState([]);
    const [uncompletedTasksToDisplay, setUncompletedTasksToDisplay] = useState([]);
    const [completedTasksToDisplay, setCompletedTasksToDisplay] = useState([]);

    const { get } = useContext(RequestContext);
    const navigate = useNavigate();

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    // useEffect(() => {
    //     setUncompletedTasksToDisplay(uncompletedTasks);
    //     setCompletedTasksToDisplay(completedTasks);
        
    // }, []);

    useEffect(() => {
        const getTasks =  async (authId) => {
            get("tasks")
            .then(function (resJson) {
                setAllTasks(resJson);
            })
            .catch((e) => console.log(e));
            }
            getTasks();
            // postUser();
            // getCategories();
            // getGoals();
            // getUsers();
    }, [get]);

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

    useEffect(() => {
        setUncompletedTasksToDisplay(uncompletedTasks);
        setCompletedTasksToDisplay(completedTasks);
        
    }, [uncompletedTasks, completedTasks]);



    useEffect(() => {
        let categoriesTitles = categories.map(category => (
            category.title
            ))
        setCategoriesTitles(categoriesTitles)
        
        
    }, [categories]);

    useEffect(() => {
        let uncompletedTaskToDisplayHelper = [];
        let completedTaskToDisplayHelper = [];

        for(let task of uncompletedTasks){
            if(
                categoriesToDisplay.includes(task.category.title)
                &&
                prioritiesToDisplay.includes(task.priority)
                ){
                // console.log("This task is to be displayed");//////////////////
                uncompletedTaskToDisplayHelper.push(task);
                // console.log("uncompletedTaskToDisplayHelper", uncompletedTaskToDisplayHelper);////////////
            }
        }

        for(let task of completedTasks){
            if(
                categoriesToDisplay.includes(task.category.title)
                &&
                prioritiesToDisplay.includes(task.priority)
                ){
                // console.log("This completed task is to be displayed");//////////////
                completedTaskToDisplayHelper.push(task);
                // console.log("completedTaskToDisplayHelper", completedTaskToDisplayHelper);/////////////
            }
        }
        setUncompletedTasksToDisplay(uncompletedTaskToDisplayHelper);
        setCompletedTasksToDisplay(completedTaskToDisplayHelper);
        
    }, [categoriesToDisplay, prioritiesToDisplay]);


    const setPrioritiesFromDropDown = (choosenOption) => {
        let prioritiesToDisplayHelper = [];
        if(choosenOption){
            let choosenPriorities = Object.values(choosenOption);
            // console.log("priorities Chosen Option", choosenOption);////////
            for(let priority of choosenPriorities){
                if(priority.toDisplay){
                    prioritiesToDisplayHelper.push(priority.value);
                }
            }
            // console.log("AfterPrioritiesToDisplayHelper", prioritiesToDisplayHelper);////////
            setPrioritiesToDisplay(prioritiesToDisplayHelper);
        }
    }

    const setCategoriesFromDropDown = (choosenOption) => {
        let categoriesToDisplayHelper = [];
        if(choosenOption){
            let choosenOptions = Object.values(choosenOption)
            // console.log("categories Chosen Option", choosenOption);///////////////
            for(let category of choosenOptions){
                if(category.toDisplay){
                    categoriesToDisplayHelper.push(category.value);
                }
            }
            // console.log("AfterCategoriesToDisplayHelper", categoriesToDisplayHelper);//////
            setCategoriesToDisplay(categoriesToDisplayHelper);
        }
    }

    // updateAppMainStateFromComponent={ updateAppTasksFromComponent }
    const updateWholeMainPageTasksFromComponent =(task) => {
        let allTasksUpdateHelper = allTasks.filter(taskInAll => taskInAll.id!==task.id);
        console.log("allTasksUpdateHelper", allTasksUpdateHelper);
        console.log("task", task);
        setAllTasks([...allTasksUpdateHelper, task]);

    }

    return (
        <div>
            {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}><FaBars className='m-4' size='2rem'/></button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                    goals={ goals }
                    goalTypesList ={ goalTypesList }
                />
            }
            <p className='greeting'>Hi, {user.email}! </p>
            <div className='flex flex-box items-start p-2  m-5'>
            <TasksBoxMainMenuBar
                categories={ categories }
                priorities={ priorities }
                categoriesTitles={ categoriesTitles }
                setPrioritiesFromDropDown={(choosenOption)=> setPrioritiesFromDropDown(choosenOption) }
                setCategoriesFromDropDown={(choosenOption)=> setCategoriesFromDropDown(choosenOption) }
            />
                <button className='plus-btn-tasks' onClick={()=> navigate("/task/createNewTask")}><FaPlus/></button>
            </div>
            <AllTasksContainer 
                uncompletedTasksToDisplay={ uncompletedTasksToDisplay } 
                completedTasksToDisplay={ completedTasksToDisplay }
                categories={ categories }
                priorities={ priorities }
                updateWholeMainPageStateFromComponent={ updateWholeMainPageTasksFromComponent }
            />
            

        </div>
    )
}

export default WholeMainPageContainer;