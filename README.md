# Burger Eats - Cypress Automation Project

## 📖 Overview

This project was developed to **practice and improve test automation skills** using **[Cypress](https://www.cypress.io/)** and the **Page Object Model (POM)** design pattern.

The automated tests validate the **sign-up workflow** for the **Burger Eats** web application, from opening the form, filling in user data, and submitting it, to verifying validation messages and **ViaCEP API** integration for automatic address completion.

In addition to the automation scripts, a **manual test case sheet** was created to complement the testing process:

👉 [🧾 Burger Eats Sign-Up Test Case Sheet (Google Sheets)](https://docs.google.com/spreadsheets/d/1UiULUwC4330OUdRhMKsWbeIuFxKj8FN6VrpHwjH-DY8/edit?usp=sharing)


## 🎯 Project Goals

- Strengthen Cypress skills and understanding of modern E2E testing practices  
- Implement **Page Object Model (POM)** for clean, maintainable test structure  
- Practice **test data management** using factory patterns  
- Explore **mocking external APIs** (ViaCEP) with `cy.intercept()`  
- Validate **form behavior** for positive and negative scenarios  


## How to Run
Follow the steps below to install dependencies and execute the test suite:

### Install dependencies
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.  
Then, in the root folder of the project, run:

npm i

### Open Cypress UI
npx cypress open