import React, { useState, useEffect } from 'react';
import AllTasksContainer from './AllTasksContainer';

const WholeMainPageContainer= ({ uncompletedTasks }) => {
    return (
        <div>
            <button>Menu Button</button>
            <p>Hello Rachel</p>
            <AllTasksContainer uncompletedTasks={ uncompletedTasks }/>

        </div>
    )
}

export default WholeMainPageContainer;