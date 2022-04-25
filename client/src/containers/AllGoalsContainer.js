import { useState } from "react";
import Goal from "../components/Goal"

const AllGoalsContainer = ( {categories, priorities, goals} ) => {
    const [goalEndDate, setGoalEndDate] = useState(null);

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

    const findGoalEndDate = (goal) => {
        console.log("within find goals end date");
        let daysAfter = findDaysAfter(goal);
        let goalStartDate = goal.startDate;
        let endDate = new Date(goalStartDate);
        // var options = { year: "numeric", month: "numeric", day: "numeric" }; 
        if(goalStartDate && daysAfter){
            if(daysAfter==="MONTHLY"){
                endDate.setMonth(endDate.getMonth() + 1);
                console.log("startDateMonth", goalStartDate);//////////////
                console.log("endDateMonth", endDate);//////////////
                return endDate.toLocaleDateString();

            }else{
                
                endDate.setDate(endDate.getDate() + daysAfter);
                console.log("startDate", goalStartDate);//////////////
                console.log("endDate", endDate);//////////////
                return endDate.toLocaleDateString();

            }
        }
    }

    return(
        <div>
            { goals.map(goal => (
                <Goal
                goal={ goal }
                endDate={ findGoalEndDate(goal) }
                categories={ categories }
                priorities={ priorities }
                />
            )) }
        </div>

    )
}

export default AllGoalsContainer