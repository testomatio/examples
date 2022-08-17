<?php

namespace App\Tests\functional;

use App\Tests\FunctionalTester;

class UrlCheckCest
{
    public function checkSubdomainAccess(FunctionalTester $I)
    {
        $I->amOnPage('http://test.example.com/es/domain');
        $I->see('SUBDOMAIN test');
    }

    public function checkAccessToSecureUrls(FunctionalTester $I)
    {
        $secureUrls = [
            '/en/admin/post/',
            '/en/admin/post/new',
            '/en/admin/post/1',
            '/en/admin/post/1/edit',
        ];

        foreach ($secureUrls as $url) {
            $I->amOnPage($url);
            $I->seeResponseCodeIs(200);
            $I->seeCurrentUrlEquals('/en/login');
        }
    }

    public function checkPublicUrlAccess(FunctionalTester $I)
    {
        $publicUrls = [
            '/',
            '/en/blog/',
            '/en/login',
        ];

        foreach ($publicUrls as $url) {
            $I->amOnPage($url);
            $I->seeResponseCodeIs(200);
            $I->seeCurrentUrlEquals($url);
        }

    }
}
