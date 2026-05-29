import { google } from 'googleapis';

export function isGoogleSheetsConfigured() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

export async function appendOrderToGoogleSheets(order: any) {
  if (!isGoogleSheetsConfigured()) return { skipped: true };
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: 'Orders!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[order.orderNumber, order.status, order.customer.email, Number(order.total), new Date().toISOString()]] }
  });
  return { skipped: false };
}
