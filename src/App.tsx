import Header from "./features/Header";
import React from 'react';
import css from './index.module.scss';

const App = () => {
    return (
        <div className={css.container}>

            <Header/>
        </div>
    );
}

export default App;
