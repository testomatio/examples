<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;

/**
 * User Registration Test Suite
 * Demonstrates feature-level testing
 */
class UserRegistrationTest extends TestCase
{
  /**
   * Test valid email format
   * @testomatio @T09
   */
  public function testValidEmailFormat(): void
  {
    $email = 'user@example.com';
    $this->assertTrue($this->isValidEmail($email));
  }

  /**
   * Test invalid email format
   * @testomatio @T10
   */
  public function testInvalidEmailFormat(): void
  {
    $email = 'invalid-email';
    $this->assertFalse($this->isValidEmail($email));
  }

  /**
   * Test password strength - strong password
   * @testomatio @T11
   */
  public function testStrongPassword(): void
  {
    $password = 'SecureP@ss123';
    $this->assertTrue($this->isStrongPassword($password));
  }

  /**
   * Test password strength - weak password
   * @testomatio @T12
   */
  public function testWeakPassword(): void
  {
    $password = 'weak';
    $this->assertFalse($this->isStrongPassword($password));
  }

  /**
   * Test username validation - valid username
   * @testomatio @T13a
   */
  public function testUsernameValidationWithValidUsername(): void
  {
    $result = $this->isValidUsername('john_doe');
    $this->assertTrue($result);
  }

  /**
   * Test username validation - valid alphanumeric
   * @testomatio @T13b
   */
  public function testUsernameValidationWithAlphanumeric(): void
  {
    $result = $this->isValidUsername('user123');
    $this->assertTrue($result);
  }

  /**
   * Test username validation - too short
   * @testomatio @T13c
   */
  public function testUsernameValidationTooShort(): void
  {
    $result = $this->isValidUsername('ab');
    $this->assertFalse($result);
  }

  /**
   * Test username validation - with spaces
   * @testomatio @T13d
   */
  public function testUsernameValidationWithSpaces(): void
  {
    $result = $this->isValidUsername('john doe');
    $this->assertFalse($result);
  }

  /**
   * Test username validation - special characters
   * @testomatio @T13e
   */
  public function testUsernameValidationWithSpecialChars(): void
  {
    $result = $this->isValidUsername('john@doe');
    $this->assertFalse($result);
  }

  /**
   * Test username validation - empty string
   * @testomatio @T13f
   */
  public function testUsernameValidationEmpty(): void
  {
    $result = $this->isValidUsername('');
    $this->assertFalse($result);
  }

  // Helper methods simulating validation logic

  private function isValidEmail(string $email): bool
  {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
  }

  private function isStrongPassword(string $password): bool
  {
    // Password must be at least 8 characters with uppercase, lowercase, number, and special char
    return strlen($password) >= 8
      && preg_match('/[A-Z]/', $password)
      && preg_match('/[a-z]/', $password)
      && preg_match('/[0-9]/', $password)
      && preg_match('/[@$!%*?&#]/', $password);
  }

  private function isValidUsername(string $username): bool
  {
    // Username must be 3-20 alphanumeric characters or underscore
    return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username) === 1;
  }
}
