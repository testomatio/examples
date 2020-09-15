<?php

namespace App\Tests;

use App\EventSubscriber\CommentNotificationSubscriber;
use Codeception\Example;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Symfony\Component\Routing\Router;

class ServiceContainerCest
{
    private function getExamples()
    {
        return [
            [CommentNotificationSubscriber::class, CommentNotificationSubscriber::class],
            ['doctrine', Registry::class],
            ['router', Router::class],
        ];
    }

    /**
     * @param FunctionalTester $I
     * @param Example $example
     *
     * @dataProvider getExamples
     */
    public function testServiceIsInContainer(FunctionalTester $I, Example $example)
    {
        $service = $I->grabService($example[0]);

        $I->assertInstanceOf($example[1], $service);
    }
}
