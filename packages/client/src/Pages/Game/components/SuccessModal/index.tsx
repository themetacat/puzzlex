import { Modal } from 'antd';

import $style from './index.module.scss';

const SuccessModal = (props: any) => {
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
                    Congrats！
                </div>
            </div>
            <div className={$style['modal-content']}>
                <div className={$style['modal-content-card']}>
                    <div className={$style['card-icon']}></div>
                    <div className={$style['card-text']}>Current Steps:</div>
                    <div className={$style['card-value']}>36</div>
                </div>
                <div className={$style['modal-content-card']}>
                    <div className={$style['card-icon']}></div>
                    <div className={$style['card-text']}>Best Historical Steps</div>
                    <div className={$style['card-value']}>20</div>
                </div>
                <div className={$style['modal-content-card']}>
                    <div className={$style['card-left']}>
                        <div className={$style['card-left-title']}>Remainings: 3</div>
                        <div className={$style['card-left-value']}>0.0005 ETH/ 5 plays</div>
                    </div>
                    <div className={$style['card-right']}>BUY</div>
                </div>
                <div className={$style['modal-content-btn']}>
                    PLAY AGAIN !
                </div>
            </div>
        </Modal>
    )
};

export default SuccessModal;