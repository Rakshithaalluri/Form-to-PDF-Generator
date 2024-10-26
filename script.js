document.getElementById('educationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        highestDegree: document.getElementById('highestDegree').value,
        university: document.getElementById('university').value,
        graduationYear: document.getElementById('graduationYear').value,
        major: document.getElementById('major').value,
        currentPosition: document.getElementById('currentPosition').value,
        yearsExperience: document.getElementById('yearsExperience').value,
        skills: document.getElementById('skills').value
    };

    try {
        // Create PDF
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        
        const text = `
            EDUCATION AND PROFESSIONAL BACKGROUND
            
            Personal Information:
            Full Name: ${formData.fullName}
            Email: ${formData.email}
            Phone: ${formData.phone}
            
            Educational Background:
            Highest Degree: ${formData.highestDegree}
            Institution: ${formData.university}
            Graduation Year: ${formData.graduationYear}
            Field of Study: ${formData.major}
            
            Professional Experience:
            Current Position: ${formData.currentPosition}
            Years of Experience: ${formData.yearsExperience}
            
            Key Skills:
            ${formData.skills}
        `;

        page.drawText(text, {
            x: 50,
            y: height - 50,
            size: 12,
            maxWidth: width - 100,
        });

        // Save and download PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'education_background.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
});
