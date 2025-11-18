import ActivityLog from "../../domain/entities/ActivityLog.js"

export default class ProcessActivityLog {
    constructor({repo}){
        this.repo = repo
    }
    async processLog(log){
        const processedLog  = new ActivityLog({
            userId:log.userId,
            action:log.action,
            timestamp:log.timestamp
        })
        await this.repo.save(processedLog)
    }
}