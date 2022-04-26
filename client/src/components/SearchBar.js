const SearchBar = ({ categoriesToDisplay, onClickingAnOption }) => {
    return (
      <div>
        {categoriesToDisplay.map((option) => (
          <button key={option.id} onClick={(e) => onClickingAnOption(option, e)}>
            {option.title}
          </button>
        ))}
      </div>
    );
  };

  export default SearchBar;