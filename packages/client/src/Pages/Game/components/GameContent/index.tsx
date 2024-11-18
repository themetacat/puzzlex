import { useEffect, useMemo, useState, memo } from 'react';
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
    const [activeIndex, setActiveIndex] = useState(undefined) as any;

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
        if (typeof activeIndex === 'undefined') {
            setActiveIndex(index);
        }
        else if (activeIndex === index) {
            setActiveIndex(undefined);
        }
        else {
            // 开始互换
            onSwitch([activeIndex], [index]);
            setActiveIndex(undefined);
        }
    };

    // 互换两个元素列表
    const onSwitch = (arr1: number[], arr2: number[]) => {
        if (arr1.length !== arr2.length) return;

        const newGameList = [...gameList];
        for (let i = 0; i < arr1.length; i++) {
            [newGameList[arr1[i]], newGameList[arr2[i]]] = [newGameList[arr2[i]], newGameList[arr1[i]]];
        }
        setGameList(newGameList);
    };

    const getConnectBlock = () => {

    };

    useEffect(() => {}, []);

    return (
        <div className={$style['game-wrapper']}>
            {
                gameList?.map((item: any, index: number) => {
                    return (
                        <GameItem
                            item={item}
                            currentIndex={index}
                            key={item.key}
                            isActive={activeIndex === index}
                            itemSize={itemSize}
                            rows={rows}
                            bg={GameBg}
                            itemClick={() => onGameItemClick(index)}
                        />
                    )
                })
            }
        </div>
    )
};



export default memo(GameContent);