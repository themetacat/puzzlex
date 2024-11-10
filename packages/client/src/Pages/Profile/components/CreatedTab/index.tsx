import GameCard from '@/Pages/Home/components/GameCard';
import $style from './index.module.scss';

const CreatedTab = () => {
    const ETHDetailRender = () => {
        return (
            <div className={$style['detail']}>
                <div className={$style['detail-item']}>
                    <div className={$style['detail-item-title']}>Earned</div>
                    <div className={$style['detail-item-value']}>0.000123 ETH</div>
                </div>
                <div className={$style['detail-equal']}></div>
                <div className={$style['detail-item']}>
                    <div className={$style['detail-item-title']}>Withdrawn</div>
                    <div className={$style['detail-item-value']}>0.000111 ETH</div>
                </div>
                <div className={$style['detail-add']}></div>
                <div className={$style['detail-pending']}>
                    <div className={$style['detail-item']}>
                        <div className={$style['detail-item-title']}>Pending</div>
                        <div className={$style['detail-item-value']}>0.000111 ETH</div>
                    </div>
                    <div className={$style['detail-pending-btn']}>
                        Claim
                    </div>
                </div>
            </div>
        )
    };
    return (
        <div className={$style['created']}>
            <ETHDetailRender />
            <div className={$style['created-list']}>
                <GameCard/>
            </div>
        </div>
    )
};

export default CreatedTab;