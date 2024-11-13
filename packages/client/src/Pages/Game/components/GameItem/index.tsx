import { useEffect, useMemo, useState } from 'react';
import $style from './index.module.scss';

const GameItem = (props: any) => {
    const {index, data, rows, itemSize, onClick, activeIndex} = props;
    const [posiObj, setPosi] = useState({
        left: 0,
        top: 0
    });
    const [zIndex, setZindex] = useState(0);
    const getPosition = (index: number) => {
        const rowIndex = Math.floor(index / rows);
        const colIndex = index % rows;
        return {
            top: rowIndex * itemSize,
            left: colIndex * itemSize
        };
    };

    const handleClick = () => {
        setZindex(10);
        setTimeout(() => {
            setZindex(0);
        }, 200);
        onClick();
    };

    useEffect(() => {
        setPosi(getPosition(index));
    }, [index]);
    return (
        <div
            className={`${$style['game-item']} ${activeIndex === index ? $style['active'] : ''}`}
            onClick={handleClick}
            style={{
                background: data.bg,
                width: itemSize + 'px',
                height: itemSize + 'px',
                left: posiObj.left + 'px',
                top: posiObj.top + 'px',
                zIndex: zIndex
            }}
        />
    )
};

export default GameItem;