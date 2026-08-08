import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'assets', 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function capture() {
  console.log('Launching browser to capture real app screenshots...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Founder - Chat / AI Navigator
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await delay(1200);

  // Click on Chat link in sidebar or button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const chatBtn = buttons.find(b => b.textContent?.includes('ИИ-Навигатор') || b.textContent?.includes('Задать вопрос') || b.textContent?.includes('Чат'));
    if (chatBtn) chatBtn.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'founder_chat.png') });
  console.log('Captured founder_chat.png');

  // 2. Founder - Dashboard
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const dashBtn = buttons.find(b => b.textContent?.includes('Мой Стартап') || b.textContent?.includes('Дашборд'));
    if (dashBtn) dashBtn.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'founder_dashboard.png') });
  console.log('Captured founder_dashboard.png');

  // 3. Founder - Knowledge Base
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const kbBtn = buttons.find(b => b.textContent?.includes('База знаний'));
    if (kbBtn) kbBtn.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'founder_knowledge.png') });
  console.log('Captured founder_knowledge.png');

  // 4. Switch to Expert Role -> Expert Tickets Inbox
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const roleBtn = buttons.find(b => b.textContent?.includes('Эксперт') || b.textContent?.includes('Эксперт Фонда'));
    if (roleBtn) roleBtn.click();
  });
  await delay(1000);

  // Navigate to Expert Tickets
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const ticketBtn = buttons.find(b => b.textContent?.includes('Обращения') || b.textContent?.includes('Заявки'));
    if (ticketBtn) ticketBtn.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'expert_tickets.png') });
  console.log('Captured expert_tickets.png');

  // 5. Expert / Admin - RAG Simulator & Operator Panel
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const adminBtn = buttons.find(b => b.textContent?.includes('Панель управления') || b.textContent?.includes('RAG'));
    if (adminBtn) adminBtn.click();
  });
  await delay(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'expert_admin_rag.png') });
  console.log('Captured expert_admin_rag.png');

  await browser.close();
  console.log('All real app screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
