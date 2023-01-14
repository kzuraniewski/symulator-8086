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

// TODO: infer this from state
export const singleArgOrders = ['PUSH', 'POP'];

export default function useOrderBody() {
	const [orderBody, setOrderBody] = useState<OrderBody>(initialOrderBody);

	const update = (newOrderBody: OrderBody) => {
		const updatedArguments = [...newOrderBody.arguments];

		for (let i = 0; i < updatedArguments.length; i++) {
			if (!updatedArguments[i]) {
				updatedArguments[i] = initialOrderBody.arguments[i];
			}
		}

		if (singleArgOrders.includes(newOrderBody.orderName)) {
			delete updatedArguments[1];
		}

		setOrderBody({
			...newOrderBody,
			arguments: updatedArguments,
		});
	};

	const resetOrderBody = useCallback(() => {
		setOrderBody(initialOrderBody);
	}, []);

	return {
		orderBody,
		setOrderBody: update,
		resetOrderBody,
	};
}
