import { useEffect, useMemo, useState } from 'react';
import GameItem from '../GameItem';
import { v4 } from "uuid";
import $style from './index.module.scss';

function getRandomColor() {
    // 生成随机的 R、G、B 分量
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // 拼接成 RGB 颜色格式
    var randomColor = 'rgb(' + r + ',' + g + ',' + b + ')';

    return randomColor;
}

const GameContent = (props: any) => {
    const { rows } = props;
    const [switchArr, setSwitchArr] = useState([]) as any;
    const games = useMemo(() => {
        const arr = [];
        for (let i = 0; i < rows ** 2; i++) {
            arr.push(
                {
                    bg: getRandomColor(),
                    id: i,
                    key: v4()
                }
            );
        }
        return arr;
    }, [rows]);

    const [gameList, setGameList] = useState([]) as any;

    useEffect(() => {
        setGameList(games);
    }, games);

    const itemSize = useMemo(() => {
        const size = 742 / rows;
        return size;
    }, [rows]);

    const handleClick = (index: number) => {
        if (!switchArr.length) {
            setSwitchArr([index]);
        }
        else if (index === switchArr[0]) {
            setSwitchArr([]);
        }
        else if (index !== switchArr[0]) {
            const newArr = switchArrayItems([...gameList], switchArr[0], index) as any;
            setGameList(newArr);
            setTimeout(() => {
                setSwitchArr([]);
            })
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

    useEffect(() => {
        console.log(gameList, '===');
    }, [gameList]);

    return (
        <div className={$style['game-wrapper']}>
            {
                gameList.map((item: any, index: number) => (
                    <GameItem
                        key={item.key}
                        data={item}
                        index={index}
                        rows={rows}
                        itemSize={itemSize}
                        activeIndex={switchArr[0] !== undefined ? switchArr[0] : ''}
                        onClick={() => handleClick(index)}
                    />
                ))
            }
        </div>
    )
};



export default GameContent;