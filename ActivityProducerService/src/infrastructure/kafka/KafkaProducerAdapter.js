import IMessageProducerPort from "../../application/ports/IMessageProducerPort"
import {Kafka} from "kafkajs"
export default class KafkaProducerAdapter extends IMessageProducerPort {
    constructor({brokerUrl,topic}){
        this.brokerUrl = brokerUrl
        this.topic = topic
        this.kafka = new Kafka({
            clientId: topic,
            brokers: [brokerUrl],
        })
        this.producer = this.kafka.producer()
    }
    async connect(){
        await this.producer.connect()
    }
    async disconnect() {
        await this.producer.disconnect()
    }
    async sendActivityLog(activityLog){
        await this.producer.send({
            topic : this.topic,
            messages:[
                {value: JSON.stringify(activityLog)}
            ]
        })
    }
}