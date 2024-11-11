import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import GameCard from './components/GameCard';
import $style from './index.module.scss';
import { useEffect, useState } from 'react';

const listGrid = {
    column: 2,
    gutter: 30
};

const resList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];

const Home = () => {
    const [gameList, setGameList] = useState([] as any);
    const [isHasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const getGameList = () => {
        if (isLoading || !isHasMore) return;

        setLoading(true);

        setTimeout(() => {
            setGameList([...gameList, ...resList]);
            if (gameList.length > 20) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        getGameList();
    }, []);

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
                <div
                    id="scrollableDiv"
                    className={$style['home-main-list']}
                >
                    <InfiniteScroll
                        dataLength={gameList.length}
                        hasMore={isHasMore}
                        loader={<div className={$style['loading']}></div>}
                        next={() => getGameList()}
                        endMessage={<div className={$style['end-text']}>All Caught Up!</div>}
                    >
                    <List
                        grid={listGrid}
                        dataSource={gameList}
                        itemLayout='horizontal'
                        locale={{
                            emptyText: <></>
                        }}
                        renderItem={(item: any) => {
                            return (
                                <List.Item key={item.id} style={{
                                    marginBottom: '30px'
                                }}>
                                    <GameCard />
                                </List.Item>
                            )
                        }}
                    >
                    </List>
                    </InfiniteScroll>
                   
                </div>
            </div>
        </div>
    )
};

export default Home;