import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
    const navigate = useNavigate();

    const goToDistinctCategoryPage = () => {
        navigate(`/category/:${category.title}`, {
            state:{
                category: category
            }
        });
        
    }

    return(
        <div>
            <h1>
                <button onClick={ goToDistinctCategoryPage } >{category.title}</button>
            </h1>
        </div>
    )
}

export default Category;