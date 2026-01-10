<?php

namespace App\Tests;

use App\Calculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
  private Calculator $calculator;

  protected function setUp(): void
  {
    $this->calculator = new Calculator();
  }

  /**
   * Test basic addition
   * @testomatio @T01
   */
  public function testAddition(): void
  {
    $result = $this->calculator->add(5, 3);
    $this->assertEquals(8, $result);
  }

  /**
   * Test addition with negative numbers
   * @testomatio @T02
   */
  public function testAdditionWithNegativeNumbers(): void
  {
    $result = $this->calculator->add(-5, 3);
    $this->assertEquals(-2, $result);
  }

  /**
   * Test subtraction
   * @testomatio @T03
   */
  public function testSubtraction(): void
  {
    $result = $this->calculator->subtract(10, 4);
    $this->assertEquals(6, $result);
  }

  /**
   * Test multiplication
   * @testomatio @T04
   */
  public function testMultiplication(): void
  {
    $result = $this->calculator->multiply(6, 7);
    $this->assertEquals(42, $result);
  }

  /**
   * Test division
   * @testomatio @T05
   */
  public function testDivision(): void
  {
    $result = $this->calculator->divide(15, 3);
    $this->assertEquals(5, $result);
  }

  /**
   * Test division by zero throws exception
   * @testomatio @T06
   */
  public function testDivisionByZeroThrowsException(): void
  {
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('Division by zero is not allowed');
    $this->calculator->divide(10, 0);
  }

  /**
   * Test addition with positive numbers
   * @testomatio @T07a
   */
  public function testAdditionWithPositiveNumbers(): void
  {
    $result = $this->calculator->add(2, 3);
    $this->assertEquals(5, $result);
  }

  /**
   * Test addition with negative numbers
   * @testomatio @T07b
   */
  public function testAdditionWithNegatives(): void
  {
    $result = $this->calculator->add(-2, -3);
    $this->assertEquals(-5, $result);
  }

  /**
   * Test addition with mixed positive and negative numbers
   * @testomatio @T07c
   */
  public function testAdditionWithMixedNumbers(): void
  {
    $result = $this->calculator->add(10, -5);
    $this->assertEquals(5, $result);
  }

  /**
   * Test addition with decimal numbers
   * @testomatio @T07d
   */
  public function testAdditionWithDecimals(): void
  {
    $result = $this->calculator->add(1.5, 2.5);
    $this->assertEquals(4.0, $result);
  }

  /**
   * Test addition with zero
   * @testomatio @T07e
   */
  public function testAdditionWithZero(): void
  {
    $result = $this->calculator->add(0, 5);
    $this->assertEquals(5, $result);
  }

  /**
   * Test percentage calculation
   * @testomatio @T08
   */
  public function testPercentage(): void
  {
    $result = $this->calculator->percentage(200, 15);
    $this->assertEquals(30, $result);
  }
}
