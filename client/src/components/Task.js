
const Task = ({ title }) => {

    const onTaskClick = () => {
        console.log("a task has been clicked");
    }

    return (<div>
                <input type="checkbox" id="horns" name="horns"/>
                <label for="horns"> <button onClick={onTaskClick}>{ title }</button> </label>
            </div>
      )
}

export default Task;
