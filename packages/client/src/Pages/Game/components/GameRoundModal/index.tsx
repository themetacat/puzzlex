import { Modal, Select } from 'antd';

import $style from './index.module.scss';

const SuccessModal = (props: any) => {
    const { open, close } = props;

    const SelectOptionList = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' }
    ];

    return (
        <Modal
            width={736}
            open={open}
            footer={null}
            title={false}
            closeIcon={null}
            className={$style['modal']}
        >
            <div className={$style['modal-title']}>
                <div className={$style['modal-title-icon']} onClick={close}></div>
                <div className={$style['modal-title-text']}>
                    {/* ROUND 3 */}
                    <Select style={{width: '228px', height: '54px'}} options={SelectOptionList} size='large'></Select>
                </div>
            </div>
            <div className={$style['modal-content']}>
                <div className={$style['modal-content-box']}>
                    <div className={$style['box-block']}>
                        <div className={$style['box-block-item']}>
                            <div className={$style['item-left']}>
                                <div className={$style['left-value']}>4d 21:57:00</div>
                                <div className={$style['left-title']}>Until the round ends</div>
                            </div>
                            <div className={$style['item-right']}>
                                <div className={$style['right-value']}>0.075</div>
                                <div className={$style['right-title']}>Rewards</div>
                            </div>
                        </div>
                        <div className={$style['box-block-item']}>
                            <div className={$style['item-left']}>
                                <div className={$style['left-title']}>Pending</div>
                                <div className={$style['left-value']}>0.0000005</div>
                            </div>
                            <div className={$style['item-right']}>Claim</div>
                        </div>
                    </div>
                </div>
                <div className={$style['modal-content-bottom']}>
                    <div className={$style['bottom-item']}>
                        <div className={$style['bottom-item-level']}></div>
                        You
                    </div>
                    <div className={$style['bottom-item']}>0×12...2345</div>
                    <div className={$style['bottom-item']}>34</div>
                    <div className={$style['bottom-item']}>2</div>
                    <div className={$style['bottom-item']}>0.00005</div>
                </div>
            </div>
        </Modal>
    )
};

export default SuccessModal;