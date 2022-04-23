import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Menu = ({ closeMenuFunction, categories, priorities }) => {
    const navigate = useNavigate();

    const addTask = () => {
        navigate("/task/createNewTask", {
            state:{
                categories: categories,
                priorities: priorities
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
                <a href="/profile">Profile</a>
            </li>
                <li>
                <a href="/">View Tasks</a>
            </li>
            <li>
                <button className="addNewTaskButton" onClick={addTask}>Add New Tasks</button>
            </li>
            <li>
                <a href="/categories">Categories</a>
            </li>
            <li>
                <a href="/goals">Goals</a>
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