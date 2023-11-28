import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
//
import { addNodeModalModel } from '../model'
import { AddNodeForm } from './AddNodeForm'

export function AddNodeModal() {
    const { isOpen, close } = addNodeModalModel.useAddNodeModalStore()

    return (
        <Modal
            open={isOpen}
            onClose={close}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 480,
                    padding: '24px',
                }}>
                <AddNodeForm />
            </Paper>
        </Modal>
    )
}
