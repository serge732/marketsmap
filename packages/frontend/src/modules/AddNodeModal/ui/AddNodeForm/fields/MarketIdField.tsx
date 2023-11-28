import Autocomplete from '@mui/material/Autocomplete'
import { useField, useFormikContext } from 'formik'
import { useCallback, useEffect, useState } from 'react'
//
import { getNodeMarketIds, getNodeSecIds } from 'api'
import TextField from '@mui/material/TextField'

export function MarketIdField() {
    const { values } = useFormikContext<AddNodeFormValues>()
    const { engineId } = values

    const [input, meta, helpers] = useField<AddNodeFormValues['marketId']>(
        'marketId' as keyof AddNodeFormValues,
    )

    const [options, setOptions] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState('')

    const error = meta.touched && (meta.error || fetchError)

    const fetchMarketIds = useCallback(
        async function () {
            try {
                setIsLoading(true)

                const nodeMarketIdsResult = await getNodeMarketIds({
                    input: { engineId },
                })
                const { data: nodeMarketIds, error: nodeMarketIdsError } =
                    nodeMarketIdsResult.data

                if (nodeMarketIdsError) throw new Error(nodeMarketIdsError)

                setOptions(nodeMarketIds || [])
            } catch (error) {
                setFetchError((error as Error).message)
            } finally {
                setIsLoading(false)
            }
        },
        [engineId],
    )

    useEffect(() => {
        if (engineId) {
            fetchMarketIds()
        }
    }, [engineId])

    const handleChange = (_: any, newValue: string | null) => {
        helpers.setValue(newValue || '')
    }

    return (
        <Autocomplete<string, false, false, false>
            {...input}
            multiple={false}
            disabled={!engineId || isLoading}
            options={options}
            onChange={handleChange}
            renderInput={(inputProps) => (
                <TextField
                    {...inputProps}
                    name={input.name}
                    label="Выберите рынок торговой системы"
                    error={!!error}
                    helperText={error}
                    autoComplete="off"
                />
            )}
        />
    )
}
