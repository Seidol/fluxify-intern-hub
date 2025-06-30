
// Payment module
class Payment {
    static init() {
        router.addRoute('payment', Payment.render);
    }

    static render() {
        if (!state.get('isLoggedIn')) {
            router.navigate('login');
            return;
        }

        const paymentPage = document.getElementById('paymentPage');
        const hasPaid = state.get('hasPaid');
        
        paymentPage.innerHTML = `
            ${Sidebar.render()}
            
            <div class="main-content">
                <!-- Header -->
                <header class="bg-white border-bottom shadow-sm px-4 py-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <button class="btn sidebar-toggle d-lg-none me-3" onclick="Sidebar.toggle()">
                                <i class="fas fa-bars"></i>
                            </button>
                            <div>
                                <h4 class="mb-0">Payment Center</h4>
                                <small class="text-muted">Manage your internship program payment</small>
                            </div>
                        </div>
                        
                        <span class="badge ${hasPaid ? 'bg-success' : 'bg-warning'} p-2">
                            <i class="fas fa-${hasPaid ? 'check-circle' : 'exclamation-triangle'} me-1"></i>
                            ${hasPaid ? 'Payment Verified' : 'Payment Pending'}
                        </span>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="p-4">
                    ${Payment.renderPaymentSummary()}
                    ${!hasPaid ? Payment.renderPaymentPending() : ''}
                    ${Payment.renderPaymentMethods()}
                    ${Payment.renderHelpSection()}
                </main>
            </div>
        `;
    }

