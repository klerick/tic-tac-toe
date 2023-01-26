import React from 'react';
import styles from './game.module.css';

import {SaveStep} from '../constants'

type Props = {
  size: number;
  countWinner: number,
  saveStep: SaveStep
  onClick: (stepPlayer: [number, number]) => void
}

export const Game: React.FC<React.PropsWithChildren<Props>>  = ({size, countWinner, onClick, saveStep}) => {



  const handlerClick = (x: number,y: number) => {
    onClick([x, y])
  }

  return (
    <div className={styles['game']}>
      {
        [...Array(size)].map((u, rowKey) => (
          <div className={styles['row']} key={rowKey}>
            {
              [...Array(size)].map((u, rowItemKey) => {
                return <div key={rowItemKey} className={styles['row-item']} onClick={() => handlerClick(rowKey, rowItemKey)}>
                  {

                    saveStep[rowKey] && saveStep[rowKey][rowItemKey]
                      ? saveStep[rowKey][rowItemKey] === 1 ? 'X' : 'O'
                      : null
                  }
                </div>
              })
            }
          </div>
        ))
      }
    </div>
  )
}
