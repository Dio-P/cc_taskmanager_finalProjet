import { useLocation } from "react-router-dom";

const DropDownMenuPriority = ({ value, options, setValueFromDropDown }) => {
    // const location = useLocation();
    // const options = location.state.options;

    const sendChoosenValueUp = (e) => {
        e.preventDefault();
        let choosenOption = e.target.value;
        setValueFromDropDown(choosenOption);

        
    }

    return(
        <select value={value} onChange={e=>sendChoosenValueUp(e)} name="" id="">
            <option value="">Choose Priority</option>
            {options.map(option =>
                <option key={Math.random()} value={option}>{option}</option>)}
            
        </select>

    )
}

export default DropDownMenuPriority;