import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";

const DistinctGoalPage = ({ categories, priorities, goals, goalTypesList, users, updateAppMainStateFromComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [categoriesToDisplay, setCategoriesToDisplay] = useState([]);

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
  const [goalCategories, setGoalCategories] = useState([]);
  const [editGoalCategories, setEditGoalCategories] = useState(false);
  const [goalActive, setGoalActive] = useState(true);

  const { get, post, put } = useContext(RequestContext);

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
      type: goalType, 
      target: goalTarget, 
      startDate: goalStartDate,
      categories: goalCategories
    };
    console.log("updatedGoal", updatedGoal);/////////
    put(`goals/${goal.id}`, updatedGoal);
    updateAppMainStateFromComponent(updatedGoal);
    navigate("/");

  };

  return (
    <div>
      {!isMenuOpen ? (
        <>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
        </>
      ) : (
        <Menu
          closeMenuFunction={() => closeMenuFunction()}
          categories={categories}
          priorities={priorities}
        />
      )}
      <div>
        <label> Goal Title </label>
        <h3>{goalTitle}</h3>
        {!editGoalTitle ? (
          <button onClick={() => setEditGoalTitle(true)}>Edit</button>
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
            <button
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
      <div>
        <label> Goal Type </label>
        <h3>{goalType}</h3>
        {!editGoalType ? (
          <button onClick={() => setEditGoalType(true)}>Edit</button>
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
            <button
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
      <div>
        <label> Goal Target </label>
        <h3>{goalTarget}</h3>
        {!editGoalTarget ? (
          <button onClick={() => setEditGoalTarget(true)}>Edit</button>
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
            <button
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
      <div>
        <label> Goal Start Date </label>
        <h3>{goalStartDate}</h3>
        {!editGoalStartDate ? (
          <button onClick={() => setEditGoalStartDate(true)}>Edit</button>
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
            <button
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
      <div>
        <label> Goal End Date </label>
        <h3>{goalEndDate}</h3>
      </div>
      <div>
        <label> Goal Categories </label>
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
        
        {!editGoalCategories ? (
          <button onClick={() => setEditGoalCategories(true)}>Edit</button>
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
            <button
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
  );
};

export default DistinctGoalPage;
