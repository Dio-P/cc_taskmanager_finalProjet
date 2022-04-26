import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
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
        // post("categories", newCategory)

    }

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }


    return(
        <div>
            {!isMenuOpen?
                <>
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}><FaBars className='m-4' size='2rem'/></button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <p className='cat-header'>Create a New Category</p>
            <form onSubmit={onSubmit}>
                <div className='colour-section'>
                    <label className='font-semibold text-2xl'> Title </label>
                    <h1>{ title }</h1>
                    <div>
                         <p className='title-p text-xl'>Enter a title</p>
                         <input className='category-input'
                            type="text" 
                            name="newTitle" 
                            value={title} 
                            onChange={(e)=> setTitle(e.target.value)}
                            required
                            />
                    </div>
                </div>
                <div className='colour-section'>
                    <label className='font-semibold text-2xl'> Colour </label>
                    <div className='circle' style = {{backgroundColor: colour}}></div>
                        <p className='title-p text-xl'>Select a colour</p>
                         <input className='colour-selector'
                            type="color" 
                            name="newColour" 
                            value={colour} 
                            onChange={(e)=> setColour(e.target.value)}
                            required
                         />
                </div>
                <div className='colour-section'>
                    <button className='btn' type="submit"> Create </button>
                </div>
            </form>
        </div>
    )
}

export default AddNewCategoryPage;