import Category from "../components/Category";

const AllCategoriesContainerForCatPage = ({ categories,priorities }) => {
    return(
        <div>
            {categories.map(category=>(
                <Category
                    category={ category }
                    categories={ categories }
                    priorities={ priorities }
                />
            ))}
        </div>
    )
}

export default AllCategoriesContainerForCatPage;