describe("Links Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should Links(dashboard) component must be the default page", () => {
    cy.get("[data-cy=dashboard-title]").should("exist");
  });

  it("should Links page load an illustration initially", () => {
    cy.get("[data-cy=illustration]").should("exist");
  });

  it("should Links and Profile Details components contain appropriate titles", () => {
    cy.get("[data-cy=dashboard-link]").click();
    cy.get("[data-cy=dashboard-title]").should(
      "contain",
      "Customize Your Links"
    );
    cy.get("[data-cy=profile-title]").should("not.exist");

    cy.get("[data-cy=profile-link]").click();
    cy.get("[data-cy=profile-title]").should("contain", "Profile Details");
    cy.get("[data-cy=dashboard-title]").should("not.exist");
  });

  it("should add a new Link component when clicked on Add Link button", () => {
    cy.get("[data-cy=illustration]").should("exist");
    cy.get("[data-cy=linkbox-container]").should("not.exist");
    cy.get("[data-cy=add-link-button]").click();
    cy.get("[data-cy=illustration]").should("not.exist");
    cy.get("[data-cy=linkbox-container]").should("exist");
  });

  it("should have as many Link components as i click on Add Link button", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("[data-cy=add-link-button]").click();
    cy.get("[data-cy=add-link-button]").click();

    cy.get("[data-cy=linkbox-container]")
      .children(".linkbox")
      .should("have.length", 3);
  });

  it("should toggle platform menu component when i clicked 'Choose a platform'", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn0").click();
    cy.get("#ul-menu").should("exist");

    cy.get("[data-cy=dashboard-title]").click();
    cy.wait(400);
    cy.get("#ul-menu").should("not.exist");
  });

  it("should change the platform name with Facebook", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn0").click();
    cy.get("#ul-menu > :nth-child(4)").click();
    cy.get("#link-btn0").should("contain", "Facebook");
  });

  it("Should ensure that the URL input does not accept invalid URLs", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("[data-cy=linkbox-container] input").type("wrong_url");
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=linkbox-container]").should(
      "have.class",
      "border-red-500"
    );
  });

  it("should wrong-url-alert appear when i click on save button with invalid url", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("[data-cy=linkbox-container] input").type("wrong_url");
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=red-alert]").should("exist");
  });

  it("should accept valid url and add it to preview, and show a success alert", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn0").click();
    cy.get("#ul-menu > :nth-child(4)").click();
    cy.get("#link-btn0").should("contain", "Facebook");
    cy.get("[data-cy=linkbox-container] input").type(
      "https://www.facebook.com/hoohoo"
    );
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=preview-item]").should("exist").and("contain", "Facebook");

    cy.get("[data-cy=green-alert]").should("exist");
  });

  // it.only("should blue alert appear when i click a preview item", () => {
  //   cy.get("[data-cy=add-link-button]").click();
  //   cy.get("#link-btn0").click();
  //   cy.get("#ul-menu > :nth-child(4)").click();
  //   cy.get("[data-cy=linkbox-container] input").type(
  //     "https://www.facebook.com/hoohoo"
  //   );
  //   cy.get("[data-cy=save-button]").click();
  //   cy.get("[data-cy=preview-item]").click();

  //   cy.get("[data-cy=clipboard-alert]").should("exist");
  // });

  it("should not add any link if there is an invalid input on any linkbox", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn0").click();
    cy.get("#ul-menu > :nth-child(4)").click();
    cy.get("#link-btn0").should("contain", "Facebook");
    cy.get("[data-cy=linkbox-container] input").type(
      "https://www.facebook.com/hoohoo"
    );

    cy.get("[data-cy=add-link-button]").click();
    cy.get("[data-cy=linkbox-container] > :nth-child(2) input").type(
      "wrong_url"
    );
    cy.get("[data-cy=save-button]").click();

    cy.get("[data-cy=preview-item]").should("not.exist");
  });

  it("should add links to preview in the correct order", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn0").click();
    cy.get("#ul-menu > :nth-child(4)").click();
    cy.get("#link-btn0").should("contain", "Facebook");
    cy.get("[data-cy=linkbox-container] input").type(
      "https://www.facebook.com/hoohoo"
    );

    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn1").click();
    cy.get("#ul-menu > :nth-child(2)").click();
    cy.get("#link-btn1").should("contain", "Github");
    cy.get("[data-cy=linkbox-container] > :nth-child(2) input").type(
      "https://www.github.com/hoohoo"
    );

    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn2").click();
    cy.get("#ul-menu > :nth-child(5)").click();
    cy.get("#link-btn2").should("contain", "Twitter");
    cy.get("[data-cy=linkbox-container] > :nth-child(3) input").type(
      "https://www.twitter.com/hoohoo"
    );

    cy.get("[data-cy=save-button]").click();

    cy.get("[data-cy=preview-item]").should("have.length", 3);
    cy.get("[data-cy=preview-item]").eq(0).should("contain", "Facebook");
    cy.get("[data-cy=preview-item]").eq(1).should("contain", "Github");
    cy.get("[data-cy=preview-item]").eq(2).should("contain", "Twitter");
  });

  it("should remove the link", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get(".linkbox").should("have.length", 1);
    cy.get("[data-cy=remove-link-button]").click();
    cy.get(".linkbox").should("have.length", 0);
  });

  it.only("should remove the link and update the preview", () => {
    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn0").click();
    cy.get("#ul-menu > :nth-child(4)").click();
    cy.get("#link-btn0").should("contain", "Facebook");
    cy.get("[data-cy=linkbox-container] input").type(
      "https://www.facebook.com/hoohoo"
    );

    cy.get("[data-cy=add-link-button]").click();
    cy.get("#link-btn1").click();
    cy.get("#ul-menu > :nth-child(1)").click();
    cy.get("#link-btn1").should("contain", "Youtube");
    cy.get("[data-cy=linkbox-container] input")
      .eq(1)
      .type("https://www.youtube.com/haahaa");
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=preview-item]")
      .eq(0)
      .should("exist")
      .and("contain", "Facebook");

    cy.get("[data-cy=preview-item]")
      .eq(1)
      .should("exist")
      .and("contain", "Youtube");

    cy.get("[data-cy=remove-link-button]").eq(0).click();
    cy.get("[data-cy=save-button]").click();

    cy.get("#preview-container").within(() => {
      cy.contains("Facebook").should("not.exist");
      cy.contains("Youtube").should("exist");
    });
  });
});

