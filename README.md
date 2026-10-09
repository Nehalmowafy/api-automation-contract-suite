# Headless REST & SOAP API Contract Automation Suite

[![API Contract & Schema Regression](https://github.com/Nehalmowafy/api-automation-contract-suite/actions/workflows/api-ci.yml/badge.svg)](https://github.com/Nehalmowafy/api-automation-contract-suite/actions/workflows/api-ci.yml)

A lightweight, high-speed backend test automation framework built with **Playwright APIRequestContext** and modern **JavaScript (ES6+)**. 

Engineered for pure headless execution with **zero browser engine overhead**, running complete regression cycles across modern **RESTful JSON contracts** and enterprise **SOAP XML web services** in under 10 seconds.

---

## 🏗️ Architecture & Technical Highlights

- **Zero Browser Overhead:** Utilizes Playwright's native `request` fixture directly. No browser binaries (Chromium, WebKit, Firefox) are downloaded or initialized, minimizing compute usage and slashing CI execution time.
- **RESTful Contract Validation:** Tests HTTP status code boundaries (200, 201, 404), response headers (`application/json`), query parameter filtering, and payload structure integrity.
- **SOAP 1.2 XML Envelope Processing:** Constructs raw XML request envelopes, passes strict SOAP 1.2 content headers (`application/soap+xml`), and asserts parsed XML string nodes.
- **CI/CD Integration:** Automated GitHub Actions pipeline configured for pure headless API validation, publishing 30-day downloadable HTML execution report artifacts on every push and pull request.

---

## 📂 Repository Layout

```text
api-automation-contract-suite/
├── .github/
│   └── workflows/
│       └── api-ci.yml          # Fast CI runner (Node.js runtime, no browser installs)
├── tests/
│   ├── rest.spec.js            # RESTful contract schemas, filters, and POST mutations
│   └── soap.spec.js            # SOAP 1.2 XML request envelope and response parsing
├── playwright.config.js        # Global HTTP headers, reporters, and worker settings
├── package.json                # Project dependencies and script shortcuts
├── .gitignore
└── README.md