import React from 'react'
import { Radar  } from "nivo";

const RadarChart = ({data}) => {
  return (
    <Radar
      data={data}
      indexBy="Song Property"
      keys={["Value"]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      maxValue={1}
      width={700}
      height={500}
    />
  )
}

export default RadarChart
