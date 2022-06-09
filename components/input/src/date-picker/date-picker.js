import { theme, colors, spacers, sharedPropTypes } from '@dhis2/ui-constants'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import css from 'styled-jsx/css'

import { Calendar, Day } from './utils/CalendarGregorian.js'
import { CalendarEthiopian, DayEthiopian } from './utils/CalendarEthiopian'


export function gregorianToEthiopian(gregorianDateInString) {
    let dateInGregorian = new Date(gregorianDateInString)
    let dateInEthiopian = new DayEthiopian(dateInGregorian)
    return dateInEthiopian.toIsoString()
}


const styles = css`
    .input {
        display: flex;
        align-items: center;
        gap: ${spacers.dp8};
    }

    input {
        box-sizing: border-box;

        font-size: 14px;
        line-height: 16px;
        user-select: text;

        color: ${colors.grey900};
        background-color: white;

        padding: 12px 11px 10px;

        outline: 0;
        border: 1px solid ${colors.grey500};
        border-radius: 3px;
        box-shadow: inset 0 1px 2px 0 rgba(48, 54, 60, 0.1);
        text-overflow: ellipsis;
    }

    input.dense {
        padding: 8px 11px 6px;
    }

    input:focus {
        outline: none;
        box-shadow: inset 0 0 0 2px ${theme.focus};
        border-color: ${theme.focus};
    }

    input.warning {
        border-color: ${theme.warning};
    }

    input.error {
        border-color: ${theme.error};
    }

    input.read-only {
        background-color: ${colors.grey050};
        border-color: ${colors.grey300};
        box-shadow: none;
        cursor: text;
    }

    input.disabled {
        background-color: ${colors.grey100};
        border-color: ${colors.grey500};
        color: ${theme.disabled};
        cursor: not-allowed;
    }

    
      
      .date-toggle {
        padding: 8px 15px;
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: #eee;
        color: #333;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        text-transform: capitalize;
      }
      
      .calendar-dropdown {
        display: none;
        width: 300px;
        height: 300px;
        position: absolute;
        transform: translate(0, 8px);
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 8px rgba(0,0,0,0.2);
      }
      
      .calendar-dropdown.top {
        top: auto;
        bottom: 100%;
        transform: translate(-50%, -8px);
      }
      
      .calendar-dropdown.left {
        top: 50%;
        left: 0;
        transform: translate(calc(-8px + -100%), -50%);
      }
      
      .calendar-dropdown.right {
        top: 50%;
        left: 100%;
        transform: translate(8px, -50%);
      }
      
      .calendar-dropdown.visible {
        display: block;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 30px;
      }
      
      .header h4 {
        margin: 0;
        text-transform: capitalize;
        font-size: 21px;
        font-weight: bold;
      }
      
      .header button {
        padding: 0;
        border: 8px solid transparent;
        width: 0;
        height: 0;
        border-radius: 2px;
        border-top-color: #222;
        transform: rotate(90deg);
        cursor: pointer;
        background: none;
        position: relative;
      }
      
      .header button::after {
        content: '';
        display: block;
        width: 25px;
        height: 25px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      .header button:last-of-type {
        transform: rotate(-90deg);
      }
      
      .week-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        margin-bottom: 10px;
      }
      
      .week-days span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        text-transform: capitalize;
      }
      
      .month-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
      }
      
      .month-day {
        padding: 8px 5px;
        background: #c7c9d3;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        cursor: pointer;
        border: none;
      }
      
      .month-day.current {
        background: #444857;
      }
      
      .month-day.selected {
        background: #28a5a7;
        color: #ffffff;
      }
      
      .month-day:hover {
        background: #34bd61;
      }

      .disabled {
        background-color: ${colors.grey100};
        border-color: ${colors.grey500};
        color: ${theme.disabled};
        cursor: not-allowed !important;
    }
`

export class DatePicker extends Component {

    constructor(props) {
        super()
        const lang = window.navigator.language;

        let date
        let calendar
        let timeoutId
        if (props.calendar === "ethiopian") {
            date = new DayEthiopian(props.value ? props.value : null)
            calendar = new CalendarEthiopian(date ? date.year : null, date ? date.monthNumber - 1 : null, lang)
        } else {
            date = new Day()
            calendar = new Calendar(date ? date.year : null, date ? date.monthNumber - 1 : null, lang)
        }

        this.state = {
            date: date,
            calendar: calendar,
            visible: false
        }
    }

