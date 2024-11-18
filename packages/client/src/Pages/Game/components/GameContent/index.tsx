import { useEffect, useMemo, useState, memo, useRef } from 'react';
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
    const gameWrapper = useRef() as any;

    const defultGames = useMemo(() => {
        return list.map((item: any) => {
            return {
                originalIndex: item,
                key: v4()
            }
        });
    }, [rows, list]);

    const itemSize = useMemo(() => {
        const width = gameWrapper?.current?.offsetWidth;
        if (gameWrapper?.current?.offsetWidth) {
            return width / rows;
        }
        return 0;
    }, [rows, gameWrapper.current]);

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

    const getConnectBlock = (shuffledArray: any, rows: number) => {
        // 塞到一个二维数组中
        function getTwoDimArray(shuffledArray: any, rows: any) {
            const twoDimArray = [];
            for (let i = 0; i < rows; i++) {
                twoDimArray.push(shuffledArray.slice(i * rows, (i + 1) * rows));
            }
            return twoDimArray;
        };

        function getConnectBlock(twoDimArray: any, rows: any) {
            // const connectedArrays = [];
            const contentBlock: any = {
                lineBlock: [],
                colBlock: []
            };
            const connect = [];

            for (let i = 0; i < twoDimArray.length; i++) {
                let connectedSequence = [];
                let connectSeq = [];
                for (let j = 0; j < twoDimArray[i].length; j++) {
                    if (j + 1 < twoDimArray[i].length && twoDimArray[i][j].originalIndex + 1 === twoDimArray[i][j + 1].originalIndex && twoDimArray[i][j].originalIndex !== (i*rows + j)) {
                        connectedSequence.push(twoDimArray[i][j]);
                        connectSeq.push({ row: i, col: j });
                    } else {
                        if (connectedSequence.length > 0) {
                            connectedSequence.push(twoDimArray[i][j]); // Add the last element to the sequence
                            connectSeq.push({ row: i, col: j })
                            contentBlock.lineBlock.push(connectedSequence.slice()); // Add the connected sequence to the result
                            connect.push(connectSeq.slice());
                            connectedSequence = []; // Reset the connected sequence
                            connectSeq = [];
                        }
                    }
                }
            }

            // 垂直方向
            for (let j = 0; j < twoDimArray[0].length; j++) {
                let connectedSequence = [];
                let connectSeq = [];
                for (let i = 0; i < twoDimArray.length; i++) {
                    if (i + 1 < twoDimArray.length && twoDimArray[i][j].originalIndex + rows === twoDimArray[i + 1][j].originalIndex && twoDimArray[i][j].originalIndex !== (i*rows + j)) {
                        connectedSequence.push(twoDimArray[i][j]);
                        connectSeq.push({ row: i, col: j });
                    } else {
                        if (connectedSequence.length > 0) {
                            connectedSequence.push(twoDimArray[i][j]);
                            connectSeq.push({ row: i, col: j })
                            contentBlock.colBlock.push(connectedSequence.slice());
                            connect.push(connectSeq.slice());
                            connectedSequence = [];
                            connectSeq = [];
                        }
                    }
                }
            }

            return { contentBlock, connect };
        };

        const twoDimArray = getTwoDimArray(shuffledArray, rows);
        const res = getConnectBlock(twoDimArray, rows)
        return res;
    };

    useEffect(() => {
        const res = getConnectBlock(gameList, rows);
        console.log(res.contentBlock, 'xxxx');
    }, [gameList, rows]);

    return (
        <div className={$style['game-wrapper']} ref={gameWrapper}>
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
