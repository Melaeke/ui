import PropTypes from 'prop-types'
import React from 'react'
import styles from './DemoComponent.module.css'

export const Demo = (props) => {
    return (
        <div className={styles.demo}>
            <div className={styles.demoTitle}>Demo</div>
            {/* eslint-disable-next-line react/prop-types */}
            <div className={styles.demoFrame}>{props.children}</div>
        </div>
    )
}
Demo.PropTypes = {
    children: PropTypes.node,
}
