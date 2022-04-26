import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { FaPlus } from "react-icons/fa";

const Menu = ({ closeMenuFunction, categories, priorities, goals, goalTypesList }) => {
    const navigate = useNavigate();

    const onClick = (url) => {
        navigate(url, {
            state:{
                categories: categories,
                priorities: priorities,
                goals: goals, 
                // goalTypesList: goalTypesList
            }
        });
        
    }

    const {
        logout
      } = useAuth0();

    return(
        <div>
            <ul className="MENU showMenuNav space-x-8 lg:flex">
            <button onClick={()=> closeMenuFunction()}><FaPlus className='menu-close'/></button>
            <p className='menu-title'>Menu</p>
            <li>
                <button className="addNewTaskButton text-lg -m-4" onClick={()=> onClick("/profile")}> Profile </button>
            </li>
            <li>
                <a href="/">View Tasks</a>
            </li>
            <li>
                <button className="addNewTaskButton text-lg -m-4" onClick={()=> onClick("/task/createNewTask")}> Add New Tasks </button>
            </li>
            <li>
                <button className="allCategoriesButton text-lg -m-4" onClick={()=> onClick("/categories")}> Categories </button>
            </li>
            <li>
                <button className="addNewCategoryButton text-lg -m-4" onClick={()=> onClick("/category/createNewCategory")}> Add New Category </button>
            </li>
            <li>
                <button className="allGoalsButton text-lg -m-4" onClick={()=> onClick("/goals")}> Goals </button>
            </li>
            <li>
                <button className="allGoalsButton text-lg -m-4" onClick={()=> onClick("/goal/createNewGoal")}> Add New Goal </button>
            </li>
            <li>
                <button className='log-out' onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </button>
            </li>
            </ul>
        </div>
    )
}

export default Menu;