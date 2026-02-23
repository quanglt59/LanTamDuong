/**
 * Google Apps Script Code cho Form Handler
 * 
 * Hướng dẫn:
 * 1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/1jRMI1Vt5auwqRKKlazhJ2d_QSv6mZFvW6QOMqLClRTg/edit
 * 2. Click Extensions → Apps Script
 * 3. Xóa code mặc định
 * 4. Copy toàn bộ code này và paste vào
 * 5. Click Save (💾)
 * 6. Click Deploy → New deployment
 * 7. Chọn Web app, set "Who has access" = "Anyone"
 * 8. Click Deploy
 */

// ID của Google Sheet (lấy từ URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit)
const SPREADSHEET_ID = '1jRMI1Vt5auwqRKKlazhJ2d_QSv6mZFvW6QOMqLClRTg';

// Hàm lấy sheet
function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getActiveSheet();
}

// Hàm xử lý POST request từ form
function doPost(e) {
  try {
    // Parse JSON data từ request body
    const data = JSON.parse(e.postData.contents);
    
    // Lấy sheet
    const sheet = getSheet();
    
    // Chuẩn bị dữ liệu để ghi vào sheet
    // Thứ tự cột: Thời gian | Họ tên | SĐT | Email | Địa chỉ | Loại giỏ quà | Số lượng | Ghi chú | Giỏ quà tùy chỉnh | Tổng tiền
    const row = [
      new Date(), // Thời gian (cột A)
      data.name || '', // Họ và tên (cột B)
      data.phone || '', // Số điện thoại (cột C)
      data.email || '', // Email (cột D)
      data.address || '', // Địa chỉ (cột E)
      data.product || '', // Loại giỏ quà (cột F)
      data.quantity || '1', // Số lượng (cột G)
      data.message || '', // Ghi chú (cột H)
      data.customBasketItems ? JSON.stringify(data.customBasketItems) : '', // Giỏ quà tùy chỉnh - JSON (cột I)
      data.totalAmount || '' // Tổng tiền (cột J)
    ];
    
    // Ghi vào sheet (append row)
    sheet.appendRow(row);
    
    // Trả về success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Đơn hàng đã được lưu thành công'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error để debug
    console.error('Error in doPost:', error);
    
    // Trả về error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Có lỗi xảy ra khi lưu đơn hàng'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm xử lý GET request (optional - để test)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'OK',
      message: 'Google Apps Script is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Hàm test (optional - để test trong Apps Script editor)
function test() {
  try {
    const testData = {
      name: "Nguyễn Văn Test",
      phone: "0901234567",
      email: "test@example.com",
      address: "123 Đường Test, Quận 1, TP.HCM",
      product: "premium",
      quantity: "2",
      message: "Giao hàng vào buổi sáng",
      customBasketItems: null,
      totalAmount: null
    };
    
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };
    
    Logger.log('Bắt đầu test...');
    Logger.log('Test data:', JSON.stringify(testData, null, 2));
    
    // Gọi doPost
    const result = doPost(mockEvent);
    const responseContent = result.getContent();
    
    Logger.log('Kết quả:', responseContent);
    
    // Parse response để kiểm tra
    const response = JSON.parse(responseContent);
    if (response.success) {
      Logger.log('✅ Test thành công! Đã ghi vào sheet.');
    } else {
      Logger.log('❌ Test thất bại:', response.error);
    }
    
    // Kiểm tra sheet
    const sheet = getSheet();
    const lastRow = sheet.getLastRow();
    Logger.log('Số dòng trong sheet:', lastRow);
    
    if (lastRow > 1) {
      const lastRowData = sheet.getRange(lastRow, 1, 1, 10).getValues()[0];
      Logger.log('Dữ liệu dòng cuối:', lastRowData);
    }
    
    return response;
    
  } catch (error) {
    Logger.log('❌ Lỗi khi test:', error.toString());
    Logger.log('Stack trace:', error.stack);
    throw error;
  }
}
