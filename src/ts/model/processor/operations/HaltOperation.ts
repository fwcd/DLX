import { OperationExecutionParams } from "./OperationExecutionParams";
import { OperationResult } from "./OperationResult";
import { Operation } from "./Operation";

/**
 * Halts the program.
 */
export class HaltOperation implements Operation {
	private argumentSyntax = /^ *$/;
	public constructor() {}
	
	public execute(params: OperationExecutionParams): OperationResult {
		return {
			shouldHalt: true
		};
	}
	
	public describe(): string {
		return "Halts the program.";
	}
	
	public getArgumentSyntax(): RegExp {
		return this.argumentSyntax;
	}
	
	public getExpectedArgCount(): number {
		return 0;
	}
}
