import winston from "winston";
import dotenv from 'dotenv'
dotenv.config()


function CustomJsonFormatter() {
    const {combine, timestamp, printf, errors} = winston.format;

    return combine(
        errors({stack: true}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printf(({timestamp, level, message, stack}) => {
            return JSON.stringify({
                    timestamp: timestamp,
                    level: level,
                    message: message,
                    stack: stack
                }
            )
        })
    )
}

export default CustomJsonFormatter