/* ==========================================================================
   RESOLVEMATE - AI-POWERED COLLEGE COMPLAINT MANAGEMENT SYSTEM
   Full Interactive Engine (Vanilla JavaScript ES6)
   ========================================================================== */

// --- INITIAL DEMO DATASETS ---

const DEFAULT_COMPLAINTS = [
    {
        id: "RM-1001",
        studentName: "Aarchit Sharma",
        studentId: "21AI088",
        email: "aarchit@college.edu",
        phone: "+91 98451 22334",
        department: "AI & DS",
        title: "High latency and Wi-Fi disconnects in AI lab",
        description: "Wi-Fi router in AI lab is disconnected and network connection is completely broken. High priority issue during exam project submission, urgent internet repair needed.",
        category: "Wi-Fi / Internet",
        location: "AI Research Lab, 3rd Floor, Tech Block",
        priority: "High",
        targetDepartment: "IT Support",
        assignedTo: "Suresh Kumar",
        status: "In Progress",
        date: "2026-09-27 10:15",
        sentiment: "Urgent / Emergency",
        confidence: 96,
        reasoning: "Matched emergency tokens ('disconnected', 'broken', 'urgent') routing with High priority to IT Support.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=80",
        audio: null
    },
    {
        id: "RM-1002",
        studentName: "Kavya Ramachandran",
        studentId: "22CS104",
        email: "kavya.cs@college.edu",
        phone: "+91 97890 12345",
        department: "CSE",
        title: "Classroom projector HDMI port broken",
        description: "Projector in Block B Room 204 is not working. The HDMI cable connection is damaged and display flickers continuously during faculty lectures.",
        category: "Classroom",
        location: "Block B, Room 204",
        priority: "Medium",
        targetDepartment: "Academic Facilities",
        assignedTo: "Anitha Roy",
        status: "Pending",
        date: "2026-09-27 09:30",
        sentiment: "Frustrated / Dissatisfied",
        confidence: 91,
        reasoning: "Detected classroom equipment issue ('projector', 'damaged'). Assigned Medium priority to Academic Facilities.",
        image: null,
        audio: null
    },
    {
        id: "RM-1003",
        studentName: "Praveen Kumar",
        studentId: "20ME042",
        email: "praveen.mech@college.edu",
        phone: "+91 96001 88990",
        department: "MECH",
        title: "Severe water pipe leakage in Hostel B",
        description: "Water tap and main supply pipe leaking heavily near washroom area in Hostel Block B Room 102. Water accumulation causing severe floor hazard.",
        category: "Plumbing",
        location: "Hostel Block B, Room 102",
        priority: "High",
        targetDepartment: "Plumbing & Sanitation",
        assignedTo: "Karthik V.",
        status: "Resolved",
        date: "2026-09-26 16:45",
        sentiment: "Urgent / Emergency",
        confidence: 98,
        reasoning: "Detected urgent hazard ('leakage', 'hazard', 'water'). Assigned High priority to Plumbing & Sanitation.",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format&fit=crop&q=80",
        audio: null
    },
    {
        id: "RM-1004",
        studentName: "Sneha Reddy",
        studentId: "23EC019",
        email: "sneha.ece@college.edu",
        phone: "+91 94440 67890",
        department: "ECE",
        title: "Electrical spark in ECE Hardware Lab switchboard",
        description: "Dangerous electrical spark coming out of socket 4 in ECE Hardware Lab 2. Power fuse tripped. Requires immediate electrical maintenance technician inspection.",
        category: "Electrical",
        location: "ECE Hardware Lab 2, Main Building",
        priority: "High",
        targetDepartment: "Electrical Maintenance",
        assignedTo: "Rajesh Kannan",
        status: "Pending",
        date: "2026-09-27 11:00",
        sentiment: "Critical / Alarm",
        confidence: 99,
        reasoning: "Detected critical electrical danger keywords ('spark', 'fuse', 'socket'). Routed immediately to Electrical Maintenance.",
        image: null,
        audio: null
    },
    {
        id: "RM-1005",
        studentName: "Vikram Seth",
        studentId: "22IT077",
        email: "vikram.it@college.edu",
        phone: "+91 99520 11447",
        department: "IT",
        title: "Central Library AC unit dripping water on reading desks",
        description: "Air conditioner in 2nd floor library reading hall is dripping water over study tables and books. Housekeeping cleaning needed.",
        category: "Cleaning",
        location: "Central Library, 2nd Floor Hall",
        priority: "Low",
        targetDepartment: "Housekeeping",
        assignedTo: "Unassigned",
        status: "Pending",
        date: "2026-09-25 14:20",
        sentiment: "Neutral / Minor",
        confidence: 88,
        reasoning: "Minor maintenance request ('dripping water', 'cleaning'). Assigned Low priority to Housekeeping.",
        image: null,
        audio: null
    },
    {
        id: "RM-1006",
        studentName: "Dinesh Raj",
        studentId: "21CV012",
        email: "dinesh.civil@college.edu",
        phone: "+91 97100 55443",
        department: "CIVIL",
        title: "College Bus Route 4 air conditioning and seat damage",
        description: "College bus number 4 AC cooling fan is broken and emergency exit latch is loose. Vehicle maintenance inspection requested.",
        category: "Transport",
        location: "Campus Bus Bay / Route 4",
        priority: "Medium",
        targetDepartment: "Transport Department",
        assignedTo: "Murugan S.",
        status: "In Progress",
        date: "2026-09-26 08:30",
        sentiment: "Frustrated",
        confidence: 93,
        reasoning: "Transport vehicle issue ('bus', 'fan', 'broken'). Assigned Medium priority to Transport Department.",
        image: null,
        audio: null
    }
];

const DEFAULT_TEAM = [
    {
        id: "MEM-101",
        name: "Suresh Kumar",
        department: "IT Support",
        specialization: "Senior Network Engineer & Wi-Fi Systems",
        phone: "+91 98765 11223",
        email: "suresh.it@college.edu",
        availability: "Available",
        assignedCount: 1
    },
    {
        id: "MEM-102",
        name: "Rajesh Kannan",
        department: "Electrical Maintenance",
        specialization: "High Voltage & Campus Power Grids",
        phone: "+91 98765 22334",
        email: "rajesh.elec@college.edu",
        availability: "On-Site",
        assignedCount: 1
    },
    {
        id: "MEM-103",
        name: "Karthik V.",
        department: "Plumbing & Sanitation",
        specialization: "Pipeline Infrastructure & Drainage",
        phone: "+91 98765 33445",
        email: "karthik.plumb@college.edu",
        availability: "Available",
        assignedCount: 1
    },
    {
        id: "MEM-104",
        name: "Anitha Roy",
        department: "Academic Facilities",
        specialization: "AV Systems, Projectors & Classroom Hardware",
        phone: "+91 98765 44556",
        email: "anitha.facilities@college.edu",
        availability: "Available",
        assignedCount: 1
    },
    {
        id: "MEM-105",
        name: "Murugan S.",
        department: "Transport Department",
        specialization: "Fleet Operations & Bus Maintenance",
        phone: "+91 98765 55667",
        email: "murugan.transport@college.edu",
        availability: "On-Site",
        assignedCount: 1
    }
];

const DEFAULT_NOTIFICATIONS = [
    {
        id: "NT-1",
        title: "High Priority Ticket Alert",
        message: "New complaint RM-1004 (Electrical spark in ECE lab) classified as High Priority.",
        date: "2026-09-27 11:02",
        read: false,
        type: "danger"
    },
    {
        id: "NT-2",
        title: "Technician Auto-Assigned",
        message: "Suresh Kumar assigned to ticket RM-1001 (Wi-Fi issue in AI lab).",
        date: "2026-09-27 10:20",
        read: false,
        type: "info"
    },
    {
        id: "NT-3",
        title: "Complaint Resolved",
        message: "Ticket RM-1003 (Hostel water leakage) successfully resolved by Karthik V.",
        date: "2026-09-26 17:00",
        read: true,
        type: "success"
    }
];

