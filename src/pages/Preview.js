// Preview.js
import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Button, Container, Box } from '@mui/material';
import { Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import SectionReorderer from './SectionReorderer';

const Preview = () => {
  const { resumeData, activeTemplate } = useContext(AppContext);
  const resumeRef = useRef();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    const input = resumeRef.current;

    try {
      const canvas = await html2canvas(input, {
        useCORS: true,
        scale: 2, // Higher resolution
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'template1': return <Template1 ref={resumeRef} />;
      case 'template2': return <Template2 ref={resumeRef} />;
      case 'template3': return <Template3 ref={resumeRef} />;
      default: return <Template1 ref={resumeRef} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box sx={{ my: 4 }}>
        <SectionReorderer />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {renderTemplate()}
        </Box>
      </Box>
    </Container>
  );
};

export default Preview;
