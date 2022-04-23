import Category from "../components/Category";

const AllCategoriesContainerForCatPage = ({ categories,priorities }) => {
    return(
        <div>
            <h1>
                Hello From all categories container
            </h1>
            {categories.map(category=>(
                <Category category={category}/>
            ))}
        </div>
    )
}

export default AllCategoriesContainerForCatPage;