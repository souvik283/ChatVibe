import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

async function arcjectProtection(req, res, next) {
    try {

        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    message: "Rate limit excessed. Please try afetr some time"
                })
            }else if(decision.reason.isBot()){
                return res.status(403).json({
                    message: "Bot ascess denied"
                })
            }else{
                return res.status(403).json({
                    message: "Ascess denied due to security policy"
                })
            }
        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error: "spoof bot decteced",
                message: "malicios activity detected"
            })
        }
        
        next()
    } catch (error) {
        console.log("arcjet protection error", error);
        next()
    }
    
} 
export default arcjectProtection