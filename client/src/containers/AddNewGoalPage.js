import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import DropDownMenuCategory from "../components/DropDownMenuCategory";
import DropDownMenuPriority from "../components/DropDownMenuPriority";
import Menu from "../components/Menu";

const AddNewGoalPage = () => {
    const [goalTitle, setGoalTitle] = useState(null);
    const [goalSetDate, setGoalSetDate] = useState(null);
    const [goalType, setGoalType] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [goalStartDate, setGoalStartDate] = useState(null);
    const [goalCategories, setGoalCategories] = useState(null);
    const [goalActive, setGoalActive] = useState(true);

    const {get, post} = useContext(RequestContext);

    const onClickingDone = () => {
        let updatedGoal = {}
        console.log("updatedGoal", updatedGoal);
        // post(, updatedGoal);
    }
        
    return(
        <form>
            <div>
                <label> Goal Title </label>
                <h3>{goalTitle}</h3>
                <input type="text" name="goalTitle" id="goalTitle" value={goalSetDate} onChange={e=> setGoalTitle(e.target.value)} required/>

            </div>
            <div>
                <label> Goal Type </label>
                <h3>{goalType}</h3>
                <input type="text" name="goalType" id="goalType" value={goalSetDate} onChange={e=> setGoalType(e.target.value)} required/>
            </div>
            {/* <div>
                <label> Goal Set Date </label>
                <h3>{goalSetDate}</h3>
                        <input type="text" name="goalSetDate" id="goalSetDate" value={goalSetDate} onChange={e=> setGoalSetDate(e.target.value)} required/>
            </div> */}
            <div>
                <label> Goal Target </label>
                <h3>{goalTarget}</h3>
                <input type="text" name="goalTarget" id="goalTarget" value={goalSetDate} onChange={e=> setGoalTarget(e.target.value)} required/>
            </div>
            <div>
                <label> Goal Start Date </label>
                <h3>{goalStartDate}</h3>
                <input type="date" name="goalStartDate" id="goalStartDate" value={goalSetDate} onChange={e=> setGoalStartDate(e.target.value)} required/>
            </div>
{/*             how will the categories be looked for?
            <div>
                <label> Goal Categories </label>
                <h3>{goalCategories}</h3>
                <input type="text" name="goalCategories" id="goalCategories" value={goalSetDate} onChange={e=> setGoalCategories(e.target.value)} required/>
            </div> */}

        </form>
    )
}

export default AddNewGoalPage;