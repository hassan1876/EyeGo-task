import express, { json } from 'express';
import dotenv from 'dotenv';
import createLogQueryRouter from './api/routes/ProcessLogsRouter.js'
import ActivityLogQueryService from './application/services/ActivityLogQueryService.js'
import MongoActivityLogRepository from './infrastructure/database/MongoActivityLogRepository.js'

dotenv.config()
const app = express()
const port =  process.env.PORT
const repo = new MongoActivityLogRepository({
    connectionString:process.env.CONNECTION_STRING
})
const logQueryService = new ActivityLogQueryService({
    repo:repo
})


;(async () => {
    app.use(json())
    app.use('/api', createLogQueryRouter(logQueryService))
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})()
