import { useDataQuery } from '@dhis2/app-runtime'
import { useCallback, useState } from 'react'
import { patchMissingDisplayName } from './patch-missing-display-name.js'

export const createRootQuery = ids =>
    ids.reduce(
        (query, id) => ({
            ...query,
            [id]: {
                id,
                resource: `organisationUnits`,
                params: ({ isUserDataViewFallback }) => ({
                    isUserDataViewFallback,
                    fields: ['displayName', 'path', 'id'],
                    paging: false,
                }),
            },
        }),
        {}
    )

/**
 * @param {string[]} ids
 * @param {Object} [options]
 * @param {boolean} [options.withChildren]
 * @param {boolean} [options.isUserDataViewFallback]
 * @returns {Object}
 */
export const useRootOrgData = (ids, { isUserDataViewFallback } = {}) => {
    const query = createRootQuery(ids)
    const variables = { isUserDataViewFallback }
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
    })

    const { refetch: queryRefetch } = useDataQuery(query, {
        variables,
        onComplete: queryData =>
            setState({
                ...state,
                data: queryData ? patchMissingDisplayName(queryData) : {},
                loading: false,
            }),
        onError: queryError =>
            setState({
                ...state,
                error: queryError,
                loading: false,
            }),
    })

    const refetch = useCallback(() => {
        setState({ ...state, data: null, error: null, loading: true })
        queryRefetch()
    }, [queryRefetch, setState])

    return {
        loading: state.loading,
        error: state.error,
        data: state.data,
        refetch,
    }
}