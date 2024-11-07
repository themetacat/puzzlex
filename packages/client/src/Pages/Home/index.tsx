import {List} from 'antd';
import VirtualList from 'rc-virtual-list';
import GameCard from './components/GameCard';
import $style from './index.module.scss';

const Home = () => {
    return (
        <div className={$style['home']}>
            <div className={$style['home-top']}>
                <div className={$style['home-top-title']}>
                    Explore, Create, and Play
                </div>
                <div className={$style['home-top-desc']}>
                    In the World of Crypto Puzzles.
                </div>
            </div>
            <div className={$style['home-main']}>
                <div className={$style['home-main-title']}>Puzzles</div>
                <div className={$style['home-main-content']}>
                    <GameCard />
                    <GameCard />
                    <GameCard />
                    <GameCard />
                    <GameCard />
                </div>
            </div>
        </div>
    )
};

export default Home;