import ActivityLogQuery from "../../domain/entities/ActivityLogQuery.js"

export default class ActivityLogQueryService {
    constructor({repo}){
        this.repo = repo
    }
    async queryLog(req){
        const logQuery  = new ActivityLogQuery({
            userId: req.query.userId,
            action: req.query.action,
            to: req.query.to,
            from: req.query.from,
            page: parseInt(req.query.page ?? 1),
            pageSize: parseInt(req.query.limit ?? 10)
        })
        const result = await this.repo.find(logQuery)
        const totalPages = Math.ceil(result.totalCount / logQuery.pageSize);
        const hasNext = logQuery.page < totalPages;
        const hasPrevious = logQuery.page > 1;
        return {
            data: result.data,
            totalCount: result.totalCount,
            page: logQuery.page,
            pageSize: logQuery.pageSize,
            hasNext,
            hasPrevious
        };
    }
}