<?php

namespace App;

class Calculator
{
    /**
     * Add two numbers
     */
    public function add(float $a, float $b): float
    {
        return $a + $b;
    }

    /**
     * Subtract two numbers
     */
    public function subtract(float $a, float $b): float
    {
        return $a - $b;
    }

    /**
     * Multiply two numbers
     */
    public function multiply(float $a, float $b): float
    {
        return $a * $b;
    }

    /**
     * Divide two numbers
     * 
     * @throws \InvalidArgumentException if divisor is zero
     */
    public function divide(float $a, float $b): float
    {
        if ($b == 0) {
            throw new \InvalidArgumentException('Division by zero is not allowed');
        }
        return $a / $b;
    }

    /**
     * Calculate percentage
     */
    public function percentage(float $value, float $percentage): float
    {
        return ($value * $percentage) / 100;
    }
}
