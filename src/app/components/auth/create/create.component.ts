import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { BackgroundService } from '../../../services/background/background.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MessageService]
})
export class CreateComponent implements OnInit, OnDestroy {
  createForm!: FormGroup;
  formSubmitted = false;

  countryCodes = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+91 (India)', value: '+91' },
    { label: '+61 (Australia)', value: '+61' },
    { label: '+81 (Japan)', value: '+81' },
    { label: '+49 (Germany)', value: '+49' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private msg: MessageService,
    private bg: BackgroundService
  ) {}

  ngOnInit() {
    this.createForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        countryCode: [this.countryCodes[0].value, Validators.required],
        phoneNumber: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.passwordsMatch }
    );

    this.bg.setBackground(
      'https://img.freepik.com/premium-photo/organic-fresh-ingredient-black-kitchen-counter_23-2148195041.jpg'
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.createForm.invalid) {
      return;
    }

    const form = this.createForm.value;
    const newUser = {
      fullName: form.fullName,
      email: form.email,
      countryCode: form.countryCode,
      phoneNumber: form.phoneNumber,
      password: form.password
    };

    this.auth.signup(newUser).subscribe({
      next: () => {
        this.msg.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account created!'
        });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create account'
        });
      }
    });
  }

  passwordsMatch(form: AbstractControl): ValidationErrors | null {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    if (pass && confirm && pass !== confirm) {
      return { mismatch: true };
    }
    return null;
  }

  isInvalid(control: string) {
    const c = this.createForm.get(control);
    return !!(c && c.invalid && (c.touched || this.formSubmitted));
  }

  ngOnDestroy() {
    this.bg.clearBackground();
  }
}