import { useEffect, useMemo, useRef, useState } from 'react';
import GameItem from '../GameItem';
import { v4 } from "uuid";
import $style from './index.module.scss';

import GameBg from '@/assets/game/game.png';

// 1. 组件被传入经过打乱的数组 defultGames 给组件内的数据源gameList
// 2. gameItem组件经过循环渲染gameList
// 3. 

const GameContent = (props: any) => {
    const { rows, list } = props;
    const [gameList, setGameList] = useState([]) as any;
    const [activeIndex, setActiveIndex] = useState([]) as any;

    const defultGames = useMemo(() => {
        return list.map((item: any) => {
            return {
                originalIndex: item,
                key: v4()
            }
        });
    }, [rows, list]);

    const itemSize = useMemo(() => {
        const size = 742 / rows;
        return size;
    }, [rows]);

    useEffect(() => {
        setGameList(defultGames)
    }, [defultGames]);

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