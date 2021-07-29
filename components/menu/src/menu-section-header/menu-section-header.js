import { Divider } from '@dhis2-ui/divider'
import { colors, spacers } from '@dhis2/ui-constants'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const MenuSectionHeader = ({
    className,
    dataTest,
    dense,
    hideDivider,
    label,
}) => (
    <li data-test={dataTest} className={cx(className, { dense })}>
        {!hideDivider && <Divider dense={dense} />}

        <h6>{label}</h6>

        <style jsx>{`
            li {
                list-style: none;
                background-color: ${colors.white};
                user-select: none;
                padding: 0;
                line-height: 0;
            }
            h6 {
                margin: 0;
                padding: ${spacers.dp8} ${spacers.dp24} ${spacers.dp12}
                    ${spacers.dp24};
                font-size: 15px;
                line-height: 16px;
                font-weight: 500;
                color: ${colors.grey600};
            }
            li.dense h6 {
                font-size: 14px;
                line-height: 16px;
                padding: ${spacers.dp8} ${spacers.dp12} 6px ${spacers.dp12};
            }
        `}</style>
    </li>
)

MenuSectionHeader.defaultProps = {
    dataTest: 'dhis2-uicore-menusectionheader',
}

MenuSectionHeader.propTypes = {
    className: PropTypes.string,
    dataTest: PropTypes.string,
    dense: PropTypes.bool,
    hideDivider: PropTypes.bool,
    label: PropTypes.node,
}

export { MenuSectionHeader }
