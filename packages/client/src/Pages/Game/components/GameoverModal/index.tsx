import { Modal } from 'antd';

import $style from './index.module.scss';

const GameoverModal = (props: any) => {
    const { open, close } = props;

    return (
        <Modal
            width={650}
            open={open}
            footer={null}
            title={false}
            closeIcon={null}
            className={$style['modal']}
        >
            <div className={$style['modal-title']}>
                <div className={$style['modal-title-icon']} onClick={close}></div>
                <div className={$style['modal-title-text']}>
                    GAME OVER！
                </div>
            </div>
            <div className={$style['modal-content']}>
                <div className={$style['modal-content-card']}>
                    <div className={$style['card-icon']}></div>
                    <div className={$style['card-text']}>Unfortunately!</div>
                </div>
                <div className={$style['modal-content-card']}>
                    <div className={$style['card-text']}>
                        This round has ended. <br />
                        Please wait for the next round to <br />
                        begin or play another game.
                    </div>
                </div>
                <div className={$style['modal-content-btn']}>
                    BACK TO HOME!
                </div>
            </div>
        </Modal>
    )
};

export default GameoverModal;