import { useLocation } from "react-router-dom";

const DropDownMenuCategory = ({ options, setValueFromDropDown }) => {
    // const location = useLocation();
    // const options = location.state.options;

    const sendChoosenValueUp = (e) => {
        e.preventDefault();
        let choosenOption = e.target.value;
        setValueFromDropDown(choosenOption);

        
    }

    return(
        <select onChange={e=>sendChoosenValueUp(e)}>
            <option>Choose Category</option>
            {options.map(option =>
                <option key={Math.random()} value={option.title}>{option.title}</option>)}
            
        </select>

    )
}

export default DropDownMenuCategory;