import $style from './index.module.scss';

const Game = () => {
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
        </div>
    )
};

export default Game;