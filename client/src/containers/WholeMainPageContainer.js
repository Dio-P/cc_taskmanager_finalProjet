import { useState, useEffect } from 'react';
import AllTasksContainer from './AllTasksContainer';
import TasksBoxMainMenuBar from '../components/TasksBoxMainMenuBar';
import Menu from '../components/Menu';

const WholeMainPageContainer= ({ uncompletedTasks, completedTasks, categories, priorities, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categoriesTitles, setCategoriesTitles] = useState([]);

    const [categoriesToDisplay, setCategoriesToDisplay] = useState(categoriesTitles);
    const [prioritiesToDisplay, setPrioritiesToDisplay] = useState(priorities);
    const [uncompletedTasksToDisplay, setUncompletedTasksToDisplay] = useState([uncompletedTasks]);
    const [completedTasksToDisplay, setCompletedTasksToDisplay] = useState([completedTasks]);

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

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

    return (
        <div>
            {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>Menu</button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <TasksBoxMainMenuBar 
                categories={ categories }
                priorities={ priorities }
                categoriesTitles={ categoriesTitles }
                setPrioritiesFromDropDown={(choosenOption)=> setPrioritiesFromDropDown(choosenOption) }
                setCategoriesFromDropDown={(choosenOption)=> setCategoriesFromDropDown(choosenOption) }
            />
            <p>Hello {user.email} </p>
            <AllTasksContainer 
                uncompletedTasksToDisplay={ uncompletedTasksToDisplay } 
                completedTasksToDisplay={ completedTasksToDisplay }
                categories={ categories }
                priorities={ priorities }
            />

        </div>
    )
}

export default WholeMainPageContainer;