import express from 'express'
//
import { server } from './server'

const app = express()
server(app)
