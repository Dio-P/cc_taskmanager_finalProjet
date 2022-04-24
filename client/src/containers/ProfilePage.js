import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Menu from '../components/Menu';

const ProfilePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [editFirstName, setEditFirstName] = useState(false)
    const [lastName, setLastName] = useState(null);
    const [editLastName, setEditLastName] = useState(false);

    const location = useLocation();
    const categories = location.state.categories;
    const priorities = location.state.priorities;

    useEffect(() => {
        if(!firstName){
            setEditFirstName(true);
        }
        if(!lastName){
            setEditLastName(true);
        }

    }, []);

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
            <p> User Profile </p>
            <div>
                <label htmlFor="firstName"> First Name </label>
                {!editFirstName?
                    <button onClick={setEditFirstName(true)}> Edit </button>
                :
                <>
                    <p>{ !firstName? "Choose a name" : "Choose a new name" } </p>
                    <input type="text" id="firstName" name="firstName" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                </>
                }
            </div>
            <div>
                <label htmlFor="lastName"> Last Name </label>
                {!editLastName?
                    <button onClick={setEditLastName(true)}> Edit </button>
                :
                    <>
                        <p>{ !firstName? "Choose a name" : "Choose a new name" } </p>
                        <input type="text" id="lastName" name="lastName" onChange={e => setLastName(e.target.value)} value={lastName}/>
                    </>
                }
            </div>

        </div>

    ) 
}

export default ProfilePage;