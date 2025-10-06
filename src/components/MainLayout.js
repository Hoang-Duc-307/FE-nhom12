import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import HeaderComponent from './HeaderComponent/HeaderComponent';
import FooterComponent from './FooterComponent/FooterComponent';
import * as enumsSlice from "../redux/Slice/enumsSlice";
import * as productSlice from "../redux/Slice/productSlice";

const MainLayout = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(enumsSlice.fetchEnums());
        dispatch(enumsSlice.fetchThongtin())
        dispatch(productSlice.fetchProductsCline())
    }, [dispatch]);
    return (
        <>
            <HeaderComponent />
                <main>{children}</main>
            <FooterComponent />
        </>
    );
};

export default MainLayout;