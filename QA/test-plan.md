# Test Plan – E-Commerce Website

---

## 1. Overview

This document outlines the overall testing strategy for the **E-Commerce Website** project.  
The goal is to ensure that all core functionalities, user flows, and integrations work as expected across devices and environments.

---

## 2. Objectives

- Verify that users can browse, select, and purchase products successfully.  
- Ensure smooth authentication and secure transactions.  
- Validate that admin operations (product, order, and user management) function correctly.  
- Confirm API reliability, performance, and data integrity.  
- Check responsive design and cross-platform compatibility.  

---

## 3. Scope

**In Scope:**
- User Authentication (Sign-Up, Login, Logout)
- Product Browsing (List & Details)
- Shopping Cart and Checkout
- Order Management and Payment Flow
- Admin Dashboard
- Backend APIs
- UI/UX Responsiveness and Accessibility

**Out of Scope:**
- Third-party service testing (payment gateways, email delivery)
- Performance/stress testing (handled in a separate plan)
- Security penetration testing

---

## 4. Test Types

| Test Type | Description |
|------------|-------------|
| Functional Testing | Validate core business logic and workflows |
| UI/UX Testing | Verify design, layout, and responsiveness |
| Integration Testing | Check interactions between frontend, backend, and APIs |
| Regression Testing | Ensure new changes don’t break existing features |
| Smoke Testing | Validate basic functionality after deployment |
| API Testing | Verify REST endpoints for correctness and error handling |
| User Acceptance Testing (UAT) | Validate with real-world scenarios before release |

---

## 5. Test Environment

| Component | Details |
|------------|----------|
| **Frontend** | React (Web, Mobile-Responsive) |
| **Backend** | Node.js / Express |
| **Database** | MongoDB |
| **Test Tools** | Postman, Cypress / Playwright, Jest |
| **Environments** | Dev → Staging → Production |

---

## 6. Test Deliverables

- `test-cases` – Detailed test case list inside the folder 
- `XXX-test.md` – Execution outcomes and status of scpecific test cases
- `bug-report.md` – List of identified defects and severity  
- `test-summary.md` – Summary of testing activities and conclusions  

---

## 7. Entry & Exit Criteria

**Entry Criteria:**
- All major features developed and merged to staging
- APIs integrated and stable
- Test environment ready

**Exit Criteria:**
- All high and critical defects resolved
- Regression and smoke tests passed
- UAT approved by stakeholders

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|-------------|
| Frequent UI changes | Maintain modular test cases |
| Delayed API integration | Mock data for interim testing |
| Limited devices for testing | Use responsive tools & emulators |

---

## 9. Reporting

- Daily test progress updates during execution phase  
- Weekly summary reports to project stakeholders  
- Bug tracking and prioritization via Jira / GitHub Issues  

---

**Prepared by:** Alexander Jade Francisco  
**Last Updated:** November 6, 2025
