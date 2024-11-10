import { Modal } from 'antd';
import $style from './index.module.scss';
const EditImageModal = (props: any) => {
    const { open, onBack, onOk } = props;
    return (
        <Modal
            width={695}
            open={open}
            footer={null}
            title={false}
            closeIcon={null}
            className={$style['modal']}
        >
            <div className={$style['modal-content']}></div>
            <div className={$style['modal-footer']}>
                <div className={$style['modal-footer-left']}></div>
                <div className={$style['modal-footer-right']}>
                    <div className={$style['cancel']} onClick={onBack}>Back</div>
                    <div className={$style['ok']} onClick={onOk}>Confirm</div>
                </div>
            </div>
        </Modal>
    )
};

export default EditImageModal;