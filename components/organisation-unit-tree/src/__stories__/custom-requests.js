/* eslint-disable react/no-unescaped-entities */
import { CustomDataProvider, useDataEngine } from '@dhis2/app-runtime'
import React from 'react'
import {
    OrganisationUnitTreeControllable,
    useFetchOrgData,
    useFetchRootOrgData,
} from '../index.js'
import { customData } from './customData.js'

const customDataWithApprovals = {
    ...customData,
    'dataApprovals/approvals': (type, { params }) => {
        return [
            {
                wf: params.wf,
                pe: params.pe,
                ou: params.ou,
                aoc: "aocUID",
                state: "ACCEPTED_HERE",
                level: "KaTJLhGmU95",
                permissions: {
                    mayApprove: true,
                    mayUnapprove: true,
                    mayAccept: false,
                    mayUnaccept: true,
                    mayReadData: true
                }
            }
        ]
    },
}

export const CustomRequests = () => {
    const engine = useDataEngine()
    const fetchOrgData = useFetchOrgData()
    const fetchRootOrgData = useFetchRootOrgData()

    const fetchOrgDataWithApprovalStatus = async args => {
        const { id } = args

        const [approvalStatusResponse, origResponse] = await Promise.all([
            await engine.query({
                approvalStatuses: {
                    resource: 'dataApprovals/approvals',
                    params: {
                        wf: 'rIUL4hYOjJc',
                        pe: '202101',
                        ou: id,
                    }
                }
            }),
            await fetchOrgData(args),
        ])

        const nextData = { ...approvalStatusResponse, ...origResponse }
        return nextData
    }

    return (
        <OrganisationUnitTreeControllable
            fetchOrgData={fetchOrgDataWithApprovalStatus}
            fetchRootOrgData={fetchRootOrgData}
            name="Root org unit"
            roots={['A0000000000']}
            initiallyExpanded={['/A0000000000/A0000000001/A0000000003']}
            renderNodeLabel={data => {
                if (data.loading) {
                    return OrganisationUnitTreeControllable
                        .defaultProps
                        .renderNodeLabel(data)
                }

                const { approvalStatuses } = data.additional
                const [approvalStatus] = approvalStatuses
                const { permissions } = approvalStatus
                const { mayApprove } = permissions

                const formatted = {
                    ...data,
                    label: (
                        <span>
                            {data.node.displayName}
                            {' '}
                            (mayApprove: {' '}{mayApprove.toString()})
                        </span>
                    )
                }

                return OrganisationUnitTreeControllable
                    .defaultProps
                    .renderNodeLabel(formatted)
            }}
        />
    )
}

CustomRequests.decorators = [
    Story => (
        <CustomDataProvider data={customDataWithApprovals}>
            <Story />
        </CustomDataProvider>
    ),
]