    componentDidMount() {
        if (this.props.initialFocus) {
            this.inputRef.current.focus()
        }
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.createHandlerPayload(e), e)
        }
    }

    handleBlur = (e) => {
        if (this.props.onBlur) {
            this.props.onBlur(this.createHandlerPayload(e), e)
        }
    }

    handleFocus = (e) => {
        if (this.props.onFocus) {
            this.props.onFocus(this.createHandlerPayload(e), e)
        }
    }

    createHandlerPayload(e) {
        return {
            value: e,
            name: this.props.name,
        }
    }

    getWeekDaysElementStrings = () => {
        return this.state.calendar.weekDays.map(
            weekDay => (<span>{weekDay.substring(0, 3)}</span>)
        )
    }

    /**
     * This returns the list of days in the month and some other days from the previous month
     * @returns 
     */
    getMonthDaysGrid() {
        const firstDayOfTheMonth = this.state.calendar.month.getDay(1);
        const prevMonth = this.state.calendar.getPreviousMonth();
        let totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
        if (prevMonth.numberOfDays <= totalLastMonthFinalDays) {
            //This means that the month doesn't contain enough days to fill out the remaining
            //days of the first week of this month. This might only happen if the previous month is puagme
            totalLastMonthFinalDays = prevMonth.numberOfDays
        }
        const totalDays = this.state.calendar.month.numberOfDays + totalLastMonthFinalDays;
        const monthList = Array.from({ length: totalDays });

        for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
            monthList[i] = this.state.calendar.month.getDay(i + 1 - totalLastMonthFinalDays)
        }

        for (let i = 0; i < totalLastMonthFinalDays; i++) {
            const inverted = totalLastMonthFinalDays - (i + 1);
            monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted)
        }

        return monthList
    }

    toggleVisible(visibility) {
        if (visibility) {
            this.setState({ visible: true })
            clearTimeout(this.timeoutId)
            this.handleFocus()
        }
        if (!visibility && this.state.visible) {
            //Timeout is necessary because when clicking a day, on blur automatically is called and no event is captured.
            this.timeoutId = setTimeout(() => {
                this.setState({ visible: false })
                this.handleBlur()
            });
        }
    }

    handleDayClick(day) {
        this.toggleVisible(false)
        this.setState({ date: day })
        this.handleChange(day.format("YYYY-MM-DD"))
    }

    render() {
        const {
            role,
            className,
            type,
            dense,
            disabled,
            readOnly,
            placeholder,
            name,
            valid,
            error,
            warning,
            startDate,
            endDate,
            loading,
            value,
            tabIndex,
            calendar,
            step,
            autoComplete,
            dataTest,
        } = this.props

        const monthYear = `${this.state.calendar.month.name},${this.state.calendar.year}`
        let startDateObject = startDate ? new DayEthiopian(startDate) : null
        let endDateObject = endDate ? new DayEthiopian(endDate) : null

        let prevMonthDisabled = startDateObject &&
            startDateObject.year >= this.state.calendar.year &&
            startDateObject.monthNumber >= this.state.calendar.month.number

        let nextMonthDisabled = endDateObject &&
            endDateObject.year <= this.state.calendar.year &&
            endDateObject.monthNumber <= this.state.calendar.month.number

        return (
            <div
                onFocus={() => {
                    this.toggleVisible(true)
                }}
                onBlur={() => {
                    this.toggleVisible(false)
                }}>
                <input class="date-toggle" value={this.state.date.format("YYYY-MM-DD")}
                    onChange={this.handleChange}
                    className={
                        cx({
                            dense,
                            disabled,
                            error,
                            valid,
                            warning,
                            'read-only': readOnly
                        })
                    }
                />
                <div className={`calendar-dropdown ${this.state.visible ? "visible" : ""}`}>
                    <div className={`header`}>
                        <button type="button"
                            disabled={prevMonthDisabled}
                            onClick={() => {
                                this.toggleVisible(true)
                                this.state.calendar.goToPreviousMonth()
                                this.setState({ calendar: this.state.calendar })
                            }} className={`prev-month ${prevMonthDisabled ? "disabled" : ""}`}></button>
                        <h4 tabIndex="0" >{monthYear}</h4>
                        <button type="button"
                            disabled={nextMonthDisabled}
                            className={`next-month ${nextMonthDisabled ? "disabled" : ""}`}
                            onClick={() => {
                                this.toggleVisible(true)
                                this.state.calendar.goToNextMonth()
                                this.setState({ calendar: this.state.calendar })
                            }}></button>


                    </div>

                    <div className={`week-days`}>{this.getWeekDaysElementStrings()}</div>
                    <div className={`month-days`}>
                        {this.getMonthDaysGrid().map(day => {
                            let dateDisabled = startDateObject &&
                                startDateObject.year >= day.year &&
                                startDateObject.monthNumber >= day.monthNumber &&
                                startDateObject.date >= day.date

                            dateDisabled = dateDisabled ||
                                (endDateObject &&
                                    endDateObject.year <= day.year &&
                                    endDateObject.monthNumber <= day.monthNumber &&
                                    endDateObject.date <= day.date)

                            return <button
                                className={
                                    `month-day 
                                    ${day.monthNumber === this.state.calendar.month.number ? "current" : "disabled"}
                                    ${dateDisabled ? "disabled" : ""}
                                    ${this.state.date.isEqualTo(day) ? "selected" : ""}
                                    `
                                }
                                onClick={
                                    dateDisabled ||
                                        day.monthNumber !== this.state.calendar.month.number ?
                                        undefined : () => { this.handleDayClick(day) }}
                            >
                                {day.date}
                            </button>
                        })}
                    </div>
                </div>


                <style jsx>{`
                input{
                    width: 100%;
                }
                `}</style>
                <style jsx>{styles}</style>
            </div>
        )
    }
}

