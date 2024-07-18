import { describe, expect, it, vi } from 'vitest';

function doSomething(callback: (message: string) => void): void {
  const message = 'Hello from callback';
  callback(message);
}

describe('doSomething', () => {
  it('should call the callback with the correct message', () => {
    const mockCallback = vi.fn();
    
    doSomething(mockCallback);
    
    expect(mockCallback).toHaveBeenCalledWith('Hello from callback');
  });
});
