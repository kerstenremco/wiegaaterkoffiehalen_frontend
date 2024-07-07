describe("Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport("macbook-16");
    cy.get("input[type=email]").type(Cypress.env("user01Email"));
    cy.get("input[type=password]").type(Cypress.env("userxPassword"));
    cy.contains(/inloggen/i).click();
  });
  it("When no group yet, user can click button to create a group and create it", () => {
    cy.get("[data-cy=noGroupCreateGroupButton]").as("createGroupButton").click();
    // Close modal
    cy.get("[data-cy=newGroupModalClose]").as("closeButton").click();
    cy.get("@createGroupButton").click();
    // Button disabled when invalid input
    cy.get("[data-cy=newGroupModalInput]").as("inputField").type("Abyusd&*(Oukbkol");
    cy.get("[data-cy=newGroupModalSubmit]").as("submitButton").should("be.disabled");
    // Button enabled when valid input
    cy.get("@inputField").clear().type("Cypress test group");
    cy.get("@submitButton").should("be.enabled").click();
    // Information about the new group
    cy.contains(/je hebt een nieuwe groep aangemaakt/i).should("exist");
  });
  it("Default drinks are present and user can delete a drink", () => {
    cy.get("[data-cy=groupSettingsButton]").click();
    cy.get("[data-cy=groupSettingsTabDrinks]").click();
    // Default drinks are present
    cy.contains("Koffie").as("koffie").should("exist");
    cy.contains("Cappuccino").as("cappuccino").should("exist");
    // Remove Capuccino but cancel operation
    cy.get("[data-cy=groupSettingsDrinkItems] > div").last().find("[data-cy=groupSettingsDrinkItemsRemove]").click();
    cy.get("[data-cy=removeDrinkModalCancel]").click();
    // Remove Capuccino and confirm operation
    cy.get("[data-cy=groupSettingsDrinkItems] > div").last().find("[data-cy=groupSettingsDrinkItemsRemove]").click();
    cy.get("[data-cy=removeDrinkModalConfirm]").click();
    cy.get("@cappuccino").should("not.exist");
  });
  it("User can't delete last drink", () => {
    cy.get("[data-cy=groupSettingsButton]").click();
    cy.get("[data-cy=groupSettingsTabDrinks]").click();
    cy.get("[data-cy=groupSettingsDrinkItems] > div").last().as("koffie").find("[data-cy=groupSettingsDrinkItemsRemove]").click();
    cy.get("[data-cy=removeDrinkModalConfirm]").click();
    cy.contains(/Dit is het laatste drankje in de groep/i).should("exist");
    cy.contains(/begrepen/i).click();
    cy.get("@koffie").should("exist");
  });
  it("Can create a drink", () => {
    cy.get("[data-cy=groupSettingsButton]").click();
    cy.get("[data-cy=groupSettingsTabDrinks]").click();
    cy.contains(/drankje toevoegen/i).click();
    cy.get("[data-cy=editDrinkModalName]").type("Thee");
    cy.get("[data-cy=editDrinkModalConfirm").as("save").should("be.disabled"); // Button disabled when no icon selected
    cy.get("[data-cy=editDrinkModalIcons] span").first().click();
    cy.get("@save").should("be.enabled"); // Button enabled when icon selected
    cy.get("[data-cy=editDrinkModalName]").clear().type("Thee^&@%^$#");
    cy.get("@save").should("be.disabled"); // Button disabled when invalid name
    cy.get("[data-cy=editDrinkModalName]").clear().type("Thee");
    cy.get("@save").click();
    cy.get("[data-cy=groupSettingsDrinkItems]").contains("Thee").should("exist");
  });
  it("Can add extras to a drink", () => {
    cy.get("[data-cy=groupSettingsButton]").click();
    cy.get("[data-cy=groupSettingsTabDrinks]").click();
    cy.get("[data-cy=groupSettingsDrinkItems] > div").last().find("[data-cy=groupSettingsDrinkItemsEdit]").click();
    cy.get("[data-cy=editDrinkModalExtra]").type("Normaal");
    cy.get("[data-cy=editDrinkModalConfirmExtra]").as("confirmExtra").click();
    cy.get("[data-cy=editDrinkModalExtra]").type("G*gb9hp");
    cy.get("@confirmExtra").should("have.class", "cursor-not-allowed");
    cy.get("[data-cy=editDrinkModalExtra]").clear().type("Rooibos");
    cy.get("@confirmExtra").should("not.have.class", "cursor-not-allowed");
    cy.get("@confirmExtra").click();
    cy.get("[data-cy=editDrinkModalConfirm").click();
  });

  it("Can add a user", () => {
    cy.get("[data-cy=groupSettingsButton]").click();
    cy.get("[data-cy=groupSettingsTabMembers]").click();
    cy.get("[data-cy=membersAddButton]").click();
    cy.get("[data-cy=membersAddInput]").as("email").type("gyweigfe9fuer@ewrafae4s");
    // cy.get("[data-cy=membersAddConfirm]").as("confirm").should("be.disabled");
    cy.get("@email").clear().type("doesnotexist@hotmail.com");
    cy.get("[data-cy=membersAddConfirm]").as("confirm").should("be.enabled").click();
    cy.contains(/deze gebruiker is nog geen lid/i).should("exist");
    cy.get("@email").clear().type(Cypress.env("user02Email"));
    cy.get("[data-cy=membersAddConfirm]").as("confirm").should("be.enabled").click();
    cy.get("[data-cy=groupSettingsClose]").click();
    cy.get("[data-cy=onlineUsers]").contains("Cypress NulTwee").should("exist");
  });
  it("Can remove a group", () => {
    cy.get("[data-cy=groupSettingsButton]").click();
    cy.get("[data-cy=groupSettingsTabRemove]").click();
    cy.get("[data-cy=removeGroupConfirm]").should("be.disabled");
    cy.get("[data-cy=removeGroupSwitch]").click();
    cy.get("[data-cy=removeGroupConfirm]").should("be.enabled").click();
    cy.contains(/je bent nog geen lid/i).should("exist");
  });
});

// Eind: groep verwijderen
