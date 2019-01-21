export type Listener<T> = (value: T) => void;

/**
 * An array of listeners that can conveniently
 * be "fired". Each listener operates by performing
 * some side-effect on the new value.
 */
export class ListenerList<T> {
	private listeners: Listener<T>[] = [];
	
	public add(listener: Listener<T>): void {
		this.listeners.push(listener);
	}
	
	public remove(listener: Listener<T>): void {
		const index = this.listeners.indexOf(listener);
		if (index >= 0) {
			this.listeners.splice(index, 1);
		}
	}
	
	public fire(value: T): void {
		this.listeners.forEach(listener => listener(value));
	}
}
