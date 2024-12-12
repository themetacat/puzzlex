import { useRef } from 'react';
import Cropper from 'react-cropper';
import { Modal } from 'antd';
import "cropperjs/dist/cropper.css";
import $style from './index.module.scss';

const pinataApiKey = import.meta.env.VITE_PINATAAPIKEY;
const pinataSecretApiKey = import.meta.env.VITE_PINATASAPIKEY;

const EditImageModal = (props: any) => {
    const { open, onBack, onOk, nftData } = props;
    const cropperRef = useRef<any>(null);

    const getCropData = () => {
        return new Promise(reslove => {
            const cropper = cropperRef.current?.cropper;
            if (cropper) {
                // 获取裁剪后的 Canvas
                cropper.getCroppedCanvas().toBlob((blob: any) => {
                    if (blob) {
                        const croppedFile = new File([blob], 'cropped-image.png', { type: blob.type });
                        reslove(croppedFile)
                    }
                });
            }
            else {
                reslove('');
            }
        });
    };

    const onConfirm = async () => {
        const cropData = await getCropData();
        const imgUrl = await uploadFIle(cropData)
        onOk(imgUrl);
    };

    const uploadFIle = async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);  // 将文件添加到表单数据中
        formData.append('pinataMetadata', JSON.stringify({
            name: nftData.name,
            keyvalues: {
                customKey: 'customValue',
            }
        }));
        // 发起上传请求
        const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey,
                },
                body: formData
            });
            const result = await response.json();
            if (result.IpfsHash) {
                // const ipfsLink = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
                return result.IpfsHash;
            }
        } catch (error) {
            console.error('上传失败:', error);
        }
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
                    src={nftData.image_url}
                    crossOrigin="anonymous"
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