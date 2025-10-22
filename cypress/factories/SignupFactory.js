const { faker } = require('@faker-js/faker')
var cpf = require('gerador-validador-cpf');

export default {
    deliver(overrides = {}){
        var data = {
            name: faker.person.fullName(),
            cpf: cpf.generate(),
            email: faker.internet.email(),
            whatsapp: '11999999999',
            address: {
                postalcode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Ap 142',
                district: 'Itaim Bibi',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return {
            ...data,
            ...overrides,
            address:{
                ...data.address,
                ...(overrides.address || {})
            }
        };
    }
}