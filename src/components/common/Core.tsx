import * as React from 'react';
import { useEffect } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import useImageCaching from '../../lib/hooks/useImageCaching';

const Core: React.FunctionComponent = () => {
    useEffect(() => {
        // CALL IT ONCE IN YOUR APP
        injectStyle();
    }, [])

    useImageCaching();

    return (
        <div>
            <ToastContainer
                transition={Flip}
                position="top-right"
                autoClose={2000}
                closeOnClick
                pauseOnHover
            />
        </div>
    );
};

export default Core;