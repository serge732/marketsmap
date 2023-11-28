import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
//
import { EngineIdField } from './fields/EngineIdField'
import { MarketIdField } from './fields/MarketIdField'
import { SecIdFeild } from './fields/SecIdFeild'
//
import { useAppStore } from 'store'
import { addNodeModalModel } from '../../model'

const validationErrors = {
    required: 'Обязательно для заполнения',
}

export function AddNodeForm() {
    const { nodes, addNode } = useAppStore()
    const { close } = addNodeModalModel.useAddNodeModalStore()

    return (
        <Formik
            initialValues={{
                engineId: '',
                marketId: '',
                secId: '',
            }}
            validationSchema={object({
                engineId: string().required(validationErrors.required),
                marketId: string().required(validationErrors.required),
                secId: string().required(validationErrors.required),
            })}
            onSubmit={(values, formikHelpers) => {
                const { engineId, marketId, secId } = values
                addNode({ engineId, marketId, secId })
                close()
            }}>
            {({ values, touched, handleSubmit }) => {
                console.log({ values, touched })
                // @ts-ignore
                window.submit = handleSubmit

                return (
                    <Form>
                        <Stack spacing="32px">
                            <EngineIdField />
                            <MarketIdField />
                            <SecIdFeild />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                <Button type="submit" variant="contained">
                                    Добавить
                                </Button>
                            </Box>
                        </Stack>
                    </Form>
                )
            }}
        </Formik>
    )
}
