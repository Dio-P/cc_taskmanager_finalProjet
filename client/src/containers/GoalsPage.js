import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaWrench, FaPlus, FaMinus } from "react-icons/fa";
import Menu from '../components/Menu';
import AllGoalsContainer from "./AllGoalsContainer";


const GoalsPage = ({ goals, completedTasks, categories, priorities }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    // const location = useLocation();
    // const categories = location.state.categories;
    // const priorities = location.state.priorities;
    // const goals = location.state.goals;


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
                    goals={ goals }
                />
            }
            
            <div>
                <p>Goals</p>
                <button onClick={()=> navigate("/goal/createNewGoal")} className='plus-btn'><FaPlus /></button>
            </div>
            <AllGoalsContainer
                categories={ categories }
                priorities={ priorities }
                goals={ goals }
                completedTasks={ completedTasks }
            />
        </div>
    )
}

export default GoalsPage;