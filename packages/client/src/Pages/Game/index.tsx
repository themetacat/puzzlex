import { useEffect, useState } from 'react';
import GameContent from './components/GameContent';
import GameoverModal from './components/GameoverModal';
import SuccessModal from './components/SuccessModal';
import GameRoundModal from './components/GameRoundModal';
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

const Game = () => {
    const [isShowGameoverModal, setShowgameoverModal] = useState(false);
    const [isShowSuccessModal, setShowSuccessModal] = useState(false);
    const [isShowRoundModal, setShowRoundModal] = useState(false);
    const [list, setList] = useState([]) as any;
    const rows = 4;

    const onCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const onCloseGameoverModal = () => {
        setShowgameoverModal(false);
    };

    const onCloseRoundModal = () => {
        setShowRoundModal(false);
    };

    useEffect(() => {
        const arr = shuffleIndexes(rows ** 2);
        setList(arr);
    }, []);

    return (
        <div className={$style['game']}>
            <div className={$style['game-main']}>
                <div className={$style['game-main-left']}>
                    <div className={$style['left-top']}>
                        <div className={$style['top-item']}>
                            <div className={$style['top-item-text']}>Pool Rewards</div>
                            <div className={$style['top-item-value']}>0.0321</div>
                            <div className={$style['top-item-pool']}></div>
                        </div>
                        <div className={$style['top-item']}>
                            <div className={$style['top-item-star']} onClick={() => setShowRoundModal(true)}></div>
                        </div>
                        <div className={$style['top-item']}>
                            <div className={$style['top-item-step']}></div>
                            <div className={$style['top-item-value']}>25</div>
                        </div>
                    </div>
                    <div className={$style['left-bottom']}>
                        <div className={$style['bottom-value']}>4d 21:57:00</div>
                        <div className={$style['bottom-desc']}>Until  the  round  ends</div>
                    </div>
                </div>
                <div className={$style['game-main-content']}>
                    <div className={$style['content-bg1']}></div>
                    <div className={$style['content-bg2']}></div>
                    <GameContent rows={rows} list={list} />
                </div>
                <div className={$style['game-main-right']}>
                    <div className={$style['right-btn']}>New Game</div>
                </div>
            </div>

            <GameoverModal open={isShowGameoverModal} close={onCloseGameoverModal} />
            <SuccessModal open={isShowSuccessModal} close={onCloseSuccessModal} />
            <GameRoundModal open={isShowRoundModal} close={onCloseRoundModal} />
        </div>
    )
};

export default Game;