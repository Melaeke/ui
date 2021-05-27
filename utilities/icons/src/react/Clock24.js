import * as React from 'react'
import propTypes from '@dhis2/prop-types'

function SvgClock24({ color }) {
    return (
        <svg
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            color={color}
        >
            <path
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm1 2v5.585l2.707 2.708-1.414 1.414L11 12.414V6z"
                fill="currentColor"
            />
        </svg>
    )
}

SvgClock24.propTypes = {
    color: propTypes.string,
}
export default SvgClock24
