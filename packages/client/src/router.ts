import Layout from '@/Layout/Main';
import Home from '@/Pages/Home';
import CreateGame from '@/Pages/CreateGame';
import Game from '@/Pages/Game';

const routerList = [
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '',
                index: true,
                Component: Home
            },
            {
                path: '/create-game',
                Component: CreateGame
            },
            {
                path: '/game/:id',
                Component: Game
            }
        ]
    }
];

export default routerList;