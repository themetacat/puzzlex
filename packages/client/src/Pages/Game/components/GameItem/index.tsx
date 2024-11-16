import { useEffect, useMemo, useRef, useState, memo } from 'react';
import $style from './index.module.scss';

const GameContent = (props: any) => {
    const { rows, item, index, activeIndex, itemSize, bg, itemClick } = props;
    const gameRef = useRef() as any;

    const onGameItemClick = () => {
        if (item.originalIndex === index) {
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

        const top = Math.floor(index / rows);
        const left = index % rows;

        return {
            background: `url(${bg}) -${y * itemSize}px -${x * itemSize}px`,
            backgroundSize: '742px 742px',
            backgroundPosition: `-${y * itemSize}px -${x * itemSize}px`,
            top: top * itemSize + 'px',
            left: left * itemSize + 'px',
            width: itemSize + 'px',
            height: itemSize + 'px',
        }
    }, [index, item, itemSize, bg]);

    const successDom = useMemo(() => {
        return (
            item.originalIndex === index && (
                <>
                    <div className={$style['success-mask']}></div>
                    <div className={$style['success-icon']}></div>
                </>
            )
        )
    }, [item, index]);

    return (
        <div
            ref={gameRef}
            onClick={() => onGameItemClick()}
            className={`
                ${$style['game-item']}
                ${activeIndex[0] === index ? $style['active'] : ''}                
            `}
            key={item.key}
            style={{
                ...itemStyle
            }}
        >
            {successDom}
        </div>
    )
};



export default memo(GameContent);