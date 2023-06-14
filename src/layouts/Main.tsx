
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Main = () => {

    return (
        <>
            <Outlet />
        </>
    );
}

export default Main;