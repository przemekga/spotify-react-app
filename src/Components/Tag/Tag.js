import React from 'react'

import styles from './Tag.module.scss'

const Tag = ({name, limit = true}) => {

  function truncate(input, limit) {
    if (input.length > limit)
       return input.substring(0,limit) + '...';
    else
       return input;
  };

  return (
    <div className={styles.Tag} title={name}>
      {limit ? truncate(name, 14) : name}
    </div>
  )
}

export default Tag
