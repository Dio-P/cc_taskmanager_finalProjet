import { useEffect, useState } from "react";

const TasksBox = (props) => {
    const [type, setType] = useState(null);

    useEffect(() => {
        console.log("props", props);
        console.log("Object.keys(props)", Object.keys(props));
        if(Object.keys(props).includes("doOns")){
            setType("Weeks Tasks")

        }if(Object.keys(props).includes("doBys")){
            setType("Get it done soon")
            
        }if(Object.keys(props).includes("somedays")){
            setType("Get it done someday")
            
        }
        // Object.keys(props).includes
    }, []);

    return (
        <div>
            <h3>{type}</h3>

           {/* {         
           props[0].map(task => (
              <p>{task.title}</p>
           ))
           }   */}
        </div>
    )
}

export default TasksBox;