import { useLocation } from "react-router-dom";

const DropDownMenu = ({ options, setValueFromDropDown }) => {
    // const location = useLocation();
    // const options = location.state.options;

    const sendChoosenValueUp = (e) => {
        e.preventDefault();
        let choosenOption = e.target.value;
        setValueFromDropDown(choosenOption);

        
    }

    return(
        <select onChange={e=>sendChoosenValueUp(e)} name="" id="">
            <option value="">--Please choose an option--</option>
            {options.map(option =>
                <option value={option}>{option}</option>)}
            
        </select>

    )
}

export default DropDownMenu;