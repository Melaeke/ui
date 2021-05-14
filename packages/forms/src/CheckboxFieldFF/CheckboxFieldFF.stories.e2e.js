import { storiesOf } from '@storybook/react'
import React from 'react'
import { Field } from 'react-final-form'
import { formDecorator } from '../formDecorator.js'
import { hasValue } from '../validators/index.js'
import { CheckboxFieldFF } from './CheckboxFieldFF.js'

// https://github.com/final-form/react-final-form-arrays/issues/111
const initialValue = ['yes']

storiesOf('Testing:Checkbox', module)
    .addDecorator(formDecorator)
    .add('Unchecked', () => (
        <Field
            type="checkbox"
            component={CheckboxFieldFF}
            className="checkbox"
            name="checkbox"
            label="Label text"
            validate={hasValue}
            required
        />
    ))
    .add('Checked ', () => (
        <Field
            type="checkbox"
            component={CheckboxFieldFF}
            className="checkbox"
            name="checkbox"
            label="Label text"
            initialValue={true}
        />
    ))
    .add('Unchecked with value', () => (
        <Field
            type="checkbox"
            component={CheckboxFieldFF}
            className="checkbox"
            name="checkbox"
            label="Label text"
            value="yes"
        />
    ))
    .add('Checked with value', () => (
        <Field
            type="checkbox"
            component={CheckboxFieldFF}
            className="checkbox"
            name="checkbox"
            label="Label text"
            value="yes"
            initialValue={initialValue}
        />
    ))
