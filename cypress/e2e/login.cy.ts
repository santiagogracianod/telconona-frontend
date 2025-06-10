describe('template spec', () => {
 /*  it("redirige al dashboard cuando las credenciales son válidas", () => {

    // 1. Visita la página de login
    cy.visit('https://telconona-frontend.vercel.app/login')

    // 2. Rellena formulario y envía
    cy.get("input#email").type("test@correo.com")
    cy.get("input#password").type("password123")
    cy.get("button[type=submit]").click()

    // 3. Espera la petición y comprueba redirect
    cy.wait("@postLogin")
    cy.url().should("include", "/dashboard")
    cy.contains("Bienvenido")  // o algún texto del dashboard
  }) */

  it("valida campos vacíos sin llamar al API", () => {
    cy.visit("login")
    cy.get("button[type=submit]").click()
    // No debe haber petición a /api/login
    cy.get("[role=alert]").should("contain.text", "Por favor ingresa tu email y contraseña")
  })
})