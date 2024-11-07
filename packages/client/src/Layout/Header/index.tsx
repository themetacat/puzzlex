import { useNavigate } from 'react-router-dom';
import $style from './index.module.scss';

const Header = () => {

    const history = useNavigate();

    const onNavigate = (path: string) => {
        history(path);
    };

    const onConnect = () => {};
    const onClickIcon = (path: string) => {};

    return (
        <div className={$style.header}>
            <div className={$style['header-left']} onClick={() => onNavigate('/')}>
                <div className={$style['header-left-logo']}></div>
                <div className={$style['header-left-text']}>PuzzleX</div>
            </div>
            <div className={$style['header-menu']}>
                <div className={$style['header-menu-item']} onClick={() => onNavigate('/')}>PuzzleX</div>
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
            <div className={$style['header-connect']} onClick={onConnect}>Connect</div>
        </div>
    )
};

export default Header;