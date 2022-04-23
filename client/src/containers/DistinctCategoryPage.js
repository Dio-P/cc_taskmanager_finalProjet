import { useLocation } from "react-router-dom";

const DistinctCategoryPage = () => {
    const location = useLocation();
    const category = location.state.category;

    return (
        <div>
            <div>
                <label> Title </label>
                <h1>{ category.title }</h1>
            </div>
            <div>
                <label> Colour </label>
                <svg viewbox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill={category.colour}/>
                </svg>
            </div>
        </div>
    )
}

export default DistinctCategoryPage;