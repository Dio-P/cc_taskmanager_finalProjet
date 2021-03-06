import { useNavigate } from "react-router-dom";

const Category = ({ category, categories, priorities }) => {
    const navigate = useNavigate();

    const goToDistinctCategoryPage = () => {
        navigate(`/category/${category.id}`, {
            state:{
                category: category,
                categories: categories,
                priorities: priorities
            }
        });
        
    }

    return(
        <div>
            <h1>
                <button className="category" onClick={ goToDistinctCategoryPage } >{category.title}</button>
            </h1>
        </div>
    )
}

export default Category;