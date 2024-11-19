import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import RouterList from "./router";
import './reset.css';


import {
	getDefaultConfig,
	RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	base,
} from 'wagmi/chains';
import {
	QueryClientProvider,
	QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
	appName: 'Puzzle',
	projectId: 'YOUR_PROJECT_ID',
	chains: [mainnet, polygon, optimism, arbitrum, base],
	ssr: false, // If your dApp uses server side rendering (SSR)
});

import '@rainbow-me/rainbowkit/styles.css';

const route = createBrowserRouter([
	...RouterList,
	{
		path: '*',
		element: <Navigate to='/' />
	}
]);


export const App = () => {
	const {
		components: { Puzzle },
		systemCalls: { increment },
	} = useMUD();

	const counter = useComponentValue(Puzzle, singletonEntity);
	const queryClient = new QueryClient();

	console.log(counter, 'xxxx', Puzzle, counter)


	return (
		<>
			{/* <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div> */}
			{/* <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button> */}

			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider>
						<RouterProvider router={route} />
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</>
	);
};
