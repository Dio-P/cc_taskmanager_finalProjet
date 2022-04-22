import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import DropDownMenuCategory from "./DropDownMenuCategory";
import DropDownMenuPriority from "./DropDownMenuPriority";
import MultipleOptionsDropdown from "./MultipleOptionsDropdown";




const TasksBoxMainMenuBar = ({ categories, priorities }) => {
    const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
    const [prioritiesIsOpen, setPriotiesIsOpen] = useState(false);
    const [categoriesTitles, setCategoriesTitles] = useState([])

    useEffect(() => {
        let categoriesTitles = categories.map(category => (
            category.title
            ))
        setCategoriesTitles(categoriesTitles)
        
        
    }, [categories]);

    // const[categoriesToDisplay, setCategoriesToDisplay] = useState();
    // const[prioritiesToDisplay, setPrioritiesToDisplay] = useState();

//     const setCategoryFromDropDown = (choosenOption) => {
//         setCategoriesToDisplay(choosenOption);
   
    
// }

//     const setPriorityFromDropDown = (choosenOption) => {
//         setPrioritiesToDisplay(choosenOption);
        
    // }
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
            <>
                <div>
                    <button onClick={()=> setPriotiesIsOpen(!prioritiesIsOpen)}>Priorities</button>
                    {prioritiesIsOpen?
                        <MultipleOptionsDropdown options={ priorities }/>
                    :
                        null
                    }
                </div>
                <div>
                    <button onClick={()=> setCategoriesIsOpen(!categoriesIsOpen)}>Categories</button>
                    {categoriesIsOpen?
                        <MultipleOptionsDropdown options={ categoriesTitles }/>
                    :
                        null
                    }
                </div>
            </>
        </div>

    )
}

export default TasksBoxMainMenuBar;