<?php use App\Tests\FunctionalTester;
$I = new FunctionalTester($scenario);
$I->wantTo('get exception on unknown subdomain route');

try {
    $I->amOnPage('http://test.example2.com');
    $I->fail('ExternalUrlException wasn\'t thrown');
} catch (Codeception\Exception\ExternalUrlException $e) {

}
