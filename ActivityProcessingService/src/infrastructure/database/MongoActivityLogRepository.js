import IActivityLogRepository from "../../application/ports/IActivityLogRepositery.js";
import mongoose from "mongoose";

export default class MongoActivityLogRepository extends IActivityLogRepository {
    constructor({ connectionString }) {
        super()
        const ActivityLogSchema = new mongoose.Schema(
            {
                userId: { type: String, required: true },
                action: { type: String, required: true },
                timestamp: { type: Date, required: true },
                recievedAt: { type:Date, required: true }
            }
        )

        this.ActivityLogModel = mongoose.model('ActivityLog', ActivityLogSchema)
        this.connect(connectionString)
    }

    async connect(connectionString) {
        try {
            await mongoose.connect(connectionString)
            
        } catch (e) {
            throw e
        }
    }

    async save(activityLog) {
        const log = new this.ActivityLogModel({
            userId: activityLog.userId,
            action: activityLog.action,
            timestamp: activityLog.timestamp,
            recievedAt: activityLog.recievedAt
        });
        try{
            await log.save()
        }catch(e){
            throw e
        }
    }
}
