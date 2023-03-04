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
}

const loginPage = new LoginPage();

export default loginPage;
  	
