<?php

namespace App\Tests;

use App\Entity\Comment;
use App\Entity\Post;
use Codeception\Util\HttpCode;

class CommentCest
{

    public function createPost(FunctionalTester $I)
    {
        $I->amOnLocalizedPage('/login');
        $I->submitForm('#main form', ['_username' => 'jane_admin', '_password' => 'kitten']);
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeCurrentRouteIs('admin_index');
        $I->see('Post List');
        $I->click('Create a new post');
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeCurrentRouteIs('admin_post_new');
        $I->see('Post creation');
        $I->fillField('Title', 'Hi, Symfony!');
        $I->fillField('Summary', 'Hi, Symfony, Summary!');
        $I->fillField('Content', 'Hi, Symfony, Content!');
        $I->click('Create post');

        $I->see('Post created successfully!');

        $I->seeInRepository(Post::class, [
            'content' => 'Hi, Symfony, Content!',
            'author' => [
                'username' => 'jane_admin',
            ],
        ]);
    }

    public function createComment(FunctionalTester $I)
    {
        $I->amOnLocalizedPage('/login');
        $I->submitForm('#main form', ['_username' => 'jane_admin', '_password' => 'kitten']);
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeCurrentRouteIs('admin_index');

        $I->amOnPage('/en/blog/posts/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit');
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeCurrentRouteIs('blog_post');
        $I->see('Add a comment');
        $I->fillField('comment[content]', 'Hi, Symfony!');
        $I->click('Publish comment');
        $I->seeCurrentRouteIs('blog_post');
        $I->see('Hi, Symfony!');
        // This particular assertion is a bit of overkill, but it also serves as a testcase
        // of `seeInRepository` method with complex associations. Here is how this assertion
        // translates to English:
        //
        //   * I see a comment entity with content equal to 'Hi, Symfony!'
        //   * and 'author' association points to a user entity with username equal to 'john_user'
        //   ** note: john_user is one who created the comment, as it is used in login
        //      procedure above
        //   * and 'post' association points to a post entity which...
        //   * ...has an associated comment entity which...
        //   * ...has same content and author with same username.
        $I->seeInRepository(Comment::class, [
            'content' => 'Hi, Symfony!',
            'author' => [
                'username' => 'jane_admin',
            ],
            'post' => [
                'comments' => [
                    'content' => 'Hi, Symfony!',
                    'author' => [
                        'username' => 'jane_admin'
                    ]
                ]
            ]
        ]);
    }
}
