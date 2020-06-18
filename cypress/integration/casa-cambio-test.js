/// <reference types="Cypress">

const URL = '127.0.0.1:8080';

context('Casa de Cambio', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('valida el formulario', () => {
        it('se asegura que haya un formulario con 2 inputs', () => {
            cy.get('#pantalla-formulario').find('.form-group').should('have.length', 2);
        });

    });
    describe('muestra los cambios', () => {
        it('se asegura que se muestra la tabla', () => {
            cy.get('#fecha').type('2020-05-20');
            cy.get('#boton-mostrar').click();

            cy.expect('#pantalla-cambio').to.not.have.class('oculto');
        });

        it('se asegura que se muestren CAD, RUB y BRL', () => {
            cy.get('thead').contains('CAD');
            cy.get('thead').contains('RUB');
            cy.get('thead').contains('BRL');
        });
    });
});
