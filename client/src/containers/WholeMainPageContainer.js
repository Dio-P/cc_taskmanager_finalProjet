import { useState } from 'react';
import AllTasksContainer from './AllTasksContainer';
import TasksBoxMainMenuBar from '../components/TasksBoxMainMenuBar';
import Menu from '../components/Menu';

const WholeMainPageContainer= ({ uncompletedTasks, completedTasks, categories, priorities, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    return (
        <div>
            {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>Menu</button>
                </>
            :
                <Menu
                closeMenuFunction={ ()=>closeMenuFunction() }
                />
            }
            <TasksBoxMainMenuBar 
            categories={ categories }
            priorities={ priorities }
            />
            <p>Hello {user.email} </p>
            <AllTasksContainer 
            uncompletedTasks={ uncompletedTasks } 
            completedTasks={ completedTasks }
            categories={ categories }
            priorities={ priorities }
            />

        </div>
    )
}

export default WholeMainPageContainer;