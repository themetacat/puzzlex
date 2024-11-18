import { useRef } from 'react';
import Cropper from 'react-cropper';
import { Modal } from 'antd';
import "cropperjs/dist/cropper.css";
import $style from './index.module.scss';

import defaultImg from '@/assets/game/game-default.png';


const EditImageModal = (props: any) => {
    const { open, onBack, onOk } = props;
    const cropperRef = useRef<any>(null);

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            return cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        }
    };

    const onConfirm = () => {
        const cropData = getCropData();
        onOk(cropData);
    };

    return (
        <Modal
            width={695}
            open={open}
            footer={null}
            title={false}
            closeIcon={null}
            className={$style['modal']}
        >
            <div className={$style['modal-content']}>
                <Cropper
                    ref={cropperRef}
                    src={defaultImg}
                    crossOrigin="use-credentials"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px'
                    }}
                    preview={'.' + $style['modal-footer-left']}
                    viewMode={1}
                    guides={true}
                    aspectRatio={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={true}
                    responsive={true}
                    checkOrientation={false}
                />
            </div>
            <div className={$style['modal-footer']}>
                <div className={$style['modal-footer-left']}></div>
                <div className={$style['modal-footer-right']}>
                    <div className={$style['cancel']} onClick={onBack}>Back</div>
                    <div className={$style['ok']} onClick={onConfirm}>Confirm</div>
                </div>
            </div>
        </Modal>
    )
};

export default EditImageModal;