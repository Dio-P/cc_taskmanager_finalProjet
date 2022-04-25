import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Goal = ({ goal, endDate, categories, priorities }) => {
    const [goalTitle, setGoalTitle] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [goalStartDate, setGoalStartDate] = useState(null);
    const [goalEndDate, setGoalEndDate] = useState(null);
    const [loading, setLoading] = useState(true);

    const [allTaskGivenPeriod, setAllTaskGivenPeriod] = useState(null);
    const [allCategoryTaskGivenPeriod, setAllCategoryTaskGivenPeriod] = useState(null);
    const [tasksOnTarget, setTasksOnTarget] = useState(null);
    const [goalTask, setGoalTask] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        calculatingTargetOutcome();

    }, []);


    useEffect(() => {
        setLoading(false)
        
    }, [goalTitle, goalTarget, goalStartDate, goalEndDate]);

    useEffect(() => {
        setGoalTitle(goal.title);
        setGoalTarget(goal.target);
        setGoalStartDate(goal.startDate);
        
    }, [goal]);

    useEffect(() => {
        setGoalEndDate(endDate);
        
    }, [endDate]);

    const onGoalClick = (e) => {
        console.log("a goal has been clicked", goal);/////////
        navigate(`/goal/:${goal.title}`, {
            state: {
                goal:goal,
                categories:categories,
                priorities: priorities,
                endDate: endDate
            }
        })
    }

    const calculatingTargetOutcome = () => {
        let dateNow = Date.parse(new Date());
        console.log("endDate", endDate);
        let dateEnd = Date.parse(new Date(endDate.split("/").reverse()));
        console.log("dateEnd", dateEnd);
        if(dateNow <= dateEnd){
            console.log("penidng");////////////
            return "penidng"

        }else{
            if(tasksOnTarget >= goalTask){
                console.log("succeeded");//////////
                return "succeeded"

            }else{
                console.log("failed");///////
                return "failed"

            }
        }
    }


    return(
        <div>
            {loading?
            <p>Loading...</p>
            :
            <button onClick={ onGoalClick }><>
                <div>
                    <label> Goal Title </label>
                    <p> {goalTitle} </p>
                </div>
                <div>
                    <label> Goal Start Date </label>
                    <p> {goalStartDate} </p>
                </div>
                <div>
                    <label> Goal End Date </label>
                    <p> {goalEndDate} </p>
                </div>
                <div>
                    <label> Goal Target </label>
                    <p> {goalTarget} </p>
                </div>
            </>See Goal Details </button>
            }
            
        </div>

    )
}

export default Goal;
