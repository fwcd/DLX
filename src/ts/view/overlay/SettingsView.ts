import { SettingsModel } from "../../model/SettingsModel";
import { Listener } from "../../model/utils/ListenerList";
import { HtmlIdGenerator } from "../utils/HtmlIdGenerator";
import { CALLER_ID_GENERATOR } from "../../model/utils/NumberIdGenerator";
import { Disposable } from "../../model/utils/Disposable";
import { View } from "../utils/View";

const SETTINGS_ID_GENERATOR = new HtmlIdGenerator("SettingsView");

interface SettingParams<T> {
	name: string;
	getter: () => T;
	setter: (v: T) => void;
}

interface DropdownSettingParams extends SettingParams<string> {
	values: {
		key: string,
		displayName: string
	}[];
}

export class SettingsView implements View, Disposable {
	private settingsCallerId = CALLER_ID_GENERATOR.nextID();
	private model: SettingsModel;
	private element = document.createElement("div");
	
	public constructor(model: SettingsModel) {
		this.model = model;
		
		model.addHighlightListener(this.addBoolSetting({
			name: "Highlight Lines",
			getter: () => model.getHighlightLines(),
			setter: v => model.setHighlightLines(v)
		}), this.settingsCallerId);
		
		model.addInstructionDelayListener(this.addNumberSetting({
			name: "Instruction Delay (ms)",
			getter: () => model.getInstructionDelay(),
			setter: v => model.setInstructionDelay(v)
		}), this.settingsCallerId);
		
		model.addStorageCellWidthListener(this.addNumberSetting({
			name: "Storage Cell Width",
			getter: () => model.getStorageCellWidth(),
			setter: v => model.setStorageCellWidth(v)
		}), this.settingsCallerId);
		
		model.addRegisterCountListener(this.addNumberSetting({
			name: "Register Count",
			getter: () => model.getRegisterCount(),
			setter: v => model.setRegisterCount(v)
		}), this.settingsCallerId);
		
		model.addMemoryStartAddressListener(this.addNumberSetting({
			name: "Memory Start Address",
			getter: () => model.getMemoryStartAddress(),
			setter: v => model.setMemoryStartAddress(v)
		}), this.settingsCallerId);
		
		model.addMemorySizeListener(this.addNumberSetting({
			name: "Memory Size (bytes)",
			getter: () => model.getMemorySize(),
			setter: v => model.setMemorySize(v)
		}), this.settingsCallerId);
		
		model.addEditorThemeListener(this.addDropdownSetting({
			name: "Editor Theme",
			getter: () => model.getEditorTheme(),
			setter: v => model.setEditorTheme(v),
			values: [
				{
					key: "vs",
					displayName: "Light (Visual Studio)"
				},
				{
					key: "vs-dark",
					displayName: "Dark (Visual Studio)"
				},
				{
					key: "hc-black",
					displayName: "High Constrast, Black"
				}
			]
		}), this.settingsCallerId);
	}
	
	private addBoolSetting(params: SettingParams<boolean>): Listener<boolean> {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		const checkbox = document.createElement("input");
		
		checkbox.type = "checkbox";
		checkbox.id = SETTINGS_ID_GENERATOR.nextID();
		checkbox.checked = params.getter();
		checkbox.addEventListener("change", () => params.setter(checkbox.checked));
		
		label.innerText = params.name;
		label.htmlFor = checkbox.id;
		
		wrapper.appendChild(checkbox);
		wrapper.appendChild(label);
		this.element.appendChild(wrapper);
		
		return v => checkbox.checked = v;
	}
	
	private addNumberSetting(params: SettingParams<number>): Listener<number> {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		const field = document.createElement("input");
		
		label.innerText = params.name + ": ";
		
		field.type = "text";
		field.value = "" + params.getter();
		field.addEventListener("change", () => params.setter(+field.value));
		
		wrapper.appendChild(label);
		wrapper.appendChild(field);
		this.element.appendChild(wrapper);
		
		return v => field.value = "" + v;
	}
	
	private addDropdownSetting(params: DropdownSettingParams): Listener<string> {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		const dropdown = document.createElement("select");
		
		label.innerText = params.name + ": ";
		
		params.values.forEach(value => {
			const option = document.createElement("option");
			option.value = value.key;
			option.innerText = value.displayName;
			dropdown.appendChild(option);
		});
		
		dropdown.value = params.getter();
		dropdown.addEventListener("change", () => params.setter(dropdown.value));
		
		wrapper.appendChild(label);
		wrapper.appendChild(dropdown);
		this.element.appendChild(wrapper);
		
		return v => dropdown.value = v;
	}
	
	public getElement(): HTMLElement {
		return this.element;
	}
	
	public dispose(): void {
		this.model.removeAllListenersFor(this.settingsCallerId);
	}
}
