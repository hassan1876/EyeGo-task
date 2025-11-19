import dotenv from 'dotenv';
import ProcessActivityLog from './application/services/ProcessActivityLogService.js'
import KafkaConsumerAdapter from './infrastructure/kafka/KafkaConsumerAdapter.js'
import MongoActivityLogRepository from './infrastructure/database/MongoActivityLogRepository.js'

dotenv.config()
const mongoActivityLogRepo = new MongoActivityLogRepository({
    connectionString:process.env.CONNECTION_STRING
})
const processActivityLogService = new ProcessActivityLog({
    repo:mongoActivityLogRepo
})
const messageConsumer = new KafkaConsumerAdapter({
    brokerUrl:process.env.KAFKA_BROKER,
    topic:process.env.KAFKA_TOPIC_ID,
    processLogService:processActivityLogService
})

;(async () => {
    try{
        await messageConsumer.connect()
        await messageConsumer.receiveActivityLog()
    }catch(e){
        throw e
    }
})()


