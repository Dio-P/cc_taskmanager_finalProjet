import React, { useState, useEffect } from 'react';
import AllTasksContainer from './AllTasksContainer';

const WholeMainPageContainer= ({ uncompletedTasks, completedTasks }) => {
    return (
        <div>
            <button>Menu Button</button>
            <p>Hello Rachel</p>
            <AllTasksContainer uncompletedTasks={ uncompletedTasks } completedTasks={ completedTasks }/>

        </div>
    )
}

export default WholeMainPageContainer;