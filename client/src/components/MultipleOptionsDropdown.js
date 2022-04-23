import { useState, useEffect } from "react";

const MultipleOptionsDropdown = ({ options, setOptionsFromDropDown }) => {
    const [option, setOption] = useState();
    const [toDisplay, setToDisplay] = useState();

    const [optionshandler, setOptionshandler] = useState(null);

    useEffect(() => {
        const optionshandlerHelper = {};
        if(options){
            for(let option of options){
                optionshandlerHelper[option]= {
                                value: option,
                                toDisplay: true,
                                checked: true
                            }
            }
            console.log("optionshandler", optionshandler);
            setOptionshandler({...optionshandler, ...optionshandlerHelper});
        }   
    }, []);

    useEffect(() => {
        console.log("optionshandler", optionshandler);
        
    }, [optionshandler]);

    useEffect(() => {
        console.log("optionObject", {option: option, toDisplay: toDisplay});
        setOptionsFromDropDown({option: option, toDisplay: toDisplay})

    }, [option, toDisplay]);

    const onClick = (e) => {
        let option = e.target.value;
        // setOption(e.target.value)
        // setToDisplay(()=>!toDisplay)
        setOptionshandler({
            ...optionshandler,
            [option]: {
                value: option,
                toDisplay: !optionshandler[option].toDisplay,
                checked: !optionshandler[option].checked
            }
            
        })
        optionshandler[option].checked = !optionshandler.option.checked;
        e.checked=!e.checked
    }

    
    return(
        <ul>
            {optionshandler?
                options.map(option => (
                    <li><input type="checkbox" onClick={(e)=> onClick(e)} checked={optionshandler[option].checked} value={option} />{option}</li>
                    
                ))
            :
                null
            }
            

        </ul>
    )
}

export default MultipleOptionsDropdown;