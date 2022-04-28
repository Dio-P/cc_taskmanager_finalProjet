import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import DropDownMenuCategory from "./DropDownMenuCategory";
import DropDownMenuPriority from "./DropDownMenuPriority";
import MultipleOptionsDropdown from "./MultipleOptionsDropdown";




const TasksBoxMainMenuBar = ({ categories, priorities, setCategoriesFromDropDown, setPrioritiesFromDropDown, categoriesTitles }) => {
    const [categoriesIsOpen, setCategoriesIsOpen] = useState(true);
    const [prioritiesIsOpen, setPrioritiesIsOpen] = useState(true);
    const [uiStateCategories, setUiStateCategories] = useState("invisible");
    const [uiStatePriorities, setUiStatePriorities] = useState("invisible");

    useEffect(() => {
        if(categoriesIsOpen){
            setUiStateCategories("invisible");
        }else{
            setUiStateCategories();
        }
        
    }, [ categoriesIsOpen ]);

    useEffect(() => {
        if(prioritiesIsOpen){
            setUiStatePriorities("invisible");
        }else{
            setUiStatePriorities("visible");
        }
        
    }, [ prioritiesIsOpen ]);

    return (
        <div>
           
                <div>
                    <button className="prior-tab basis-1/3" onClick={()=> setPrioritiesIsOpen(!prioritiesIsOpen)}>Priorities</button>
                    {!prioritiesIsOpen?
                        <MultipleOptionsDropdown 
                            options={ priorities }
                            setOptionsFromDropDown={ setPrioritiesFromDropDown }
                            />
                    :
                        null
                    }
                </div>
                <div>
                    <button className="categ-tab basis-1/3" onClick={()=> setCategoriesIsOpen(!categoriesIsOpen)}>Categories</button>
                    {!categoriesIsOpen?
                        <MultipleOptionsDropdown 
                            options={ categoriesTitles }
                            setOptionsFromDropDown={ setCategoriesFromDropDown }
                            />
                    :
                        null
                    }
                </div>
           
        </div>

    )
}

export default TasksBoxMainMenuBar;