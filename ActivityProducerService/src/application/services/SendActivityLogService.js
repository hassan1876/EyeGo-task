import ActivityLog from "../../domain/entities/ActivityLog"
export default class SendActivityLog {
    constructor({messageProducer}){
        this.messageProducer = messageProducer
    }
    sendActivityLog(rawLog){
        try{
            const activityLog = new ActivityLog({
                userId: rawLog.userId,
                action: rawLog.action,
                timestamp: rawLog.timestamp
            })
            this.messageProducer.sendActivityLog(activityLog)
        }catch(e){
            throw e
        }
    }
}