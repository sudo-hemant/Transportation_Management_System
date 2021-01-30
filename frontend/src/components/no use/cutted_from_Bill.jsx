// function CreatePDFfromHTML() {
//     var HTML_Width = $("#invoice").width();
//     var HTML_Height = $("#invoice").height();
//     var top_left_margin = 15;
//     var PDF_Width = HTML_Width + (top_left_margin * 2);
//     var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
//     var canvas_image_width = HTML_Width;
//     var canvas_image_height = HTML_Height;

//     var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

//     html2canvas($("#invoice")[0]).then(function (canvas) {
//         var imgData = canvas.toDataURL("image/jpeg", 1.0);
//         var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
//         pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
//         for (var i = 1; i <= totalPDFPages; i++) { 
//             pdf.addPage(PDF_Width, PDF_Height);
//             pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
//         }
//         pdf.save("Your_PDF_Name.pdf");
//         $("#invoice").hide();
//     });
// }





// const createPdf = () => {
//     var table = document.getElementById('invoice').innerHTML

//     var style = "<style>"
//     style = style + "#invoice {width: 21cm; height: 29.7cm; border-style: solid; margin: 0 auto; }"
//     style = style + "#main-header { display: flex; height: 2.6cm; }"
//     style = style + "#img { width: 4cm; height: 2.5cm; }"
//     style = style + "#company-name { margin: auto auto; font-size: 2.5rem; font-weight: bold }"
//     style = style + "#address { display: flex; justify-content: center; padding: .4rem; }"
//     style = style + "#gst-pan-no { height: .6cm; display: flex; justify-content: space-between; padding: .2rem 0; }"
//     style = style + "#gst-no { padding-left: .5rem;}"
//     style = style + "#tax-invoice { padding-right: 2rem;}"
//     style = style + "#pan-no {padding-right: .7rem;}"
//     style = style + "#invoice-details { display: flex; justify-content: space-between; padding: .3rem 0; }"
//     style = style + "#customer-details { padding-left: .5rem; }"
//     style = style + "#invoice-period { padding-right: 1rem; white-space: pre; }"
//     style = style + "#declaration { display: flex; justify-content: center; padding: .6rem; font-size: .8rem; font-weight: bold; }"
//     style = style + ".bill-table { border-collapse: collapse; width: 100%; text-align: center; }"
//     style = style + ".bill-table th, td{ padding: .25rem 0;}"
//     style = style + "#terms-conditions { width: 74%; border-right: solid;}"
//     style = style + "#terms-conditions p { padding: .2rem 0; }"
//     style = style + "#terms-conditions-header { display: flex; justify-content: center; }"
//     style = style + "#font { font-size: .8rem;}"
//     style = style + "#footer { display: flex;justify-content: space-between; padding-left: .2rem; }"
//     style = style + "#bank-details { display: flex; justify-content: center; }"
//     style = style + "#bank-details-table td { padding: 0 .5rem; }"
//     style = style + ".new-amount-table { border-collapse: collapse; width: 100%; text-align: center; border-top: none; }"
//     style = style + ".new-amount-table tr { font-size: 14px; padding: 1rem; }"
//     style = style + "#total { width: 26%; }"
//     style = style + "#for-company { font-size: 13px; }"
//     style = style + "#authorized-signatory { padding-top: 90px; }"
//     style = style + "</style>"

//     var win = window.open('', '', 'height=700, width=700')

//     win.document.write('<html><head>');
//     win.document.write('<title>Bill</title>');   // <title> FOR PDF HEADER.
//     win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
//     win.document.write('</head>');
//     win.document.write('<body>');
//     win.document.write(table);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
//     win.document.write('</body></html>');
//     win.document.close(); 	// CLOSE THE CURRENT WINDOW.
//     win.print()
// }