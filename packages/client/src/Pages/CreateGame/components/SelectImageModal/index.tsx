import { useEffect, useMemo, useState } from 'react';
import { Modal, Select, List } from 'antd';
import { useMUD } from '@/MUDContext';
import { chains } from '@/chains';

import $style from './index.module.scss';

const listGrid = {
    column: 5,
    gutter: 10
};

const SelectImageModal = (props: any) => {
    const {
        network
    } = useMUD();

    const { open, cancel, onOk } = props;
    const [currentChainId, setChainId] = useState(0);

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


    const chainList = useMemo(() => {
        return chains.map((item) => {
            return {
                id: item.id,
                label: item.name
            }
        });
    }, [chains]);

    const getChainId = async () => {
        const chainId = await network.walletClient.getChainId();
        setChainId(chainId)
        console.log(chainId, 'xxxxx');
    };

    const onChangeChain = async (id: number) => {
        try {
            await network.walletClient.switchChain({
                id
            });
        } catch (error) {
            console.error("Error switching chain:", error);
        }
    };

    const fetchNFTs = async (address: string) => {
        try {
            const chainId = currentChainId;

            // 2. 根据链 ID 确定链名（OpenSea 支持的链）
            const chainMap: Record<number, string> = {
                1: "ethereum",     // Ethereum Mainnet
                137: "polygon",    // Polygon
                31337: "hardhat",  // Hardhat Local (OpenSea 不支持)
            };
            const chainName = chainMap[chainId];

            if (!chainName) {
                throw new Error(`Unsupported chain ID: ${chainId}`);
            }

            // 3. 构造 API URL
            const apiUrl = `https://api.opensea.io/api/v2/chain/${chainName}/account/${address}/nfts`;

            // 4. 调用 OpenSea API
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`OpenSea API error: ${response.statusText}`);
            }

            // 5. 返回解析后的 NFTs 数据
            const data = await response.json();
            return data.nfts || []; // 根据 OpenSea 的响应结构解析
        } catch (error) {
            console.error("Error fetching NFTs:", error);
            throw error;
        }
    };

    const getCurNFT = async () => {
          // 获取用户地址
          const address = await network.walletClient.getAddresses();
          console.log('add--->>>', address);
          // 调用封装的 fetchNFTs 方法
          const userNFTs = await fetchNFTs(address[0]);
    };

    useEffect(() => {
        getChainId();
        currentChainId !== 0 && getCurNFT();
    }, [network, currentChainId]);

    return (
        <Modal
            width={695}
            open={open}
            footer={null}
            title={false}
            closeIcon={null}
            className={$style['modal']}
        >
            <Select
                className={$style['modal-select']}
                style={{ width: '267px', height: '60px' }}
                value={currentChainId}
                onSelect={onChangeChain}
            >
                {
                    chainList?.map(item => {
                        return (
                            <Select.Option key={item.id} className={$style['modal-select-opt']}>
                                <div className={$style['opt-icon']}></div>
                                <div className={$style['opt-text']}>{item.label}</div>
                            </Select.Option>
                        )
                    })
                }
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