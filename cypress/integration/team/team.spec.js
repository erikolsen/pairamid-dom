context('Home', () => {
    let teamId;
    beforeEach(() => {
      cy.visit(' http://localhost:3000')
    })

    it('lets you create a new team', () => {
        // create team
        cy.get("[data-cy='team-name-input']").first().type('Test Team', {force: true})
        cy.get("[data-cy='team-name-submit']").first().click()
        cy.wait(100)
        cy.window().then((win) => {
            teamId = win.location.pathname.split('/')[2]
            console.log('TeamId', teamId)
        })

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

        // Add pair
        cy.get(`[data-cy='icon-${user1}']`).as('user1')
        cy.get(`[data-cy='icon-${user2}']`).as('user2')
        cy.get(`[data-cy='active-pair']`).eq(0).as('active-pair')
        cy.dragAndDrop('@user1', '@active-pair').as('drop1')
        cy.wait(100)
        cy.dragAndDrop('@user2', '@active-pair').as('drop2')
        cy.wait(100)

        cy.get("[data-cy='add-pair']").click({force: true})

        // Add pair
        cy.get(`[data-cy='icon-${user3}']`).as('user3')
        cy.get(`[data-cy='icon-${user4}']`).as('user4')
        cy.get("[data-cy='active-pair']").eq(1).as('active-pair2')
        cy.dragAndDrop('@user3', '@active-pair2').as('drop3')
        cy.wait(100)
        cy.dragAndDrop('@user4', '@active-pair2').as('drop4')

        cy.get("[data-cy='active-pair']").should('have.length', 2)

    })
})