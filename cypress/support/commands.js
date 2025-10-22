import SignupPage from "../pages/SignupPage";

Cypress.Commands.add('submitForm', function(deliver){
    SignupPage.go();
    SignupPage.fillForm(deliver);
    SignupPage.submit();
});