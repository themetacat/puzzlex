import { useEffect, useMemo, useRef, useState } from 'react';
import GameItem from '../GameItem';
import { v4 } from "uuid";
import $style from './index.module.scss';

function shuffleIndexes(length: number) {
    // 创建一个包含 0 到 length-1 的有序索引数组
    const indexes = Array.from({ length: length }, (_, index) => index);

    // 打乱索引数组
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    return indexes;
}

import GameBg from '@/assets/game/game.png';

const GameContent = (props: any) => {
    const { rows } = props;
    const [gameList, setGameList] = useState([]) as any;
    const [activeIndex, setActiveIndex] = useState([]) as any;

    const games = useMemo(() => {
        const randomArr = shuffleIndexes(rows ** 2);
        return randomArr.map(item => {
            return {
                originalIndex: item,
                key: v4()
            }
        });
    }, [rows]);

    const itemSize = useMemo(() => {
        const size = 742 / rows;
        return size;
    }, [rows]);

    useEffect(() => {
        setGameList(games)
    }, [games]);

    const onGameItemClick = (index: number) => {
        if (activeIndex.length === 0) {
            setActiveIndex([index]);
        }
        else if (activeIndex.length === 1) {
            setActiveIndex([...activeIndex, index]);
            const newArr = switchArrayItems([...gameList], activeIndex[0], index) as any;
            setGameList(newArr);

            setTimeout(() => {
                setActiveIndex([])
            });
        }
    };

    const switchArrayItems = (arr: any[], index1: number, index2: number) => {
        // 检查索引是否有效
        if (index1 < 0 || index1 >= arr.length || index2 < 0 || index2 >= arr.length) {
            return "Invalid index";
        }
        // 交换数组中的两个元素
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
        return arr;
    }

    return (
        <div className={$style['game-wrapper']}>
            {
                gameList?.map((item: any, index: number) => {
                    return (
                        <GameItem
                            item={item}
                            index={index}
                            key={item.key}
                            activeIndex={activeIndex}
                            itemSize={itemSize}
                            rows={rows}
                            itemClick={() => onGameItemClick(index)}
                            bg={GameBg}
                        />
                    )
                })
            }
        </div>
    )
};



export default GameContent;