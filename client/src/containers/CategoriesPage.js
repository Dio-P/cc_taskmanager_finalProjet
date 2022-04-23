import { useState} from "react";
import { useLocation } from "react-router-dom";

import AllCategoriesContainerForCatPage from "./AllCategoriesContainerForCatPage";
import Menu from "../components/Menu";

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
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>Menu</button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <button onClick={()=> closeMenuFunction()}>X</button>
            <h1>Hello from the Categories Page</h1>
            <AllCategoriesContainerForCatPage/>
        </div>
    )
}

export default CategoriesPage;