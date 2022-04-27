const SearchBar = ({ optionsToDisplay, onClickingAnOption }) => {
    return (
      <div>
        {optionsToDisplay.map((option) => (
          <button key={option.id} onClick={(e) => onClickingAnOption(option, e)}>
            {option.title? option.title: <div>{option.firstName} {option.lastName}</div>}
          </button>
        ))}
      </div>
    );
  };

  export default SearchBar;