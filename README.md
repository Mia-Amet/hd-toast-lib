# <center>Clean Configurable Toasts For Angular</center>
### <center>hd-toast-lib</center>

![](https://github.com/dashaHsh/hd-toast-lib/blob/master/projects/hd-toast-lib/src/lib/assets/resources/toasts-preview.png?raw=true)

### <center> <a href="https://github-3xd9n5.stackblitz.Io"><img src="https://dabuttonfactory.com/button.png?t=Live%20Demo&f=calibri-bold&ts=20&tc=fff&w=140&h=40&c=4&bgt=unicolored&bgc=327a13&shs=3&shc=274e13&sho=s"> </a> </center>

<hr>

### Features
- Created using <a>**Angular Material CDK**</a> portals
- Toasts animations via <a href="https://angular.io/guide/reusable-animations">**Angular Reusable Animation**</a>
- Clean layout with two main themes: **light & dark**
- Easily configurable timing & positioning
- AoT compilation and lazy loading compatible
- System JS/UMD rollup bundle
- Styles provided in both `css` and `scss` formats
<br>

### Installation & Setup

##### To **install** copy line below to your command line

    npm i hd-toast-lib --save

##### There are several ways to setup styling:

- copy ***main.scss*** or ***main.css*** from the lib **styles** folder to your project's folder
- if using **sass** in your **main.scss** file add
	@import '~hd-toast-lib/styles/main'

- if using **angular-cli** in your **angular.json** file

    	"styles": [
    		"src/styles.css",
    		"node_modules/hd-toast-lib/styles/main.scss"  //add this path
    	],

<br>

### Usage

##### Add HdToastModule to your AppModule

	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';

	import { HdToastModule } from 'hd-toast-lib';
	...

	@NgModule({
		imports: [
			BrowserModule,
			HdToastModule
	],
	...
	})
	export class AppModule { }

##### Add HdToastService to your Component

	import { Component } from '@angular/core';
	import { HdToastService } from 'hd-toast-lib';
	
	@Component({...})
	export class AppComponent {
		constructor(private toast: HdToastService) { }
		
		errorAlert() {
			this.toast.error('Something happened...', 'Oops!');  // to render a toast with title
		}
		
		infoAlert() {
			this.toast.error('Something happened...');  // to render a toast without title
		}
	}
<br>

### Configuration

To configure toast you can pass the **config object** as a third argument to `HdToastService.success|info|warning|error()` methods with optional presets:
                    
|  Option  |  Type  |  Default Value  |  Description  |
|  ---- | ------ | ------------- | -------------------------- |
|  **position**  |  string  |  'top-left'  |  Position of a toast message: `'top-left'` / `'top-right'` / `'bottom-left'` / `'bottom-right'` / `'top-full-width'` / `'bottom-full-width'`  |
|  **theme**  |  `'light'` `'dark'`  |  'top-left'  |  Toast theming  |
|  **tapToDispose**  |  boolean  |  true  |  Close a toast on click  |
|  **closeIcon**  |  boolean  |  false  |  A close icon on a toast  |
|  **disableTimeouts**  |  boolean  |  false  |  Disable all toast timeouts  |
|  **timeout**  |  number  |  5000  |  Time in milliseconds for toast to render  |
|  **extendedTimeout**  |  number  |  2000  |  Time for a toast to hide after a user hover  |
|  **easeTime**  |  number  |  500  |  Time in ms for toast show/hide animation  |
|  **maxToastsNumber**  |  number  |  0  |  Max toasts number on a page. Toasts will be queued. 0 is unlimited  |
<br>

#### Example of Individual Configuration

ToastService methods take next arguments: ***message, title, ConfigObject***. Pass an options object to replace any default option.

	this.toast.success('Goog news everyone...', 'Success!', {
		timeout: 3000,
		extendedTimeout: 1000,
		position: 'bottom-right',
		theme: 'dark'
	});

##### ToastService methods return HdToastRef for a single toast:

    	interface HdToastRef {
    		dismiss: () => void;  //dismiss a toast
    		active: () => boolean;  //check whether a toast is shown or not
    	}


