import { Form, Input, InputNumber, Select, Space } from 'antd';
import SelectImageModal from './components/SelectImageModal';
import EditImageModal from './components/EditImageModal';
import $style from './index.module.scss';
import { useState } from 'react';

const CreateGame = () => {
    const [form] = Form.useForm();
    const [isShowSelectModal, setShowSelectModal] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div className={$style['create']}>
            <div className={$style['create-title']}>Co-create a game</div>
            <div className={$style['create-content']}>
                <div className={$style['create-content-left']}>
                    <div className={$style['left-form']}>
                        <div className={$style['left-form-title']}>Create</div>
                        <div className={$style['left-form-main']}>
                            <div className={$style['main-item']}>
                                <div className={$style['main-item-title']}>Game logic</div>
                                <div className={$style['main-item-desc']}>Provided by the platform, you do not need to write code.</div>
                            </div>
                            <Form
                                form={form}
                                {...layout}
                                labelAlign='left'
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please input first name' }]}
                                >
                                    <Input placeholder='Please enter' size='large' />
                                </Form.Item>
                                <Form.Item
                                    name="image"
                                    label="Game foreground image."
                                    rules={[{ required: true, message: 'Please input first name' }]}
                                >
                                    <div className={$style['form-upload']}>
                                        <div className={$style['form-upload-icon']}></div>
                                    </div>
                                </Form.Item>
                            </Form>
                            <div className={$style['main-sub']}>Once created, this information cannot be modified.</div>
                        </div>
                    </div>
                    <div className={$style['left-form']}>
                        <div className={$style['left-form-title']}>Setup</div>
                        <div className={$style['left-form-main']}>
                            <Form
                                form={form}
                                {...layout}
                                labelAlign='left'
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="pieces"
                                    label="Pieces"
                                >
                                    <Select options={[]} size='large' />
                                </Form.Item>
                                <Form.Item
                                    name="ticket"
                                    label="Ticket"
                                >
                                    <div className={$style['form-ticket']}>
                                        <Form.Item>
                                            <div className={$style['form-ticket-item']}>
                                                <InputNumber size='large' style={{ flex: 1, borderRadius: '6px' }} />
                                                <span>ETH</span>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div className={$style['form-ticket-item']}>
                                                <InputNumber size='large' style={{ flex: 1, borderRadius: '6px' }} />
                                                <span>Plays</span>
                                            </div>
                                        </Form.Item>
                                    </div>
                                </Form.Item>
                                <div className={$style['main-message']}>80% rewards players，10% to the platform，10% to the game creator</div>
                                <Form.Item
                                    name="session"
                                    label="Session"
                                >
                                    <Space.Compact style={{ width: '100%' }}>
                                        <InputNumber size='large' style={{ flex: 1, borderRadius: '6px' }} />

                                        <div className={$style['session-unit']}>
                                            Days<span>{'（from now）'}</span>
                                        </div>
                                    </Space.Compact>
                                </Form.Item>
                            </Form>
                            <div className={$style['main-sub']}>Can be modified after setup.</div>
                        </div>
                    </div>
                    <div className={$style['left-price']}>
                        Creation price： 0.03 ETH
                    </div>
                    <div className={$style['left-btn']}>Create</div>
                </div>
                <div className={$style['create-content-right']}>
                    <div className={$style['right-box']}>
                        <div className={$style['right-box-title']}>You Should Know</div>
                        <div className={$style['right-box-main']}>
                            <p>This puzzle game is generated collaboratively by you and the platform, where the platform provides the game logic and you provide the foreground images. However, the nominal ownership of the game belongs to you.</p>
                            <p>The game will generated as a NFT, you can see it on Opensea.</p>
                            <p>You will authorize players to play the game you co-created. Players need to pay you a ticket to play the game, which grants them usage rights. You will earn income while holding the game NFT, rather than when selling it.</p>
                            <p>You have agreed to our terms regarding the distribution of money from ticket and creation.</p>
                            <p>You can also set the pieces、ticket prices and the frequency of user rewards. But these will be applied in the next round.</p>
                        </div>
                    </div>
                </div>
            </div>

            <SelectImageModal open={isShowSelectModal} cancel={() => setShowSelectModal(false)} />
            <EditImageModal open={true} />
        </div>
    )
};

export default CreateGame;