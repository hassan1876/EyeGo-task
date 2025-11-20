export default class ActivityLogQuery {
    constructor({userId,action,from,to,page,pageSize}){
        this.userId = userId
        this.action = action
        this.to = to
        this.from = from
        this.page = page
        this.pageSize = pageSize
    }
}