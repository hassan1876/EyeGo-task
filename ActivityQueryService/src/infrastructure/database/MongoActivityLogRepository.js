import IActivityLogRepositery from "../../application/port/IActivityLogRepositery.js";
import mongoose from "mongoose";

export default class MongoActivityLogRepository extends IActivityLogRepositery {
    constructor({ connectionString }) {
        super()
        this.connect(connectionString)
        const ActivityLogSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        action: { type: String, required: true },
        timestamp: { type: Date, required: true },
        recieveAt: { type: Date, required: true }
        });

        this.model = mongoose.model("ActivityLog", ActivityLogSchema);

        this.connect(connectionString);
    }

    async connect(connectionString) {
        try {
            await mongoose.connect(connectionString)
            
        } catch (e) {
            throw e
        }
    }

    async find(query) {
        const mongoFilter={}
        if(query.userId) mongoFilter.userId = query.userId
        if(query.action) mongoFilter.action = query.action
        if(query.from || query.to){
            mongoFilter.timestamp = {
                ...(query.from && { $gte:query.from}),
                ...(query.to && { $lte:query.to}),
            }
        }
        const totalCount = await this.model.countDocuments(mongoFilter); 
        const skip = (query.page - 1)* query.pageSize
        const limit = query.pageSize
        const data = await this.model.find(mongoFilter)
            .skip(skip)
            .limit(limit)
            .sort({timestamp:-1})
        return {data,totalCount}
    }
}
