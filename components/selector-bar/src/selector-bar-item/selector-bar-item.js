import { Card } from '@dhis2-ui/card'
import { Layer } from '@dhis2-ui/layer'
import { Popper } from '@dhis2-ui/popper'
import { Tooltip } from '@dhis2-ui/tooltip'
import { colors, spacers } from '@dhis2/ui-constants'
import { IconChevronUp24, IconChevronDown24 } from '@dhis2/ui-icons'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'

const offsetModifier = {
    name: 'offset',
    options: {
        offset: [0, 2],
    },
}

const SelectorBarItemTooltip = ({ tooltipContent, children }) => {
    if (!tooltipContent) {
        return children
    }

    return (
        <Tooltip content={tooltipContent}>
            {({ ref, onMouseOver, onMouseOut }) => (
                <div
                    ref={ref}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                >
                    {children}
                </div>
            )}
        </Tooltip>
    )
}

SelectorBarItemTooltip.propTypes = {
    children: PropTypes.any.isRequired,
    tooltipContent: PropTypes.string,
}

/**
 * The reason this component expects the "open" state and "setOpen" function is
 * because certain actions inside the props.children might have to set "open"
 * to false as well.
 * A good example is selecting a value (which is not a click outside) and this
 * component neither has any control over that component nor does it have a way
 * to "observe" that behavior. Especially for selection bar items that allow
 * "multiple" selections, this would be more or less impossible to predict
 * inside this component
 */
export const SelectorBarItem = ({
    open,
    setOpen,
    children,
    disabled,
    label,
    value,
    tooltipContent,
    noValueMessage,
}) => {
    const buttonRef = useRef()
    const Icon = open ? IconChevronUp24 : IconChevronDown24

    return (
        <SelectorBarItemTooltip tooltipContent={tooltipContent}>
            <button
                ref={buttonRef}
                className="selector-bar-item"
                disabled={disabled}
                onClick={() => setOpen(true)}
            >
                <span className="label">{label}</span>

                {!disabled && (
                    <span className="value">{value || noValueMessage}</span>
                )}

                <span className="toggle-icon">
                    <Icon />
                </span>

                {open && (
                    <Layer
                        onClick={(_, evt) => {
                            evt.stopPropagation()
                            setOpen(false)
                        }}
                    >
                        <Popper
                            reference={buttonRef}
                            placement="bottom-end"
                            modifiers={[offsetModifier]}
                        >
                            <Card>{children}</Card>
                        </Popper>
                    </Layer>
                )}

                <style jsx>{`
                    .selector-bar-item {
                        display: flex;
                        cursor: pointer;
                        background: none;
                        height: 40px;
                        align-items: center;
                        ${
                            /*
                             * The arrow icon has ~4px empty space on the sides,
                             * that's why the padding on the right is only 8px.
                             */ ''
                        }
                        padding: 0 ${spacers.dp8} 0 ${spacers.dp12};
                        font-size: 14px;
                        line-height: 16px;
                        border: none;
                        box-shadow: 0px 0px 0px 1px ${colors.grey400};
                    }

                    .selector-bar-item:disabled {
                        cursor: not-allowed;
                    }

                    .label {
                        color: ${colors.grey600};
                    }

                    .value {
                        padding-left: ${spacers.dp8};
                    }

                    .toggle-icon {
                        display: flex;
                        margin-left: ${spacers.dp4};
                        height: 100%;
                        align-items: center;
                    }
                `}</style>
            </button>
        </SelectorBarItemTooltip>
    )
}

SelectorBarItem.propTypes = {
    children: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    noValueMessage: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    tooltipContent: PropTypes.any,
    value: PropTypes.string,
}