// --- APPLICATION GLOBAL STATE ---
let state = {
    complaints: [],
    team: [],
    notifications: [],
    currentUser: {
        id: "RM-ADMIN-01",
        name: "Dr. Aris Vance",
        email: "admin@college.edu",
        phone: "+91 98401 55678",
        dept: "Campus IT & Administration",
        role: "Administrator",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
    settings: {
        language: "en",
        inAppAlerts: true,
        emailAlerts: true,
        smsAlerts: true,
        darkMode: false,
        compactTables: false
    },
    currentSection: "dashboard",
    currentComplaintInModal: null,
    pendingConfirmCallback: null,
    tempUploadedImage: null,
    tempUploadedAudio: null,
    isSimulatingRecording: false,
    chartInstances: {}
};

// --- TAMIL TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
    en: {
        login_subtitle: "AI-Powered Smart Campus Resolution Portal",
        email_label: "Email / Student ID",
        password_label: "Password",
        role_label: "Access Role",
        btn_login: "Login to Portal",
        btn_demo_login: "Quick Demo Login",
        nav_dashboard: "Dashboard",
        nav_complaints: "Complaints",
        nav_submit_complaint: "Submit Complaint",
        nav_ai_analysis: "AI Analysis",
        nav_departments: "Departments",
        nav_maintenance_team: "Maintenance Team",
        nav_notifications: "Notifications",
        nav_reports: "Reports & Analytics",
        nav_profile: "Profile",
        nav_settings: "Settings",
        stat_total: "Total Complaints",
        stat_pending: "Pending",
        stat_in_progress: "In Progress",
        stat_resolved: "Resolved",
        stat_high_priority: "High Priority",
        student_name_label: "Student Name",
        student_id_label: "Student ID / Reg No",
        academic_dept_label: "Academic Department",
        location_label: "Exact Location",
        complaint_title_label: "Complaint Title",
        description_label: "Detailed Description",
        view_profile: "View Profile",
        btn_logout: "Logout",
        mark_all_read: "Mark all as read",
        view_all_notifications: "View all notifications"
    },
    ta: {
        login_subtitle: "செயற்கை நுண்ணறிவு கல்லூரி புகார் தீர்வு தளம்",
        email_label: "மின்னஞ்சல் / மாணவர் ஐடி",
        password_label: "கடவுச்சொல்",
        role_label: "அணுகல் பங்கு",
        btn_login: "உள்நுழைக",
        btn_demo_login: "மாதிரி உள்நுழைவு",
        nav_dashboard: "முகப்பு பலகை",
        nav_complaints: "புகார்கள்",
        nav_submit_complaint: "புகார் சமர்ப்பிக்க",
        nav_ai_analysis: "AI பகுப்பாய்வு",
        nav_departments: "துறைகள்",
        nav_maintenance_team: "பராமரிப்பு குழு",
        nav_notifications: "அறிவிப்புகள்",
        nav_reports: "அறிக்கைகள் & பகுப்பாய்வு",
        nav_profile: "சுயவிவரம்",
        nav_settings: "அமைப்புகள்",
        stat_total: "மொத்த புகார்கள்",
        stat_pending: "நிலுவையில் உள்ளவை",
        stat_in_progress: "செயல்பாட்டில் உள்ளவை",
        stat_resolved: "தீர்க்கப்பட்டவை",
        stat_high_priority: "முக்கியத்துவம் வாய்ந்தவை",
        student_name_label: "மாணவர் பெயர்",
        student_id_label: "மாணவர் ஐடி",
        academic_dept_label: "கல்வித் துறை",
        location_label: "துல்லியமான இடம்",
        complaint_title_label: "புகார் தலைப்பு",
        description_label: "விரிவான விளக்கம்",
        view_profile: "சுயவிவரம் பார்க்க",
        btn_logout: "வெளியேறு",
        mark_all_read: "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
        view_all_notifications: "அனைத்து அறிவிப்புகளையும் பார்க்கவும்"
    }
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    loadStateFromStorage();
    setupCurrentDate();
    initAIEngineRealtimeInspector();
    renderAllViews();
});

// --- LOCAL STORAGE HELPERS ---
function loadStateFromStorage() {
    const storedComplaints = localStorage.getItem("resolvemate_complaints");
    state.complaints = storedComplaints ? JSON.parse(storedComplaints) : DEFAULT_COMPLAINTS;

    const storedTeam = localStorage.getItem("resolvemate_team");
    state.team = storedTeam ? JSON.parse(storedTeam) : DEFAULT_TEAM;

    const storedNotifs = localStorage.getItem("resolvemate_notifs");
    state.notifications = storedNotifs ? JSON.parse(storedNotifs) : DEFAULT_NOTIFICATIONS;

    const storedUser = localStorage.getItem("resolvemate_user");
    if (storedUser) state.currentUser = JSON.parse(storedUser);

    const storedSettings = localStorage.getItem("resolvemate_settings");
    if (storedSettings) state.settings = JSON.parse(storedSettings);

    // Save initial state back if first run
    saveStateToStorage();
}

function saveStateToStorage() {
    localStorage.setItem("resolvemate_complaints", JSON.stringify(state.complaints));
    localStorage.setItem("resolvemate_team", JSON.stringify(state.team));
    localStorage.setItem("resolvemate_notifs", JSON.stringify(state.notifications));
    localStorage.setItem("resolvemate_user", JSON.stringify(state.currentUser));
    localStorage.setItem("resolvemate_settings", JSON.stringify(state.settings));
}

function setupCurrentDate() {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const todayStr = new Date().toLocaleDateString('en-US', options);
    const dateElem = document.getElementById("header-date-text");
    if (dateElem) dateElem.innerText = todayStr;
}

// --- LOGIN & AUTHENTICATION HANDLERS ---
function setLoginRole(role, email) {
    document.getElementById("login-role").value = role;
    document.getElementById("login-email").value = email;

    const pills = document.querySelectorAll(".role-pill");
    pills.forEach(p => p.classList.remove("active"));
    event.target.classList.add("active");
}

function handleLogin() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const role = document.getElementById("login-role").value;

    if (!email || !password) {
        showToast("Please enter both Email/ID and Password", "error");
        return;
    }

    state.currentUser.email = email;
    state.currentUser.role = role;
    if (role === "Student") {
        state.currentUser.name = "Aarchit Sharma";
        state.currentUser.id = "21AI088";
        state.currentUser.dept = "AI & DS";
    } else if (role === "Department Staff") {
        state.currentUser.name = "Suresh Kumar";
        state.currentUser.id = "MEM-101";
        state.currentUser.dept = "IT Support";
    } else {
        state.currentUser.name = "Dr. Aris Vance";
        state.currentUser.id = "RM-ADMIN-01";
        state.currentUser.dept = "Campus Administration";
    }

    saveStateToStorage();
    updateUserInterfaceWithSession();

    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    showToast(`Welcome back, ${state.currentUser.name}! (${state.currentUser.role})`, "success");

    renderAllViews();
}

function handleDemoLogin() {
    document.getElementById("login-email").value = "admin@college.edu";
    document.getElementById("login-password").value = "demo1234";
    document.getElementById("login-role").value = "Administrator";
    handleLogin();
}

function handleLogout() {
    document.getElementById("main-app").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
    showToast("Successfully logged out from ResolveMate", "info");
}

function updateUserInterfaceWithSession() {
    document.getElementById("sidebar-user-name").innerText = state.currentUser.name;
    document.getElementById("sidebar-user-role").innerText = state.currentUser.role;
    document.getElementById("sidebar-avatar").src = state.currentUser.avatar;

    document.getElementById("header-user-name").innerText = state.currentUser.name;
    document.getElementById("header-avatar").src = state.currentUser.avatar;

    document.getElementById("dropdown-user-name").innerText = state.currentUser.name;
    document.getElementById("dropdown-user-role").innerText = state.currentUser.role;

    document.getElementById("prof-display-name").innerText = state.currentUser.name;
    document.getElementById("prof-display-email").innerText = state.currentUser.email;
    document.getElementById("prof-display-role").innerText = state.currentUser.role;
    document.getElementById("prof-id-val").innerText = state.currentUser.id;
    document.getElementById("prof-phone-val").innerText = state.currentUser.phone;
    document.getElementById("prof-dept-val").innerText = state.currentUser.dept;
    document.getElementById("prof-avatar-img").src = state.currentUser.avatar;
}

