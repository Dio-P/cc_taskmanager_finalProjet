import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Goal = ({ goal, categories, priorities, completedTasks }) => {
    const [goalTitle, setGoalTitle] = useState(goal.title);
    const [goalTarget, setGoalTarget] = useState(goal.target);
    const [goalStartDate, setGoalStartDate] = useState(goal.startDate);
    const [goalEndDate, setGoalEndDate] = useState("");
    
    const [loading, setLoading] = useState(true);

    const [allCompletedTasksGivenPeriod, setAllCompletedTasksGivenPeriod] = useState([]);
    const [tasksOnTarget, setTasksOnTarget] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        calculatingTargetOutcome();
        
    }, []);


    useEffect(() => {
        calculateAllCompletedTasksGivenPeriod();
        calculateAllCompletedTaskOfCategoryGivenPeriod();
        

    }, [goalEndDate]);


    useEffect(() => {
        setLoading(false)
        
    }, [goalTitle, goalTarget, goalStartDate, goalEndDate]);


    useEffect(() => {
        // setGoalTitle(goal.title);
        // setGoalTarget(goal.target);
        // setGoalStartDate(goal.startDate);
        findGoalEndDate(goal)
        
    }, [goal]);


    useEffect(() => {
        calculatingTargetOutcome();
        
    }, [goalEndDate]);

    const calculateAllCompletedTasksGivenPeriod = () => {
        if(goalStartDate&&goalEndDate){
            let periodStart= Date.parse(new Date(goalStartDate.split("-")));
            let periodEnd= Date.parse(new Date(goalEndDate.split("-")));
            let periodTaskHelper = []
            for(let task of completedTasks){
                if(
                task.completedTimeStamp>=periodStart
                &&
                task.completedTimeStamp<=periodEnd
                ){
                    periodTaskHelper.push(task);
                }
                setAllCompletedTasksGivenPeriod(periodTaskHelper);
            }
        }
    }

    const calculateAllCompletedTaskOfCategoryGivenPeriod= () => {
        console.log("hello from line 73");
        if(goalStartDate&&goalEndDate){
            
            let periodStart= Date.parse(new Date(goalStartDate.split("-")));
            let periodEnd= Date.parse(new Date(goalEndDate.split("-")));
            
            let periodTaskHelper = [];
            let idsArray = goal.categories.map(category => category.id);
            console.log("periodStart", periodStart);
            console.log("periodEnd", periodEnd);
            console.log("completedTasks", completedTasks);
            for(let task of completedTasks){
                console.log("task.completedTimeStamp", task.completedTimeStamp);
                console.log("task.completedTimeStamp", task.completedTimeStamp);
                
                if(idsArray.includes(task.category.id)){
                    console.log("task.completedTimeStamp", task.completedTimeStamp);
                    
                    if(
                        task.completedTimeStamp>=periodStart
                    &&
                        task.completedTimeStamp<=periodEnd
                    ){
                        periodTaskHelper.push(task);
                        console.log("periodTaskHelper", periodTaskHelper);
                        
                    }
                    
                }
                
            }
            setTasksOnTarget(periodTaskHelper);
            
        }  
    }

    const translatingTheGoalTargetIntoTasksNumber = () => {
        const numberAllTasksPeriod = allCompletedTasksGivenPeriod.length||1;
        // console.log("numberAllTasksPeriod", numberAllTasksPeriod);
        // console.log("goalTarget", goalTarget);
        const numberOfTaksNeededToMeetTarget = (goalTarget * numberAllTasksPeriod) / 100;
        // console.log("numberOfTaksNeededToMeetTarget", numberOfTaksNeededToMeetTarget);
        return numberOfTaksNeededToMeetTarget
        
    }

    const findDaysAfter = (goal) => {
        if(goal.type==="DAILY"){
            return 1;

        }if(goal.type==="WEEKLY"){
            return 7;
            
        }if(goal.type==="MONTHLY"){
            console.log("monthly");
            return "MONTHLY";
            
        } 
    }
    // change the set to return and have the set with the function as argument to when edit is pressed.
    // move that logic to the distinct page where this might actually change
    // should I copy this or move it all in an outside function where it could happily leave for ever?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // because the problem is that it needs to be calculated in two places here to be desplayed and in the distinc to be changed.

    const findGoalEndDate = (goal) => {
        let daysAfter = findDaysAfter(goal);
        let goalStartDate = goal.startDate;
        
        let endDate = new Date(goalStartDate.split("-").toString());
        if(goalStartDate && daysAfter){
            if(daysAfter==="MONTHLY"){
                endDate.setMonth(endDate.getMonth() + 1);
                setGoalEndDate(endDate.toLocaleDateString().split("/").reverse().join("-"));

            }else{
                endDate.setDate(endDate.getDate() + daysAfter);
                setGoalEndDate(endDate.toLocaleDateString().split("/").reverse().join("-"));

            }
        }
    }

    const calculatingTargetOutcome = () => {
        if(goalEndDate){
            let dateNow = Date.parse(new Date());
            let dateEnd = Date.parse(new Date(goalEndDate.split("-")));
            if(dateNow <= dateEnd){
                return "pending"

            }else{
                console.log("tasksOnTarget", tasksOnTarget);
                console.log("tasksOnTarget.length", tasksOnTarget.length);
                console.log("translatingTheGoalTargetIntoTasksNumber()", translatingTheGoalTargetIntoTasksNumber());
                if(tasksOnTarget.length >= translatingTheGoalTargetIntoTasksNumber()){
                    return "succeeded"

                }else{
                    return "failed"

                }
            }
        }
    }

    const onGoalClick = (e) => {
        navigate(`/goal/:${goal.title}`, {
            state: {
                goal:goal,
                // categories:categories,
                // priorities: priorities,
                endDate: goalEndDate

            }
        })
    }


    return(
        <div>
            {loading?
            <p>Loading...</p>
            :
            <button  className={calculatingTargetOutcome()} onClick={ onGoalClick }><>
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
