import { Alert } from '@mui/material'
import React from 'react'

/**
 * 
 * @param {{severity: string}} props 
 */
export default function Notification(props) {
    const fadeIn = {
        opacity: 1,
        animation: "fadeIn 0.2s forwards",


        "@keyframes fadeIn": {
            "0%": {
                transform: "translateY(0px)",
            },
            "100%": {
                transform: "translateY(40px)",
            }
        },
        "@keyframes fadeOut": {
            "0%": {
                opacity: 1,
                transform: "translateY(startYposition)",
            },
            "100%": {
                opacity: 1,
                transform: "translateY(endYposition)",
            }
        },
        position: 'absolute', top: '-40px', right: '5px'
    }


    return (
        <Alert sx={fadeIn} severity={props.severity}>{props.children}</Alert>
    )
}
