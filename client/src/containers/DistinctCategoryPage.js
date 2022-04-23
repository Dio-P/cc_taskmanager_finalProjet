import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DistinctCategoryPage = () => {
    const [editTitle, setEditTitle] = useState(false);
    const [title, setTitle] = useState(null);
    const [editColour, setEditColour] = useState(false);
    const [colour, setColour] = useState(null);

    const location = useLocation();
    const category = location.state.category;

    useEffect(() => {
        setTitle(category.title)
        
    }, [category]);

    return (
        <div>
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
                                />
                            <button onClick={()=> setEditTitle(false)}>Done</button>
                        </div>
                        
                    }
            </div>
            <div>
                <label> Colour </label>
                <svg viewbox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill={category.colour}/>
                </svg>
                {!editColour?
                        <button onClick={()=> setEditColour(true)}>Edit</button>
                    :
                        <div>
                            <p>Here needs to be added a dropdown with all the colours</p>
                            {/* <input 
                                type="text" 
                                name="newTitle" 
                                value={title} 
                                onChange={(e)=> setTitle(e.target.value)}
                                /> */}
                            <button onClick={()=> setEditColour(false)}>Done</button>
                        </div>
                        
                    }
            </div>
        </div>
    )
}

export default DistinctCategoryPage;