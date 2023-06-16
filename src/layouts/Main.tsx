
import { useEffect, useState, Suspense } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Main = () => {

    return (
        <>
            <Suspense fallback={<p>Loading ...</p>} >
                <Outlet />
            </Suspense>
        </>
    );
}

export default Main;