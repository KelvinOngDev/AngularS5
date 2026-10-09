import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { timeout } from 'rxjs';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type StatusFilter = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-route3',
  template: `
    <article class="todos-page">
      <header class="page-heading">
        <div>
          <p class="eyebrow">Route 3 · External API</p>
          <h2>Todo List</h2>
          <p class="source">jsonplaceholder.typicode.com/todos</p>
        </div>
        <button type="button" class="refresh-button" (click)="loadTodos()" [disabled]="loading()">
          {{ loading() ? 'Loading...' : 'Refresh' }}
        </button>
      </header>

      @if (errorMessage()) {
        <section class="state-panel error-state" role="alert">
          <p>{{ errorMessage() }}</p>
          <button type="button" (click)="loadTodos()">Try again</button>
        </section>
      } @else if (loading()) {
        <p class="state-panel" role="status">Loading todos...</p>
      } @else {
        <section class="toolbar" aria-label="Filter todos">
          <label class="search-field">
            <span>Search</span>
            <input
              type="search"
              placeholder="Search tasks"
              [value]="searchTerm()"
              (input)="onSearch($event)"
            />
          </label>
          <label class="status-field">
            <span>Status</span>
            <select [value]="statusFilter()" (change)="onStatusChange($event)">
              <option value="all">All tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </section>

        <div class="list-summary" aria-live="polite">
          <span>{{ filteredTodos().length }} shown</span>
          <span>{{ completedCount() }} completed</span>
          <span>{{ pendingCount() }} pending</span>
        </div>

        @if (filteredTodos().length === 0) {
          <p class="state-panel">No todos match these filters.</p>
        } @else {
          <ol class="todo-list">
            @for (todo of filteredTodos(); track todo.id) {
              <li class="todo-row">
                <span class="todo-id">{{ todo.id }}</span>
                <span class="todo-title" [class.is-completed]="todo.completed">{{ todo.title }}</span>
                <span class="status" [class.done]="todo.completed">
                  {{ todo.completed ? 'Completed' : 'Pending' }}
                </span>
              </li>
            }
          </ol>
        }
      }
    </article>
  `,
  styles: `
    :host { display: block; color: #183b36; }
    .page-heading, .toolbar, .list-summary, .todo-row {
      display: flex;
      align-items: center;
    }
    .page-heading { justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
    .eyebrow { margin: 0 0 .35rem; color: #28796a; font-size: .8rem; font-weight: 700; text-transform: uppercase; }
    h2 { margin: 0; font-size: 1.8rem; }
    .source { margin: .4rem 0 0; color: #61746f; font-size: .9rem; }
    button, input, select { font: inherit; }
    button { padding: .65rem .9rem; border: 1px solid #17675a; border-radius: .35rem; color: #fff; background: #17675a; cursor: pointer; font-weight: 700; }
    button:disabled { cursor: wait; opacity: .6; }
    .toolbar { flex-wrap: wrap; gap: 1rem; padding: 1rem 0; border-top: 1px solid #d8e3df; border-bottom: 1px solid #d8e3df; }
    label { display: grid; gap: .35rem; color: #435b55; font-size: .85rem; font-weight: 700; }
    .search-field { flex: 1 1 16rem; }
    .status-field { flex: 0 1 12rem; }
    input, select { width: 100%; min-height: 2.6rem; padding: .5rem .65rem; border: 1px solid #b9ccc5; border-radius: .3rem; color: #183b36; background: #fff; }
    .list-summary { flex-wrap: wrap; gap: 1.25rem; padding: .9rem 0; color: #61746f; font-size: .85rem; }
    .todo-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid #d8e3df; }
    .todo-row { min-height: 3.6rem; gap: .9rem; padding: .65rem .25rem; border-bottom: 1px solid #d8e3df; }
    .todo-id { flex: 0 0 2.5rem; color: #71837d; font-variant-numeric: tabular-nums; }
    .todo-title { flex: 1; overflow-wrap: anywhere; }
    .is-completed { color: #71837d; text-decoration: line-through; }
    .status { flex: 0 0 6.5rem; color: #8a5d13; font-size: .8rem; font-weight: 700; text-align: right; }
    .status.done { color: #28796a; }
    .state-panel { padding: 1rem 0; color: #61746f; }
    .error-state { color: #9a332d; }
    .error-state button { margin-top: .25rem; border-color: #9a332d; background: #9a332d; }
    @media (max-width: 600px) {
      .page-heading { align-items: flex-start; }
      .todo-row { align-items: flex-start; gap: .5rem; }
      .todo-id { flex-basis: 1.8rem; }
      .status { flex-basis: 5.5rem; }
    }
  `
})
export class Route3 {
  private readonly http = inject(HttpClient);

  readonly todos = signal<Todo[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly searchTerm = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly filteredTodos = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const filter = this.statusFilter();

    return this.todos().filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(search);
      const matchesStatus = filter === 'all'
        || (filter === 'completed' ? todo.completed : !todo.completed);
      return matchesSearch && matchesStatus;
    });
  });
  readonly completedCount = computed(() => this.todos().filter((todo) => todo.completed).length);
  readonly pendingCount = computed(() => this.todos().filter((todo) => !todo.completed).length);

  constructor() {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(timeout(10000)).subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Todos could not be loaded. Check your connection and try again.');
        this.loading.set(false);
      }
    });
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onStatusChange(event: Event): void {
    this.statusFilter.set((event.target as HTMLSelectElement).value as StatusFilter);
  }
}
