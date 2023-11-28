import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'
import { useCallback, useEffect, useState } from 'react'
//
import { getNodeEngineIds } from 'api'

export function EngineIdField() {
    const [input, meta, helpers] = useField<AddNodeFormValues['engineId']>(
        'engineId' as keyof AddNodeFormValues,
    )

    const [options, setOptions] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState('')

    const error = meta.touched && (meta.error || fetchError)

    const fetchMarketIds = useCallback(async function () {
        try {
            setIsLoading(true)

            const nodeEngineIdsResult = await getNodeEngineIds({})
            const { data: nodeEngineIds, error: nodeEngineIdsError } =
                nodeEngineIdsResult.data

            if (nodeEngineIdsError) throw new Error(nodeEngineIdsError)

            setOptions(nodeEngineIds || [])
        } catch (error) {
            setFetchError((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMarketIds()
    }, [])

    const handleChange = (_: any, newValue: string | null) => {
        helpers.setValue(newValue || '')
    }

    return (
        <Autocomplete<string, false, false, false>
            {...input}
            multiple={false}
            disabled={isLoading}
            options={options}
            onChange={handleChange}
            renderInput={(inputProps) => (
                <TextField
                    {...inputProps}
                    name={input.name}
                    label="Выберите торговую систему"
                    error={!!error}
                    helperText={error}
                    autoComplete="off"
                />
            )}
        />
    )
}
