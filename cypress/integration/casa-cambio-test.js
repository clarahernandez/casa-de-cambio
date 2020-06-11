/// <reference types="Cypress">

const URL = '127.0.0.1:8080';

context('Casa de Cambio', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('valida el formulario', () => {
        it('se asegura que haya un formulario', () => {
            cy.get('#pantalla-formulario').find('.form-group').should('have.length', 4);
        });

        it('verifica el funcionamiento para validar la fecha inexistente', () => {
            cy.get('#dia').type('30');
            cy.get('#mes').type('2');
            cy.get('#anio').type('2020');
            cy.get('#boton-mostrar').click();

            cy.get('#error').should('have.text', 'Esa fecha no existe.');
        });

        it('verifica el funcionamiento para validar la fecha inexistente por año bisiesto', () => {
            cy.get('#dia').type('{backspace}{backspace}29');
            cy.get('#anio').type('{backspace}{backspace}19');
            cy.get('#boton-mostrar').click();

            cy.get('#error').should('have.text', 'Esa fecha no existe.');
        });
    });
});
