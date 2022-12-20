export type RegisterName = 'AX' | 'BX' | 'CX' | 'DX';

export type MethodName = 'MOV' | 'XHCG' | 'PUSH' | 'POP';

export type SimulationInputParameters = Record<RegisterName, string> & {
	offset: number;
};
