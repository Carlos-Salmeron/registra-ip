import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generarCertificado = async (obra) => {
  const doc = new jsPDF('landscape');
  
  try {
    // 1. Generar el código QR con el folio
    const qrDataUrl = await QRCode.toDataURL(obra.folioFinal);
    
    // 2. Título principal (Jerarquía visual 1: grande)
    doc.setFontSize(28);
    doc.text("Certificado de Registro de Autoría", 148, 40, { align: "center" });
    
    // 3. Datos de la obra (Jerarquía visual 2: mediana)
    doc.setFontSize(16);
    doc.text(`Obra: ${obra.titulo}`, 148, 70, { align: "center" });
    doc.text(`Autor: ${obra.autor}`, 148, 85, { align: "center" });
    
    // 4. Detalles (Jerarquía visual 3: pequeña)
    doc.setFontSize(12);
    const fechaHoy = new Date().toLocaleDateString();
    doc.text(`Fecha de registro: ${fechaHoy}`, 148, 105, { align: "center" });
    doc.text(`Folio: ${obra.folioFinal}`, 148, 115, { align: "center" });
    
    
    doc.setFontSize(14);
    doc.text("Registrado por: Salmerón Reyes Carlos Isaí", 148, 135, { align: "center" });
    
    // 6. Insertar el código QR
    doc.addImage(qrDataUrl, 'PNG', 123, 150, 50, 50);
    
    // 7. Descargar el archivo PDF
    doc.save(`certificado-${obra.folioFinal}.pdf`);
    
  } catch (error) {
    console.error("Error al generar el certificado:", error);
    alert("Hubo un error al generar el PDF.");
  }
};