import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Goal = ({ goal, categories, priorities, completedTasks }) => {
    const [goalTitle, setGoalTitle] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [goalStartDate, setGoalStartDate] = useState(null);
    const [goalEndDate, setGoalEndDate] = useState(null);
    
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
        

    }, [completedTasks]);


    useEffect(() => {
        setLoading(false)
        
    }, [goalTitle, goalTarget, goalStartDate, goalEndDate]);


    useEffect(() => {
        setGoalTitle(goal.title);
        setGoalTarget(goal.target);
        setGoalStartDate(goal.startDate);
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
                completedTasks.completedTimeStamp>=periodStart
                &&
                completedTasks.completedTimeStamp<=periodEnd
                ){
                    periodTaskHelper.push(task);
                }
            }
            setAllCompletedTasksGivenPeriod(periodTaskHelper);
        }
    }

    const calculateAllCompletedTaskOfCategoryGivenPeriod= () => {
        // console.log("inside calculate all completed task@@@@@@@@@@@@@@@@@@@@");
        // console.log("goalStartDate@@@@@@@@@@@@@@@@@@@@", goalStartDate);
        // console.log("goalEndDate@@@@@@@@@@@@@@@@@@@@", goalEndDate);
        
        if(goalStartDate&&goalEndDate){
            
            let periodStart= Date.parse(new Date(goalStartDate.split("-")));
            let periodEnd= Date.parse(new Date(goalEndDate.split("-")));
            
            let periodTaskHelper = []
            let idsArray = goal.categories.map(category => category.id);
            // console.log("periodStart@@@@@@@@@@", periodStart);
            // console.log("periodEnd@@@@@@@@@@", periodEnd);

            for(let task of completedTasks){
                console.log("task@@@@@@@@@@@@", task);
                console.log("goalStartDate", goalStartDate);
                console.log("goalEndDate", goalEndDate);
                console.log("periodStart", periodStart);
                console.log("periodEnd", periodEnd);
                console.log("completedTasks", task.completedTimeStamp);
                // console.log("goal.categories$$$$$$$$$$$OUT", goal.categories);
                // console.log("Objectgoal.categories$$$$$$$$$$$OUT", Object.values(goal.categories));
                // console.log("task.category$$$$$$$$$$$$$OUT", task.category);
                console.log("idsArray.includes(task.category.id)", idsArray.includes(task.category.id));
                if(idsArray.includes(task.category.id)){
                    // console.log("goal.categories$$$$$$$$$$$IN", goal.categories);
                    // console.log("task.category$$$$$$$$$$$$$IN", task.category);
                    // console.log("idsArray", idsArray);
                    // console.log("task.category.id", task.category.id);
                    // console.log("completedTasks.completedTimeStamp@@@@@@@@@@@@", completedTasks.completedTimeStamp);
                    
                    console.log("completedTasks", completedTasks);
                    
                    console.log("task.completedTimeStamp<=periodEnd", task.completedTimeStamp<=periodEnd);
                    if(
                        task.completedTimeStamp>=periodStart
                    &&
                        task.completedTimeStamp<=periodEnd
                    ){
                        console.log("hello again");
                        console.log("lalalla");
                        console.log("completedTasks.completedTimeStamp@@@@@@@@@@@@", completedTasks.completedTimeStamp);
                        console.log("the task is about to be pushed");
                        periodTaskHelper.push(task);
                        console.log("periodTaskHelper", periodTaskHelper);
                        
                    }

                    setTasksOnTarget(periodTaskHelper);
                }
                
            }
            
        }  
    }

    const translatingTheGoalTargetIntoTasksNumber = () => {
        const nuAllTasksPeriod = allCompletedTasksGivenPeriod.length||1;
        const numberOfTaksNeededToMeetTarget = (goal.target / nuAllTasksPeriod) * 100;
        return numberOfTaksNeededToMeetTarget
        
    }

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
        // console.log("within find goals end date");//////////
        let daysAfter = findDaysAfter(goal);
        let goalStartDate = goal.startDate;
        
        console.log("goalStartDate", goalStartDate);/////////
        let endDate = new Date(goalStartDate.split("-").toString());
        console.log("endDate", endDate);//////////
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
            console.log("endDate", goalEndDate);//////////
            let dateEnd = Date.parse(new Date(goalEndDate.split("-")));
            console.log("dateEnd", dateEnd);//////////////
            if(dateNow <= dateEnd){
                console.log("penidng");////////////
                return "pending"

            }else{
                console.log("tasksOnTarget", tasksOnTarget);
                console.log("translatingTheGoalTargetIntoTasksNumber()", translatingTheGoalTargetIntoTasksNumber());
                if(tasksOnTarget.length >= translatingTheGoalTargetIntoTasksNumber()){
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
