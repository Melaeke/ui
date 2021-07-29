import propTypes from '@dhis2/prop-types'
import { spacers } from '@dhis2/ui-constants'
import React from 'react'

export const ModalActions = ({ children, dataTest }) => (
    <div data-test={dataTest}>
        {children}

        <style jsx>{`
            div {
                padding: 0 ${spacers.dp24} ${spacers.dp24} ${spacers.dp24};
                display: flex;
                justify-content: flex-end;
            }
        `}</style>
    </div>
)

ModalActions.defaultProps = {
    dataTest: 'dhis2-uicore-modalactions',
}

ModalActions.propTypes = {
    children: propTypes.node,
    dataTest: propTypes.string,
}
