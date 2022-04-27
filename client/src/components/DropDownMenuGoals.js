import { useLocation } from "react-router-dom";

const DropDownMenuPriority = ({ options, setValueFromDropDown }) => {
    // const location = useLocation();
    // const options = location.state.options;

    const sendChoosenValueUp = (e) => {
        e.preventDefault();
        let choosenOption = e.target.value;
        setValueFromDropDown(choosenOption);

        
    }

    return(
        <select onChange={e=>sendChoosenValueUp(e)}>
            <option>Choose Goal</option>
            {options.map(option =>
                <option key={Math.random()} value={option}>{option}</option>)}
            
        </select>

    )
}

export default DropDownMenuPriority;