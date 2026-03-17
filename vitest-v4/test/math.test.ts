import { describe, expect, it } from 'vitest';

function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

describe('Arithmetic Functions', () => {
  it('should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it('should correctly subtract two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 5)).toBe(-5);
  });

  it('should correctly multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
  });

  it('should correctly divide two numbers', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(5, 2)).toBe(2.5);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(6, 0)).toThrow('Division by zero');
  });
});

function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

function squareRoot(value: number): number {
  if (value < 0) throw new Error('Square root of negative number');
  return Math.sqrt(value);
}

describe('Power and Square Root Functions', () => {
  it('should correctly calculate the power of a number', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(5, 0)).toBe(1);
  });

  it('should correctly calculate the square root of a number', () => {
    expect(squareRoot(4)).toBe(2);
    expect(squareRoot(16)).toBe(4);
  });

  it('should throw an error when calculating the square root of a negative number', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of negative number');
  });
});