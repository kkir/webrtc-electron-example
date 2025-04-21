import '@picocss/pico';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router'
import { Sender } from './components/Sender';
import { ReceiverOne } from './components/ReceiverOne';
import { ReceiverTwo } from './components/ReceiverTwo';
import {
	defineIpc,
} from 'electron-window-rtc/renderer';

defineIpc(window.electron.ipcRenderer);


const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Sender />} />
				<Route path="/receiver-one" element={<ReceiverOne />} />
				<Route path="/receiver-two" element={<ReceiverTwo />} />
			</Routes>
		</HashRouter>
	);
}

createRoot(document.getElementById('app')).render(<App />);

