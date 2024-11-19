import { useEffect, useMemo, useState, memo, useRef } from 'react';
import GameItem from '../GameItem';
import { v4 } from "uuid";
import $style from './index.module.scss';

import GameBg from '@/assets/game/game.png';

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
        const contentBlock: any = {
            lineBlock: [],
            colBlock: [],
            successLineBlock: [],
            successColBlck: []
        };

        for (let i = 0; i < twoDimArray.length; i++) {
            let connectedSequence = [];
            for (let j = 0; j < twoDimArray[i].length; j++) {
                if (j + 1 < twoDimArray[i].length && twoDimArray[i][j].originalIndex + 1 === twoDimArray[i][j + 1].originalIndex && twoDimArray[i][j].originalIndex !== (i*rows + j)) {
                    connectedSequence.push({ row: i, col: j });
                } else {
                    if (connectedSequence.length > 0) {
                        connectedSequence.push({ row: i, col: j }); // Add the last element to the sequence
                        contentBlock.lineBlock.push(connectedSequence.slice());
                        connectedSequence = []; // Reset the connected sequence
                    }
                }
            }
        }

        // 垂直方向
        for (let j = 0; j < twoDimArray[0].length; j++) {
            let connectedSequence = [];
            for (let i = 0; i < twoDimArray.length; i++) {
                if (i + 1 < twoDimArray.length && twoDimArray[i][j].originalIndex + rows === twoDimArray[i + 1][j].originalIndex && twoDimArray[i][j].originalIndex !== (i*rows + j)) {
                    connectedSequence.push({ row: i, col: j });
                } else {
                    if (connectedSequence.length > 0) {
                        connectedSequence.push({ row: i, col: j });
                        contentBlock.colBlock.push(connectedSequence.slice());
                        connectedSequence = [];
                    }
                }
            }
        }

        return contentBlock;
    };

    const twoDimArray = getTwoDimArray(shuffledArray, rows);
    const res = getConnectBlock(twoDimArray, rows)
    return res;
};

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

    const connectBlock = useMemo(() => {
        return getConnectBlock(gameList, rows);
    }, [rows, gameList]);

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
            // 如果当前的index被包含在为归位的包含块里，那就把整个包含块给丢进去
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

    useEffect(() => {
        console.log('connectBlock---->>>>>>', connectBlock);
    }, [connectBlock]);

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
                            connectBlock={connectBlock}
                            itemClick={() => onGameItemClick(index)}
                        />
                    )
                })
            }
        </div>
    )
};



export default memo(GameContent);
