<?php use App\Tests\FunctionalTester;
$I = new FunctionalTester($scenario);
$I->wantTo('test subdomain route');

$I->amOnPage('http://test.example.com/es/domain');
$I->see('SUBDOMAIN test');
