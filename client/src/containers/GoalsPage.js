import { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import Menu from '../components/Menu';
import AllGoalsContainer from "./AllGoalsContainer";


const GoalsPage = () => {
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
            <p>Goals</p>
            <AllGoalsContainer
                categories={ categories }
                priorities={ priorities }
            />
        </div>
    )
}

export default GoalsPage;