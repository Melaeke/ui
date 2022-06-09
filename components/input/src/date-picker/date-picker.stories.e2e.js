import { storiesOf } from '@storybook/react'
import React from 'react'
import { DatePicker } from './index.js'

window.onChange = window.Cypress && window.Cypress.cy.stub()
window.onBlur = window.Cypress && window.Cypress.cy.stub()
window.onFocus = window.Cypress && window.Cypress.cy.stub()

storiesOf('DatePicker', module)
    .add('With onChange', () => (
        <DatePicker
            label="Default label"
            name="Default"
            calendar="ethiopian"
            value=""
            onChange={window.onChange}
        />
    ))
    .add('With initialFocus and onBlur', () => (
        <DatePicker
            label="Default label"
            name="Default"
            value=""
            initialFocus
            onBlur={window.onBlur}
        />
    ))
    .add('With onFocus', () => (
        <DatePicker
            label="Default label"
            name="Default"
            value=""
            onFocus={window.onFocus}
        />
    ))
    .add('With initialFocus', () => (
        <DatePicker label="Default label" name="Default" value="" initialFocus />
    ))
    .add('With disabled', () => (
        <DatePicker label="Default label" name="Default" value="" disabled />
    ))
