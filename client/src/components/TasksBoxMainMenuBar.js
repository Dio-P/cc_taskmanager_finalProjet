import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import DropDownMenuCategory from "./DropDownMenuCategory";
import DropDownMenuPriority from "./DropDownMenuPriority";




const TasksBoxMainMenuBar = ({ categories, priorities }) => {
    const[categoriesToDisplay, setCategoriesToDisplay] = useState();
    const[prioritiesToDisplay, setPrioritiesToDisplay] = useState();

    const setCategoryFromDropDown = (choosenOption) => {
        setCategoriesToDisplay(choosenOption);
   
    
}

    const setPriorityFromDropDown = (choosenOption) => {
        setPrioritiesToDisplay(choosenOption);
        
    }
    // const [newTask, setNewTask] = useState()

    // const navigate = useNavigate();

    // const addTask = () => {
    //     navigate("/task/createNewTask", {
    //         state:{
    //             categories: categories,
    //             priorities: priorities
    //         }
    //     });
        
    // }

    // const {
    //     logout
    //   } = useAuth0();

    return (
        <div>
            <DropDownMenuCategory options={ categories } setValueFromDropDown={(choosenOption)=> setCategoryFromDropDown(choosenOption)}/>
            <DropDownMenuPriority options={ priorities } setValueFromDropDown={(choosenOption)=> setPriorityFromDropDown(choosenOption)}/>
        </div>

    )
}

export default TasksBoxMainMenuBar;