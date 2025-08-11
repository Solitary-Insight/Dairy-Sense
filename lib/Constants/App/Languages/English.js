
export const ENGLISH_TEXTS = {
    meta: {
        label: "English",
        class: 'english',
        dir: "ltr",
        locale: "en-US"
    },
    global: {
        messages: {
            invalid_user: {
                title: "Access Denied",
                description: "Looks like you are not properly logged in. Please consider logging in first.",
                action_button_label: "Login my account"
            },
            otp_unverified: {
                title: "Access Denied",
                description: "You have not verified your account still. Please verify your account first.",
                action_button_label: "Verify OTP"
            },
            nothing_found: {
                title: "Nothing found",
                description: "looks like there nothing to display on this page. Please validate your address or try again",
                action_button_label: "Back"
            },
        }
        , texts: {
            cattle_count: {
                "1-50": '1-50 cattle',
                "51-100": '51-100 cattle',
                "101-200": '101-200 cattle',
                "201-500": '201-500 cattle',
                "500+": '500+ cattle',
            },
            farm_types: {
                "dairy": "Dairy Farm",
                "mixed": "Mixed Farm",
                "organic": "Organic Farm",
                "commercial": "Commercial Farm"
            }, system_types: {
                "manual": "Manual/Paper-based",
                "basic-software": "Basic Farm Software",
                "spreadsheets": "Excel/Spreadsheets",
                "other-platform": "Other Digital Platform",
                "none": "No System Currently",
            },
            time_slots: {
                morning: "Morning (9 AM - 12 PM)",
                afternoon: "Afternoon (12 PM - 5 PM)",
                evening: "Evening (5 PM - 8 PM)",
            },
            features_required: {
                cattleHealthMonitoring: "Cattle Health Monitoring",
                milkProductionTracking: "Milk Production Tracking",
                smartCollarTechnology: "Smart Collar Technology",
                financeManagement: "Financial Management",
                hrAndPayrol: "HR & Payroll",
                marketPlaceIntegration: "Marketplace Integration",
                feedManagement: "Feed Management",
                breedingRecords: "Breeding Records",
            },

        },
        // Example in LANG_STRINGS.en.global.texts.features
        features: {
            lifecycle: {
                title: "Cattle Lifecycle Management",
                description: "Complete animal profiles with breed info, medical history, calving records, and real-time health monitoring via smart collars.",
            },
            behavior: {
                title: "Smart Behavior Monitoring",
                description: "IMU sensors track eating, walking, resting, grazing patterns. Predict estrus periods and detect health anomalies early.",
            },
            milk: {
                title: "Milk Production & Feed Management",
                description: "Track daily yield per animal, monitor feed consumption, and optimize nutrition with detailed analytics.",
            },
            marketplace: {
                title: "Integrated Marketplace",
                description: "Buy and sell farm products, medicines, feed, and equipment. Connect with suppliers and customers directly through our platform.",
            },
            hr: {
                title: "HR & Payroll Management",
                description: "Manage employee attendance, assign tasks, track performance, and handle payroll seamlessly.",
            },
            dealership: {
                title: "Dealership & Supply Chain",
                description: "Integrated network for medicines, feed, and tools. Streamline procurement and inventory management.",
            },
            finance: {
                title: "Financial Dashboard",
                description: "Comprehensive income vs expense reports, profitability insights, and accurate forecasting tools.",
            },
            geo: {
                title: "Geo-Location Tracking",
                description: "Monitor cattle location and movement patterns with GPS-enabled smart collars for enhanced security.",
            },
        },
        configuration_steps: {
            addFarm: {
                step: "Step 1",
                title: "Add Your Farm",
                description: "Register your farm details, add cattle profiles, and set up your account in minutes.",
            },
            connectDevices: {
                step: "Step 2",
                title: "Connect Devices",
                description: "Install smart collars on your cattle and connect to our monitoring system.",
            },
            insights: {
                step: "Step 3",
                title: "Get Real-Time Insights",
                description: "Access comprehensive analytics, alerts, and recommendations on your dashboard.",
            },
        },
        setup_steps: {
            FARM_DETAIL_ADDED: {
                title: "Farm Information Added",
                desc: "Your farm is not registered fully yet. Please complete farm registration.",
            },
            ACCOUNT_CREATED: {
                title: "Account Created",
                desc: "Your farm account has been successfully created",
            },
            TEAM_ASSIGNED: {
                title: "Team Assignment",
                desc: "Technical team assigned to your location",
            },
            SITE_VISIT_SCHEDULED: {
                title: "Site Visit Scheduled",
                desc: "Our team will contact you within 24-48 hours",
            },
            SYSTEM_INSTALLATION: {
                title: "System Installation",
                desc: "Smart collars and sensors installation",
            },
            CONFIGURATION_TESTING: {
                title: "Configuration & Testing",
                desc: "System setup and initial testing",
            },
            TRAINING_HANDOVER: {
                title: "Training & Handover",
                desc: "Staff training and system handover",
            },
        },


    },

    nav: {
        home: "Home",
        features: "Features",
        request_demo: "Request Demo",
        pricing: "Pricing",
        contact: "Contact",
        login: "Login",
        register_farm: "Register Farm",
        name: "Dairy Sense"
    },
    hero: {
        badge: "🌿 Empowering Smart Dairy Farming",
        heading: {
            pre: "Revolutionizing Dairy Farming with",
            highlight: "Smart Intelligence"
        },
        description:
            "From animal health to milk production — manage everything in one place. DairySense blends technology, animal welfare, and operational efficiency for the modern dairy farm.",
        cta_primary: "Start Free Trial",
        cta_secondary: "Watch Demo",
        trust: ["ISO Certified", "Vet Approved", "Secure & Private"],
        image_alt:
            "Smart dairy farm with sensor-equipped cows in lush green pasture",
        live_monitoring: "Live Monitoring",
        status_title: "Farm Status",
        status_value: "All Systems Healthy"
    },
    features: {
        title: "Complete Farm Management Suite",
        subtitle: "Everything you need to run a modern, efficient dairy farm.",
    },
    technology: {
        badge: "🔬 Advanced Sensor Technology",
        title: "Smart Collar System",
        imu_active: "IMU Active",
        gpa_signal: "GPS Signal",
        temp: "22°C",
        description:
            "Our revolutionary neck-collar combines multiple sensors to provide comprehensive monitoring of your cattle's health, behavior, and location in real-time.",
        features: [
            {
                title: "IMU Sensors",
                description:
                    "Advanced motion detection for activity classification and behavior analysis",
            },
            {
                title: "GPS Tracking",
                description:
                    "Real-time location monitoring and movement pattern analysis",
            },
            {
                title: "Environmental Monitoring",
                description:
                    "Temperature and humidity sensors for optimal animal comfort",
            },
            {
                title: "Anomaly Detection",
                description:
                    "AI-powered alerts for health issues and behavioral changes",
            },
        ],
        key_capablities: "Key Capabilites",
        capabilities: [
            "Activity classification: eating, walking, resting, grazing, standing",
            "Estrus (heating) period prediction with 95% accuracy",
            "Early health anomaly detection and alerts",
            "Environmental comfort monitoring",
        ],
    },
    how_it_works: {
        title: "How DairySense Works",
        subtitle: "Get started with DairySense in three simple steps and transform your dairy farm management today.",
        cta_title: "Ready to Get Started?",
        cta_description: "Join thousands of dairy farmers who are already using DairySense to optimize their operations.",
        cta_primary: "Start Free Trial",
        cta_secondary: "Schedule Demo",
    },

    testimonials: {
        title: "Trusted by Dairy Farmers Worldwide",
        subtitle: "See what our customers are saying about their experience with DairySense.",
        stats: [
            {
                value: "10,000+",
                label: "Active Cattle"
            },
            {
                value: "500+",
                label: "Dairy Farms"
            },
            {
                value: "95%",
                label: "Health Accuracy"
            },
            {
                value: "24/7",
                label: "Monitoring"
            }
        ],
        list:

            [
                {
                    name: "Ahmed Hassan",
                    role: "Dairy Farm Owner",
                    location: "Punjab, Pakistan",
                    image: "/placeholder.svg?height=80&width=80",
                    rating: 5,
                    quote:
                        "DairySense has revolutionized how I manage my 200-head dairy farm. The early health detection saved me thousands in veterinary costs.",
                },
                {
                    name: "Dr. Sarah Khan",
                    role: "Veterinarian",
                    location: "Lahore, Pakistan",
                    image: "/placeholder.svg?height=80&width=80",
                    rating: 3,
                    quote:
                        "The health monitoring capabilities are impressive. I can now provide better care to my clients' cattle with real-time data.",
                },
                {
                    name: "Muhammad Ali",
                    role: "Farm Manager",
                    location: "Karachi, Pakistan",
                    image: "/placeholder.svg?height=80&width=80",
                    rating: 3,
                    quote:
                        "The financial dashboard and milk production tracking have increased our farm's profitability by 30% in just 6 months.",
                },
            ],
    },
    pricing: {
        title: "Choose Your Plan",
        subtitle: "Flexible pricing options to fit farms of all sizes. Start with a free trial and upgrade as you grow.",
        plans: [
            {
                name: "Basic",
                price: "$49",
                period: "/month",
                description: "Perfect for small dairy farms",
                features: [
                    "Up to 50 cattle",
                    "Basic health monitoring",
                    "Milk production tracking",
                    "Mobile app access",
                    "Email support",
                ],
                cta: "Start Free Trial",
            },
            {
                name: "Pro",
                price: "$99",
                period: "/month",
                description: "Ideal for medium-sized operations",
                features: [
                    "Up to 200 cattle",
                    "Advanced health analytics",
                    "Behavior monitoring",
                    "HR & Payroll management",
                    "Financial dashboard",
                    "Priority support",
                    "API access",
                ],
                cta: "Start Free Trial",
                popularBadge: "Most Popular",
            },
            {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large dairy operations",
                features: [
                    "Unlimited cattle",
                    "Full sensor suite",
                    "Custom integrations",
                    "Dedicated account manager",
                    "On-site training",
                    "24/7 phone support",
                    "Custom reporting",
                ],
                cta: "Contact Sales",
            },
        ],
        additional: {
            trial_note: "All plans include a 30-day free trial. No credit card required.",
            benefits: [
                "✓ Cancel anytime",
                "✓ 99.9% uptime guarantee",
                "✓ Data export available",
                "✓ GDPR compliant"
            ]
        }
    },
    chat: {
        open_button_label: "Chat with us",
        initial_message: "Hi! I'm here to help you learn more about DairySense. How can I assist you today?",
        input_placeholder: "Type your message...",
    },

    footer: {
        company_name: "DairySense",
        tagline:
            "Empowering dairy farmers with intelligent technology for better animal welfare and operational efficiency.",
        planet_friendly: "🌱 Designed for Planet-Friendly Dairy Operations",

        quick_links: {
            title: "Quick Links",
            items: [
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "About Us", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Case Studies", href: "#" },
            ],
        },

        support: {
            title: "Support",
            items: [
                { label: "Help Center", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "Contact Support", href: "#" },
                { label: "System Status", href: "#" },
            ],
        },

        contact: {
            title: "Contact",
            email: "support@dairysense.com",
            phone: "+92 300 1234567",
            location: "Lahore, Pakistan",
        },

        bottom: {
            copyright: "© 2024 DairySense. All rights reserved.",
            links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
            ],
        },
    },

    login: {

        form: {
            login_heading: "Welcome Back",
            login_subheading: "Sign in to access your farm dashboard",
            login_form_heading: "Signin",
            login_email_label: 'Email Address',
            login_email_placeholder: 'Email Your Address',
            login_password_label: 'Password',
            login_password_placeholder: 'Enter Your Password',
            login_remeber_me_checkbox_label: "Remeber me",
            login_forget_password_label: "Forget password?",
            login_button_label: "Signin",
            login_no_accout_text: "Don't have an account?",
            login_no_accout_text_navigation: "Register your form",
            login_need_help_text: "Need help?",
            login_contact_support: "Contact Support",
            login_request_demo: "Request demo",



        }
    },
    register: {
        pageTitle: "Register Your Farm",
        pageSubtitle: "Join thousands of dairy farmers using DairySense to optimize their operations. Start your free trial today!",

        sectionTitles: {
            personalInfo: "Personal Information",
            farmInfo: "Farm Information",
            planSelection: "Choose Your Plan",
        },
        labels: {
            firstName: "First Name *",
            lastName: "Last Name *",
            email: "Email Address *",
            phone: "Phone Number *",
            password: "Password *",
            confirmPassword: "Confirm Password *",
            farmName: "Farm Name *",
            farmAddress: "Farm Address *",
            city: "City *",
            state: "State/Province *",
            postalCode: "Postal Code",
            cattleCount: "Number of Cattle *",
            farmSize: "Farm Size (acres)",
            farmType: "Farm Type *",
        },


        placeholders: {
            cattleRange: "Select range",
            farmType: "Select type",
        },
        plan_types: [
            {
                label: "Basic – Up to 50 cattle",
                value: "basic",
                price: "$49/month"
            },
            {
                label: "Pro – Up to 200 cattle",
                value: "pro",
                price: "$99/month",
                popular_label: "Popular"
            },
            {
                label: "Enterprise – Unlimited cattle",
                value: "enterprise",
                price: "Custom"
            }
        ],
        options: {
            requestDemo: "Request a personalized demo after registration",
            installmentInterest: "I'm interested in installment payment options",
        },
        legal: {
            agreeTerms: "I agree to the",
            terms: "Terms of Service",
            and: "and",
            privacy: "Privacy Policy",
            agreeMarketing: "I would like to receive updates about new features, tips, and special offers from DairySense",
        },
        buttons: {
            next: "Next Step",
            previous: "Previous",
            submit: "Create Account & Start Trial",
            submitting: "Creating Account...",
        },
        sidebar: {
            whyChoose: "Why Choose DairySense?",
            benefits: [
                "30-day free trial",
                "No setup fees",
                "24/7 customer support",
                "Cancel anytime",
                "Data export available",
            ],
            needHelp: "Need Help?",
            alreadyAccount: "Already have an account?",
            signIn: "Sign in here",
            askPlans: "Questions about our plans?",
            requestDemo: "Request a demo",
        },
        placeholders: {
            range_selection: "Select Range"
        }

    },
    setup: {
        configured: {
            title: "Setup Complete!",
            message: "Your DairySense system has been successfully configured and is ready to use.",
            button: "Access Your Dashboard",
        },
        pending: {
            complete_registration: "Complete Your Registration",
            heading: "Setup in Progress",
            subheading:
                "Thank you for registering! Our technical team will visit your farm soon to install and configure your DairySense system.",
            status_card: {
                title: "Installation Status",
                badge: "Pending",

                timeline: {
                    title: "Estimated Timeline",
                    siteVisit: "Site Visit: 1-2 business days",
                    installation: "Installation: 2-4 hours",
                },
                timer: {
                    label: "Registered on",
                },
            },
            sidebar: {
                support: {
                    title: "Need Assistance?",
                    callTitle: "Call Us",
                    call: "+92 300 1234567",
                    emailTitle: "Email Support",
                    email: "support@dairysense.com",
                    button: "Contact Support",
                },
                whatToExpect: {
                    title: "What to Expect",
                    items: [
                        "Our certified technicians will visit your farm",
                        "Smart collars will be fitted on your cattle",
                        "System configuration and testing",
                        "Complete training for you and your staff",
                        "24/7 ongoing support",
                    ],
                },
                preparationTips: {
                    title: "Preparation Tips",
                    tips: [
                        "• Ensure cattle are accessible for collar fitting",
                        "• Have your farm layout ready for sensor placement",
                        "• Prepare a list of your cattle with basic information",
                        "• Ensure stable internet connectivity",
                    ],
                },
            },
        },
    },
    normal_msg: {
        WAIT_REGISTRATION: {
            title: "Creating Account",
            message: "Your account is being created, please wait..."
        },
        ACCOUNT_CREATED: {
            title: "Account Created",
            message: "Your account has been created successfully."
        }
        , FARM_REGISTERED: {
            title: "Farm Registered",
            message: "Your farm details have been registered successfully."
        },
        LOGIN_SUCCESS: {
            title: "Login Successful",
            message: "You have successfully logged in. Welcome!"

        },

        LOGIN_WAITING_MESSAGE: {

            title: "Please Wait",
            message: "Your login request is being processed, please wait..."
        },

        FARM_REGISTRATION_WAITING_MESSAGE: {
            title: "Please Wait",
            message: "Processing your request, please wait..."
        },
        FARM_PLAN_INFO_WAITING_MESSAGE: {
            title: "Please Wait",
            message: "We are processing your farm plan information..."
        },

        FARM_PLAN_INFO_SUCCESS_MESSAGE: {
            title: "Success!",
            message: "Your farm plan information has been saved successfully."
        },

        DEMO_REQ_SUCCESS: {
            title: "Saved Successfully!",
            message: "Your demo request has been submitted and saved.",
        },
        DEMO_REQ_FAILED: {
            title: "Submission Failed",
            message: "We couldn’t save your demo request. Please try again later.",
        },

    },
    otp: {
        verification_title: "Verify Your Account",
        verification_subtitle: "Enter the 6-digit code sent to your email",
        enter_code_title: "Enter Verification Code",
        enter_code_note: "We've sent a verification code to your email address",
        code_expiry_prefix: "Code expires in",
        verifying: "Verifying...",
        verify_button: "Verify Code",
        no_code_received: "Didn't receive the code?",
        resend_code: "Resend Code",
        resend_in_prefix: "Resend in",
        security_note_title: "Security Notice",
        security_note_content: "This verification step ensures the security of your farm data and account.",
        otp_placeholder: "Enter OTP",
        otp_error_message: "Invalid OTP. Please try again.",
        otp_timeout_message: "OTP expired. Please request a new one.",
        otp_success_message: "OTP verified successfully.",
        requesting_otp: "Requesting new OTP...",
        navigating_to_dashboard: "Navigating to dashboard...",
        loading: "Loading...",
        input_label: "Enter 6-digit OTP",
        otp_msgs: {
            requesting: "Requesting OTP... Please wait.",
            verifying: "Verifying OTP... Please hold on.",
            resending: "Resending OTP... Just a moment.",
            checking_account: "Checking your account status...",
            finalizing: "Finalizing authentication...",
            200: "Thank you, your OTP has been verified. Please continue.",
            400: "Bad request. Please provide a valid OTP.",
            401: "Unauthorized. Please request a new OTP.",
            403: "Forbidden. You are not allowed to perform this action.",
            404: "OTP not found. Please request a new one.",
            409: "Invalid OTP. Please try again.",
            410: "OTP has expired. Please request a new one.",
            429: "Too many attempts. Please try again later.",
            504: "OTP verification timed out. Please try again."

        },
    }
    ,
    err_msg: {

        PLAN_TYPE_ERR: "Oops! You forgot to choose a plan. Please select one to continue.",
        REQUEST_DEMO_ERR: "Would you like a demo? Please confirm your choice.",
        INSTALLMENT_INTEREST_ERR: "Please let us know if you're okay with paying in installments.",
        AGREE_TERMS_ERR: "You need to agree to the terms and conditions before proceeding.",
        AGREE_MARKETING_ERR: "Please let us know if you're okay receiving helpful updates and offers.",




        INVALID_FARM_NAME: "Farm Name is invalid. Farm name must only contain letters, spaces, or hyphens, and be between 2 and 50 characters long.",
        INVALID_FARM_ADDRESS: "Please enter a valid farm address.",
        INVALID_CITY: "Please enter a valid city name.",
        INVALID_STATE: "Please enter a valid state or province name.",
        INVALID_POSTAL_CODE: "Postal code must be between 4 and 10 characters (letters, numbers, or hyphens).",
        INVALID_CATTLE_COUNT: "Please select cattle count range.",
        INVALID_FARM_SIZE: "Enter a valid farm size. Minimum size is 0.1 acres.",
        INVALID_FARM_TYPE: "Please select a  farm type.",
        INVALID_DATE_REQ: "Date field is required! Please select date before proceeding.",
        INVALID_TIME_REQ: "Time field is required! Please select time before proceeding.",
        TERMS_NOT_ACCEPTED: "You must agree to the Terms and Conditions and Privacy Policy.",

        INVALID_NAME: "Name must only contain letters, spaces, or hyphens, and be between 2 and 50 characters long.",
        INVALID_PHONE: "Phone number must be 10 to 15 digits and may start with '+'.",
        INVALID_EMAIL: "Please enter a valid email address.",
        REQUIRED_FIELD: "This field is required.",
        INVALID_PLAN: "Please select a  plan.",
        INVALID_FIELD: "The value of the field is invalid.",
        PASS_REQUIRED: "Password and confirm password are required.",
        PASS_MIN_LENGTH: "Password must be at least 8 characters long.",
        PASS_WEAK: "Password must include uppercase, lowercase letters, a number, and a special character.",
        PASS_MISMATCH: "Password and confirm password do not match.",
        RESET_EXPIRED: "Invalid or expired reset link. Please request a new one.",
        RESET_SUCCESS: "Congratulations! Your password have been reset! Login with new credentials.",
        RESET_FAILED: "Oh! We are sorry we can't reset your password now. Please try again later."

    },
    http_messages: {
        400: "Something is wrong with your request. Please check and try again.",
        401: "You must be logged in to perform this action.",
        403: "You don’t have permission to access this resource.",
        404: "The page or resource you're looking for was not found.",
        405: "This action is not allowed. Please try a different method.",
        409: "An account with this email already exists. Please log in to your account instead.",
        422: "Some fields are invalid. Please review the form and fix the errors.",
        500: "Oops! Something went wrong on our end. Please try again later.",
        501: "This feature is not yet available.",
        502: "Bad response from the server. Please try again shortly.",
        503: "The service is currently unavailable. Please try again later.",
        504: "The server took too long to respond. Please try again.",

        // TODO: Login Message Codes 
        LOGIN_409: "Password does not match. Please try again.",
        LOGIN_200: "Welcome! You have successfully logged in.",
        LOGIN_400: "There is an issue with the request. Please provide all information correctly.",
        LOGIN_401: "Incorrect password. Please try again.",
        LOGIN_403: "You are not authorized to perform this action.",
        LOGIN_404: "User not found. Please enter a valid email or username.",
        LOGIN_422: "Unable to process the request. Please check the provided information.",
        LOGIN_429: "Too many attempts. Please try again later.",
        LOGIN_500: "Server error occurred. Please try again later."
        ,
    },

    farm_selection_page: {
        // Header
        title_select_your_farm: "Select Your Farm",
        subtitle_choose_farm: "Choose which farm you'd like to continue with. You can switch between farms anytime from your dashboard.",

        // Status labels
        status_configured: "Ready to Use",
        status_in_progress: "Setup in Progress",
        status_pending: "Registration Pending",
        status_unknown: "Unknown",


        // Dynamic card data
        label_setup_progress: "Setup Progress",
        label_est_completion: "Est. completion",
        label_registered: "Registered",
        unit_cattle: "cattle",

        // Add farm card
        add_farm_title: "Register New Farm",
        add_farm_subtitle: "Add another farm to your DairySense account",
        add_farm_button: "Get Started",
        time_required: (day) => `${day} days`,


        // Buttons and actions
        action_continue_to: "Continue to",
        action_dashboard: "Dashboard",
        action_setup: "Setup",
        action_select_farm: "Select a Farm",
        action_back_to_home: "Back to Home",
        action_loading: "Loading...",

        // Help section
        help_title: "Need Help?",
        help_description: "If you're having trouble accessing your farm or need assistance with setup, our support team is here to help.",
        help_contact_support: "Contact Support",
        help_view_docs: "View Documentation",

        // Misc
        placeholder_avatar: "/placeholder.svg"
    },
    demo: {
        title: "Request a Demo",
        tagline: "See AgroSense in action! Schedule a personalized demo and discover how our intelligent dairy farm management system can transform your operations.",
        demo_submitted: {
            heading: "Demo Request Submitted!",
            sub_heading: ' Thank you for your interest in DairySense. Our team will contact you within 24 hours to schedule your personalized demo.',
            back_btn_text: "Return to Home"
        },
        personal_info: {
            heading: " Personal Information",
            first_name: "First Name *",
            last_name: "Last Name (Optional)",
            email_address: "Email Address *",
            phone_number: "Phone Number *"
        },
        farm_info: {
            heading: "Farm Inforamtion",
            farm_name: "Farm Name *",
            number_of_cattle: "Number of Cattle *",
            select_range: "Select range",
            current_system: "Current Management System"
        },
        demo_preferences: {
            heading: " Demo Preferences",
            prefered_date: "Preferred Date",
            prefered_time: "Preferred Time",
            installment_intrest: "I'm interested in learning about installment payment options",
            select_time: "Select Time",
            specific_interest: "Specific Areas of Interest",
            additional_note: "Additional Notes or Questions",
            additional_note_placeholder: "Tell us about your specific needs or any questions you have...",
        },
        sidebar: {
            what_to_expect: "What to Expect",
            demo_title: "30-45 Minute Demo",
            demo_desc: "Comprehensive walkthrough of all features",
            personalized_title: "Personalized Experience",
            personalized_desc: "Tailored to your farm's specific needs",
            consultation_title: "Expert Consultation",
            consultation_desc: "Q&A with our dairy farming specialists",
            contact_info: "Contact Information",
            email: "demo@dairysense.com",
            phone: "+92 300 1234567",
            location: "Lahore, Pakistan"
        }


    }

    , forgot_password: {
        message_no_account: "No account found with this email address.",
        email_sent_failed: "Sorry we are unable to send you reset link now! Please try again later.",
        label_check_your_email: "Check Your Email",
        label_forgot_password: "Forgot Password?",
        label_email_sent: "We've sent a password reset link to your email address.",
        label_enter_your_email: "Enter your email address and we'll send you a link to reset your password.",
        label_email_sent_to_email_pre: `A password reset link has been sent to `,
        label_email_sent_to_email_post: `. Please check your inbox and follow the instructions.`,
        label_email: "Email Address",
        action_sending: "Sending...",
        action_send_link: "Send Reset Link",
        action_back: " Back to Login",
        f_secure: "Secure & Private",
        f_iso_cert: "ISO Certified",
        didnt_receive_email: " Didn't receive the email? Check your spam folder or try again.",
        try_dif_email: "Try Different Email"


    },
    reset_password: {
        title_success: "Password Updated!",
        title_reset: "Set New Password",
        description_success: "Your password has been successfully updated.",
        description_reset: "Please enter your new password below.",
        alert_success: "Your password has been successfully reset. You can now log in with your new password.",
        alert_invalid_token: "Invalid reset link. Please request a new password reset.",
        alert_button_request_reset: "Request New Reset Link",
        input_password_label: "New Password",
        input_password_placeholder: "Enter new password",
        input_confirm_password_label: "Confirm New Password",
        input_confirm_password_placeholder: "Confirm new password",
        password_requirements_label: "Password must contain:",
        password_requirements: {
            min_length: "At least 8 characters",
            uppercase: "One uppercase letter",
            lowercase: "One lowercase letter",
            number: "One number"
        },
        button_update_password: "Update Password",
        button_updating: "Updating Password...",
        button_continue_login: "Continue to Login",
        trust: {
            secure_private: "Secure & Private",
            iso_certified: "ISO Certified"
        }
    }

}