// --- NAVIGATION & VIEW SWITCHING ---
function switchSection(sectionId, event = null) {
    if (event) event.preventDefault();

    state.currentSection = sectionId;

    // Update active state on sidebar links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Hide all section pages
    const sections = document.querySelectorAll(".page-section");
    sections.forEach(sec => sec.classList.remove("active"));

    // Show target section
    const target = document.getElementById(`section-${sectionId}`);
    if (target) {
        target.classList.add("active");
    }

    // Update Page Title
    const titleMap = {
        "dashboard": "Dashboard",
        "complaints": "Complaints Management Hub",
        "submit-complaint": "Submit Campus Complaint",
        "ai-analysis": "AI Rule Engine & NLP Inspector",
        "departments": "Campus Departments & Workload",
        "maintenance-team": "Maintenance Staff Directory",
        "notifications": "Notification Center",
        "reports": "Analytical Reports & Export",
        "profile": "User Profile",
        "settings": "System Settings"
    };

    const heading = document.getElementById("page-heading");
    if (heading) heading.innerText = titleMap[sectionId] || "Dashboard";

    // Close dropdowns & mobile sidebar
    toggleMobileSidebar(false);
    closeAllDropdowns();

    // Re-render charts if entering reports
    if (sectionId === "reports") {
        setTimeout(renderReportsCharts, 100);
    }
}

function toggleMobileSidebar(open) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (open) {
        sidebar.classList.add("mobile-open");
        overlay.classList.add("mobile-open");
    } else {
        sidebar.classList.remove("mobile-open");
        overlay.classList.remove("mobile-open");
    }
}

// --- DROPDOWN MENUS ---
function toggleNotificationDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById("notification-dropdown");
    const profileDropdown = document.getElementById("profile-dropdown");
    profileDropdown.classList.add("hidden");
    dropdown.classList.toggle("hidden");
}

function toggleProfileDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById("profile-dropdown");
    const notifDropdown = document.getElementById("notification-dropdown");
    notifDropdown.classList.add("hidden");
    dropdown.classList.toggle("hidden");
}

function closeAllDropdowns() {
    document.getElementById("notification-dropdown").classList.add("hidden");
    document.getElementById("profile-dropdown").classList.add("hidden");
}

document.addEventListener("click", () => {
    closeAllDropdowns();
});

// --- AI ENGINE RULE NLP CLASSIFIER ---
function analyzeComplaintAI(text, categoryManual = "AUTO", priorityManual = "AUTO") {
    const cleanText = text.toLowerCase();
    
    // Keyword Rules Mapping
    const categoryRules = [
        {
            category: "Wi-Fi / Internet",
            dept: "IT Support",
            keywords: ["wifi", "wi-fi", "internet", "network", "connection", "router", "lan", "signal", "disconnect", "bandwidth", "online", "ethernet"]
        },
        {
            category: "Electrical",
            dept: "Electrical Maintenance",
            keywords: ["fan", "light", "electricity", "power", "switch", "spark", "socket", "wire", "fuse", "short", "ac", "voltage", "current", "breaker"]
        },
        {
            category: "Plumbing",
            dept: "Plumbing & Sanitation",
            keywords: ["water", "tap", "pipe", "leakage", "leak", "sink", "drainage", "overflow", "toilet", "washroom", "flush", "sewage", "basin"]
        },
        {
            category: "Transport",
            dept: "Transport Department",
            keywords: ["bus", "transport", "driver", "route", "vehicle", "seat", "brake", "commute", "pickup", "drop"]
        },
        {
            category: "Hostel",
            dept: "Hostel Maintenance",
            keywords: ["hostel", "room", "bed", "bathroom", "mess", "warden", "dorm", "door", "cupboard", "almirah", "cot"]
        },
        {
            category: "Laboratory",
            dept: "Lab Operations",
            keywords: ["lab", "computer", "system", "equipment", "microscope", "pc", "monitor", "keyboard", "mouse", "hardware", "software", "instrument"]
        },
        {
            category: "Classroom",
            dept: "Academic Facilities",
            keywords: ["classroom", "bench", "projector", "board", "desk", "podium", "chalk", "marker", "chair", "speaker", "audio"]
        },
        {
            category: "Library",
            dept: "Academic Facilities",
            keywords: ["library", "book", "journal", "reading", "shelf", "catalog", "issue"]
        },
        {
            category: "Cleaning",
            dept: "Housekeeping",
            keywords: ["cleaning", "dustbin", "garbage", "dirty", "waste", "trash", "clean", "sweeping", "smell"]
        },
        {
            category: "Security",
            dept: "Campus Security",
            keywords: ["security", "gate", "id card", "guard", "cctv", "camera", "stolen", "lost", "theft", "trespass"]
        }
    ];

    // Priority Rules
    const highPriorityKeywords = ["emergency", "dangerous", "fire", "accident", "severe", "urgent", "security", "hazard", "spark", "smoke", "shock", "outage", "bleeding", "broken pipe"];
    const mediumPriorityKeywords = ["not working", "broken", "problem", "issue", "damaged", "defect", "malfunction", "delay", "slow", "flicker", "noisy"];
    const lowPriorityKeywords = ["request", "suggestion", "minor", "improvement", "dusty", "cleaning", "feedback", "repaint"];

    let detectedCategory = "Other";
    let targetDept = "General Admin";
    let matchedKeywords = [];
    let maxMatchCount = 0;

    // Detect Category
    categoryRules.forEach(rule => {
        let count = 0;
        rule.keywords.forEach(kw => {
            if (cleanText.includes(kw)) {
                count++;
                if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
            }
        });

        if (count > maxMatchCount) {
            maxMatchCount = count;
            detectedCategory = rule.category;
            targetDept = rule.dept;
        }
    });

    // Manual Override check
    if (categoryManual !== "AUTO") {
        detectedCategory = categoryManual;
        const foundRule = categoryRules.find(r => r.category === categoryManual);
        if (foundRule) targetDept = foundRule.dept;
    }

    // Detect Priority
    let detectedPriority = "Low";
    let isHigh = highPriorityKeywords.some(kw => {
        if (cleanText.includes(kw)) {
            if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
            return true;
        }
        return false;
    });

    let isMedium = mediumPriorityKeywords.some(kw => {
        if (cleanText.includes(kw)) {
            if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
            return true;
        }
        return false;
    });

    if (isHigh) {
        detectedPriority = "High";
    } else if (isMedium || detectedCategory === "Wi-Fi / Internet" || detectedCategory === "Electrical") {
        detectedPriority = "Medium";
    } else {
        detectedPriority = "Low";
    }

    if (priorityManual !== "AUTO") {
        detectedPriority = priorityManual;
    }

    // Detect Sentiment
    let sentiment = "Neutral / Constructive";
    if (detectedPriority === "High") {
        sentiment = "Urgent / Critical";
    } else if (isMedium) {
        sentiment = "Frustrated / Concerned";
    }

    // Calculate Confidence Score
    let confidence = 85 + Math.min(matchedKeywords.length * 3, 13);
    if (matchedKeywords.length === 0) confidence = 78;

    // Generate Reasoning
    let reasoning = `Detected ${matchedKeywords.length} key tokens (${matchedKeywords.slice(0, 3).map(k => `'${k}'`).join(', ')}). `;
    reasoning += `Automated routing assigned '${detectedPriority}' Priority to target team: ${targetDept}.`;

    return {
        category: detectedCategory,
        priority: detectedPriority,
        targetDepartment: targetDept,
        sentiment: sentiment,
        confidence: confidence,
        keywords: matchedKeywords.length > 0 ? matchedKeywords : ["general_inquiry"],
        reasoning: reasoning
    };
}

