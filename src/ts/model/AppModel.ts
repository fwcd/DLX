import { ProcessorState } from "./processor/ProcessorState";
import { ParsedProgram } from "./ParsedProgram";
import { AssemblyExecutor } from "./processor/AssemblyExecutor";
import { SettingsModel } from "./SettingsModel";
import { ListenerList, Listener } from "./utils/ListenerList";
import { FileLoaderModel } from "./FileLoaderModel";
import { FormatSelectorModel } from "./format/FormatSelectorModel";
import { PipelineModel } from "./pipeline/PipelineModel";

/**
 * Encapsulates GUI-independent state of the application.
 */
export class AppModel {
	private processorState: ProcessorState;
	private parsedProgram = new ParsedProgram();
	private pipeline = new PipelineModel();
	private executor?: AssemblyExecutor = null;
	private settings: SettingsModel;
	private fileLoader = new FileLoaderModel();
	private registersFormat = new FormatSelectorModel();
	private memoryFormat = new FormatSelectorModel();
	
	private executorListeners = new ListenerList<AssemblyExecutor>();
	
	public constructor() {
		this.settings = new SettingsModel();
		this.processorState = new ProcessorState(this.settings);
		
		const breakpoints = this.parsedProgram.getBreakpointManager();
		this.fileLoader.addClearListener(() => breakpoints.clear());
		this.fileLoader.addOpenListener(() => breakpoints.clear());
	}
	
	public getProcessorState(): ProcessorState { return this.processorState; }
	
	public getParsedProgram(): ParsedProgram { return this.parsedProgram; }
	
	public getFileLoader(): FileLoaderModel { return this.fileLoader; }
	
	public setExecutor(executor: AssemblyExecutor): void {
		this.executor = executor;
		this.executorListeners.fire(executor);
	}
	
	public getExecutor(): AssemblyExecutor | null { return this.executor; }
	
	public getSettings(): SettingsModel { return this.settings; }
	
	public getPipeline(): PipelineModel { return this.pipeline; }
	
	public getRegistersFormat(): FormatSelectorModel { return this.registersFormat; }
	
	public getMemoryFormat(): FormatSelectorModel { return this.memoryFormat; }
	
	public addExecutorListener(listener: Listener<AssemblyExecutor>): void {
		this.executorListeners.add(listener);
		if (this.executor) {
			listener(this.executor);
		}
	}
	
	public removeExecutorListener(listener: Listener<AssemblyExecutor>): void { this.executorListeners.remove(listener); }
}
