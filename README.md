# NeuralAutomate.dev - Business Automation & Web Systems

Autonomous AI process automations, n8n webhook pipelines, WhatsApp chatbots, CRM auto-sync, & document OCR parsing.

---

## 📄 Pricing PDF Generation System

This project includes an automated A4 PDF generation system powered by Playwright.

### How to Update Prices or Validity Dates

1. **To Change Prices / Package Details:**
   - Edit [`lib/pricing.ts`](file:///c:/Users/Ankit/Desktop/neural%20website/lib/pricing.ts).
   - Run the PDF generation command:
     ```bash
     npm run generate-pdfs
     ```
   - Commit and push the updated files in `public/pricing-pdfs/`.

2. **To Change PDF Validity Date:**
   - Change `VALID_TILL_DATE` in [`lib/pricing.ts`](file:///c:/Users/Ankit/Desktop/neural%20website/lib/pricing.ts) (e.g., `"31 December 2026"`).
   - Re-run `npm run generate-pdfs`.

3. **First-Time Local Machine Setup:**
   - Install Chromium browser binary for Playwright once:
     ```bash
     npx playwright install chromium
     ```

*Note: The PDF generation command spawns a production test server on port 3100 and outputs 6 A4 PDF files to `public/pricing-pdfs/`.*