import { useState } from "react";
import Goal from "../components/Goal"

const AllGoalsContainer = () => {
    const [goalEndDate, setGoalEndDate] = useState(null);

    const findDaysAfter = (goal) => {
        if(goal.type==="daily"){
            return 1;

        }if(goal.type==="weekly"){
            return 7;
            
        }if(goal.type==="monthly"){
            // return 30;
            return "monthly";
            
        } 
    }

    const findGoalEndDate = (goal) => {
        let daysAfter = findDaysAfter(goal);
        let goalStartDate = goal.startDate;
        let endDate = new Date(goalStartDate);
        if(goalStartDate && daysAfter){
            if(daysAfter==="monthly"){
                endDate.setMonth(endDate.getMonth() + 1);
                console.log("endDateMonth", endDate);//////////////
                return endDate;

            }else{
                
                endDate.setDate(endDate.getDate() + daysAfter);
                console.log("endDate", endDate);//////////////
                return endDate;

            }
        }
    }

    return(
        <div>
            {/* { goals.map(goal => (
                <Goal
                goal={ goal }
                endDate={ findGoalEndDate(goal) }
                />
            )) } */}
        </div>

    )
}

export default AllGoalsContainer