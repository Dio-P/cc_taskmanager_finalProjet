import { useState } from "react";
import Goal from "../components/Goal"

const AllGoalsContainer = ({ categories, priorities, goals, completedTasks }) => {
    

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