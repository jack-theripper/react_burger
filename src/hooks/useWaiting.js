import {useState} from "react";

export const useWaiting = (cb) => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState('');
	const handler = async () => {
		try {
			setIsProcessing(true);
			await cb();
		} catch (e) {
			setError(e.toString())
		} finally {
			setIsProcessing(false);
		}
	}

	return [handler, isProcessing, error];
}