import { useEffect, useRef } from "react";
import {
	WindowRTCPeerConnection,
} from 'electron-window-rtc/renderer';

export const ReceiverOne = () => {
	const ref = useRef(null);
	useEffect(() => {
		WindowRTCPeerConnection.with('sender').then((sender) => {
			sender.on('track', (event) => {
				console.log('ontrack', event);
				const trackEvent = event.payload;
				const stream = trackEvent.streams[0];
				const clonedStream = stream.clone();
				WindowRTCPeerConnection.with('receiver-two').then((receiverTwo) => {
					console.log('receiverTwo', receiverTwo);
					receiverTwo.addStream(clonedStream);
				}).catch((err) => {
					console.error("Error adding stream to receiver two.", err);
				});
				if (ref.current) {
					ref.current.srcObject = stream;
				}
			});
		}).catch((err) => {
			console.error("Error in receiving track.", err);
		});
	}, []);
	return (
		<div>
			<h2>Receiver One</h2>
			<video ref={ref} autoPlay />
		</div>
	);
}