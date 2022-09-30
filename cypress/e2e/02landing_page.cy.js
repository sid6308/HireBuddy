describe("Interview List", () => {
  const rowSel = '[data-cy="dataRow"]';
  const colSel = '[data-testid="dataCol"]';

  function readTable(rowSel) {
    let usersUI = [];
    return cy
      .get(rowSel)
      .each((row, rowIndex) => {
        let user = {};
        cy.wrap(row)
          .find(colSel)
          .each((col) => {
            let att = col.attr("data-cy");
            if (att != "action") user[att] = col.text().trim();
          });
        usersUI[rowIndex] = user;
      })
      .then(() => {
        cy.wrap(usersUI);
      });
  }

  function sortData(arr, sortkey, type) {
    return arr.sort((a, b) => {
      if (a[sortkey] === null) return 1;
      if (b[sortkey] === null) return -1;
      if (a[sortkey] === null && b[sortkey] === null) return 0;
      return (
        a[sortkey].toString().localeCompare(b[sortkey].toString(), "en", {
          numeric: true,
        }) * (type === "asc" ? 1 : -1)
      );
    });
  }

  function filterData(arr, filterkey, filterVal) {
    return arr.filter((data) => {
      if (filterkey === "month" || filterkey === "year") {
        const date = new Date(data["date"]);
        return filterkey === "year"
          ? filterVal.includes(date.getFullYear())
          : filterVal.includes(date.getMonth() + 1);
      } else {
        return filterVal.includes(data[`${filterkey}`]?.value);
      }
    });
  }

  function isEqual(tableData, serverData) {
    tableData.forEach((item, index) => {
      for (var key in item) {
        const item_server =
          typeof serverData[index][key] == "object"
            ? serverData[index][key]?.label
            : serverData[index][key];
        if (item[key] != item_server) return false;
      }
    });
    return true;
  }

  beforeEach(() => {
    cy.login();
    cy.request({
      url: "http://localhost:5000/interviews",
      method: "GET",
    })
      .then((resp) => {
        cy.wrap(resp.body);
      })
      .as("interviews");

    cy.visit("/");
  });

  it("Rendered - Check all of the data is rendered", function () {
    readTable(rowSel).then((res) => {
      cy.wait(1000);
      expect(isEqual(res, this.interviews)).to.be.true;
    });
  });

  it("Sort Asc- Check all of the data is sorted", function () {
    cy.wait(1000);
    cy.get('[data-testid="cand_fullname"]').click();
    cy.then(() => {
      readTable(rowSel).then((res) => {
        const sorted_data = sortData(this.interviews, "cand_fullname", "asc");
        expect(isEqual(res, sorted_data)).to.be.true;
      });
    });
  });

  it("Sort Desc- Check all of the data is sorted", function () {
    cy.wait(1000);
    cy.get('[data-testid="cand_fullname"]').click().click();
    cy.then(() => {
      readTable(rowSel).then((res) => {
        const sorted_data = sortData(this.interviews, "cand_fullname", "desc");
        expect(isEqual(res, sorted_data)).to.be.true;
      });
    });
  });

  it("Filter- Check data is filtered", function () {
    cy.wait(1000);
    cy.contains("Choose Filter type").click();
    cy.contains("Outcome").click();
    cy.contains("Choose Filter Value").click();
    cy.contains("Selected").click();
    cy.then(() => {
      readTable(rowSel).then((res) => {
        const filtered_data = filterData(this.interviews, "outcome", [
          "selected",
        ]);
        expect(isEqual(res, filtered_data)).to.be.true;
      });
    });
  });

  it("Pagination- Check data is rendered", function () {
    cy.wait(1000);
    cy.get('[data-cy="2"]').click();
    cy.then(() => {
      readTable(rowSel).then((res) => {
        const data = this.interviews.slice(4, 8);
        expect(isEqual(res, data)).to.be.true;
      });
    });
  });
});
