import Category from "../components/Category";

const AllCategoriesContainerForCatPage = ({ categories,priorities }) => {
    return(
        <div>
            {categories.map(category=>(
                <Category category={category}/>
            ))}
        </div>
    )
}

export default AllCategoriesContainerForCatPage;