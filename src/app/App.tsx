import { Layout, OrderSelect, ParametersForm, Actions } from '../components';
import useSimulator from '../simulator/useSimulator';
import useOrderBody from '../lib/useOrderBody';
import { argv0 } from 'process';

export default function App() {
	const { orderBody, setOrderBody, resetOrderBody } = useOrderBody();
	const {
		simulated,
		resetSimulationState,
		setRegister,
		setOffset,
		setAddressingMode,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	const handleCalculate = () => {
		const [arg0, arg1] = orderBody.arguments;

		switch (orderBody.orderName) {
			case 'MOV':
				console.log(`MOV action initiated from ${arg1} to ${argv0}`);
				mov(arg0, arg1);
				return;
			case 'XHCG':
				console.log(`XHCG action initiated for ${arg0} and ${arg1}`);
				xhcg(arg0, arg1);
				return;
			case 'PUSH':
				console.log(`PUSH action initiated for ${arg0}`);
				push(arg0);
				return;
			case 'POP':
				console.log(`POP action initiated for ${arg0}`);
				pop(arg0);
				return;
		}
	};

	const handleReset = () => {
		resetSimulationState();
		resetOrderBody();
	};

	return (
		<Layout>
			<ParametersForm
				params={simulated}
				onRegisterChange={setRegister}
				onOffsetChange={setOffset}
				onAddressingModeChange={setAddressingMode}
			/>

			<OrderSelect orderBody={orderBody} onChange={setOrderBody} />
			<Actions onCalculate={handleCalculate} onReset={handleReset} />
		</Layout>
	);
}
