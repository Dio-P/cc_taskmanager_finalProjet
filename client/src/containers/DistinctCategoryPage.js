import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";
import { FaBars } from "react-icons/fa";

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
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}><FaBars className='m-4' size='2rem'/></button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <div className='flex flex-row py-10 justify-center m-7'>
                <label className='basis-1/3 font-semibold text-lg'>Title</label>
                <h1 className='basis-1/3 text-lg italic'>{ title }</h1>
                    {!editTitle?
                        <button className='btn' onClick={()=> setEditTitle(true)}>Edit</button>
                    :
                        <div>
                            <input className='title-field'
                                type="text" 
                                name="newTitle" 
                                value={title} 
                                onChange={(e)=> setTitle(e.target.value)}
                                required
                                />
                            <button className="btn" onClick={()=> {
                                setEditTitle(false)
                                onClickingDone()
                                }}>Done</button>
                        </div>
                        
                    }
            </div>
            <div className='flex flex-box py-10 justify-center m-7'>
                <label className='basis-1/3 font-semibold text-lg'>Colour</label>
                <div className='basis-1/3'>
                    <div className='circle' style = {{backgroundColor: {colour}}}></div>
                </div>
                {!editColour?
                        <button className='btn' onClick={()=> setEditColour(true)}>Edit</button>
                    :
                        <div>
                            <p className='text-lg'>Select colour</p>
                            <input 
                                type="color" 
                                name="newColour" 
                                value={colour} 
                                onChange={(e)=> setColour(e.target.value)}
                                required
                                />
                            <button className='btn' onClick={()=> {
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