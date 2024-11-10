import {Tabs} from 'antd';
import CreatedTab from './components/CreatedTab';
import PurchasedTab from './components/PurchasedTab';
import $style from './index.module.scss';

const Profile = () => {
    const tabs = [
        {
            key: 'create',
            label: 'Created',
            children: <CreatedTab />
        },
        {
            key: 'purchased',
            label: 'Purchased',
            children: <PurchasedTab />
        }
    ];
    return (
        <div className={$style['profile']}>
            <Tabs items={tabs}></Tabs>
        </div>
    )
};

export default Profile;