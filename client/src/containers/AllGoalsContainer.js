import { useState } from "react";
import Goal from "../components/Goal";
import { FaBars, FaWrench, FaPlus, FaMinus } from "react-icons/fa";
import Menu from "../components/Menu";

const AllGoalsContainer = ({ categories, priorities, goals, completedTasks }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


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
            { goals.map(goal => (
                <Goal
                    key={Math.random()}
                    goal={ goal }
                    // endDate={ findGoalEndDate(goal) }
                    categories={ categories }
                    priorities={ priorities }
                    completedTasks={ completedTasks }
                />
            )) }
        </div>

    )
}

export default AllGoalsContainer