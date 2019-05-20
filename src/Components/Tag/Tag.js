import React from 'react'

import styles from './Tag.module.scss'

const Tag = ({name}) => {
  return (
    <div className={styles.Tag}>
      {name}
    </div>
  )
}

export default Tag
