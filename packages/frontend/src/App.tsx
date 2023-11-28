import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ru'
//
import { AddNodeModal, addNodeModalModel } from 'modules/AddNodeModal'
import { Graph } from 'modules/Graph'
import { useAppStore, withAppStore } from 'store'

function App() {
    const { from, setFrom, till, setTill } = useAppStore()
    const { open } = addNodeModalModel.useAddNodeModalStore()

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <div style={{ height: '100vh', background: '#f5f6f7' }}>
                <Graph />
                <AddNodeModal />
                <Paper
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        padding: '8px',
                    }}>
                    <Stack direction="row" spacing="32px">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!from || !till}
                            onClick={open}>
                            <AddIcon />
                        </Button>
                        <Stack direction="row" spacing="8px">
                            <DatePicker
                                label="Дата начала"
                                views={['year', 'month', 'day']}
                                maxDate={till || undefined}
                                value={from}
                                onAccept={setFrom}
                            />
                            <DatePicker
                                label="Дата окончания"
                                views={['year', 'month', 'day']}
                                minDate={from || undefined}
                                value={till}
                                onAccept={setTill}
                            />
                        </Stack>
                    </Stack>
                </Paper>
            </div>
        </LocalizationProvider>
    )
}

export default withAppStore(addNodeModalModel.withAddNodeModalStore(App))
