import { useNavigate, useLocation } from "react-router-dom";

const DistinctTaskPage = () => {
    const location = useLocation();
    const task = location.state.task;
    console.log("location", location);
    console.log("task", task);

    const onClickingTheCheckedButton = () => {
            
    }

    return (
        

        <div>
            <h3>{task.title}</h3>
            <input type="checkbox" checked={task.completed}/>
             <div className="distinctTaskFieldBox">
                <p>{ task.type }</p>

                {task.date?
                <p>{ task.date }</p>
                :
                null
                }

                {task.time?
                <p>{ task.time }</p>
                :
                null
                }
             </div>

             <div>
                 <h4>Collaborators</h4>
             </div>

             <div>
                 <h4>Category</h4>
                 <p>{ task.category }</p>
             </div>

             <div>
                 <h4>Priority</h4>
                 <p>{ task.priority }</p>
             </div>

             <div>
                 <p>{ task.description }</p>
             </div>
        </div>
    )
}

export default DistinctTaskPage;