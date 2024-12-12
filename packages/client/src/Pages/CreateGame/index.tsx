import { useEffect, useMemo, useState } from 'react';
import { Form, Input, InputNumber, Select, Space } from 'antd';
// import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
// import { useMUD } from "@/MUDContext";
import SelectImageModal from './components/SelectImageModal';
import EditImageModal from './components/EditImageModal';
// import { useComponentValue } from '@latticexyz/react';
// import { singletonEntity } from "@latticexyz/store-sync/recs";
import $style from './index.module.scss';
import { getComponentValue } from '@latticexyz/recs';
// import {
//     encodeEntity,
//     decodeEntity,
//   } from "@latticexyz/store-sync/recs";

const preImg = 'https://gateway.pinata.cloud/ipfs/';
// const addressToEntityID = (address: Hex) =>
//     encodeEntity({ address: "address" }, { address });

const CreateGame = () => {
    const [form] = Form.useForm();
    const [isShowSelectModal, setShowSelectModal] = useState(false);
    const [isShowEditModal, setShowEditModal] = useState(false);
    const [curNft, setCurNft] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    // const { address } = useAccount();

    // form.setFieldValue('image', '123');
    // const {
    //     network,
    //     components: {TotalSupply, NamespaceOwner},
    // } = useMUD();

    // console.log('----NamespaceOwner', a);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onSelectModalOk = (data: string) => {
        setCurNft(data);
        setShowSelectModal(false);
        setShowEditModal(true);
    };

    const onEditModalOk = (imgData: string) => {
        setImgUrl(imgData);
        setShowEditModal(false);
    };

    const onEditBack = () => {
        console.log('0000')
        setShowEditModal(false);
        setShowSelectModal(true);
    };

    const onUploadClick = () => {
        setShowSelectModal(true);
    };

    const handleCreate = () => {
        form.validateFields()
            .then(async (value) => {
                // // 1. 先mint nft
                // const res = await network.worldContract.write.mintNFT([value.name, address], {
                //     value: ethers.parseEther('0.03')
                // });

                // const a =  getComponentValue(TotalSupply, addressToEntityID(address));
                // console.log(a);
                // console.log("Transaction Hash:", res);

                // // 等待交易确认并获取回执
                // const receipt = await network.waitForTransaction(res);


            })
            .catch((e) => {
                console.log(e)
            });
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
                                    <Input placeholder='Please enter' size='large' variant="filled" />
                                </Form.Item>
                                <Form.Item
                                    name="image"
                                    label="Game foreground image."
                                    rules={[{ required: true, message: 'Please input first name' }]}
                                >
                                    {
                                        imgUrl.length ?
                                            <div
                                                className={$style['form-img']}
                                                style={{
                                                    backgroundImage: `url(${preImg + imgUrl})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            ></div>
                                            :
                                            <div className={$style['form-upload']} onClick={onUploadClick}>
                                                <div className={$style['form-upload-icon']}></div>
                                            </div>
                                    }
                                </Form.Item>
                            </Form>
                            <div className={$style['main-sub']}>Once created, this information cannot be modified.</div>
                        </div>
                    </div>
                    <div className={`${$style['left-form']} ${$style['left-setup']}`}>
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
                    <div className={$style['left-btn']} onClick={handleCreate}>Create</div>
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

            <SelectImageModal open={isShowSelectModal} cancel={() => setShowSelectModal(false)} onOk={onSelectModalOk} />
            <EditImageModal nftData={curNft} open={isShowEditModal} onBack={onEditBack} onOk={onEditModalOk} />
        </div>
    )
};

export default CreateGame;