import { useCallback, useState } from 'react';
import { OrderName, RegisterName } from '../simulator/simulatedReducer';

export type OrderBody = {
	orderName: OrderName;
	arguments: RegisterName[];
};

export const initialOrderBody: OrderBody = {
	orderName: 'MOV',
	arguments: ['AX', 'BX'],
};

export default function useOrderBody() {
	const [orderBody, setOrderBody] = useState<OrderBody>(initialOrderBody);

	const resetOrderBody = useCallback(() => {
		setOrderBody(initialOrderBody);
	}, []);

	return {
		orderBody,
		setOrderBody,
		resetOrderBody,
	};
}
