import { useLocation } from "react-router-dom";

const DropDownMenuCategory = ({ value, options, setValueFromDropDown }) => {
    // const location = useLocation();
    // const options = location.state.options;

    const sendChoosenValueUp = (e) => {
        e.preventDefault();
        let choosenOption = e.target.value;
        setValueFromDropDown(choosenOption);

        
    }

    return(
        <select value={value} onChange={e=>sendChoosenValueUp(e)}>
            <option>Choose Category</option>
            {options.map(option =>
                <option key={option.title} value={option.title}>{value}</option>)}
            
        </select>

    )
}

export default DropDownMenuCategory;