import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HdToastService } from 'toast-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(
    private toast: HdToastService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl('Simple message example', Validators.required),
      title: new FormControl('Title'),
      position: new FormControl('top-left'),
      theme: new FormControl('light'),
      timeout: new FormControl(5000),
      extTimeout: new FormControl(2000),
      disableTimeouts: new FormControl(false),
      easeTime: new FormControl(500),
      maxToastNum: new FormControl(0),
      tapToDispose: new FormControl(true),
      closeIcon: new FormControl(false)
    });

    this.form.get('disableTimeouts').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('timeout').disable();
        this.form.get('extTimeout').disable();
      } else {
        this.form.get('timeout').enable();
        this.form.get('extTimeout').enable();
      }
      console.log(this.form);
    });
  }

  private getConfig() {
    return {
      position: this.form.get('position').value,
      theme: this.form.get('theme').value,
      timeout: this.form.get('timeout').value,
      extendedTimeout: this.form.get('extTimeout').value,
      disableTimeouts: this.form.get('disableTimeouts').value,
      easeTime: this.form.get('easeTime').value,
      maxToastsNumber: this.form.get('maxToastNum').value,
      tapToDispose: this.form.get('tapToDispose').value,
      closeIcon: this.form.get('closeIcon').value
    };
  }

  success() {
    if (this.form.invalid) {
      this.form.get('message').markAsDirty();
      return;
    }

    this.toast.success(this.form.get('message').value, this.form.get('title').value, this.getConfig());
  }

  info() {
    if (this.form.invalid) {
      this.form.get('message').markAsDirty();
      return;
    }

    this.toast.info(this.form.get('message').value, this.form.get('title').value, this.getConfig());
  }

  warning() {
    if (this.form.invalid) {
      this.form.get('message').markAsDirty();
      return;
    }

    this.toast.warning(this.form.get('message').value, this.form.get('title').value, this.getConfig());
  }

  error() {
    if (this.form.invalid) {
      this.form.get('message').markAsDirty();
      return;
    }

    this.toast.error(this.form.get('message').value, this.form.get('title').value, this.getConfig());
  }
}
