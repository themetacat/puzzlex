import { Modal } from 'antd';

import $style from './index.module.scss';

const GameoverModal = (props: any) => {
    const {open} = props;
    return (
        <Modal width={650} open={open} footer={false} title={false} closeIcon={null}>
        </Modal>
    )
};

export default GameoverModal;