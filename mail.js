// 1. Initialize EmailJS with your Public Key
// Find this at: https://dashboard.emailjs.com/admin/account
(function () {
    emailjs.init("dfx1ODekB4xKlgsYf");
})();

// 2. The helper function must be defined outside or before it's called
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

async function submitWizardForm() {
    const btn = document.querySelector('.form-submit');

    // Basic Validation: Ensure files are selected before processing
    const idInput = document.getElementById('docId');
    const payslipInput = document.getElementById('docPayslip');
    const resInput = document.getElementById('docResidence');

    if (!idInput.files[0] || !payslipInput.files[0] || !resInput.files[0]) {
        alert("Please upload all required documents.");
        return;
    }

    btn.innerText = "Processing Files...";
    btn.disabled = true;

    try {
        // Helper to check if file exists and convert
        const getFile = async (id) => {
            const input = document.getElementById(id);
            const file = input.files[0];
            return file ? await toBase64(file) : null;
        };

        const templateParams = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            idNumber: document.getElementById('idNumber').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            employer: document.getElementById('employer').value,
            loanAmountReq: document.getElementById('loanAmountReq').value,
            loanTenureReq: document.getElementById('loanTenureReq').value,
            bankName: document.getElementById('bankName').value,
            accountNumber: document.getElementById('accountNumber').value,

            // Attachments (Ensure these match your EmailJS Template placeholders)
            docId_base64: await getFile('docId'),
            docPayslip_base64: await getFile('docPayslip'),
            docResidence_base64: await getFile('docResidence')
        };

        // Sending via EmailJS
        await emailjs.send("service_8nbxt07", "template_gcbl3gg", templateParams);

        alert("Success! Your loan application has been submitted.");
        window.location.reload();

    } catch (error) {
        console.error("Submission Error:", error);
        // Using JSON.stringify(error) helps debug specific EmailJS errors in the alert
        alert("Error sending application: " + (error.text || "Check file sizes or keys."));
        btn.innerText = "Submit Application →";
        btn.disabled = false;
    }
}