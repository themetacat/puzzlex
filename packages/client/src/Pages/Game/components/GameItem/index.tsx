import { useMemo, useRef, memo, useState, useEffect } from 'react';
import $style from './index.module.scss';

const GameContent = (props: any) => {
    const { rows, item, currentIndex, isActive, itemSize, bg, itemClick } = props;
    const gameRef = useRef() as any;
    const [isShowdSuccess, setShowdSuccess] = useState(false);
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
            backgroundSize: '742px 742px',
            backgroundPosition: `-${y * itemSize}px -${x * itemSize}px`,
            top: top * itemSize + 'px',
            left: left * itemSize + 'px',
            width: itemSize + 'px',
            height: itemSize + 'px',
        }
    }, [currentIndex, item, itemSize, bg]);

    const successDom = useMemo(() => {
        return (
            item.originalIndex === currentIndex && (
                <>
                    <div className={$style['success-mask']}></div>
                    <div className={$style['success-icon']}></div>
                </>
            )
        )
    }, [item, currentIndex]);

    return (
        <div
            ref={gameRef}
            onClick={() => onGameItemClick()}
            className={`
                ${$style['game-item']}
                ${isActive ? $style['active'] : ''}                
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