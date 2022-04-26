import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

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
            <button onClick={()=> closeMenuFunction()}>X</button>
            <li>
                <button className="addNewTaskButton" onClick={()=> onClick("/profile")}> Profile </button>
            </li>
            <li>
                <a href="/">View Tasks</a>
            </li>
            <li>
                <button className="addNewTaskButton" onClick={()=> onClick("/task/createNewTask")}> Add New Tasks </button>
            </li>
            <li>
                <button className="allCategoriesButton" onClick={()=> onClick("/categories")}> Categories </button>
            </li>
            <li>
                <button className="addNewCategoryButton" onClick={()=> onClick("/category/createNewCategory")}> Add New Category </button>
            </li>
            <li>
                <button className="allGoalsButton" onClick={()=> onClick("/goals")}> Goals </button>
            </li>
            <li>
                <button className="allGoalsButton" onClick={()=> onClick("/goal/createNewGoal")}> Add New Goal </button>
            </li>
            <li>
                <button onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </button>
            </li>
            </ul>
        </div>
    )
}

export default Menu;