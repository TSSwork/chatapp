"use client"
import React from 'react'
import ReactLoading from 'react-loading';

interface LoadingWheelProps {
    hexColor?: string;
    height?: number;
    width?: number;
}

export default function LoadingWheel({
    hexColor = "#fff",
    height = 15,
    width = 15
}: LoadingWheelProps) {
  return (
    <div>
        <ReactLoading 
            type={"spin"} 
            color={hexColor} 
            height={height}
            width={width}
        />
    </div>
  )
}
