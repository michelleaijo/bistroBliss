import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BackgroundService } from '../../../services/background/background.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private msg: MessageService,
    private router: Router,
    private bg: BackgroundService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.bg.setBackground('https://img.freepik.com/premium-photo/organic-fresh-ingredient-black-kitchen-counter_23-2148195041.jpg');
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe(users => {
      if (users.length) {
        this.auth.setCurrentUser(users[0]);
        this.msg.add({ severity: 'success', summary: 'Logged in', detail: 'Welcome!' });
        this.router.navigate(['/dashboard']);
      } else {
        this.msg.add({ severity: 'error', summary: 'Failed', detail: 'Invalid credentials' });
      }
    });
  }

  isInvalid(control: string) {
    const c = this.loginForm.get(control);
    return !!(c && c.invalid && (c.touched || this.formSubmitted));
  }

  ngOnDestroy() {
    this.bg.clearBackground();
  }
}