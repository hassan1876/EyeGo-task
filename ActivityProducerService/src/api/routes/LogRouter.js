import express from "express"

export default function createLogRouter(sendActivityService) {
    const router = express.Router()

    router.post('/log', async (req, res) => {
        const rawLog = req.body
        try {
            await sendActivityService.sendLog(rawLog)
            res.status(200).json({ message: "Log sent" })
        } catch (e) {
            res.status(400).json({ error: e.message })
        }
    })

    return router
}
