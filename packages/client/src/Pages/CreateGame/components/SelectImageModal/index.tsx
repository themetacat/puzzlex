import { useEffect, useState } from 'react';
import { Modal, Select, List } from 'antd';
import { useMUD } from '@/MUDContext';
import { useAccount } from 'wagmi';

import $style from './index.module.scss';

const listGrid = {
    column: 5,
    gutter: 10
};

const SelectImageModal = (props: any) => {
    const {
        network
    } = useMUD();
    const { address } = useAccount();

    const { open, cancel, onOk } = props;
    const [currentChainId, setChainId] = useState(1);
    const [nftList, setNftList] = useState([]);
    const [curNft, setCurNft] = useState<any>({});

    const onNext = () => {
        onOk(curNft);
    };

    const chainList = [
        {
            id: 1,
            label: 'ethereum'
        },
        {
            id: 137,
            label: 'polygon'
        }
    ];

    const onChangeChain = async (id: number) => {
        setChainId(id);
    };

    const fetchNFTs = async (address: string) => {
        try {
            const chainId = currentChainId;

            // 2. 根据链 ID 确定链名（OpenSea 支持的链）
            const chainMap: Record<number, string> = {
                1: "ethereum",     // Ethereum Mainnet
                137: "polygon",    // Polygon
                // 31337: "hardhat",  // Hardhat Local (OpenSea 不支持)
            };
            const chainName = chainMap[chainId];

            if (!chainName) {
                throw new Error(`Unsupported chain ID: ${chainId}`);
            }

            const testAddr = '0xD67c34169b372d5B3932c548a940D4Ea74Fe7aF5'

            // 3. 构造 API URL
            const apiUrl = `https://api.opensea.io/api/v2/chain/${chainName}/account/${testAddr}/nfts`;
            // const apiUrl = `https://api.opensea.io/api/v2/chain/${chainName}/account/${address}/nfts`;

            // 4. 调用 OpenSea API
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'X-API-KEY': import.meta.env.VITE_XAPIKEY
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

    const getNfts = async () => {
        try {
           const res = await fetchNFTs(address as string);
           if (res.length) {
                setNftList(res);
           }
        }
        catch {}
    };

    const onSelectNft = (item: any) => {
        setCurNft(item);
    };

    useEffect(() => {
        if (address && currentChainId !== 0) {
            getNfts();
        }
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
                            <Select.Option value={item.id} key={item.id} className={$style['modal-select-opt']}>
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
                    dataSource={nftList}
                    itemLayout='horizontal'
                    renderItem={(item: any) => {
                        return (
                            <List.Item onClick={() => onSelectNft(item)}>
                                <div
                                    className={`${$style['card']} ${curNft.image_url === item.image_url && $style['card-select']}`}
                                    style={{backgroundImage: `url(${item.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                                >
                                </div>
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