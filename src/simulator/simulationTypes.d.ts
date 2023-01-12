export type RegisterName = 'AX' | 'BX' | 'CX' | 'DX' | 'BP' | 'DI' | 'SI';

export type MethodName = 'MOV' | 'XHCG' | 'PUSH' | 'POP';

export type AddressingMode = 'base' | 'index' | 'base-index';

export type SimulationInputParameters = Record<RegisterName, string> & {
	offset: number;
	addressingMode: AddressingMode;
};
