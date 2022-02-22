import { colors } from '@dhis2/ui-constants'
import css from 'styled-jsx/css'

export default css`
    th {
        padding: 12px;
        border: 1px solid transparant;
        border-bottom: 1px solid ${colors.grey300};
        color: ${colors.grey800};
        background-color: ${colors.grey200};
        font-weight: normal;
        font-size: 14px;
        vertical-align: top;
    }
    :global(thead) th {
        padding: 8px 12px;
        font-size: 13px;
    }
    th:last-of-type {
        border-right: 1px solid ${colors.grey300};
    }
    th.active {
        background-color: ${colors.white};
        outline: 2px solid ${colors.grey600};
        outline-offset: -2px;
    }
    th.bordered {
        border-right: 1px solid ${colors.grey300};
    }
    th.bordered:last-child {
        border-right: 1px solid transparent;
    }
    th.error {
        color: ${colors.red700};
    }
    th.muted {
        color: ${colors.grey700};
        font-style: italic;
    }
    th.valid {
        color: ${colors.green700};
    }
    th.small {
        padding: 2px 8px;
        font-size: 12px;
    }
    :global(thead) th.small {
        padding: 13px 8px;
        font-size: 12px;
    }
    th.large {
        padding: 14px 12px;
        font-size: 16px;
    }
    :global(thead) th.large {
        padding: 13px 12px;
        font-size: 15px;
    }
    th.fixed {
        position: sticky;
        z-index: 1;
    }
    :global(thead) th.fixed {
        position: sticky;
        /* ensure on top of scrolling body cells */
        z-index: 2;
    }
    :global(thead) th.fixedHorizontally {
        /* ensure on top of all scrolling cells */
        z-index: 3;
        background-color: ${colors.grey300};
    }
    :global(tr:last-child) th {
        border-bottom: 1px solid transparent;
    }
    :global(thead) :global(tr:last-child) th {
        border-bottom: 1px solid ${colors.grey300};
    }
    :global(tbody) > :global(tr:hover) > th:not(.staticStyle),
    :global(tfoot) > :global(tr:hover) > th:not(.staticStyle) {
        background-color: ${colors.grey300};
    }
    :global(tbody) > :global(tr:active) > th:not(.staticStyle) {
        background-color: ${colors.grey200};
    }
    :global(tfoot) > :global(tr:first-child) th {
        border-top: 1px solid ${colors.grey300};
    }
`
