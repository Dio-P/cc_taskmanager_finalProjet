const Menu = ({ closeMenuFunction }) => {
    return(
        <div>
            <ul className="MENU showMenuNav space-x-8 lg:flex">
            <button onClick={()=> closeMenuFunction()}>X</button>//////////
                <li>
                <a href="/profile">Profile</a>
            </li>
                <li>
                <a href="/">View Tasks</a>
            </li>
            
            <li>
                <a href="/">Add Tasks</a>
            </li>
            <li>
                <a href="/contact">Categories</a>
            </li>
            <li>
                <a href="/contact">Goals</a>
            </li>
            </ul>
            <style>{`
                .hideMenuNav {
                    display: none;
                }
                .showMenuNav {
                    display: block;
                    position: absolute;
                    width: 50%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
    `}</style>
        </div>
    )
}

export default Menu;

