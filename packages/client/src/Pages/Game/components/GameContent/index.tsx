import { useEffect, useMemo, useState, memo, useRef } from 'react';
import GameItem from '../GameItem';
import { v4 } from "uuid";
import $style from './index.module.scss';

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
                if (j + 1 < twoDimArray[i].length && twoDimArray[i][j].originalIndex + 1 === twoDimArray[i][j + 1].originalIndex && twoDimArray[i][j].originalIndex !== (i * rows + j)) {
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
                if (i + 1 < twoDimArray.length && twoDimArray[i][j].originalIndex + rows === twoDimArray[i + 1][j].originalIndex && twoDimArray[i][j].originalIndex !== (i * rows + j)) {
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
    const { rows, list, gameImg } = props;
    const [gameList, setGameList] = useState([]) as any;
    const [activeList, setActiveList] = useState([]) as any;
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

    const findConnectBlock = (index: number) => {
        const lines = Math.floor(index / rows);
        const cols = index % rows;

        const lineBlock = [...connectBlock.lineBlock];
        const colBlock = [...connectBlock.colBlock]
        let block = [];
        for (let i = 0; i < lineBlock.length; i++) {
            for (let j = 0; j < lineBlock[i].length; j++) {
                if (connectBlock.lineBlock[i][j].row === lines && connectBlock.lineBlock[i][j].col === cols) {
                    block = connectBlock.lineBlock[i];
                }
            }
        }

        if (block.length) return block.map((item: any) => item.row * rows + item.col);

        for (let i = 0; i < colBlock.length; i++) {
            for (let j = 0; j < colBlock[i].length; j++) {
                if (connectBlock.colBlock[i][j].row === lines && connectBlock.colBlock[i][j].col === cols) {
                    block = connectBlock.colBlock[i];
                }
            }
        }

        return block.map((item: any) => item.row * rows + item.col);
    };

    const onGameItemClick = (index: number) => {
        if (activeList.length === 0) {
            const actBlock = findConnectBlock(index);
            console.log(actBlock, 'xxxxx');
            setActiveList(actBlock.length ? actBlock : [index]);
        }
        else if (activeList.includes(index)) {
            setActiveList([]);
        }
        else {
            const reBlock = findConnectBlock(index);
            if (activeList.length === 1) {
                onSwitch(activeList, [index]);
                setActiveList([]);
            }
            else if (activeList.length === reBlock.length) {
                onSwitch(activeList, reBlock);
                setActiveList([]);
            }
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

    return (
        <div className={$style['game-wrapper']} ref={gameWrapper}>
            {
                gameList?.map((item: any, index: number) => {
                    return (
                        <GameItem
                            item={item}
                            currentIndex={index}
                            key={item.key}
                            isActive={activeList.includes(index)}
                            itemSize={itemSize}
                            rows={rows}
                            bg={gameImg}
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
