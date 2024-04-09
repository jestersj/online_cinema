import React from 'react';
import AppRouter from "@/AppRouter";
import Navbar from "@/components/Navbar/Navbar";

const App = () => {
    return (
        <>
            <Navbar/>
            <AppRouter/>
        </>
    );
};

export default App;