function initAIEngineRealtimeInspector() {
    const descField = document.getElementById("sub-description");
    if (descField) {
        onDescriptionInputChange(descField.value);
    }
}

function onDescriptionInputChange(value) {
    const catManual = document.getElementById("sub-category-manual")?.value || "AUTO";
    const prioManual = document.getElementById("sub-priority-manual")?.value || "AUTO";

    const aiRes = analyzeComplaintAI(value, catManual, prioManual);

    const catBadge = document.getElementById("ai-live-category");
    if (catBadge) catBadge.innerText = aiRes.category;

    const prioBadge = document.getElementById("ai-live-priority");
    if (prioBadge) {
        prioBadge.innerText = `${aiRes.priority} Priority`;
        prioBadge.className = `ai-value badge ${aiRes.priority === 'High' ? 'badge-danger' : aiRes.priority === 'Medium' ? 'badge-warning' : 'badge-secondary'}`;
    }

    const deptVal = document.getElementById("ai-live-dept");
    if (deptVal) deptVal.innerText = aiRes.targetDepartment;

    const sentVal = document.getElementById("ai-live-sentiment");
    if (sentVal) sentVal.innerText = aiRes.sentiment;

    const confBar = document.getElementById("ai-live-confidence-bar");
    const confText = document.getElementById("ai-live-confidence-text");
    if (confBar && confText) {
        confBar.style.width = `${aiRes.confidence}%`;
        confText.innerText = `${aiRes.confidence}%`;
    }

    const kwContainer = document.getElementById("ai-live-keywords");
    if (kwContainer) {
        kwContainer.innerHTML = aiRes.keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('');
    }

    const reasoningBox = document.getElementById("ai-live-reasoning");
    if (reasoningBox) reasoningBox.innerText = aiRes.reasoning;
}

function overrideAICategory(val) {
    const desc = document.getElementById("sub-description")?.value || "";
    onDescriptionInputChange(desc);
}

function runAITester(text) {
    const aiRes = analyzeComplaintAI(text);
    
    document.getElementById("ai-test-category").innerText = aiRes.category;
    
    const prio = document.getElementById("ai-test-priority");
    prio.innerText = aiRes.priority;
    prio.className = `badge ${aiRes.priority === 'High' ? 'badge-danger' : aiRes.priority === 'Medium' ? 'badge-warning' : 'badge-secondary'}`;
    
    document.getElementById("ai-test-dept").innerText = aiRes.targetDepartment;
    document.getElementById("ai-test-sentiment").innerText = aiRes.sentiment;
    document.getElementById("ai-test-confidence").innerText = `Confidence: ${aiRes.confidence}%`;
    
    document.getElementById("ai-test-keywords").innerHTML = aiRes.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');
    document.getElementById("ai-test-reasoning").innerText = aiRes.reasoning;
}

// --- SUBMIT COMPLAINT FORM HANDLER ---
function handleComplaintSubmission() {
    const studentName = document.getElementById("sub-student-name").value.trim();
    const studentId = document.getElementById("sub-student-id").value.trim();
    const email = document.getElementById("sub-email").value.trim();
    const phone = document.getElementById("sub-phone").value.trim();
    const studentDept = document.getElementById("sub-student-dept").value;
    const location = document.getElementById("sub-location").value.trim();
    const title = document.getElementById("sub-title").value.trim();
    const description = document.getElementById("sub-description").value.trim();
    const categoryManual = document.getElementById("sub-category-manual").value;
    const priorityManual = document.getElementById("sub-priority-manual").value;

    if (!studentName || !studentId || !email || !phone || !location || !title || !description) {
        showToast("Please fill out all required fields", "error");
        return;
    }

    // Run AI Classification Logic
    const aiRes = analyzeComplaintAI(description, categoryManual, priorityManual);

    // Auto-Assign Technician matching department
    let assignedStaff = "Unassigned";
    const matchingTech = state.team.find(m => m.department === aiRes.targetDepartment && m.availability === "Available");
    if (matchingTech) {
        assignedStaff = matchingTech.name;
        matchingTech.assignedCount++;
    }

    // Generate Ticket ID
    const nextNum = 1000 + state.complaints.length + 1;
    const newId = `RM-${nextNum}`;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket = {
        id: newId,
        studentName: studentName,
        studentId: studentId,
        email: email,
        phone: phone,
        department: studentDept,
        title: title,
        description: description,
        category: aiRes.category,
        location: location,
        priority: aiRes.priority,
        targetDepartment: aiRes.targetDepartment,
        assignedTo: assignedStaff,
        status: assignedStaff !== "Unassigned" ? "Assigned" : "Pending",
        date: nowStr,
        sentiment: aiRes.sentiment,
        confidence: aiRes.confidence,
        reasoning: aiRes.reasoning,
        image: state.tempUploadedImage,
        audio: state.tempUploadedAudio
    };

    // Add to state & persistence
    state.complaints.unshift(newTicket);

    // Generate System Notification
    const newNotif = {
        id: `NT-${Date.now()}`,
        title: "New Ticket Submitted",
        message: `Complaint ${newId} (${title}) submitted and routed to ${aiRes.targetDepartment}.`,
        date: nowStr,
        read: false,
        type: aiRes.priority === "High" ? "danger" : "info"
    };
    state.notifications.unshift(newNotif);

    saveStateToStorage();

    // Reset Form & Temporary Uploads
    document.getElementById("submit-complaint-form").reset();
    removeUploadedImage();
    removeUploadedAudio();

    // Show Success Modal / Toast
    showToast(`Complaint ${newId} submitted successfully! AI routed to ${aiRes.targetDepartment}.`, "success");

    // Refresh UI
    renderAllViews();

    // Open complaint detail directly
    openComplaintDetails(newId);
}

// --- MEDIA ATTACHMENTS (IMAGE & AUDIO) ---
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        state.tempUploadedImage = evt.target.result;
        document.getElementById("image-preview-img").src = state.tempUploadedImage;
        document.getElementById("image-preview-container").classList.remove("hidden");
    };
    reader.readAsDataURL(file);
}

function removeUploadedImage() {
    state.tempUploadedImage = null;
    const preview = document.getElementById("image-preview-container");
    if (preview) preview.classList.add("hidden");
    const input = document.getElementById("sub-image-input");
    if (input) input.value = "";
}

function handleAudioUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    state.tempUploadedAudio = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        url: url
    };

    renderAudioPreview();
}

function toggleSimulatedRecording() {
    const btnText = document.getElementById("record-btn-text");
    if (!state.isSimulatingRecording) {
        state.isSimulatingRecording = true;
        btnText.innerText = "Recording... (Click to stop)";
        showToast("Microphone recording voice note...", "info");
    } else {
        state.isSimulatingRecording = false;
        btnText.innerText = "Record Voice Note";

        // Generate demo recording audio object
        state.tempUploadedAudio = {
            name: "voice_note_complaint_2026.mp3",
            size: "340 KB",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        };
        renderAudioPreview();
        showToast("Voice note recorded and attached successfully!", "success");
    }
}

function renderAudioPreview() {
    if (state.tempUploadedAudio) {
        document.getElementById("audio-file-name").innerText = `${state.tempUploadedAudio.name} (${state.tempUploadedAudio.size})`;
        document.getElementById("audio-player").src = state.tempUploadedAudio.url;
        document.getElementById("audio-preview-container").classList.remove("hidden");
    }
}

function removeUploadedAudio() {
    state.tempUploadedAudio = null;
    document.getElementById("audio-preview-container").classList.add("hidden");
    document.getElementById("audio-player").src = "";
    document.getElementById("sub-audio-input").value = "";
}

