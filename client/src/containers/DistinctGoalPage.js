import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";
import { FaBars, FaMinus } from "react-icons/fa";

const DistinctGoalPage = ({ categories, priorities, goals, goalTypesList, users, updateAppMainStateFromComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);

  const [goalTitle, setGoalTitle] = useState(null);
  const [goalID, setGoalID] = useState(null);
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
  const [goalCategories, setGoalCategories] = useState([]);
  const [editGoalCategories, setEditGoalCategories] = useState(false);
  const [goalActive, setGoalActive] = useState(true);

  const { get, post, put, deleteElement } = useContext(RequestContext);

  const location = useLocation();
  const goal = location.state.goal;
  const endDate = location.state.endDate;
  const navigate = useNavigate();

  useEffect(() => {
    ///////
    console.log("goalTypesList Start", goalTypesList); //////
  }, []); ////////

  useEffect(() => {
    setGoalTitle(goal.title);
    setGoalID(goal.id);
    setGoalType(goal.type);
    setGoalTarget(goal.target);
    setGoalStartDate(goal.startDate);
    setGoalEndDate(endDate);
    console.log("!!!!!!!goal.categories", goal.categories);
    setGoalCategories(goal.categories); ////////
    setGoalActive(goal.active);
  }, [goal]);

  useEffect(() => {
    console.log("goalTypesList", goalTypesList); //////
    setGoalTypes(goalTypesList);
  }, [goalTypesList]);

  useEffect(() => {
    let categoriesToDisplay = categories.filter((category) => {
      return category.title.toLowerCase().match(searchInput);
    });
    setCategoriesToDisplay(categoriesToDisplay);
  }, [searchInput]);

//   useEffect(() => {
//       console.log("!!!!!!!!users", users);///////////
//   }, [users]);

  const closeMenuFunction = () => {
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  const onClickingACategory = (category, e) => {
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

  const onClickingDone = () => {
    let updatedGoal = { 
      title: goalTitle,
      id: goalID,
      type: goalType, 
      target: goalTarget, 
      startDate: goalStartDate,
      categories: goalCategories
    };
    console.log("updatedGoal", updatedGoal);/////////
    put(`goals/${goalID}`, updatedGoal);
    updateAppMainStateFromComponent(updatedGoal);

  };

  return (
    <div>
      {!isMenuOpen ? (
        <>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}><FaBars className='m-4' size='2rem'/></button>
        </>
      ) : (
        <Menu
          closeMenuFunction={() => closeMenuFunction()}
          categories={categories}
          priorities={priorities}
        />
      )}
      
      <p className='cat-header'>{goal.title}</p>
      <div className='flex flex-row py-1 justify-center m-7'>
        <label className='basis-1/3 font-semibold text-lg'> Title </label>
        <h3 className='basis-1/3 text-md italic ml-1'>{goalTitle}</h3>
        {!editGoalTitle ? (
          <button className='btn' onClick={() => setEditGoalTitle(true)}>Edit</button>
        ) : (
          <>
            <input
              type="text"
              name="goalTitle"
              id="goalTitle"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              required
            />
            <button className='btn'
              onClick={() => {
                setEditGoalTitle(false);
                onClickingDone();
              }}
            >
              Done
            </button>
          </>
        )}
      </div>
      <div className='flex flex-row py-1 justify-center m-7'>
        <label className='basis-1/3 font-semibold text-lg'> Type </label>
        <h3 className='basis-1/3 text-md italic'>{goalType}</h3>
        {!editGoalType ? (
          <button className='btn' onClick={() => setEditGoalType(true)}>Edit</button>
        ) : (
          <>
            <select
              name="goalType"
              id="goalType"
              onChange={(e) => setGoalType(e.target.value)}
            >
              {goalTypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
            <button className='btn'
              onClick={() => {
                setEditGoalType(false);
                onClickingDone();
              }}
            >
              Done
            </button>
          </>
        )}
      </div>
      <div className='flex flex-row py-1 justify-center m-7'>
        <label className='basis-1/3 font-semibold text-lg'> Target </label>
        <h3 className='basis-1/3 text-lg italic'>{goalTarget}</h3>
        {!editGoalTarget ? (
          <button className='btn' onClick={() => setEditGoalTarget(true)}>Edit</button>
        ) : (
          <>
            <input
              type="text"
              name="goalTarget"
              id="goalTarget"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              required
            />
            <button className='btn'
              onClick={() => {
                setEditGoalTarget(false);
                onClickingDone();
              }}
            >
              Done
            </button>
          </>
        )}
      </div>
      <div className='flex flex-row py-1 justify-center m-7'>
        <label className='basis-1/3 font-semibold text-lg'> Start Date </label>
        <h3 className='basis-1/3 text-md italic'>{goalStartDate}</h3>
        {!editGoalStartDate ? (
          <button className='btn' onClick={() => setEditGoalStartDate(true)}>Edit</button>
        ) : (
          <>
            <input
              type="date"
              name="goalStartDate"
              id="goalStartDate"
              value={goalStartDate}
              onChange={(e) => setSearchInput(e.target.value)}
              required
            />
            <button className='btn'
              onClick={() => {
                setEditGoalStartDate(false);
                onClickingDone();
              }}
            >
              Done
            </button>
          </>
        )}
      </div>
      <div className='flex flex-row py-1 justify-center m-7'>
        <label className='basis-1/3 font-semibold text-lg'>End Date </label>
        <h3 className='basis-1/3 text-md italic'>{goalEndDate}</h3>
        {!editGoalEndDate ? (
          <button className='btn' onClick={() => setEditGoalEndDate(true)}>Edit</button>
        ) : (
          <>
            <input
              type="date"
              name="goalEndDate"
              id="goalEndDate"
              value={goalEndDate}
              onChange={(e) => setSearchInput(e.target.value)}
              required
            />
            <button className='btn'
              onClick={() => {
                setEditGoalEndDate(false);
                onClickingDone();
              }}
            >
              Done
            </button>
          </>
        )}
      </div>
     
      <div className='flex flex-row py-1 justify-center m-7'>
        <label className='basis-1/2 font-semibold text-lg'>Category </label>
        <div className=''>
          {goalCategories.length > 0 &&
            Object.values(goalCategories).map((goalCategory) => (
              <div className='cat-dist flex flex-row py-1 justify-center m-7'>
                <p className='basis-1/3 -ml-14 mt-1'>{goalCategory.title} </p>
                <button className='minus-goal-cat' key={goalCategory.id} onClick={() => removeGoalCategory(goalCategory.id)}>
                X
                </button>
              </div>
            ))}
        </div>
        <div className='flex flex-row py-1 justify-center m-7'>
        {!editGoalCategories ? (
          <button className='btn basis-1/1' onClick={() => setEditGoalCategories(true)}>Edit</button>
        ) : (
          <>
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
            <button className='btn'
              onClick={() => {
                setEditGoalCategories(false);
                onClickingDone();
              }}
            >
              Done
            </button>
          </>
          
        
        )}
        </div>
      </div>
      <div>
        <button className='minus-goal-cat' onClick={()=>{
          deleteElement("goals", goalID)
          navigate("/goals")
          }}>X</button>
      </div>
      <div>
        <button className="create-goal-btn" onClick={()=>navigate("/goals")}>Back To Goals</button>
      </div>
    </div>
  );
};

export default DistinctGoalPage;
