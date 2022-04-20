import AllTasksContainer from './AllTasksContainer';
import TasksBoxMainMenuBar from '../components/TasksBoxMainMenuBar';

const WholeMainPageContainer= ({ uncompletedTasks, completedTasks, categories, priorities }) => {
    return (
        <div>
            <TasksBoxMainMenuBar 
            categories={ categories }
            priorities={ priorities }
            />
            <p>Hello Rachel</p>
            <AllTasksContainer uncompletedTasks={ uncompletedTasks } completedTasks={ completedTasks }/>

        </div>
    )
}

export default WholeMainPageContainer;