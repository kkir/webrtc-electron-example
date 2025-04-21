import { useEffect, useRef } from "react";
import {
	WindowRTCPeerConnection,
} from 'electron-window-rtc/renderer';

export const ReceiverTwo = () => {
	const ref = useRef(null);
	useEffect(() => {
		WindowRTCPeerConnection.with('receiver-one').then((sender) => {
			sender.on('track', (event) => {
				console.log('ontrack', event);
				const trackEvent = event.payload;
				if (ref.current) {
					ref.current.srcObject = trackEvent.streams[0];
				}
			});
		}).catch((err) => {
			console.error("Error in receiving track.", err);
		});
	}, []);
	return (
		<div>
			<h2>Receiver Two</h2>
			<video ref={ref} autoPlay />
		</div>
	);
}