import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import DropDownMenuCategory from "../components/DropDownMenuCategory";
import DropDownMenuPriority from "../components/DropDownMenuPriority";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";

const AddNewGoalPage = ({ categories, priorities, goals, goalTypesList, updateAppMainStateFromComponent }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const [goalTitle, setGoalTitle] = useState(null);
    const [goalSetDate, setGoalSetDate] = useState(null);
    const [goalType, setGoalType] = useState(null);
    const [goalTarget, setGoalTarget] = useState(null);
    const [goalStartDate, setGoalStartDate] = useState(null);
    const [goalEndDate, setGoalEndDate] = useState(null);
    const [goalCategories, setGoalCategories] = useState([]);
    const [editGoalCategories, setEditGoalCategories] = useState(false);
    const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);
    const [goalActive, setGoalActive] = useState(true);

    const {get, post} = useContext(RequestContext);
    const navigate = useNavigate();


    useEffect(() => {
        let categoriesToDisplay = categories.filter((category) => {
          return category.title.toLowerCase().match(searchInput);
        });
        setCategoriesToDisplay(categoriesToDisplay);
      }, [searchInput]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value.toLowerCase());
      };

    const onClickingACategory = (category,e) => {
        e.preventDefault();
        const existingCategoryIDs = 
        Object.values(goalCategories).map(category => (
        category.id
        ));
        if(existingCategoryIDs.includes(category.id)){
            alert("this category has already been added")
        }else{
            setGoalCategories([...goalCategories, category]);
        }
        setSearchInput("");
    
      };
    
    const removeGoalCategory = (categoryID) => {
    const updatedCategories = goalCategories.filter(
        (category) => category.id !== categoryID
    );
    setGoalCategories(updatedCategories);
    };


    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const onClickingDone = (e) => {
        e.preventDefault();
        let newGoal = {
            title: goalTitle, 
            type: goalType, 
            target: goalTarget, 
            startDate: goalStartDate,
            categories: goalCategories
        };
        // console.log("updatedGoal", newGoal);/////////////
        post("goals", newGoal);/////
        updateAppMainStateFromComponent(newGoal);
        navigate("/goals");
    }
        
    return(
        <form onSubmit={onClickingDone}>
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
            <div>
                <label> Categories </label>
                <div>
                {goalCategories.length > 0 &&
                    Object.values(goalCategories).map((goalCategory) => (
                    <div>
                        <p>{goalCategory.title} </p>
                        <button key={goalCategory.id} onClick={() => removeGoalCategory(goalCategory.id)}>
                        X
                        </button>
                    </div>
                    ))}
                </div>
                <input
                type="text"
                placeholder="Search For Category Here"
                onChange={handleChange}
                value={searchInput}
                />
                {searchInput.length > 0 
                && 
                <SearchBar
                    onClickingAnOption={ (category, e)=> onClickingACategory(category, e) }
                    optionsToDisplay={ categoriesToDisplay }
                />}
            </div>
            <button type="submit"> Create New Goal </button>
        </form>
    )
}

export default AddNewGoalPage;
