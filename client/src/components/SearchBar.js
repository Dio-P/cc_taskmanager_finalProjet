const SearchBar = ({ categoriesToDisplay, onClickingAnOption }) => {
    return (
      <div>
        {categoriesToDisplay.map((option) => (
          <button key={option.id} onClick={() => onClickingAnOption(option)}>
            {option.title}
          </button>
        ))}
      </div>
    );
  };

  export default SearchBar;