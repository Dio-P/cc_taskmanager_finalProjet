import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestContext from "../context/RequestContext";
import Menu from "../components/Menu";
import { FaBars } from "react-icons/fa";

const DistinctCategoryPage = ({ allTasks, categories, priorities, updateAppMainStateFromComponent }) => {
    const location = useLocation();
    const category = location.state.category;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(false);

    const [title, setTitle] = useState(null);
    const [categoryID, setCategoryID] = useState(category.id);
    const [editColour, setEditColour] = useState(false);
    const [colour, setColour] = useState(null);

    
    // const categories = location.state.categories;
    // const priorities = location.state.priorities;

    const { put, deleteElement } = useContext(RequestContext);
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(category.title);
        setColour(category.colour);
    }, [category]);

    const closeMenuFunction = () => {
        setIsMenuOpen(false);
    }

    const checkingIfAreTasksAssosiatedToCategory = () => {
        let allTasksCategoriesID = allTasks.map(task =>(
            task.category.id
        ))
        allTasksCategoriesID = new Set(allTasksCategoriesID)
        if(allTasksCategoriesID.includes(category.id)){
            return true
        }else{
            return false
        }
    }

    const onClickingDeleteCategory = () => {
        if(checkingIfAreTasksAssosiatedToCategory){
            alert("sorry, there are tasks assosiated with this category")
            
        }else {
            deleteElement("categories",categoryID)
            navigate("/categories")

        }
        
        
    }

    const onClickingDone = () => {
        let updatedCategory = {
            colour: colour, 
            title: title,
            id: categoryID
        };
        put(`categories/${category.id}`, updatedCategory);
        updateAppMainStateFromComponent(updatedCategory);
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
            <p className='cat-header'>{category.title}</p>
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
            <div className='flex flex-box py-15 justify-center m-7'>
                <label className='basis-1/3 font-semibold text-lg'>Colour</label>
                <div className='basis-1/3'>
                    <div className='circle' style = {{backgroundColor: colour}}></div>
                </div>
                {!editColour?
                        <button className='btn' onClick={()=> setEditColour(true)}>Edit</button>
                    :
                        <div>
                            <p className='colour-info'>Select colour</p>
                            <input className='colour-selector'
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
            <div>

                <button className='minus-cat-btn' onClick={onClickingDeleteCategory}>Delete</button>
            </div>
            

                <button className="create-btn" onClick={()=> navigate("/categories")}>
                    Back To Categories

                </button>
        </div>
        
    )
}

export default DistinctCategoryPage;