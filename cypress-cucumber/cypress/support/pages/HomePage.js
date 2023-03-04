class HomePage {
    openHomePage() {
        return cy.visit("http://uitestingplayground.com");
    }
    verifyHomepageTitle(title) {
        return cy.title().should('eq', title);
    }
    verifyHomepageActiveMenuName() {
        return cy.get(".nav-item.active > a").should('have.text', 'Home');
    }
    verifyHomepageActiveMenuAttr() {
        return cy.get(".nav-item.active > a").should('have.attr', 'href', '/home');
    }
    playgroundTitleShouldBeVisible() {
        return cy.contains("Playground").should('be.visible');
    }
    cubeImageShouldBeVisible() {
        return cy.get("img.img-fluid").should('be.visible');
    }
    verifyLinkCount(count) {
        return cy.get("h3 > a").should('have.length', count);
    }
}

const homePage = new HomePage();

export default homePage;
  	