// --- RENDER DYNAMIC VIEWS & DATA TABLES ---
function renderAllViews() {
    renderDashboardStats();
    renderDashboardRecentTable();
    renderComplaintsMainTable();
    renderDepartments();
    renderMaintenanceTeam();
    renderNotifications();
    updateBadgesCount();
}

function renderDashboardStats() {
    const total = state.complaints.length;
    const pending = state.complaints.filter(c => c.status === "Pending" || c.status === "Submitted").length;
    const inProgress = state.complaints.filter(c => c.status === "In Progress" || c.status === "Assigned" || c.status === "AI Analysed").length;
    const resolved = state.complaints.filter(c => c.status === "Resolved" || c.status === "Closed").length;
    const highPriority = state.complaints.filter(c => c.priority === "High" && (c.status !== "Resolved" && c.status !== "Closed")).length;

    document.getElementById("stat-total").innerText = total;
    document.getElementById("stat-pending").innerText = pending;
    document.getElementById("stat-in-progress").innerText = inProgress;
    document.getElementById("stat-resolved").innerText = resolved;
    document.getElementById("stat-high-priority").innerText = highPriority;

    // AI Insight Panel metrics calculation
    if (total > 0) {
        // Most reported category
        const catCounts = {};
        state.complaints.forEach(c => { catCounts[c.category] = (catCounts[c.category] || 0) + 1; });
        const topCategory = Object.keys(catCounts).reduce((a, b) => catCounts[a] > catCounts[b] ? a : b, "Wi-Fi / Internet");
        const topCatPercent = Math.round((catCounts[topCategory] / total) * 100);

        document.getElementById("ai-insight-category").innerText = topCategory;
        document.getElementById("ai-insight-category-sub").innerText = `${topCatPercent}% of total complaint volume`;

        // Resolution Rate
        const resRate = Math.round((resolved / total) * 100);
        document.getElementById("ai-insight-rate").innerText = `${resRate}%`;
        document.getElementById("ai-insight-rate-sub").innerText = `Avg resolution SLA: 1.2 days`;

        // Highest Workload Dept
        const deptCounts = {};
        state.complaints.filter(c => c.status !== "Resolved" && c.status !== "Closed").forEach(c => {
            deptCounts[c.targetDepartment] = (deptCounts[c.targetDepartment] || 0) + 1;
        });
        const topDept = Object.keys(deptCounts).length > 0 ? Object.keys(deptCounts).reduce((a, b) => deptCounts[a] > deptCounts[b] ? a : b) : "IT Support";
        document.getElementById("ai-insight-workload").innerText = topDept;
        document.getElementById("ai-insight-workload-sub").innerText = `Active tickets: ${deptCounts[topDept] || 0}`;
    }
}

function renderDashboardRecentTable() {
    const tbody = document.getElementById("dashboard-recent-tbody");
    if (!tbody) return;

    const recent = state.complaints.slice(0, 5);
    if (recent.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted">No recent complaints.</td></tr>`;
        return;
    }

    tbody.innerHTML = recent.map(c => `
        <tr>
            <td><strong class="text-primary">${c.id}</strong></td>
            <td>
                <div><strong>${c.studentName}</strong></div>
                <small class="text-muted">${c.department} • ${c.studentId}</small>
            </td>
            <td>
                <div class="text-bold">${c.title}</div>
                <small class="text-muted"><i class="fa-solid fa-location-dot"></i> ${c.location}</small>
            </td>
            <td><span class="badge badge-primary">${c.category}</span></td>
            <td>${c.targetDepartment}</td>
            <td><span class="badge ${c.priority === 'High' ? 'badge-danger' : c.priority === 'Medium' ? 'badge-warning' : 'badge-secondary'}">${c.priority}</span></td>
            <td><span class="badge ${c.status === 'Resolved' ? 'badge-success' : c.status === 'In Progress' ? 'badge-purple' : 'badge-warning'}">${c.status}</span></td>
            <td class="text-xs text-muted">${c.date}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" onclick="openComplaintDetails('${c.id}')">
                    <i class="fa-solid fa-eye"></i> View
                </button>
            </td>
        </tr>
    `).join('');
}

