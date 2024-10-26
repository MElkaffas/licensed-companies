// رابط JSON لورقة العمل
const sheetURL = 'https://docs.google.com/spreadsheets/d/14y9Z_-OmOtVxV38jFV4r7JgtdPnhFjsYx9AqiP7OgGw/edit?usp=sharing';

// تحميل البيانات
async function loadCompaniesData() {
  try {
    const response = await fetch(sheetURL);
    const data = await response.json();
    const rows = data.feed.entry;
    populateTable(rows);
  } catch (error) {
    console.error('حدث خطأ أثناء تحميل البيانات:', error);
  }
}

// ملء الجدول بالبيانات
function populateTable(rows) {
  const tableBody = document.getElementById('companies-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';  // تفريغ المحتوى الحالي

  rows.forEach(row => {
    const newRow = document.createElement('tr');
    const serialCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const startDateCell = document.createElement('td');
    const endDateCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const websiteCell = document.createElement('td');
    
    // استخراج البيانات حسب الأسماء المخصصة من Google Sheets
    serialCell.textContent = row['gsx$مسلسل'].$t;
    nameCell.textContent = row['gsx$اسمالشركة'].$t;
    startDateCell.textContent = row['gsx$بدايةالترخيص'].$t;
    endDateCell.textContent = row['gsx$نهايةالترخيص'].$t;
    emailCell.textContent = row['gsx$الايميل'].$t;

    // إنشاء رابط لموقع الشركة
    const websiteLink = document.createElement('a');
    websiteLink.href = row['gsx$الموقعالخاصبالشركة'].$t;
    websiteLink.textContent = row['gsx$الموقعالخاصبالشركة'].$t;
    websiteLink.target = "_blank"; // يفتح الرابط في تبويب
