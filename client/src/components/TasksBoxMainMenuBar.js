import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import DropDownMenuCategory from "./DropDownMenuCategory";
import DropDownMenuPriority from "./DropDownMenuPriority";
import MultipleOptionsDropdown from "./MultipleOptionsDropdown";




const TasksBoxMainMenuBar = ({ categories, priorities, setCategoriesFromDropDown, setPrioritiesFromDropDown, categoriesTitles }) => {
    const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
    const [prioritiesIsOpen, setPrioritiesIsOpen] = useState(false);


    return (
        <div>
            <div>
                <div>
                    <button onClick={()=> setPrioritiesIsOpen(!prioritiesIsOpen)}>Priorities</button>
                    {prioritiesIsOpen?
                        <MultipleOptionsDropdown 
                            options={ priorities }
                            setOptionsFromDropDown={ setPrioritiesFromDropDown }
                            />
                    :
                        null
                    }
                </div>
                <div>
                    <button onClick={()=> setCategoriesIsOpen(!categoriesIsOpen)}>Categories</button>
                    {categoriesIsOpen?
                        <MultipleOptionsDropdown 
                            options={ categoriesTitles }
                            setOptionsFromDropDown={ setCategoriesFromDropDown }
                            />
                    :
                        null
                    }
                </div>
            </div>
        </div>

    )
}

export default TasksBoxMainMenuBar;