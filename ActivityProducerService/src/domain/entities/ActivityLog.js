import { ALLOWED_ACTIONS } from "../constants/ActionType";
export default class ActivityLog {
    constructor({userId,action,timestamp}){
        if(!userId) throw new Error("user ID is required");
        if(!action) throw new Error("action is required");
        if(!timestamp) throw new Error("timestamp is required");
        if (isNaN(Date.parse(timestamp))) throw new Error("timestamp is invalid")
        if(!ALLOWED_ACTIONS.includes(action)) throw new Error("invalid action")
            
        this.userId = userId
        this.action = action
        this.timestamp = timestamp
    }
}
