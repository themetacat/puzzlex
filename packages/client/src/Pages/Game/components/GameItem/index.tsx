import { useMemo, useRef, memo, useState, useEffect } from 'react';
import $style from './index.module.scss';

const GameContent = (props: any) => {
    const { rows, item, currentIndex, isActive, itemSize, bg, itemClick, connectBlock } = props;
    const gameRef = useRef() as any;
    const onGameItemClick = () => {
        if (item.originalIndex === currentIndex) {
            gameRef.current.classList.add($style['game-click']);
            setTimeout(() => {
                gameRef.current.classList.remove($style['game-click']);
            }, 2000);
            return;
        }
        itemClick();
    };

    const itemStyle = useMemo(() => {
        const x = Math.floor(item.originalIndex / rows);
        const y = item.originalIndex % rows;

        const top = Math.floor(currentIndex / rows);
        const left = currentIndex % rows;

        return {
            background: `url(${bg}) -${y * itemSize}px -${x * itemSize}px`,
            backgroundSize: `${itemSize * rows}px ${itemSize * rows}px`,
            backgroundPosition: `-${y * itemSize}px -${x * itemSize}px`,
            top: top * itemSize + 'px',
            left: left * itemSize + 'px',
            width: itemSize + 'px',
            height: itemSize + 'px',
        }
    }, [currentIndex, item, itemSize, bg]);

    const borderStyle = useMemo(() => {
        const lines = Math.floor(currentIndex / rows);
        const cols = currentIndex % rows;

        if (connectBlock?.lineBlock.length) {
            // 判断当前元素是否在行块中
            for (let i = 0; i < connectBlock?.lineBlock.length; i++) {
                for (let j = 0; j < connectBlock.lineBlock[i].length; j++) {
                    if (connectBlock.lineBlock[i][j].row === lines && connectBlock.lineBlock[i][j].col === cols) {
                        if (j === 0) {
                            return {
                                borderTop: '2px dashed #F6F6F6',
                                borderBottom: '2px dashed #F6F6F6',
                                borderRight: 'none',
                                borderLeft: '2px dashed #F6F6F6'
                            }
                        }
                        else if (j === connectBlock.lineBlock[i].length - 1) {
                            return {
                                borderTop: '2px dashed #F6F6F6',
                                borderBottom: '2px dashed #F6F6F6',
                                borderRight: '2px dashed #F6F6F6',
                                borderLeft: 'none'
                            }
                        }
                        else {
                            return {
                                borderTop: '2px dashed #F6F6F6',
                                borderBottom: '2px dashed #F6F6F6',
                                borderRight: 'none',
                                borderLeft: 'none'
                            }
                        }
                    }
                }
            }
        }

        if (connectBlock?.colBlock?.length) {
            // 判断当前元素是否在列块中
            for (let i = 0; i < connectBlock?.colBlock.length; i++) {
                for (let j = 0; j < connectBlock.colBlock[i].length; j++) {
                    if (connectBlock.colBlock[i][j].row === lines && connectBlock.colBlock[i][j].col === cols) {
                        if (j === 0) {
                            return {
                                borderTop: '2px dashed #F6F6F6',
                                borderBottom: 'none',
                                borderRight: '2px dashed #F6F6F6',
                                borderLeft: '2px dashed #F6F6F6'
                            }
                        }
                        else if (j === connectBlock.colBlock[i].length - 1) {
                            return {
                                borderTop: 'none',
                                borderBottom: '2px dashed #F6F6F6',
                                borderRight: '2px dashed #F6F6F6',
                                borderLeft: '2px dashed #F6F6F6'
                            }
                        }
                        else {
                            return {
                                borderTop: 'none',
                                borderBottom: 'none',
                                borderRight: '2px dashed #F6F6F6',
                                borderLeft: '2px dashed #F6F6F6'
                            }
                        }
                    }
                }
            }
        }

        return {
            borderBottom: lines !== (rows - 1) ? '1px solid #784017' : 'none',
            borderRight: cols !== (rows - 1) ? '1px solid #784017' : 'none',
        }
    }, [currentIndex, rows, connectBlock]);

    const isDiffBlock = useMemo(() => {
        const lines = Math.floor(currentIndex / rows);
        const cols = currentIndex % rows;

        let isLineBlock = false;
        const lineBlock = connectBlock.lineBlock.flat();
        isLineBlock = lineBlock.find((item: any) => item.row === lines && item.col === cols);

        let isRowBlock = false;
        const colBlock = connectBlock.colBlock.flat();
        isRowBlock = colBlock.find((item: any) => item.row === lines && item.col === cols);

        return {
            isLineBlock,
            isRowBlock
        };

    }, [currentIndex, connectBlock, rows]);

    useEffect(() => {
        console.log('是否被包含', isDiffBlock);
    }, [isDiffBlock]);

    return (
        <div
            ref={gameRef}
            onClick={() => onGameItemClick()}
            className={`
                ${$style['game-item']}
                ${isActive ? $style['active'] : ''}
                ${item.originalIndex === currentIndex && $style['success']}
            `}
            key={item.key}
            style={{
                ...itemStyle,
                ...borderStyle
            }}
        >
        </div>
    )
};



export default memo(GameContent);
