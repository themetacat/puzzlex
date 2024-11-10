import {useNavigate} from 'react-router-dom';
import $style from './index.module.scss';

const GameCard = () => {
    const history = useNavigate();

    const handleClick = () => {
        history('/game/aas');
    };

    return (
        <div className={$style['card']} onClick={handleClick}>
            <div className={$style['card-avatar']}>
                <div className={$style['card-avatar-content']}>
                    <div className={$style['content-item']}>
                        Remaining：1
                    </div>
                    <div className={$style['content-item']}>
                        6x6
                    </div>
                </div>
            </div>
            <div className={$style['card-main']}>
                <div className={$style['card-main-title']}>
                    <div className={$style['title-text']}>Wool Pouch (Blast)</div>
                    <div className={$style['title-icon']}></div>
                </div>
                <div className={$style['card-main-message']}>
                    <div className={$style['message-item']}>
                        <div className={$style['message-item-title']}>Plays</div>
                        <div className={$style['message-item-value']}>123</div>
                    </div>

                    <div className={$style['message-item']}>
                        <div className={$style['message-item-title']}>Pool</div>
                        <div className={$style['message-item-value']}>0.0321 ETH</div>
                    </div>

                    <div className={$style['message-item']}>
                        <div className={$style['message-item-title']}>4d 22:02:20</div>
                        <div className={$style['message-item-value']}>Until the round ends</div>
                    </div>
                </div>
                <div className={$style['card-main-price']}>
                    <div className={$style['price-value']}>0.005ETH</div>
                    <div className={$style['price-unit']}>
                        / 3 plays
                    </div>
                </div>
                <div className={$style['card-main-control']}>
                    <div className={$style['control-btn']}>BUY</div>
                    <div className={$style['control-btn']}>PLAY</div>
                </div>
            </div>
        </div>
    )
};

export default GameCard;