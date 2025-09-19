import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundService } from '../../services/background/background.service';  // ✅ Import

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  constructor(private bgService: BackgroundService) {}

  ngOnInit() {
    this.bgService.setBackground('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg');
  }

  ngOnDestroy() {
    this.bgService.clearBackground();
  }
}
