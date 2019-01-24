import { PopoverView } from "./PopoverView";

export class OverlayView {
	private element = document.getElementById("overlay");
	private visible = false;
	private popover?: PopoverView;
	private escapeListener: (e: KeyboardEvent) => void = e => {
		if (e.key === "Escape") {
			this.setVisible(false);
		}
	};
	
	public constructor() {
		this.setVisible(false);
	}
	
	public show(content: HTMLElement): void {
		if (this.popover) {
			this.element.removeChild(this.popover.getElement());
		}
		
		this.popover = new PopoverView(content, () => this.setVisible(false));
		this.element.appendChild(this.popover.getElement());
		this.setVisible(true);
	}
	
	private setVisible(visible: boolean): void {
		if (visible != this.visible) {
			if (visible) {
				document.addEventListener("keydown", this.escapeListener);
				this.element.style.display = "flex";
			} else {
				document.removeEventListener("keydown", this.escapeListener);
				this.element.style.display = "none";
			}
			this.visible = visible;
		}
	}
}
