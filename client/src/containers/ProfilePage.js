import { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import Menu from '../components/Menu';
import RequestContext from '../context/RequestContext';

const ProfilePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // substitute the one under to the actual user object value
    const [firstName, setFirstName] = useState(null);
    const [editFirstName, setEditFirstName] = useState(false);
    // substitute the one under to the actual user object value
    const [lastName, setLastName] = useState(null);
    const [editLastName, setEditLastName] = useState(false);

    const location = useLocation();
    const categories = location.state.categories;
    const priorities = location.state.priorities;
    const {get, post} = useContext(RequestContext);

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

    const sendInfoDb = () => {
        let profileInfo = { firstName, lastName }
        console.log("profileInfo", profileInfo);///////
        // post( ,profileInfo)
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
                    <button onClick={()=> setEditFirstName(true)}> Edit </button>
                :
                <>
                    <p>{ !firstName? "Choose a name" : "Choose a new name" } </p>
                    <input type="text" id="firstName" name="firstName" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                    <button onClick={() => {
                            sendInfoDb()
                            setEditFirstName(false)
                        }}> Done </button>
                </>
                }
            </div>
            <div>
                <label htmlFor="lastName"> Last Name </label>
                {!editLastName?
                    <button onClick={()=> setEditLastName(true)}> Edit </button>
                :
                    <>
                        <p>{ !firstName? "Choose a name" : "Choose a new name" } </p>
                        <input type="text" id="lastName" name="lastName" onChange={e => setLastName(e.target.value)} value={lastName}/>
                        <button onClick={() => {
                            sendInfoDb()
                            setEditLastName(false)
                        }}> Done </button>
                    </>
                }
            </div>

        </div>

    ) 
}

export default ProfilePage;