    static renderPaymentSummary() {
        return `
            <div class="card border-0 shadow mb-4" style="border-left: 4px solid var(--fluxify-purple) !important;">
                <div class="card-header bg-transparent border-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="card-title mb-1">
                                <i class="fas fa-credit-card me-2"></i>Payment Summary
                            </h5>
                            <p class="card-text text-muted mb-0">Fluxify Internship Program Fee</p>
                        </div>
                        <div class="text-end">
                            <div class="h3 fw-bold mb-0" style="color: var(--fluxify-purple);">30,000 RWF</div>
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt me-1"></i>Due: January 10, 2024
                            </small>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="rounded-3 p-4" style="background: rgba(106, 27, 154, 0.05);">
                        <h6 class="fw-semibold mb-3" style="color: var(--fluxify-purple);">What's Included:</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="list-unstyled mb-0">
                                    <li class="mb-1"><i class="fas fa-check text-success me-2"></i>8-week structured internship program</li>
                                    <li class="mb-1"><i class="fas fa-check text-success me-2"></i>Weekly mentorship sessions</li>
                                    <li class="mb-1"><i class="fas fa-check text-success me-2"></i>Hands-on project assignments</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="list-unstyled mb-0">
                                    <li class="mb-1"><i class="fas fa-check text-success me-2"></i>Certificate upon completion</li>
                                    <li class="mb-1"><i class="fas fa-check text-success me-2"></i>Career guidance and support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderPaymentPending() {
        return `
            <div class="card payment-warning border-0 shadow mb-4">
                <div class="card-body">
                    <div class="d-flex align-items-start">
                        <i class="fas fa-exclamation-triangle text-warning fa-2x me-3 mt-1"></i>
                        <div class="flex-grow-1">
                            <h5 class="text-warning mb-2">Payment Required</h5>
                            <p class="mb-3">
                                Your payment is currently pending. Please complete the payment using one of the methods below, 
                                then click "I Have Paid" to notify our team for verification.
                            </p>
                            <button class="btn btn-success" onclick="Payment.claimPayment()">
                                <i class="fas fa-check-circle me-2"></i>I Have Paid
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderPaymentMethods() {
        const methods = [
            {
                type: "MTN Mobile Money",
                icon: "fas fa-mobile-alt",
                details: {
                    number: "+250 788 123 456",
                    name: "Fluxify Ltd"
                },
                instructions: [
                    "Dial *182*7*1#",
                    "Enter the phone number: +250 788 123 456",
                    "Enter amount: 30000",
                    "Confirm transaction with your PIN",
                    "Save the transaction ID"
                ]
            },
            {
                type: "Bank Transfer",
                icon: "fas fa-university",
                details: {
                    accountName: "Fluxify Ltd",
                    accountNumber: "000123456789",
                    bank: "Bank of Kigali",
                    swift: "BKRWRWRW"
                },
                instructions: [
                    "Visit your bank or use mobile banking",
                    "Transfer to account: 000123456789",
                    "Bank: Bank of Kigali",
                    "Amount: 30,000 RWF",
                    "Reference: Your Full Name + Internship Fee"
                ]
            }
        ];

        return `
            <div class="row g-4 mb-4">
                ${methods.map(method => `
                    <div class="col-lg-6">
                        <div class="card border-0 shadow h-100">
                            <div class="card-header bg-transparent border-0">
                                <h5 class="card-title mb-1">
                                    <i class="${method.icon} me-2"></i>${method.type}
                                </h5>
                                <p class="card-text text-muted mb-0">Pay securely using ${method.type.toLowerCase()}</p>
                            </div>
                            <div class="card-body">
                                <!-- Payment Details -->
                                <div class="bg-light rounded-3 p-3 mb-4">
                                    ${method.type === "MTN Mobile Money" ? `
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <span class="text-muted">Phone Number:</span>
                                            <div class="d-flex align-items-center">
                                                <code class="bg-white px-2 py-1 rounded me-2">${method.details.number}</code>
                                                <button class="btn btn-sm btn-outline-secondary" onclick="Utils.copyToClipboard('${method.details.number}', 'Phone number')">
                                                    <i class="fas fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <span class="text-muted">Account Name:</span>
                                            <span class="fw-medium">${method.details.name}</span>
                                        </div>
                                    ` : `
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <span class="text-muted">Account Name:</span>
                                            <span class="fw-medium">${method.details.accountName}</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <span class="text-muted">Account Number:</span>
                                            <div class="d-flex align-items-center">
                                                <code class="bg-white px-2 py-1 rounded me-2">${method.details.accountNumber}</code>
                                                <button class="btn btn-sm btn-outline-secondary" onclick="Utils.copyToClipboard('${method.details.accountNumber}', 'Account number')">
                                                    <i class="fas fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <span class="text-muted">Bank:</span>
                                            <span class="fw-medium">${method.details.bank}</span>
                                        </div>
                                    `}
                                </div>

                                <!-- Instructions -->
                                <div>
                                    <h6 class="fw-semibold mb-3">Payment Instructions:</h6>
                                    <ol class="list-group list-group-numbered">
                                        ${method.instructions.map(instruction => `
                                            <li class="list-group-item border-0 px-0">${instruction}</li>
                                        `).join('')}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    static renderHelpSection() {
        return `
            <div class="card border-0 shadow">
                <div class="card-header bg-transparent border-0">
                    <h5 class="card-title mb-1">
                        <i class="fas fa-envelope me-2"></i>Need Help?
                    </h5>
                </div>
                <div class="card-body">
                    <p class="card-text mb-4">
                        If you encounter any issues with your payment or need assistance, please don't hesitate to contact us.
                    </p>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-envelope text-muted me-3"></i>
                                <div>
                                    <div class="fw-medium">Email</div>
                                    <a href="mailto:info@fluxify.com" class="text-decoration-none">info@fluxify.com</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-phone text-muted me-3"></i>
                                <div>
                                    <div class="fw-medium">Phone</div>
                                    <a href="tel:+250788123456" class="text-decoration-none">+250 788 123 456</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static claimPayment() {
        Utils.showToast('Payment verification request sent! We\'ll review and confirm within 24 hours.');
        
        // Simulate email being sent
        console.log('Payment claim email sent for verification');
        
        // For demo purposes, mark as paid after 3 seconds
        setTimeout(() => {
            state.set('hasPaid', true);
            Utils.showToast('Payment verified! You now have access to all features.', 'success');
            router.navigate('dashboard');
        }, 3000);
    }
}
