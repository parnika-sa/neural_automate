const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key] = val;
    }
  });
}

async function runTests() {
  console.log('\n=========== 🧪 NEURALAUTOMATE BACKEND VERIFICATION ===========\n');

  // TEST 1: SMTP EMAIL DISPATCH
  console.log('1. Testing SMTP Email Connection (info@neuralautomate.dev)...');
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || 'info@neuralautomate.dev';
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass || smtpPass.includes('dummy')) {
    console.log('❌ SMTP_PASS is missing or set to dummy in .env.local.');
  } else {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      console.log(`   Connecting to ${smtpHost}:${smtpPort} as ${smtpUser}...`);
      await transporter.verify();
      console.log('   ✅ SMTP Authentication SUCCESSFUL!');

      console.log(`   Sending test email to ${smtpUser}...`);
      const info = await transporter.sendMail({
        from: `NeuralAutomate Test <${smtpUser}>`,
        to: smtpUser,
        subject: '🚀 Test Email - NeuralAutomate.dev SMTP Verification',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #040705; color: #ffffff; border-radius: 12px;">
            <h2 style="color: #10b981;">SMTP Email Dispatch Working!</h2>
            <p>This is a test notification email sent from <strong>${smtpUser}</strong> to verify production readiness.</p>
            <p style="color: #34d399; font-family: monospace;">Status: VERIFIED_READY</p>
          </div>
        `,
      });

      console.log(`   ✅ REAL EMAIL DISPATCHED! Message ID: ${info.messageId}`);
    } catch (err) {
      console.error('   ❌ SMTP ERROR:', err.message);
      if (err.message.includes('Invalid login') || err.message.includes('Username and Password not accepted')) {
        console.log('\n   💡 GMAIL NOTE: Google Workspace / Gmail requires an "App Password" (16 characters) instead of your regular password.');
        console.log('   Go to: https://myaccount.google.com/apppasswords to generate a 16-character App Password.');
      }
    }
  }

  // TEST 2: RAZORPAY LIVE API CONNECTION
  console.log('\n2. Testing Razorpay Live API Connection...');
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.log('❌ Razorpay keys missing.');
  } else {
    try {
      const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
      console.log(`   Attempting to create test order with Key ID: ${keyId}...`);

      const order = await instance.orders.create({
        amount: 100, // ₹1.00 in paise
        currency: 'INR',
        receipt: `test_receipt_${Date.now()}`,
        notes: { test: 'Production_Readiness_Test' },
      });

      console.log('   ✅ RAZORPAY LIVE CONNECTION SUCCESSFUL!');
      console.log(`   Created Test Order ID: ${order.id} | Amount: ₹${order.amount / 100} ${order.currency}`);
    } catch (err) {
      console.error('   ❌ RAZORPAY ERROR:', err.error ? err.error.description : err.message);
    }
  }

  console.log('\n=============================================================\n');
}

runTests();
