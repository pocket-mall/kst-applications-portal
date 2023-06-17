import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[kstRestrictNumeric]',
	standalone: true
})
export class RestrictNumericDirective {
	constructor(private elementRef: ElementRef<HTMLInputElement>) {}

	@HostListener('input', ['$event.target.value'])
	onInput(value: string): void {
		console.log('RestrictNumericDirective');
		this.elementRef.nativeElement.value = value.replace(/[^0-9]/g, '');
	}
}