DatePicker.defaultProps = {
    type: 'text',
    dataTest: 'dhis2-uicore-input',
}

DatePicker.propTypes = {
    /** The [native `autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete) */
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    dataTest: PropTypes.string,
    /** Makes the input smaller */
    dense: PropTypes.bool,
    /** */
    startDate: PropTypes.string,
    /** */
    endDate: PropTypes.string,
    /** Disables the input */
    disabled: PropTypes.bool,
    /** Applies 'error' appearance for validation feedback. Mutually exclusive with `valid` and `warning` props */
    error: sharedPropTypes.statusPropType,
    /** The input grabs initial focus on the page */
    initialFocus: PropTypes.bool,
    /** Adds a loading indicator beside the input */
    loading: PropTypes.bool,
    /** The [native `max` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max), for use when `type` is `'number'` */
    max: PropTypes.string,
    /** The [native `min` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min), for use when `type` is `'number'` */
    min: PropTypes.string,
    /** Name associated with the input. Passed to event handler callbacks in object */
    name: PropTypes.string,
    /** Placeholder text for the input */
    placeholder: PropTypes.string,
    /** Makes the input read-only */
    readOnly: PropTypes.bool,
    /** Sets a role attribute on the input */
    role: PropTypes.string,
    /** The [native `step` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step), for use when `type` is `'number'` */
    step: PropTypes.string,
    tabIndex: PropTypes.string,
    calendar: PropTypes.oneOf([
        'gregorian',
        'ethiopian'
    ]),

    /** The native input `type` attribute */
    type: PropTypes.oneOf([
        'text',
        'number',
        'password',
        'email',
        'url',
        'tel',
        'date',
        'datetime',
        'datetime-local',
        'month',
        'week',
        'time',
        'search',
    ]),
    /** Applies 'valid' appearance for validation feedback. Mutually exclusive with `error` and `warning` props */
    valid: sharedPropTypes.statusPropType,
    /** Value in the input. Can be used to control the component (recommended). Passed to event handler callbacks in object */
    value: PropTypes.string,
    /** Applies 'warning' appearance for validation feedback. Mutually exclusive with `valid` and `error` props */
    warning: sharedPropTypes.statusPropType,
    /** Called with signature `({ name: string, value: string }, event)` */
    onBlur: PropTypes.func,
    /** Called with signature `({ name: string, value: string }, event)` */
    onChange: PropTypes.func,
    /** Called with signature `({ name: string, value: string }, event)` */
    onFocus: PropTypes.func,
}
