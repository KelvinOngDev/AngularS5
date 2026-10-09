import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route1',
  imports: [RouterLink],
  template: `
    <article class="route-card route-card--blue">
      <span class="route-number">01</span>
      <div>
        <p class="route-label">Component Route1</p>
        <h2>Route pertama</h2>
        <p>
          Halaman ini ditampilkan ketika URL berada di
          <code>/route1</code>.
        </p>
        <a class="backend-button" routerLink="/backend">Show Data Backend</a>
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
      color: #102a43;
      background: linear-gradient(135deg, #d9f0ff, #f1f8ff);
      border: 1px solid #9ed8ff;
    }
    .route-number { font-size: 2rem; font-weight: 800; color: #1479b8; }
    .route-label { margin: 0 0 .35rem; color: #1479b8; font-weight: 700; }
    h2 { margin: 0 0 .75rem; }
    p { line-height: 1.6; }
    code { padding: .15rem .4rem; border-radius: .35rem; background: #fff; }
    .backend-button {
      display: inline-block;
      margin-top: .5rem;
      padding: .7rem 1rem;
      border-radius: .55rem;
      color: #fff;
      background: #1479b8;
      font-weight: 700;
      text-decoration: none;
    }
    .backend-button:hover { background: #0f6094; }
  `
})
export class Route1 {}
