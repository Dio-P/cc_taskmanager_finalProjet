import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../components/Menu";

const AddNewCategoryPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [colour, setColour] = useState(null);

    const location = useLocation();
    const categories = location.state.categories;
    const priorities = location.state.priorities;

    const onSubmit = (e) => {
        e.preventDefault();
        let newCategory = {colour: colour, title:title};
        console.log("newCategory", newCategory);////////////
        // post(, newCategory)

        // category object example
        // colour: "#FF0000"
        // goal: "WEEKLY"
        // goalDuration: 2
        // id: 2
        // title: "Project"
    }

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
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
            <form onSubmit={onSubmit}>
                <div>
                    <label> Title </label>
                    <h1>{ title }</h1>
                    <div>
                    <p>Choose a Title</p>
                        <input 
                            type="text" 
                            name="newTitle" 
                            value={title} 
                            onChange={(e)=> setTitle(e.target.value)}
                            />
                    </div>
                </div>
                <div>
                    <label> Colour </label>
                    <svg viewbox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill={colour}/>
                    </svg>
                    <div>
                        <p>Choose a colour</p>
                        <input 
                            type="color" 
                            name="newColour" 
                            value={colour} 
                            onChange={(e)=> setColour(e.target.value)}
                            />
                    </div>
                </div>
                <button type="submit"> Create </button>
            </form>
        </div>
    )
}

export default AddNewCategoryPage;