function renderComplaintsMainTable() {
    const tbody = document.getElementById("complaints-main-tbody");
    const noResults = document.getElementById("no-results-msg");
    if (!tbody) return;

    const filtered = getFilteredComplaints();

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        noResults.classList.remove("hidden");
        return;
    } else {
        noResults.classList.add("hidden");
    }

    tbody.innerHTML = filtered.map(c => `
        <tr>
            <td><strong class="text-primary">${c.id}</strong></td>
            <td>
                <div><strong>${c.studentName}</strong></div>
                <small class="text-muted">${c.department} • ${c.studentId}</small>
            </td>
            <td>
                <div class="text-bold">${c.title}</div>
                <small class="text-muted"><i class="fa-solid fa-location-dot"></i> ${c.location}</small>
            </td>
            <td><span class="badge badge-primary">${c.category}</span></td>
            <td>${c.targetDepartment}</td>
            <td><span class="badge ${c.priority === 'High' ? 'badge-danger' : c.priority === 'Medium' ? 'badge-warning' : 'badge-secondary'}">${c.priority}</span></td>
            <td><span class="badge ${c.status === 'Resolved' ? 'badge-success' : c.status === 'In Progress' ? 'badge-purple' : 'badge-warning'}">${c.status}</span></td>
            <td class="text-xs text-muted">${c.date}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-outline-primary btn-sm" onclick="openComplaintDetails('${c.id}')" title="View Details">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-purple btn-sm" onclick="openEditComplaintModal('${c.id}')" title="Edit Ticket">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="promptDeleteComplaint('${c.id}')" title="Delete Ticket">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getFilteredComplaints() {
    const search = document.getElementById("filter-search")?.value.toLowerCase() || "";
    const category = document.getElementById("filter-category")?.value || "ALL";
    const dept = document.getElementById("filter-department")?.value || "ALL";
    const priority = document.getElementById("filter-priority")?.value || "ALL";
    const status = document.getElementById("filter-status")?.value || "ALL";

    return state.complaints.filter(c => {
        const matchesSearch = !search || 
            c.id.toLowerCase().includes(search) ||
            c.title.toLowerCase().includes(search) ||
            c.studentName.toLowerCase().includes(search) ||
            c.location.toLowerCase().includes(search) ||
            c.description.toLowerCase().includes(search);

        const matchesCat = category === "ALL" || c.category === category;
        const matchesDept = dept === "ALL" || c.targetDepartment === dept;
        const matchesPriority = priority === "ALL" || c.priority === priority;
        const matchesStatus = status === "ALL" || c.status === status;

        return matchesSearch && matchesCat && matchesDept && matchesPriority && matchesStatus;
    });
}

function applyComplaintFilters() {
    renderComplaintsMainTable();
}

function resetComplaintFilters() {
    document.getElementById("filter-search").value = "";
    document.getElementById("filter-category").value = "ALL";
    document.getElementById("filter-department").value = "ALL";
    document.getElementById("filter-priority").value = "ALL";
    document.getElementById("filter-status").value = "ALL";
    renderComplaintsMainTable();
}

function handleGlobalSearch(query) {
    const clearBtn = document.getElementById("clear-search-btn");
    if (query.trim().length > 0) {
        clearBtn.classList.remove("hidden");
    } else {
        clearBtn.classList.add("hidden");
    }

    if (state.currentSection !== "complaints") {
        switchSection("complaints");
    }

    document.getElementById("filter-search").value = query;
    applyComplaintFilters();
}

function clearGlobalSearch() {
    document.getElementById("global-search-input").value = "";
    document.getElementById("clear-search-btn").classList.add("hidden");
    if (document.getElementById("filter-search")) {
        document.getElementById("filter-search").value = "";
        applyComplaintFilters();
    }
}

// --- DEPARTMENTS PAGE ---
function renderDepartments() {
    const container = document.getElementById("departments-container");
    if (!container) return;

    const departmentsList = [
        { name: "IT Support", lead: "Dr. K. Subramanian", icon: "fa-laptop-code", color: "text-primary" },
        { name: "Electrical Maintenance", lead: "Er. Ramesh Babu", icon: "fa-bolt", color: "text-amber" },
        { name: "Plumbing & Sanitation", lead: "Mr. V. Sundaram", icon: "fa-faucet-drip", color: "text-blue" },
        { name: "Academic Facilities", lead: "Prof. Meena Kumari", icon: "fa-chalkboard-user", color: "text-purple" },
        { name: "Lab Operations", lead: "Dr. N. Elango", icon: "fa-microscope", color: "text-emerald" },
        { name: "Hostel Maintenance", lead: "Warden S. Prakash", icon: "fa-hotel", color: "text-indigo" },
        { name: "Transport Department", lead: "Mr. G. Selvam", icon: "fa-bus", color: "text-amber" },
        { name: "Housekeeping", lead: "Mrs. Lakshmi A.", icon: "fa-broom", color: "text-rose" },
        { name: "Campus Security", lead: "Capt. R. Deshmukh", icon: "fa-shield-halved", color: "text-dark" }
    ];

    container.innerHTML = departmentsList.map(dept => {
        const assignedComplaints = state.complaints.filter(c => c.targetDepartment === dept.name);
        const activeCount = assignedComplaints.filter(c => c.status !== "Resolved" && c.status !== "Closed").length;
        const totalCount = assignedComplaints.length;
        const workloadPct = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

        return `
            <div class="dept-card glass-card">
                <div class="dept-header">
                    <div class="dept-icon"><i class="fa-solid ${dept.icon} ${dept.color}"></i></div>
                    <div>
                        <h3>${dept.name}</h3>
                        <small class="text-muted">Dept Lead: ${dept.lead}</small>
                    </div>
                </div>

                <div class="dept-body">
                    <div class="space-between margin-bottom-xs">
                        <span class="text-xs text-muted">Active Workload</span>
                        <span class="text-xs font-bold">${activeCount} active / ${totalCount} total</span>
                    </div>
                    <div class="workload-progress-bar">
                        <div class="workload-fill" style="width: ${workloadPct}%;"></div>
                    </div>
                </div>

                <div class="dept-footer space-between">
                    <span class="badge badge-secondary">${state.team.filter(t => t.department === dept.name).length} Technicians</span>
                    <button class="btn btn-outline-primary btn-sm" onclick="filterByDepartment('${dept.name}')">
                        View Tickets &rarr;
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filterByDepartment(deptName) {
    switchSection("complaints");
    document.getElementById("filter-department").value = deptName;
    applyComplaintFilters();
}

// --- MAINTENANCE TEAM PAGE & REGISTRATION ---
function renderMaintenanceTeam() {
    const container = document.getElementById("maintenance-team-container");
    if (!container) return;

    if (state.team.length === 0) {
        container.innerHTML = `<div class="empty-state-card glass-card"><h4>No Maintenance Staff Registered</h4></div>`;
        return;
    }

    container.innerHTML = state.team.map(mem => `
        <div class="team-card glass-card">
            <div class="team-avatar-row">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80" alt="${mem.name}" class="team-avatar">
                <div>
                    <h3>${mem.name}</h3>
                    <p class="text-xs text-primary font-bold">${mem.department}</p>
                    <span class="badge ${mem.availability === 'Available' ? 'badge-success' : 'badge-warning'} margin-top-xs">${mem.availability}</span>
                </div>
            </div>

            <div class="team-details text-sm">
                <div><i class="fa-solid fa-wrench text-muted"></i> ${mem.specialization}</div>
                <div><i class="fa-solid fa-phone text-muted"></i> ${mem.phone}</div>
                <div><i class="fa-solid fa-envelope text-muted"></i> ${mem.email}</div>
                <div><i class="fa-solid fa-list-check text-muted"></i> Assigned Tickets: <strong>${mem.assignedCount}</strong></div>
            </div>

            <div class="team-actions space-between margin-top-sm">
                <button class="btn btn-outline-danger btn-sm" onclick="deleteMember('${mem.id}')">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
                <button class="btn btn-outline-primary btn-sm" onclick="filterByAssignee('${mem.name}')">
                    Assigned Tickets
                </button>
            </div>
        </div>
    `).join('');
}

function filterByAssignee(staffName) {
    switchSection("complaints");
    document.getElementById("filter-search").value = staffName;
    applyComplaintFilters();
}

function openRegisterMemberModal() {
    document.getElementById("register-member-form").reset();
    document.getElementById("modal-register-member").classList.remove("hidden");
}

function handleRegisterMember() {
    const name = document.getElementById("mem-name").value.trim();
    const dept = document.getElementById("mem-department").value;
    const spec = document.getElementById("mem-specialization").value.trim();
    const phone = document.getElementById("mem-phone").value.trim();
    const email = document.getElementById("mem-email").value.trim();
    const avail = document.getElementById("mem-availability").value;

    if (!name || !spec || !phone || !email) {
        showToast("Please complete all required technician details", "error");
        return;
    }

    const newMem = {
        id: `MEM-${100 + state.team.length + 1}`,
        name: name,
        department: dept,
        specialization: spec,
        phone: phone,
        email: email,
        availability: avail,
        assignedCount: 0
    };

    state.team.push(newMem);
    saveStateToStorage();

    closeModal("modal-register-member");
    showToast(`Registered maintenance member ${name} successfully!`, "success");
    renderMaintenanceTeam();
}

function deleteMember(memId) {
    promptConfirmation(
        "Delete Maintenance Staff",
        "Are you sure you want to remove this staff member from the directory?",
        () => {
            state.team = state.team.filter(m => m.id !== memId);
            saveStateToStorage();
            renderMaintenanceTeam();
            showToast("Maintenance member removed.", "info");
        }
    );
}

// --- NOTIFICATIONS PAGE ---
function renderNotifications() {
    const fullContainer = document.getElementById("notifications-full-container");
    const miniContainer = document.getElementById("mini-notification-list");

    if (fullContainer) {
        if (state.notifications.length === 0) {
            fullContainer.innerHTML = `<div class="empty-state-card"><h4>No Notifications</h4></div>`;
        } else {
            fullContainer.innerHTML = state.notifications.map(n => `
                <div class="notif-card-full ${n.read ? '' : 'unread'}">
                    <div class="notif-icon bg-${n.type === 'danger' ? 'rose' : n.type === 'success' ? 'emerald' : 'purple'}-light text-${n.type === 'danger' ? 'rose' : n.type === 'success' ? 'emerald' : 'purple'}">
                        <i class="fa-solid ${n.type === 'danger' ? 'fa-triangle-exclamation' : n.type === 'success' ? 'fa-check' : 'fa-bell'}"></i>
                    </div>
                    <div class="notif-body">
                        <h4 class="notif-title">${n.title}</h4>
                        <p class="text-sm text-muted">${n.message}</p>
                        <span class="notif-time">${n.date}</span>
                    </div>
                    <div class="notif-full-actions">
                        ${!n.read ? `<button class="btn btn-outline-primary btn-sm" onclick="markNotifRead('${n.id}')">Mark Read</button>` : ''}
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteNotif('${n.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }

    if (miniContainer) {
        miniContainer.innerHTML = state.notifications.slice(0, 4).map(n => `
            <div class="notif-item-mini ${n.read ? '' : 'unread'}" onclick="markNotifRead('${n.id}')">
                <div class="notif-icon bg-${n.type === 'danger' ? 'rose' : 'purple'}-light text-${n.type === 'danger' ? 'rose' : 'purple'}">
                    <i class="fa-solid fa-bell"></i>
                </div>
                <div class="notif-body">
                    <div class="notif-title">${n.title}</div>
                    <small class="notif-time">${n.date}</small>
                </div>
            </div>
        `).join('');
    }

    updateBadgesCount();
}

function markNotifRead(id) {
    const n = state.notifications.find(item => item.id === id);
    if (n) {
        n.read = true;
        saveStateToStorage();
        renderNotifications();
    }
}

function markAllNotificationsRead() {
    state.notifications.forEach(n => n.read = true);
    saveStateToStorage();
    renderNotifications();
    showToast("All notifications marked as read.", "info");
}

function clearAllNotifications() {
    state.notifications = [];
    saveStateToStorage();
    renderNotifications();
    showToast("All notifications cleared.", "info");
}

function deleteNotif(id) {
    state.notifications = state.notifications.filter(n => n.id !== id);
    saveStateToStorage();
    renderNotifications();
}

function updateBadgesCount() {
    const unreadCount = state.notifications.filter(n => !n.read).length;
    const pendingTickets = state.complaints.filter(c => c.status !== "Resolved" && c.status !== "Closed").length;

    const navCompBadge = document.getElementById("nav-badge-complaints");
    if (navCompBadge) navCompBadge.innerText = pendingTickets;

    const navNotifBadge = document.getElementById("nav-badge-notifications");
    if (navNotifBadge) navNotifBadge.innerText = unreadCount;

    const bellDot = document.getElementById("bell-unread-dot");
    if (bellDot) {
        if (unreadCount > 0) bellDot.classList.remove("hidden");
        else bellDot.classList.add("hidden");
    }
}

// --- COMPLAINT DETAIL MODAL & MANAGEMENT ---
function openComplaintDetails(id) {
    const complaint = state.complaints.find(c => c.id === id);
    if (!complaint) return;

    state.currentComplaintInModal = complaint;

    document.getElementById("md-complaint-id").innerText = complaint.id;
    document.getElementById("md-complaint-title").innerText = complaint.title;
    document.getElementById("md-student-name").innerText = complaint.studentName;
    document.getElementById("md-student-id").innerText = complaint.studentId;
    document.getElementById("md-student-dept").innerText = complaint.department;
    document.getElementById("md-email").innerText = complaint.email;
    document.getElementById("md-phone").innerText = complaint.phone;
    document.getElementById("md-location").innerText = complaint.location;
    document.getElementById("md-date").innerText = complaint.date;
    document.getElementById("md-description").innerText = complaint.description;

    document.getElementById("md-category").innerText = complaint.category;
    document.getElementById("md-priority").innerText = complaint.priority;
    document.getElementById("md-department").innerText = complaint.targetDepartment;

    const statusBadge = document.getElementById("md-status");
    statusBadge.innerText = complaint.status;
    statusBadge.className = `badge ${complaint.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`;

    document.getElementById("md-tech-name").innerText = complaint.assignedTo;
    document.getElementById("md-tech-dept").innerText = `${complaint.targetDepartment} Specialist`;

    // Populate Technicians dropdown
    const techSelect = document.getElementById("md-assignee-select");
    const matchingTechs = state.team.filter(t => t.department === complaint.targetDepartment);
    techSelect.innerHTML = `<option value="Unassigned">Unassigned</option>` +
        matchingTechs.map(t => `<option value="${t.name}" ${t.name === complaint.assignedTo ? 'selected' : ''}>${t.name} (${t.specialization})</option>`).join('');

    document.getElementById("md-status-select").value = complaint.status;

    // Toggle Resolve / Reopen buttons
    const resolveBtn = document.getElementById("btn-mark-resolved");
    const reopenBtn = document.getElementById("btn-reopen-complaint");

    if (complaint.status === "Resolved" || complaint.status === "Closed") {
        resolveBtn.classList.add("hidden");
        reopenBtn.classList.remove("hidden");
    } else {
        resolveBtn.classList.remove("hidden");
        reopenBtn.classList.add("hidden");
    }

    // Media Previews
    const imageBox = document.getElementById("md-image-box");
    if (complaint.image) {
        document.getElementById("md-image-img").src = complaint.image;
        imageBox.classList.remove("hidden");
    } else {
        imageBox.classList.add("hidden");
    }

    const audioBox = document.getElementById("md-audio-box");
    if (complaint.audio) {
        document.getElementById("md-audio-player").src = complaint.audio.url;
        audioBox.classList.remove("hidden");
    } else {
        audioBox.classList.add("hidden");
    }

    // Lifecycle Timeline Active State
    updateTimelineFlow(complaint.status);

    document.getElementById("modal-complaint-detail").classList.remove("hidden");
}

function updateTimelineFlow(status) {
    const steps = ["Submitted", "AI Analysed", "Assigned", "In Progress", "Resolved"];
    let activeIdx = steps.indexOf(status);
    if (activeIdx === -1) activeIdx = 1;

    const stepItems = document.querySelectorAll(".status-steps .step-item");
    const stepLines = document.querySelectorAll(".status-steps .step-line");

    stepItems.forEach((item, idx) => {
        if (idx <= activeIdx) {
            item.classList.add("completed");
        } else {
            item.classList.remove("completed");
        }
    });

    stepLines.forEach((line, idx) => {
        if (idx < activeIdx) {
            line.classList.add("active");
        } else {
            line.classList.remove("active");
        }
    });
}

function handleModalStatusChange(newStatus) {
    if (!state.currentComplaintInModal) return;

    state.currentComplaintInModal.status = newStatus;
    saveStateToStorage();

    updateTimelineFlow(newStatus);
    showToast(`Updated ticket ${state.currentComplaintInModal.id} status to '${newStatus}'.`, "success");

    renderAllViews();
}

function handleModalAssigneeChange(newAssignee) {
    if (!state.currentComplaintInModal) return;

    state.currentComplaintInModal.assignedTo = newAssignee;
    if (newAssignee !== "Unassigned" && state.currentComplaintInModal.status === "Pending") {
        state.currentComplaintInModal.status = "Assigned";
    }
    saveStateToStorage();

    document.getElementById("md-tech-name").innerText = newAssignee;
    showToast(`Assigned ${newAssignee} to ticket ${state.currentComplaintInModal.id}.`, "success");

    renderAllViews();
}

function handleQuickResolveFromModal() {
    if (!state.currentComplaintInModal) return;

    promptConfirmation(
        "Mark Ticket as Resolved",
        `Are you sure you want to mark complaint ${state.currentComplaintInModal.id} as Resolved?`,
        () => {
            state.currentComplaintInModal.status = "Resolved";
            saveStateToStorage();

            closeModal("modal-complaint-detail");
            showToast(`Ticket ${state.currentComplaintInModal.id} marked as Resolved!`, "success");

            // Add notification
            state.notifications.unshift({
                id: `NT-${Date.now()}`,
                title: "Ticket Resolved",
                message: `Complaint ${state.currentComplaintInModal.id} was marked as Resolved.`,
                date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                read: false,
                type: "success"
            });

            renderAllViews();
        }
    );
}

function handleReopenFromModal() {
    if (!state.currentComplaintInModal) return;

    state.currentComplaintInModal.status = "In Progress";
    saveStateToStorage();

    closeModal("modal-complaint-detail");
    showToast(`Complaint ${state.currentComplaintInModal.id} reopened!`, "info");

    renderAllViews();
}

function handleDeleteFromModal() {
    if (!state.currentComplaintInModal) return;
    promptDeleteComplaint(state.currentComplaintInModal.id);
}

function promptDeleteComplaint(id) {
    promptConfirmation(
        "Delete Ticket",
        `Are you sure you want to permanently delete complaint ${id}?`,
        () => {
            state.complaints = state.complaints.filter(c => c.id !== id);
            saveStateToStorage();

            closeModal("modal-complaint-detail");
            showToast(`Deleted complaint ${id}`, "info");

            renderAllViews();
        }
    );
}

// --- EDIT COMPLAINT MODAL ---
function openEditComplaintModal(id) {
    const c = state.complaints.find(item => item.id === id);
    if (!c) return;

    document.getElementById("edit-complaint-id").value = c.id;
    document.getElementById("edit-title").value = c.title;
    document.getElementById("edit-category").value = c.category;
    document.getElementById("edit-priority").value = c.priority;
    document.getElementById("edit-department").value = c.targetDepartment;
    document.getElementById("edit-location").value = c.location;
    document.getElementById("edit-description").value = c.description;

    document.getElementById("modal-edit-complaint").classList.remove("hidden");
}

function saveEditedComplaint() {
    const id = document.getElementById("edit-complaint-id").value;
    const c = state.complaints.find(item => item.id === id);
    if (!c) return;

    c.title = document.getElementById("edit-title").value.trim();
    c.category = document.getElementById("edit-category").value;
    c.priority = document.getElementById("edit-priority").value;
    c.targetDepartment = document.getElementById("edit-department").value;
    c.location = document.getElementById("edit-location").value.trim();
    c.description = document.getElementById("edit-description").value.trim();

    saveStateToStorage();
    closeModal("modal-edit-complaint");
    showToast(`Updated complaint ${id} details successfully!`, "success");

    renderAllViews();
}

// --- REPORTS & CHART.JS ENGINE ---
function renderReportsCharts() {
    if (typeof Chart === 'undefined') return;

    // 1. Category Chart
    const catData = {};
    state.complaints.forEach(c => { catData[c.category] = (catData[c.category] || 0) + 1; });

    createOrUpdateChart("chart-category", 'doughnut', {
        labels: Object.keys(catData),
        datasets: [{
            data: Object.values(catData),
            backgroundColor: ['#2563eb', '#7c3aed', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899']
        }]
    });

    // 2. Department Workload Chart
    const deptData = {};
    state.complaints.forEach(c => { deptData[c.targetDepartment] = (deptData[c.targetDepartment] || 0) + 1; });

    createOrUpdateChart("chart-department", 'bar', {
        labels: Object.keys(deptData),
        datasets: [{
            label: 'Tickets',
            data: Object.values(deptData),
            backgroundColor: '#2563eb'
        }]
    });

    // 3. Status Chart
    const statusData = { Pending: 0, "In Progress": 0, Resolved: 0 };
    state.complaints.forEach(c => {
        if (c.status === "Resolved" || c.status === "Closed") statusData.Resolved++;
        else if (c.status === "In Progress" || c.status === "Assigned") statusData["In Progress"]++;
        else statusData.Pending++;
    });

    createOrUpdateChart("chart-status", 'pie', {
        labels: Object.keys(statusData),
        datasets: [{
            data: Object.values(statusData),
            backgroundColor: ['#f59e0b', '#7c3aed', '#10b981']
        }]
    });

    // 4. Priority Chart
    const prioData = { High: 0, Medium: 0, Low: 0 };
    state.complaints.forEach(c => { prioData[c.priority] = (prioData[c.priority] || 0) + 1; });

    createOrUpdateChart("chart-priority", 'bar', {
        labels: Object.keys(prioData),
        datasets: [{
            label: 'Count',
            data: Object.values(prioData),
            backgroundColor: ['#ef4444', '#f59e0b', '#94a3b8']
        }]
    });
}

function createOrUpdateChart(canvasId, type, chartData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (state.chartInstances[canvasId]) {
        state.chartInstances[canvasId].destroy();
    }

    state.chartInstances[canvasId] = new Chart(canvas, {
        type: type,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// --- CSV EXPORT GENERATOR ---
function exportComplaintsToCSV() {
    if (state.complaints.length === 0) {
        showToast("No complaint records to export.", "error");
        return;
    }

    const headers = ["ID", "Student Name", "Student ID", "Department", "Title", "Category", "Location", "Priority", "Target Department", "Status", "Date"];
    const rows = state.complaints.map(c => [
        `"${c.id}"`,
        `"${c.studentName}"`,
        `"${c.studentId}"`,
        `"${c.department}"`,
        `"${c.title.replace(/"/g, '""')}"`,
        `"${c.category}"`,
        `"${c.location.replace(/"/g, '""')}"`,
        `"${c.priority}"`,
        `"${c.targetDepartment}"`,
        `"${c.status}"`,
        `"${c.date}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ResolveMate_Complaints_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Downloaded CSV Complaint Report successfully!", "success");
}

// --- PROFILE EDITING ---
function openEditProfileModal() {
    document.getElementById("prof-input-name").value = state.currentUser.name;
    document.getElementById("prof-input-email").value = state.currentUser.email;
    document.getElementById("prof-input-phone").value = state.currentUser.phone;
    document.getElementById("prof-input-dept").value = state.currentUser.dept;
    document.getElementById("prof-input-id").value = state.currentUser.id;

    document.getElementById("modal-edit-profile").classList.remove("hidden");
}

function handleSaveProfile() {
    state.currentUser.name = document.getElementById("prof-input-name").value.trim();
    state.currentUser.email = document.getElementById("prof-input-email").value.trim();
    state.currentUser.phone = document.getElementById("prof-input-phone").value.trim();
    state.currentUser.dept = document.getElementById("prof-input-dept").value.trim();
    state.currentUser.id = document.getElementById("prof-input-id").value.trim();

    saveStateToStorage();
    updateUserInterfaceWithSession();
    closeModal("modal-edit-profile");

    showToast("Profile information updated!", "success");
}

function promptAvatarChange() {
    const newUrl = prompt("Enter Image URL for profile avatar:", state.currentUser.avatar);
    if (newUrl) {
        state.currentUser.avatar = newUrl;
        saveStateToStorage();
        updateUserInterfaceWithSession();
        showToast("Profile avatar updated.", "success");
    }
}

// --- SETTINGS & PREFERENCES ---
function toggleDarkMode(enabled) {
    state.settings.darkMode = enabled;
    saveStateToStorage();

    if (enabled) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    }
}

function toggleCompactTables(enabled) {
    state.settings.compactTables = enabled;
    saveStateToStorage();

    if (enabled) document.body.classList.add("compact-tables");
    else document.body.classList.remove("compact-tables");
}

function updateSettingsState() {
    state.settings.inAppAlerts = document.getElementById("setting-toggle-inapp")?.checked;
    state.settings.emailAlerts = document.getElementById("setting-toggle-email")?.checked;
    state.settings.smsAlerts = document.getElementById("setting-toggle-sms")?.checked;
    saveStateToStorage();
}

function promptResetDemoData() {
    promptConfirmation(
        "Reset System Demo Data",
        "This action will clear all custom complaints, restore initial demo dataset, and reset settings. Continue?",
        () => {
            localStorage.clear();
            loadStateFromStorage();
            renderAllViews();
            showToast("System demo data restored successfully!", "success");
        }
    );
}

// --- LANGUAGE SWITCHING (ENGLISH / TAMIL) ---
function toggleLanguage() {
    const nextLang = state.settings.language === "en" ? "ta" : "en";
    setLanguage(nextLang);
}

function changeLanguageFromSettings(lang) {
    setLanguage(lang);
}

function setLanguage(lang) {
    state.settings.language = lang;
    saveStateToStorage();

    document.getElementById("current-lang-text").innerText = lang === "en" ? "தமிழ்" : "English";
    const selectSetting = document.getElementById("setting-language-select");
    if (selectSetting) selectSetting.value = lang;

    const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.en;

    const translatableElems = document.querySelectorAll("[data-i18n]");
    translatableElems.forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (dictionary[key]) {
            elem.innerText = dictionary[key];
        }
    });

    showToast(`Language switched to ${lang === 'ta' ? 'தமிழ் (Tamil)' : 'English'}`, "info");
}

// --- MODAL UTILITIES ---
function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

function promptConfirmation(title, message, callback) {
    document.getElementById("confirm-title").innerText = title;
    document.getElementById("confirm-msg").innerText = message;

    const actionBtn = document.getElementById("btn-confirm-action");
    actionBtn.onclick = function() {
        closeModal("modal-confirm");
        callback();
    };

    document.getElementById("modal-confirm").classList.remove("hidden");
}

// --- TOAST ALERTS ---
function showToast(message, type = "info") {
    if (!state.settings.inAppAlerts && type !== "error") return;

    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
