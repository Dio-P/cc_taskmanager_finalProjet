import { useState, useEffect } from 'react';
import AllTasksContainer from './AllTasksContainer';
import TasksBoxMainMenuBar from '../components/TasksBoxMainMenuBar';
import Menu from '../components/Menu';

const WholeMainPageContainer= ({ uncompletedTasks, completedTasks, categories, priorities, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
    const [prioritiesToDisplay, setPrioritiesToDisplay] = useState([]);
    const [uncompletedTasksToDisplay, setUncompletedTasksToDisplay] = useState([]);
    const [completedTasksToDisplay, setCompletedTasksToDisplay] = useState([]);

    const [prioritiesToDisplayHelper, setPrioritiesToDisplayHelper] = useState([]);
    const [categoriesToDisplayHelper, setCategoriesToDisplayHelper] = useState([]);

    useEffect(() => {
        console.log("categoriesToDisplay", categoriesToDisplay);
        
    }, [categoriesToDisplay]);

    useEffect(() => {
        console.log("prioritiesToDisplay", prioritiesToDisplay);
        
    }, [prioritiesToDisplay]);

    useEffect(() => {
        console.log("categoriesToDisplayHelper", categoriesToDisplayHelper);
        setCategoriesToDisplay(categoriesToDisplayHelper.map(
            categoryToDisplayObject => categoryToDisplayObject.option
            ))
        
    }, [categoriesToDisplayHelper]);

    useEffect(() => {
        console.log("prioritiesToDisplayHelper", prioritiesToDisplayHelper);
        setPrioritiesToDisplay(prioritiesToDisplayHelper.map(
            priorityToDisplayObject => priorityToDisplayObject.option
        ))
        
    }, [prioritiesToDisplayHelper]);

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const setPrioritiesFromDropDown = (choosenOption) => {
        if(choosenOption.toDisplay){
            setPrioritiesToDisplayHelper([...prioritiesToDisplayHelper, choosenOption]);
        }else{
            setPrioritiesToDisplayHelper(prioritiesToDisplayHelper.filter(
                priorityInArray => priorityInArray !== choosenOption
                ))
        }
        
    }

    const setCategoriesFromDropDown = (choosenOption) => {
        if(choosenOption.toDisplay){
            setCategoriesToDisplayHelper([...categoriesToDisplayHelper, choosenOption]);
        }else{
            setCategoriesToDisplayHelper(categoriesToDisplayHelper.filter(
                priorityInArray => priorityInArray !== choosenOption
                ))
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
                setPrioritiesFromDropDown={(choosenOption)=> setPrioritiesFromDropDown(choosenOption) }
                setCategoriesFromDropDown={(choosenOption)=> setCategoriesFromDropDown(choosenOption) }
            />
            <p>Hello {user.email} </p>
            <AllTasksContainer 
                uncompletedTasksToDisplay={ uncompletedTasks } 
                completedTasksToDisplay={ completedTasks }
                categories={ categories }
                priorities={ priorities }
            />

        </div>
    )
}

export default WholeMainPageContainer;