class LoginPage {
    openLoginPage() {
        return cy.visit("http://uitestingplayground.com/sampleapp");
    }
    loginToApp(userName, password) {
        cy.get('input[name="UserName"]').type(userName);
        cy.get('input[name="Password"]').type(password);
        cy.get('#login').click();
    }
    verifyLoginStatus(status) {
        return cy.get('#loginstatus').should('have.text', status);
    }
    verifyH3Header(header) {
        return cy.get('.container > h3').should('have.text', header);
    }
    loginBtnIsVisible() {
        return cy.get('#login').should('be.visible');
    }
    verifyUserNamePlaceholder() {
        return cy.get('input[name="UserName"]')
                .should('have.attr', 'placeholder')
                .and('eq', 'User Name');
    }
}

const loginPage = new LoginPage();

export default loginPage;
  	
