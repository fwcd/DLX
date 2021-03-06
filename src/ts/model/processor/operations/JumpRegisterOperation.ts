import { Operation } from "./Operation";
import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";

/**
 * Performs a jump to a position in a register.
 */
export class JumpRegisterOperation implements Operation {
	private argumentSyntax = /^ *R(\d+) *$/;
	
	public constructor() {}
	
	public execute(params: OperationExecutionParams): OperationResult {
		const register = params.numericArgs[0];
		params.counter.jumpTo(params.state.getStorage().getRegister(register));
		return {};
	}
	
	public describe(): string {
		return "Jumps to a position in a register.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 1;
	}
}
