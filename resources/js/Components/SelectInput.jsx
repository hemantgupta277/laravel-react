import { forwardRef, useImperativeHandle, useRef } from 'react';

export default forwardRef(function SelectInput(
    { className = '', children, ...props },
    ref,
) {
    const localRef = useRef(null);

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-pink-700 focus:ring-pink-700 ' +
                className
            }
            ref={localRef}
        >
            {children}
        </select>
    );
});
