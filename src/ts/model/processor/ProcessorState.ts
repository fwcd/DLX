import { ProcessorStorage } from "./ProcessorStorage";

/**
 * The state of the processor including various
 * storage facilities.
 */
export class ProcessorState {
	private storage = new ProcessorStorage(32, 256, 1000);
	
	public getStorage(): ProcessorStorage {
		return this.storage;
	}
}