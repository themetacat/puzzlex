import { useEffect, useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { Dropdown } from 'antd';

import $style from './index.module.scss';

const Header = () => {
    const history = useNavigate();
    const [isGamePage, setIsGamePage] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [selectedKeys, setSelectKeys] = useState([] as any);

    const onNavigate = (path: string) => {
        history(path);
    };
    const matchGame = useMatch('/game/:id');
    const matchProfile = useMatch('/profile');

    useEffect(() => {
        if (matchGame?.pattern.path === '/game/:id') {
            setIsGamePage(true);
        }
        else if (matchProfile?.pattern.path === '/profile') {
            setSelectKeys(['profile']);
            setIsGamePage(false);
        }
        else {
            setSelectKeys([]);
            setIsGamePage(false);
        }
    }, [matchGame, matchProfile]);

    const walletMenu: any = [
        {
            key: 'profile',
            label: <div >Profile</div>,
            onClick: () => {
                history('/profile');
            }
        },
        {
            key: 'disconnect',
            label: <div>Disconnect</div>,
            onClick: () => {}
        }
    ];

    const onConnect = () => { };
    const onClickIcon = (path: string) => { };

    return (
        <div className={`${$style.header} ${isGamePage && $style['game']}`}>
            <div className={$style['header-left']} onClick={() => onNavigate('/')}>
                <div className={$style['header-left-logo']}></div>
                <div className={$style['header-left-text']}>PuzzleX</div>
            </div>
            <div className={$style['header-menu']}>
                <div className={$style['header-menu-item']} onClick={() => onNavigate('/')}>Puzzles</div>
                <div className={$style['header-menu-item']} onClick={() => onNavigate('/create-game')}>Create</div>
            </div>
            <div className={$style['header-right']}>
                <div
                    className={`${$style['header-right-item']} ${$style['icon-x']}`}
                    onClick={() => onClickIcon('x')}
                ></div>
                <div
                    className={`${$style['header-right-item']} ${$style['icon-feishu']}`}
                    onClick={() => onClickIcon('feishu')}
                ></div>
                <div
                    className={`${$style['header-right-item']} ${$style['icon-git']}`}
                    onClick={() => onClickIcon('git')}
                ></div>
            </div>
            {
                !isLogin ?
                    <div className={$style['header-connect']} onClick={onConnect}>Connect</div>
                    :
                    <Dropdown
                        menu={{items: walletMenu, selectedKeys: selectedKeys}}
                        trigger={['click']}
                        overlayClassName={$style['header-dropdown']}
                    >
                        <div className={$style['header-wallet']}>sssss</div>
                    </Dropdown>
            }
        </div>
    )
};

export default Header;