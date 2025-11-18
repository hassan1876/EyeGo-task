import express, { json } from 'express';
import dotenv from 'dotenv';
import createLogRouter from './api/routes/LogRouter'
import SendActivityService from './application/services/SendActivityLogService'
import KafkaProducerAdapter from './infrastructure/kafka/KafkaProducerAdapter'


dotenv.config()
const app = express()
const port = process.env.PORT
const messageProducer = new KafkaProducerAdapter({
    brokerUrl:process.env.KAFKA_BROKER,
    topic:process.env.KAFKA_TOPIC_ID
})
const sendActivityService = new SendActivityService({
    messageProducer:messageProducer
})

(async () => {
    await messageProducer.connect()
    
    app.use(json())
    app.use('/api', createLogRouter(sendActivityService))
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})()


