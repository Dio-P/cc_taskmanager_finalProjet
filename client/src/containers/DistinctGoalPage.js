import { useState, useEffect, useContext  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";

const DistinctGoalPage = ({ categories, priorities, goals, goalTypesList }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [goalTitle, setGoalTitle] = useState(null);
    const [editGoalTitle, setEditGoalTitle] = useState(false);
    const [goalType, setGoalType] = useState(null);
    const [editGoalType, setEditGoalType] = useState(false);
    const [goalTypes, setGoalTypes] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [editGoalTarget, setEditGoalTarget] = useState(false);
    const [goalStartDate, setGoalStartDate] = useState(null);
    const [editGoalStartDate, setEditGoalStartDate] = useState(false);
    const [goalEndDate, setGoalEndDate] = useState(null);
    const [editGoalEndDate, setEditGoalEndDate] = useState(false);
    const [goalCategories, setGoalCategories] = useState(null);
    const [editGoalCategories, setEditGoalCategories] = useState(false);
    const [goalActive, setGoalActive] = useState(true);
    // const [goalSucceeded, setGoalSucceeded] = useState(true);

    const {get, post} = useContext(RequestContext);

    const location = useLocation();
    const goal = location.state.goal;
    // const categories = location.state.categories;
    // const goalTypesList =location.state.goalTypesList;
    const endDate = location.state.endDate;

    useEffect(() => {///////
        console.log("goalTypesList Start", goalTypesList);//////
        
    }, []);////////

    useEffect(() => {
        setGoalTitle(goal.title);
        setGoalType(goal.type);
        setGoalTarget(goal.target);
        setGoalStartDate(goal.startDate);
        setGoalEndDate(endDate);
        setGoalCategories(goal.categories);
        setGoalActive(goal.active);

    }, [goal]);

    useEffect(() => {
        console.log("goalTypesList", goalTypesList);//////
        setGoalTypes(goalTypesList);
        
    }, [goalTypesList]);

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const onClickingDone = () => {
        let updatedGoal = {goalTitle, goalType, goalTarget, goalStartDate}
        console.log("updatedGoal", updatedGoal);
        // post(, updatedGoal);
        
    }

    return(
        <div>
             {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>Menu</button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <div>
                <label> Goal Title </label>
                <h3>{goalTitle}</h3>
                {!editGoalTitle?
                    <button onClick={()=>setEditGoalTitle(true)}>Edit</button>
                :
                    <>
                        <input 
                            type="text" 
                            name="goalTitle" 
                            id="goalTitle" 
                            value={goalTitle} 
                            onChange={e=> setGoalTitle(e.target.value)} 
                            required
                        />
                        <button onClick={()=>{
                            setEditGoalTitle(false)
                            onClickingDone()
                            }}>Done</button>
                    </>
                }  
            </div>
            <div>
                <label> Goal Type </label>
                <h3>{goalType}</h3>
                {!editGoalType?
                    <button onClick={()=>setEditGoalType(true)}>Edit</button>
                :
                    <>
                        <select name="goalType" id="goalType" onChange={e=> setGoalType(e.target.value)}>
                            {goalTypes.map(type => (
                                <option value={ type }>{ type }</option>
                            ))}
                        </select>
                        <button onClick={()=>{
                            setEditGoalType(false)
                            onClickingDone()
                            }}>Done</button>
                    </>
                }  
            </div>
            <div>
                <label> Goal Target </label>
                <h3>{goalTarget}</h3>
                {!editGoalTarget?
                    <button onClick={()=>setEditGoalTarget(true)}>Edit</button>
                :
                    <>
                        <input 
                            type="text" 
                            name="goalTarget" 
                            id="goalTarget" 
                            value={goalTarget} 
                            onChange={e=> setGoalTarget(e.target.value)} 
                            required
                        />
                        <button onClick={()=>{
                            setEditGoalTarget(false)
                            onClickingDone()
                            }}>Done</button>
                    </>
                }  
            </div>
            <div>
                <label> Goal Start Date </label>
                <h3>{goalStartDate}</h3>
                {!editGoalStartDate?
                    <button onClick={()=>setEditGoalStartDate(true)}>Edit</button>
                :
                    <>
                        <input type="date" name="goalStartDate" id="goalStartDate" value={goalStartDate} onChange={e=> setGoalStartDate(e.target.value)} required/>
                        <button onClick={()=>{
                            setEditGoalStartDate(false)
                            onClickingDone()
                            }}>Done</button>
                    </>
                }  
            </div>
            <div>
                <label> Goal End Date </label>
                <h3>{goalEndDate}</h3>
            </div>
{/*             how will the categories be looked for?
            <div>
                <label> Goal Categories </label>
                <h3>{goalCategories}</h3>
                {!editGoalCategories?
                    <button onClick={()=>setEditGoalCategories(true)}>Edit</button>
                :
                    <>
                        <input type="text" name="goalCategories" id="goalCategories" value={goalSetDate} onChange={e=> setGoalCategories(e.target.value)} required/>
                        <button onClick={()=>{
                            setEditGoalCategories(false)
                            onClickingDone()
                            }}>Done</button>
                    </>
                }  
            </div> */}
        </div>

    )
}

export default DistinctGoalPage;