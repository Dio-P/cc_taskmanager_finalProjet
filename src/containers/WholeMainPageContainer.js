import React, { useState, useEffect } from 'react';
import WholeViewContainer from './AllTasksContainer';

const WholeMainPageContainer= ({ uncompletedTasks }) => {
    return (
        <div>
            <button>Menu Button</button>
            <p>Hello Rachel</p>
            <WholeViewContainer uncompletedTasks={ uncompletedTasks }/>

        </div>
    )
}

export default WholeMainPageContainer;