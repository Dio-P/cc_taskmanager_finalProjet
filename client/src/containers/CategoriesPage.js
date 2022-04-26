import { useState} from "react";
import { useLocation } from "react-router-dom";

import AllCategoriesContainerForCatPage from "./AllCategoriesContainerForCatPage";
import Menu from "../components/Menu";
import { FaBars, FaPlus } from "react-icons/fa";

const CategoriesPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();
    const categories = location.state.categories;
    const priorities = location.state.priorities;

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    return(
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
                />
            }
            <div className='flex flex-row'>
                 <h1 className='categories-h1 basis-1/2'>Categories</h1>
                 <button className='plus-btn'><FaPlus /></button>
            </div>
            <div>
            <AllCategoriesContainerForCatPage
            categories={ categories }
            priorities={ priorities }
            />
            </div>
        </div>
    )
}

export default CategoriesPage;