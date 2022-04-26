import { useState } from "react";
import Goal from "../components/Goal"

const AllGoalsContainer = ({ categories, priorities, goals, completedTasks }) => {
    // const [goalEndDate, setGoalEndDate] = useState(null);

    // const findDaysAfter = (goal) => {
    //     console.log("within find days after");
    //     if(goal.type==="DAILY"){
    //         console.log("of daily type");///////
    //         console.log("1 to be returned");///////
    //         return 1;

    //     }if(goal.type==="WEEKLY"){
    //         console.log("of weekly type");///////
    //         console.log("7 to be returned");///////
    //         return 7;
            
    //     }if(goal.type==="MONTHLY"){
    //         // return 30;
    //         console.log("of monthly type");///////
    //         console.log("monthly to be returned");///////
    //         return "MONTHLY";
            
    //     } 
    // }

    // const findGoalEndDate = (goal) => {
    //     console.log("within find goals end date");
    //     let daysAfter = findDaysAfter(goal);
    //     let goalStartDate = goal.startDate;
    //     let endDate = new Date(goalStartDate.split("/").reverse().toString());
    //     const options = { year: "numeric", month: "numeric", day: "numeric" }; 
    //     if(goalStartDate && daysAfter){
    //         if(daysAfter==="MONTHLY"){
    //             // console.log('goalStartDate.splilt("/")', goalStartDate.split("/").reverse().toString());
    //             // console.log("start Date Month", endDate);
    //             // console.log("getMonth", endDate.getMonth());
    //             endDate.setMonth(endDate.getMonth() + 1);
    //             // console.log("startDateMonth", goalStartDate);//////////////
    //             // console.log("endDateMonth", endDate.toLocaleDateString('en-GB',options));//////////////
    //             return endDate.toLocaleDateString();

    //         }else{
    //             // console.log("start Date", endDate);
    //             // console.log("daysAfter", daysAfter);
    //             // console.log("getDay", endDate.getDate());
    //             endDate.setDate(endDate.getDate() + daysAfter);
    //             // console.log("startDate", goalStartDate);//////////////
    //             // console.log("endDate", endDate.toLocaleDateString('en-GB', options));//////////////
    //             return endDate.toLocaleDateString();

    //         }
    //     }
    // }

    return(
        <div>
            { goals.map(goal => (
                <Goal
                    key={Math.random()}
                    goal={ goal }
                    // endDate={ findGoalEndDate(goal) }
                    categories={ categories }
                    priorities={ priorities }
                    completedTasks={ completedTasks }
                />
            )) }
        </div>

    )
}

export default AllGoalsContainer