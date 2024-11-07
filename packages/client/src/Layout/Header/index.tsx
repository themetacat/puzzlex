import $style from './index.module.scss';

const Header = () => {
    return (
        <div className={$style.header}>
            <div className={$style['header-left']}>
                <div className={$style['header-left-logo']}></div>
                <div className={$style['header-left-text']}>PuzzleX</div>
            </div>
            <div className={$style['header-menu']}>
                <div className={$style['header-menu-item']}>PuzzleX</div>
                <div className={$style['header-menu-item']}>Create</div>
            </div>
            <div className={$style['header-right']}>
                <div className={`${$style['header-right-item']} ${$style['icon-x']}`}></div>
                <div className={`${$style['header-right-item']} ${$style['icon-feishu']}`}></div>
                <div className={`${$style['header-right-item']} ${$style['icon-git']}`}></div>
            </div>
            <div className={$style['header-connect']}>Connect</div>
        </div>
    )
};

export default Header;