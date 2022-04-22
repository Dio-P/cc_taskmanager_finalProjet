const MultipleOptionsDropdown = ({ options }) => {
    return(
        <ul>
            {options.map(option => (
                <li><input type="checkbox"/>{option}</li>
                
            ))}
            

        </ul>
    )
}

export default MultipleOptionsDropdown;