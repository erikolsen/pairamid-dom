context('Home', () => {
    beforeEach(() => {
      cy.visit(' http://localhost:3000')
    })
  
    xit('lets you create a new team', () => {
        // create team
        cy.get("[data-cy='team-name-input']").first().type('Test Team', {force: true})
        cy.get("[data-cy='team-name-submit']").first().click()

        // add roles
        const role1 = 'QA'
        const color1 = '#3ecc8e'

        cy.get("[data-cy='role-card']").within(()=> {
            cy.get("[data-cy='Edit']").click()
        })
        cy.get("[data-cy='role-name-input']").clear({force: true})
        cy.get("[data-cy='role-name-input']").type(role1, {force: true})
        cy.get("[data-cy='role-color-input']").invoke('val', color1).trigger('change')
        cy.get("[data-cy='role-submit']").click()

        cy.get("[data-cy='add-role']").click()

        const role2 = 'DEV'
        const color2 = '#4e3ecc'
        cy.get("[data-cy='role-name-input']").clear({force: true})
        cy.get("[data-cy='role-name-input']").type(role2, {force: true})
        cy.get("[data-cy='role-color-input']").invoke('val', color2).trigger('change')
        cy.get("[data-cy='role-submit']").click()

        // add users
        const user1 = 'AA'
        cy.get("[data-cy='user-initials-input']").first().type(user1, {force: true})
        cy.get("[data-cy='user-role-select']").select(role1)
        cy.get("[data-cy='user-submit']").click()

        cy.get("[data-cy='add-user']").click()

        const user2 = 'BB'
        cy.get("[data-cy='user-initials-input']").first().type(user2, {force: true})
        cy.get("[data-cy='user-role-select']").select(role2)
        cy.get("[data-cy='user-submit']").click()

        cy.get("[data-cy='add-user']").click()

        const user3 = 'CC'
        cy.get("[data-cy='user-initials-input']").first().type(user3, {force: true})
        cy.get("[data-cy='user-role-select']").select(role2)
        cy.get("[data-cy='user-submit']").click()

        cy.get("[data-cy='add-user']").click()

        const user4 = 'DD'
        cy.get("[data-cy='user-initials-input']").first().type(user4, {force: true})
        cy.get("[data-cy='user-role-select']").select(role2)
        cy.get("[data-cy='user-submit']").click()

        // Todays view
        cy.get("[data-cy='header']").within(()=> {
            cy.get("[data-cy='today']").click()
        })

    })
})