import IMessageConsumerPort from "../../application/ports/IMessageConsumerPort.js"
import {Kafka} from "kafkajs"
export default class KafkaConsumerAdapter extends IMessageConsumerPort {
    constructor({brokerUrl,topic,processLogService}){
        super();
        this.brokerUrl = brokerUrl;
        this.topic = topic;
        this.kafka = new Kafka({ 
            clientId: topic,
            brokers: [brokerUrl]
        });
        this.processLogService = processLogService;
        this.consumer = this.kafka.consumer({ groupId: topic });
    }
    async connect(){
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: this.topic, fromBeginning: true })
    }
    async disconnect() {
        await this.consumer.disconnect()
    }
    async receiveActivityLog() {
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const log = JSON.parse(message.value.toString());
                await this.processLogService.processLog(log);
            },
        });
    }
}