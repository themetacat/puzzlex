import { useState } from 'react';
import GameoverModal from './components/GameoverModal';
import SuccessModal from './components/SuccessModal';
import GameRoundModal from './components/GameRoundModal';
import $style from './index.module.scss';

const Game = () => {
    const [isShowGameoverModal, setShowgameoverModal] = useState(false);
    const [isShowSuccessModal, setShowSuccessModal] = useState(false);
    const [isShowRoundModal, setShowRoundModal] = useState(false);

    const onCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const onCloseGameoverModal = () => {
        setShowgameoverModal(false);
    };

    const onCloseRoundModal = () => {
        setShowRoundModal(false);
    };

    return (
        <div className={$style['game']}>
            <div className={$style['game-left']}>
                <div className={$style['game-left-top']}>
                    <div className={$style['top-item']}>
                        <div className={$style['top-item-text']}>Pool Rewards</div>
                        <div className={$style['top-item-pool']}></div>
                        <div className={$style['top-item-value']}>0.0321</div>
                    </div>
                    <div className={$style['top-item']}>
                        <div className={$style['top-item-star']}></div>
                    </div>
                    <div className={$style['top-item']}>
                        <div className={$style['top-item-step']}></div>
                        <div className={$style['top-item-value']}>25</div>
                    </div>
                </div>
                <div className={$style['game-left-bottom']}>
                    <div className={$style['bottom-value']}>4d 21:57:00</div>
                    <div className={$style['bottom-desc']}>Until  the  round  ends</div>
                </div>
            </div>
            <div className={$style['game-content']}>
                <div className={$style['game-content-bg1']}></div>
                <div className={$style['game-content-bg2']}></div>
            </div>
            <div className={$style['game-right']}>
                <div className={$style['game-right-btn']}>New Game</div>
            </div>

            <GameoverModal open={isShowGameoverModal} close={onCloseGameoverModal} />
            <SuccessModal open={isShowSuccessModal}  close={onCloseSuccessModal}/>
            <GameRoundModal open={isShowRoundModal} close={onCloseRoundModal}/>
        </div>
    )
};

export default Game;