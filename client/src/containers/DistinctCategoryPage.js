import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";

const DistinctCategoryPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(false);
    const [title, setTitle] = useState(null);
    const [editColour, setEditColour] = useState(false);
    const [colour, setColour] = useState(null);

    const location = useLocation();
    const category = location.state.category;
    const categories = location.state.categories;
    const priorities = location.state.priorities;
    const {get, post} = useContext(RequestContext);

    useEffect(() => {
        setTitle(category.title);
        setColour(category.colour);
        
    }, [category]);

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const onClickingDone = () => {
        let updatedCategory = {colour: colour, title:title};
        console.log("updatedCategory", updatedCategory);////////////
        // post(, newCategory)

        // category object example
        // colour: "#FF0000"
        // goal: "WEEKLY"
        // goalDuration: 2
        // id: 2
        // title: "Project"
    }

    return (
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
                <label> Title </label>
                <h1>{ title }</h1>
                    {!editTitle?
                        <button onClick={()=> setEditTitle(true)}>Edit</button>
                    :
                        <div>
                            <input 
                                type="text" 
                                name="newTitle" 
                                value={title} 
                                onChange={(e)=> setTitle(e.target.value)}
                                required
                                />
                            <button onClick={()=> {
                                setEditTitle(false)
                                onClickingDone()
                                }}>Done</button>
                        </div>
                        
                    }
            </div>
            <div>
                <label> Colour </label>
                <svg viewbox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill={colour}/>
                </svg>
                {!editColour?
                        <button onClick={()=> setEditColour(true)}>Edit</button>
                    :
                        <div>
                            <p>Choose a new colour</p>
                            <input 
                                type="color" 
                                name="newColour" 
                                value={colour} 
                                onChange={(e)=> setColour(e.target.value)}
                                required
                                />
                            <button onClick={()=> {
                                setEditColour(false)
                                onClickingDone()
                                }}>Done</button>
                        </div>
                        
                    }
            </div>
        </div>
    )
}

export default DistinctCategoryPage;