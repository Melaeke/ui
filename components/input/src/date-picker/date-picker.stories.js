import { sharedPropTypes } from '@dhis2/ui-constants'
import React from 'react'
import { DatePicker } from './index.js'
import { gregorianToEthiopian } from './date-picker.js'

const description = `
An input allows a user to enter data, usually text.

Inputs are used wherever a user needs to input standard text information. Inputs are often used as part of forms. An input can also be used to capture information outside of a form, perhaps as a 'Filter' or 'Search' field.

To use a label and validation text, consider the \`InputField\` component.

Read more about Inputs and InputFields at [Design System: Inputs](https://github.com/dhis2/design-system/blob/master/atoms/inputfield.md).

\`\`\`js
import { DatePicker } from '@dhis/ui'
\`\`\`
`

const inputTypeArgType = {
    table: { type: { summary: 'string' } },
    control: {
        type: 'select',
        options: [
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
        ],
    },
}

const logger = ({ name, value }) =>
    console.log(`Name: ${name}, value: ${value}`)

export default {
    title: 'DatePicker',
    component: DatePicker,
    parameters: {
        docs: { description: { component: description } },
    },
    args: {
        name: 'defaultName',
        onChange: logger,
    },
    argTypes: {
        type: { ...inputTypeArgType },
        valid: { ...sharedPropTypes.statusArgType },
        warning: { ...sharedPropTypes.statusArgType },
        error: { ...sharedPropTypes.statusArgType },
    },
}

const Template = (args) => <DatePicker {...args} />

export const Default = Template.bind({})
Default.args={
    endDate:(new Date()).toISOString()
}


export const EthiopianDatePicker = Template.bind({})
EthiopianDatePicker.storyName = 'Ethiopian calendar'
EthiopianDatePicker.args = {
    calendar: "ethiopian",
    value: gregorianToEthiopian(new Date("2022-06-01")),
    startDate:gregorianToEthiopian(new Date("2021-09-11")),
    endDate: gregorianToEthiopian(new Date("2022-06-11"))
}


