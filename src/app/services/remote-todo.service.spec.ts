import { TestBed } from '@angular/core/testing';

import { RemoteTodoService } from './remote-todo.service';

describe('RemoteTodoService', () => {
  let service: RemoteTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