describe("Profile Details Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=profile-link]").click();
  });

  it("should focus on related input when i click on the label", () => {
    cy.contains("Last name").click();
    cy.focused().should("have.id", "last-name");
  });

  it("should not allow blank inputs", () => {
    cy.get("[data-cy=save-btn]").click();
    cy.get("[data-cy=red-alert]").should("exist");
    cy.get("#personal-info").should("have.class", "border-red-500");
  });

  it("should not allow invalid first name", () => {
    cy.get("#first-name").type("123");
    cy.get("[data-cy=save-btn]").click();
    cy.get("[data-cy=red-alert]").should("exist");
  });

  it("should not allow invalid last name", () => {
    cy.get("#last-name").type("324");
    cy.get("[data-cy=save-btn]").click();
    cy.get("[data-cy=red-alert]").should("exist");
  });

  it("should not allow invalid email", () => {
    cy.get("#email").type("324");
    cy.get("[data-cy=save-btn]").click();
    cy.get("[data-cy=red-alert]").should("exist");
  });

  it("should reflect entered values to preview", () => {
    cy.get("#first-name").type("Hooo");

    cy.get("#last-name").type("haaaa");

    cy.get("#email").type("test@test.com");

    cy.get("[data-cy=save-btn]").click();

    cy.get("#preview-container").within(() => {
      cy.get("p").eq(0).should("contain", "Hooo haaaa");
      cy.get("p").eq(1).should("contain", "test@test.com");
    });

    cy.get("[data-cy=green-alert]").should("exist");
  });
});

export {};
