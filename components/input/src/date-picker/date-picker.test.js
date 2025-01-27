import { shallow } from 'enzyme'
import React from 'react'
import { DatePicker } from './index.js'

describe('<InputEthiopoian>', () => {
    it('passes min, max, and step props as attributes to the native <input> element', () => {
        const testProps = { min: '0', max: '10', step: '0.5' }
        const wrapper = shallow(<DatePicker type="number" {...testProps} />)

        const inputEl = wrapper.find('input')
        expect(inputEl.props()).toMatchObject(testProps)
    })
})
