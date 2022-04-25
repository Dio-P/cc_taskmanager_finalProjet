import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import DropDownMenuCategory from "../components/DropDownMenuCategory";
import DropDownMenuPriority from "../components/DropDownMenuPriority";
import Menu from "../components/Menu";

const AddNewGoalPage = ({ categories, priorities, goals, goalTypesList }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [goalTitle, setGoalTitle] = useState(null);
    const [goalSetDate, setGoalSetDate] = useState(null);
    const [goalType, setGoalType] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [goalStartDate, setGoalStartDate] = useState(null);
    const [goalEndDate, setGoalEndDate] = useState(null);
    const [goalCategories, setGoalCategories] = useState(null);
    const [goalActive, setGoalActive] = useState(true);

    const {get, post} = useContext(RequestContext);

    // const location = useLocation();
    // const task = location.state.task;
    // const categories = location.state.categories;
    // const priorities = location.state.priorities;
    // const goals = location.state.goals;

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const onClickingDone = (e) => {
        e.preventDefault();
        let updatedGoal = {
            goalTitle, 
            goalType, 
            goalTarget, 
            goalStartDate};
        console.log("updatedGoal", updatedGoal);/////////////
        // post(, updatedGoal);
    }
        
    return(
        <form>
            {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>Menu</button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                    goals={ goals }
                />
            }
            <div>
                <label> Goal Title </label>
                <h3>{goalTitle}</h3>
                <input type="text" name="goalTitle" id="goalTitle" value={goalTitle} onChange={e=> setGoalTitle(e.target.value)} required/>

            </div>
            <div>
                <label> Goal Type </label>
                <h3>{goalType}</h3>
                <select name="goalType" id="goalType" onChange={e=> setGoalType(e.target.value)}>
                    {goalTypesList.map(type => (
                        <option value={ type }>{ type }</option>
                    ))}
                </select>
            </div>
            <div>
                <label> Goal Target </label>
                <h3>{goalTarget}</h3>
                <input type="text" name="goalTarget" id="goalTarget" value={goalTarget} onChange={e=> setGoalTarget(e.target.value)} required/>
            </div>
            <div>
                <label> Goal Start Date </label>
                <h3>{goalStartDate}</h3>
                <input type="date" name="goalStartDate" id="goalStartDate" value={goalStartDate} onChange={e=> setGoalStartDate(e.target.value)} required/>
            </div>
{/*             how will the categories be looked for?
            <div>
                <label> Goal Categories </label>
                <h3>{goalCategories}</h3>
                <input type="text" name="goalCategories" id="goalCategories" value={goalSetDate} onChange={e=> setGoalCategories(e.target.value)} required/>
            </div> */}
            <button onClick={(e)=> onClickingDone(e)}> Create New Goal </button>
        </form>
    )
}

export default AddNewGoalPage;