import { Modal, Select, List } from 'antd';

import $style from './index.module.scss';

const listGrid = {
    column: 5,
    gutter: 10
};

const SelectImageModal = (props: any) => {
    const { open, cancel, onOk } = props;
    const imgList = [
        {},
        {},
        {},
        {},
        {}
    ];

    const onNext = () => {
        const selectImg = 'xxxxx';
        onOk(selectImg);
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
            <Select className={$style['modal-select']} style={{ width: '267px', height: '60px' }}>
                <Select.Option key={'1'} className={$style['modal-select-opt']}>
                    <div className={$style['opt-icon']}></div>
                    <div className={$style['opt-text']}>1</div>
                </Select.Option>
                <Select.Option key={'2'} className={$style['modal-select-opt']}>
                    <div className={$style['opt-icon']}></div>
                    <div className={$style['opt-text']}>1</div>
                </Select.Option>
                <Select.Option key={'3'} className={$style['modal-select-opt']}>
                    <div className={$style['opt-icon']}></div>
                    <div className={$style['opt-text']}>1</div>
                </Select.Option>
                <Select.Option key={'4'} className={$style['modal-select-opt']}>
                    <div className={$style['opt-icon']}></div>
                    <div className={$style['opt-text']}>1</div>
                </Select.Option>
            </Select>
            <div className={$style['modal-content']}>
                <List
                    grid={listGrid}
                    dataSource={imgList}
                    itemLayout='horizontal'
                    renderItem={(item: any) => {
                        return (
                            <List.Item>
                                <div className={$style['card']}></div>
                            </List.Item>
                        )
                    }}
                >
                    <List.Item></List.Item>
                </List>
            </div>
            <div className={$style['modal-footer']}>
                <div className={$style['modal-footer-cancel']} onClick={cancel}>Cancel</div>
                <div className={$style['modal-footer-ok']} onClick={onNext}>Open</div>
            </div>
        </Modal>
    )
};

export default SelectImageModal;