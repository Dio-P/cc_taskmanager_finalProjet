import AllTasksContainer from './AllTasksContainer';
import TasksBoxMainMenuBar from '../components/TasksBoxMainMenuBar';

const WholeMainPageContainer= ({ uncompletedTasks, completedTasks, categories, priorities, user }) => {
    return (
        <div>
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