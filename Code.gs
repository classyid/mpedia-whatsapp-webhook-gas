function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  logToSpreadsheet(data);
  
  // Log incoming data untuk debugging
  Logger.log("Incoming data: " + JSON.stringify(data));
  
  var message = data.message ? data.message.toLowerCase() : '';
  var from = data.from ? data.from.toLowerCase() : '';
  var bufferImage = data.bufferImage || null;
  var response = null;
  
  // Log parsed message dan from untuk debugging
  Logger.log("Parsed message: " + message);
  Logger.log("From: " + from);
  
  if (message === '.hi') {
    response = formatText('Hello, how are you ' + from + '?', true);
  } else if (message === '.media') {
    response = formatExampleMedia(true);
  } else if (message === '.button') {
    response = formatExampleButton(true);
  } else if (message === '.template') {
    response = formatExampleTemplate(true);
  } else if (message === '.list') {
    response = formatExampleList(true);
  }
  
  if (bufferImage) {
    saveImageToDrive(bufferImage);
  }
  
  // Log response untuk debugging
  Logger.log("Response: " + JSON.stringify(response));
  
  if (response) {
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Jika tidak ada respons, kembalikan status 200 tanpa konten
  return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
}

function logToSpreadsheet(data) {
  var ss = SpreadsheetApp.openById('<ID-SPREADSHEET>');
  var sheet = ss.getSheetByName('whatsapp_log');
  sheet.appendRow([new Date(), JSON.stringify(data)]);
}

function saveImageToDrive(bufferImage) {
  var folder = DriveApp.getFolderById('<ID-FOLDER-DRIVE>');
  var blob = Utilities.newBlob(Utilities.base64Decode(bufferImage), 'image/png', 'image.png');
  folder.createFile(blob);
}

function formatText(text, quoted = false) {
  return { text: text, quoted: quoted };
}

function formatExampleMedia(quoted = false) {
  return {
    url: 'https://png.pngtree.com/element_our/md/20180626/md_5b321c99945a2.jpg',
    type: 'image',
    caption: 'this is media for you',
    filename: 'image.jpg',
    quoted: quoted,
  };
}

function formatExampleButton(quoted = false) {
  var buttons = [
    {
      buttonId: 'id1',
      buttonText: { displayText: 'Button 1' },
      type: 1,
    },
    {
      buttonId: 'id2',
      buttonText: { displayText: 'Button 2' },
      type: 1,
    },
    {
      buttonId: 'id3',
      buttonText: { displayText: 'Button 3' },
      type: 1,
    },
  ];
  
  return {
    text: 'text',
    footer: 'footer',
    headerType: 1,
    viewOnce: true,
    buttons: buttons,
    quoted: quoted,
  };
}

function formatExampleTemplate(quoted = false) {
  var templateButtons = [
    {
      index: 1,
      urlButton: {
        displayText: 'Visit our website',
        url: 'https://www.example.com',
      },
    },
    {
      index: 2,
      callButton: {
        displayText: 'Call us now',
        phoneNumber: '+1234567890',
      },
    },
  ];
  
  return {
    text: 'text',
    footer: 'footer',
    templateButtons: templateButtons,
    viewOnce: true,
    quoted: quoted,
  };
}

function formatExampleList(quoted = false) {
  var sections = [
    {
      title: 'Menu List',
      rows: [
        {
          title: 'List Item 1',
          rowId: 'id2',
          description: '',
        },
        {
          title: 'List Item 2',
          rowId: 'id3',
          description: '',
        },
      ],
    },
    {
      title: 'Menu List 2',
      rows: [
        {
          title: 'List Item 1',
          rowId: 'id2',
          description: '',
        },
        {
          title: 'List Item 2',
          rowId: 'id3',
          description: '',
        },
      ],
    },
  ];
  
  return {
    text: 'text',
    footer: 'footer',
    title: 'name of list',
    viewOnce: true,
    buttonText: 'button of list',
    sections: sections,
  };
}
