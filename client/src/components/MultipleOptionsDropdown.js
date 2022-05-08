import { useState, useEffect } from "react";

const MultipleOptionsDropdown = ({ options, setOptionsFromDropDown, uiState }) => {
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
            console.log("optionshandler", optionshandler);////////
            setOptionshandler({...optionshandler, ...optionshandlerHelper});
        }   
    }, []);

    useEffect(() => {
        // console.log("optionshandler", optionshandler);//////////
        setOptionsFromDropDown(optionshandler)
    }, [optionshandler]);

    const onClick = (e) => {
        let option = e.target.value;
        setOptionshandler({
            ...optionshandler,
            [option]: {
                value: option,
                toDisplay: !optionshandler[option].toDisplay,
                checked: !optionshandler[option].checked
            }
            
        })
    }

    
    return(
        <ul className={uiState}>
            {optionshandler?
                options.map(option => (
                    <li className="checkbox"><input className="checkbox" type="checkbox" onClick={(e)=> onClick(e)} checked={optionshandler[option].checked} value={option} />{option}</li>
                    
                ))
            :
                null
            }
            

        </ul>
    )
}

export default MultipleOptionsDropdown;