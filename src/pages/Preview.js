import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Button, Container, Box } from '@mui/material';
import { Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';

const Preview = () => {
  const { resumeData, activeTemplate } = useContext(AppContext);
  const resumeRef = useRef();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const downloadPDF = () => {
    setIsGeneratingPDF(true);
    const input = resumeRef.current;

    const scale = 2;

    html2canvas(input, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      logging: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
      setIsGeneratingPDF(false);
    }).catch(err => {
      console.error('Error generating PDF:', err);
      setIsGeneratingPDF(false);
    });
  };

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'template1':
        return <Template1 ref={resumeRef} />;
      case 'template2':
        return <Template2 ref={resumeRef} />;
      case 'template3':
        return <Template3 ref={resumeRef} />;
      default:
        return <Template1 ref={resumeRef} />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
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
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          transform: 'scale(0.8)', 
          transformOrigin: 'top center' 
        }}>
          {renderTemplate()}
        </Box>
      </Box>
    </Container>
  );
};

export default Preview;
