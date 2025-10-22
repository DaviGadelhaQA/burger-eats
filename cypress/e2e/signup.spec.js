import SignupFactory from "../factories/SignupFactory";
import SignupPage from "../pages/SignupPage";

describe('Signup Cases', () => {
    describe('Positives Scenarios', function () {
        it('TC_Register_001 - Successful registration', function () {
            var deliver = SignupFactory.deliver();

            cy.submitForm(deliver);

            const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
            SignupPage.modalContentShouldBe(expectedMessage);
        });

        const deliveryMethods = ['Moto', 'Bike Elétrica', 'Van/Carro'];
        deliveryMethods.forEach((method) => {
            it('TC_Register_004 - Validate different delivery methods', function () {
                const deliver = SignupFactory.deliver();
                deliver.delivery_method = method;

                cy.submitForm(deliver);

                const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
                SignupPage.modalContentShouldBe(expectedMessage);
            });
        });
    });

    describe('Negative Scenarios', function () {
        it('TC_Register_002 - Invalid CPF format', function () {
            const deliver = SignupFactory.deliver();
            deliver.cpf = '000000141aa';

            cy.submitForm(deliver);

            const expectedMessage = 'Oops! CPF inválido';
            SignupPage.alertMessageShouldBe(expectedMessage);

        });

        it('TC_Register_003 - Missing CNH upload', function () {
            const deliver = SignupFactory.deliver();
            deliver.cnh = null;

            cy.submitForm(deliver);

            const expectedMessage = 'Adicione uma foto da sua CNH';
            SignupPage.alertMessageShouldBe(expectedMessage);
        });

        it('TC_Register_005 - Invalid CEP format', function () {
            const deliver = SignupFactory.deliver({
                address: { postalcode: '00000000' }
            });

            cy.intercept('GET', 'https://viacep.com.br/ws/00000000/json/', {
                statusCode: 400,
                body: {}
            }).as('cepError');

            SignupPage.go();
            cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
            cy.get('input[type=button][value="Buscar CEP"]').click();

            const expectedMessage = 'Informe um CEP válido';
            SignupPage.alertMessageShouldBe(expectedMessage);
        });

        it('TC_Register_006 - Missing required fields', function () {
            SignupPage.go();
            SignupPage.submit();

            const messages = [
                { field: 'name', output: 'É necessário informar o nome' },
                { field: 'cpf', output: 'É necessário informar o CPF' },
                { field: 'email', output: 'É necessário informar o email' },
                { field: 'postalcode', output: 'É necessário informar o CEP' },
                { field: 'number', output: 'É necessário informar o número do endereço' },
                { field: 'delivery_method', output: 'Selecione o método de entrega' },
                { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
            ];

            messages.forEach((msg) => {
                SignupPage.alertMessageShouldBe(msg.output);
            });
        });

        it('TC_Register_007 - Invalid email format', function () {
            const deliver = SignupFactory.deliver();
            deliver.email = 'invalid_email';

            cy.submitForm(deliver);

            const expectedMessage = 'Oops! Email com formato inválido.';
            SignupPage.alertMessageShouldBe(expectedMessage);
        });
    });

    describe('Validation Scenario', function () {
        it.only('TC_Register_008 - Validate auto-filled address', function () {
            const deliver = SignupFactory.deliver();

            cy.intercept('GET', 'https://viacep.com.br/ws/04534011/json/', {
                statusCode: 200,
                body: {
                    cep: '04534-011',
                    logradouro: 'Rua Joaquim Floriano',
                    complemento: '',
                    bairro: 'Itaim Bibi',
                    localidade: 'São Paulo',
                    uf: 'SP'
                }
            }).as('getAddress');

            SignupPage.go();

            cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
            cy.get('input[type=button][value="Buscar CEP"]').click();

            cy.wait('@getAddress');

            cy.get('input[name="address"]').should('have.value', deliver.address.street);
            cy.get('input[name="district"]').should('have.value', deliver.address.district);
            cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);
        });
    });
})