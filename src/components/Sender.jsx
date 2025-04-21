import { useEffect, useRef } from "react";
import {
	WindowRTCPeerConnection,
} from 'electron-window-rtc/renderer';


export const Sender = () => {
	const ref = useRef(null);
	useEffect(() => {
		window.navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		}).then((stream) => {
			const stream1 = stream.clone();
			WindowRTCPeerConnection.with('receiver-one').then((receiverOne) => {
				console.log('receiverOne', receiverOne);
				receiverOne.addStream(stream1);
			}).catch((err) => {
				console.error("Error adding stream to receiver one.", err);
			});

			// const stream2 = stream.clone();
			// WindowRTCPeerConnection.with('receiver-two').then((receiverTwo) => {
			// 	receiverTwo.addStream(stream2);
			// }).catch((err) => {
			// 	console.error("Error adding stream to receiver two.", err);
			// });

			if (ref.current) {
				ref.current.srcObject = stream;
			}
		}).catch((err) => {
			console.error("Error accessing media devices.", err);
		});
	}, []);
	return (
		<div>
			<h2>Sender</h2>
			<video ref={ref} muted autoPlay />
		</div>
	);
};