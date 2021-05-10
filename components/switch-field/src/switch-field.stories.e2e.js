import { storiesOf } from '@storybook/react'
import React from 'react'
import { SwitchField } from './switch-field.js'

storiesOf('SwitchField', module).add('With label and required', () => (
    <SwitchField name="Ex" label="SwitchField" required value="checked" />
))
