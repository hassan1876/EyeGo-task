import express from 'express'
export default function ProcessLogsRouter(activityLogQueryService){
    const router = express.Router()
    router.get('/log', async (req,res)=>{
        try{
            const data = await activityLogQueryService.queryLog(req)
            res.status(200).json(data)
        }catch(e){
            res.status(400).json({ error: e.message })
        }
    })
    return router
}