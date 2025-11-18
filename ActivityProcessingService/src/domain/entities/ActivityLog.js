export default class ActivityLog {
    constructor({userId,action,timestamp}){  
        this.userId = userId
        this.action = action
        this.timestamp = timestamp
        this.recieveAt = Date.now()
    }
}
