import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setBackground(imageUrl: string) {
    this.renderer.setStyle(document.body, 'background-image', `url("${imageUrl}")`);
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(document.body, 'background-position', 'center');
    this.renderer.setStyle(document.body, 'height', '100vh');
    this.renderer.setStyle(document.body, 'margin', '0');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    this.renderer.setStyle(document.documentElement, 'height', '100vh');
    this.renderer.setStyle(document.documentElement, 'margin', '0');
    this.renderer.setStyle(document.documentElement, 'overflow', 'hidden');
  }

  clearBackground() {
    this.renderer.removeStyle(document.body, 'background-image');
    this.renderer.removeStyle(document.body, 'background-size');
    this.renderer.removeStyle(document.body, 'background-repeat');
    this.renderer.removeStyle(document.body, 'background-position');
    this.renderer.removeStyle(document.body, 'height');
    this.renderer.removeStyle(document.body, 'margin');
    this.renderer.removeStyle(document.body, 'overflow');

    this.renderer.removeStyle(document.documentElement, 'height');
    this.renderer.removeStyle(document.documentElement, 'margin');
    this.renderer.removeStyle(document.documentElement, 'overflow');
  }
}
