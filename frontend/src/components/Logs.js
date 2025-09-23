import React, { useState } from 'react'
import "./Logs.css"
import data from "../data/sample.json"

export const Logs = ({ ftype, flever, fsearch, ffrom, fto }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const getLogType = (message) => {
        const keywords = ["error", "failed", "exception", "timeout"]
        const lowerMsg = message.toLowerCase()
        for (let keyword of keywords) {
            if (lowerMsg.includes(keyword)) {
                return "Anomaly"
            }
        }
        return "Normal"
    }

    const handleShowMore = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className='log-container'>
            <div className='log-heading'>
                <h1>Logs</h1>
            </div>
            <div className='logs'>
                {
                    data.map((log, index) => {

                        const logType = getLogType(log.message)

                        const logTime = new Date(log.timestamp).getTime()
                        const fromTime = ffrom ? new Date(ffrom).getTime() : null
                        const toTime = fto ? new Date(fto).getTime() : null

                        const inDateRange =
                            (!fromTime || logTime >= fromTime) &&
                            (!toTime || logTime <= toTime)

                        if (
                            (ftype === "All" || logType === ftype) &&
                            (flever === "All" || log.level.toLowerCase() === flever.toLowerCase()) &&
                            (fsearch === "" || log.message.toLowerCase().includes(fsearch.toLowerCase())) &&
                            inDateRange
                        ) {
                            return (

                                <div
                                    className={`log ${logType === "Normal" ? "log-normal" : "log-anomaly"}`}
                                    key={index}
                                    onClick={() => handleShowMore(index)}
                                >
                                    <div className='log-heading'>
                                        <span className={`${logType === "Normal" ? "log-title-green" : "log-title-red"}`}>{log.level}</span>
                                        <span>{log.timestamp}</span>
                                    </div>
                                    <div className='log-message'>
                                        <p>{log.message}</p>
                                    </div>
                                    <div className='log-info'>
                                        <span>Resource:</span>
                                        <span>{log.resourceId}</span>
                                        <span> | </span>
                                        <span>Type:</span>
                                        <span>{logType}</span>
                                        
                                    </div>
                                    <div className='log-description' style={{ display: openIndex === index ? 'flex' : 'none' }}>
                                        <div><span>Trace Id:</span><span>{log.traceId}</span></div>
                                        <div><span>Span Id:</span><span>{log.spanId}</span></div>
                                        <div><span>Commit:</span><span>{log.commit}</span></div>
                                        <div><span>Parent Resource:</span><span>{log.metadata.parentResourceId}</span></div>
                                    </div>
                                </div>
                            )
                        }
                        return null
                    })
                }
            </div>
        </div>
    )
}
