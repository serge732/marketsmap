import Autocomplete from '@mui/material/Autocomplete'
import { useField, useFormikContext } from 'formik'
import { useCallback, useEffect, useState } from 'react'
//
import { getNodeSecIds } from 'api'
import TextField from '@mui/material/TextField'

export function SecIdFeild() {
    const { values } = useFormikContext<AddNodeFormValues>()
    const { engineId, marketId } = values

    const [input, meta, helpers] = useField<AddNodeFormValues['secId']>(
        'secId' as keyof AddNodeFormValues,
    )

    const [options, setOptions] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState('')

    const error = meta.touched && (meta.error || fetchError)

    const fetchSecIds = useCallback(
        async function () {
            try {
                setIsLoading(true)

                const nodeSecIdsResult = await getNodeSecIds({
                    input: {
                        engineId,
                        marketId,
                    },
                })
                const { data: nodeSecIds, error: nodeSecIdsError } =
                    nodeSecIdsResult.data

                if (nodeSecIdsError) throw new Error(nodeSecIdsError)

                setOptions(nodeSecIds || [])
            } catch (error) {
                setFetchError((error as Error).message)
            } finally {
                setIsLoading(false)
            }
        },
        [engineId, marketId],
    )

    useEffect(() => {
        if (engineId && marketId) {
            fetchSecIds()
        }
    }, [engineId, marketId])

    const handleChange = (_: any, newValue: string | null) => {
        helpers.setValue(newValue || '')
    }

    return (
        <Autocomplete<string, false, false, false>
            {...input}
            multiple={false}
            disabled={!engineId || !marketId || isLoading}
            options={options}
            onChange={handleChange}
            renderInput={(inputProps) => (
                <TextField
                    {...inputProps}
                    name={input.name}
                    label="Выберите инструмент"
                    error={!!error}
                    helperText={error}
                    autoComplete="off"
                />
            )}
        />
    )
}
