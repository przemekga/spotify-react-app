import React from 'react'
import { ResponsiveBar  } from "nivo";

const BarChart = ({data}) => {
  return (
    <ResponsiveBar
      data={data}
      indexBy="Song Property"
      keys={["Value"]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
    />
  )
}

export default BarChart
