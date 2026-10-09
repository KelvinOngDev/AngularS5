import { Component } from '@angular/core';

@Component({
  selector: 'app-route2',
  template: `
    <article class="route-card route-card--purple">
      <span class="route-number">02</span>
      <div>
        <p class="route-label">Component Route2</p>
        <h2>Route kedua</h2>
        <p>
          Angular mengganti isi <code>&lt;router-outlet&gt;</code> dengan
          component ini saat URL berada di <code>/route2</code>.
        </p>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; }
    .route-card {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      padding: 2rem;
      border-radius: 1rem;
      color: #32194f;
      background: linear-gradient(135deg, #f0e4ff, #fbf7ff);
      border: 1px solid #c7a4ef;
    }
    .route-number { font-size: 2rem; font-weight: 800; color: #793db4; }
    .route-label { margin: 0 0 .35rem; color: #793db4; font-weight: 700; }
    h2 { margin: 0 0 .75rem; }
    p { line-height: 1.6; }
    code { padding: .15rem .4rem; border-radius: .35rem; background: #fff; }
  `
})
export class Route2 {}
