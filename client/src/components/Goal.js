import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Goal = ({ goal, categories, priorities, completedTasks }) => {
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

    // useEffect(() => {
    //     calculatingTargetOutcome();

    // }, [goalStartDate]);


    useEffect(() => {
        setLoading(false)
        
    }, [goalTitle, goalTarget, goalStartDate, goalEndDate]);

    useEffect(() => {
        setGoalTitle(goal.title);
        setGoalTarget(goal.target);
        setGoalStartDate(goal.startDate);
        findGoalEndDate(goal)
        
    }, [goal]);

    // useEffect(() => {
    //     calculatingTargetOutcome();
        
    // }, [goalStartDate]);

    useEffect(() => {
        calculatingTargetOutcome();
        
    }, [goalEndDate]);

    const findDaysAfter = (goal) => {
        console.log("within find days after");
        if(goal.type==="DAILY"){
            console.log("of daily type");///////
            console.log("1 to be returned");///////
            return 1;

        }if(goal.type==="WEEKLY"){
            console.log("of weekly type");///////
            console.log("7 to be returned");///////
            return 7;
            
        }if(goal.type==="MONTHLY"){
            // return 30;
            console.log("of monthly type");///////
            console.log("monthly to be returned");///////
            return "MONTHLY";
            
        } 
    }
    // change the set to return and have the set with the function as argument to when edit is pressed.
    // move that logic to the distinct page where this might actually change
    // should I copy this or move it all in an outside function where it could happily leave for ever?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // because the problem is that it needs to be calculated in two places here to be desplayed and in the distinc to be changed.

    const findGoalEndDate = (goal) => {
        console.log("within find goals end date");//////////
        let daysAfter = findDaysAfter(goal);
        let goalStartDate = goal.startDate;
        let endDate = new Date(goalStartDate.split("/").reverse().toString());
        console.log("endDate", endDate);//////////
        if(goalStartDate && daysAfter){
            if(daysAfter==="MONTHLY"){
                endDate.setMonth(endDate.getMonth() + 1);
                setGoalEndDate(endDate.toLocaleDateString());

            }else{
                endDate.setDate(endDate.getDate() + daysAfter);
                setGoalEndDate(endDate.toLocaleDateString());

            }
        }
    }

    const calculateAllCompletedTasksGivenPeriod = () => {
        let periodStart= Date.parse(new Date(goalStartDate.split("/").reverse()));
        let periodEnd= Date.parse(new Date(goalEndDate.split("/").reverse()));
        let periodTaskHelper = []
        for(let task of completedTasks){
            if(
            completedTasks.completedTimeStamp>=periodStart
            &&
            completedTasks.completedTimeStamp<=periodEnd
            ){
                periodTaskHelper.push(task);
            }
        }
        setAllTaskGivenPeriod(periodTaskHelper);
    }

    const calculateAllCompletedTaskOfGoalGivenPeriod= () => {
        
    }

    const calculatingTargetOutcome = () => {
        if(goalEndDate){
            let dateNow = Date.parse(new Date());
            // console.log("endDate", goalEndDate);//////////
            let dateEnd = Date.parse(new Date(goalEndDate.split("/").reverse()));
            console.log("dateEnd", dateEnd);//////////////
            if(dateNow <= dateEnd){
                console.log("penidng");////////////
                return "penidng"

            }else{
                if(tasksOnTarget.length() >= goalTask){
                    console.log("succeeded");//////////
                    return "succeeded"

                }else{
                    console.log("failed");///////
                    return "failed"

                }
            }
        }
    }

    const onGoalClick = (e) => {
        console.log("a goal has been clicked", goal);/////////
        navigate(`/goal/:${goal.title}`, {
            state: {
                goal:goal,
                categories:categories,
                priorities: priorities,
                endDate: goalEndDate
            }
        })
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
