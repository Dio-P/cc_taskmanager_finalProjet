import { useState, useEffect, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
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
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)}><FaBars className='m-4' size='2rem'/></button>
                </>
            :
                <Menu
                    closeMenuFunction={ ()=>closeMenuFunction() }
                    categories={ categories }
                    priorities={ priorities }
                />
            }
            <p className='cat-header'>User Profile</p>
            <div>
                <label className='font-semibold text-2xl' htmlFor="firstName">First Name</label>
                {!editFirstName?
                    <button onClick={()=> setEditFirstName(true)}>Edit</button>
                :
                <>
                    <p className='title-p text-xl'>{ !firstName? "Choose a name" : "Choose a new name" } </p>
                    <input className='category-input' type="text" id="firstName" name="firstName" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                    <button onClick={() => {
                            sendInfoDb()
                            setEditFirstName(false)
                        }}> Done </button>
                </>
                }
            </div>
            <div>
                <label className='font-semibold text-2xl' htmlFor="lastName"> Last Name </label>
                {!editLastName?
                    <button className='btn' onClick={()=> setEditLastName(true)}> Edit </button>
                :
                    <>
                        <p className='title-p text-xl'>{ !firstName? "Choose a name" : "Choose a new name" } </p>
                        <input className='category-input' type="text" id="lastName" name="lastName" onChange={e => setLastName(e.target.value)} value={lastName}/>
                        <button className='btn' onClick={() => {
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