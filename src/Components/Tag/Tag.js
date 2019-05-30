import React from 'react'

import styles from './Tag.module.scss'

const Tag = ({name}) => {

  function truncate(input, limit) {
    if (input.length > limit)
       return input.substring(0,limit) + '...';
    else
       return input;
  };

  return (
    <div className={styles.Tag} title={name}>
      {truncate(name, 14)}
    </div>
  )
}

export default Tag
