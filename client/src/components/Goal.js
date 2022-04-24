import { useState } from "react";

const Goal = ({ goal }) => {
    const [goalTitle, setGoalTitle] = useState(null);
    const [goalSetDate, setGoalSetDate] = useState(null);
    const [goalType, setGoalType] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [goalStartDate, setGoalStartDate] = useState(null);

    return(
        <div>
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
                <p> {goalStartDate} </p>
            </div>
            <div>
                <label> Goal Target </label>
                <p> {goalStartDate} </p>
            </div>
        </div>

    )
}

export default Goal;
