import React from 'react'

export default function Shimmer({ className }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 m-1 p-1 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
        />
    )
}

