import { QuizQuestion, QuizSection } from '../types';

export const SECTION_METADATA: Record<QuizSection, { label: string; badgeColor: string; description: string }> = {
  ALL: {
    label: 'All Modules (Master Bank)',
    badgeColor: 'from-cyan-500 to-blue-500',
    description: 'Comprehensive 90-question master examination covering the full ecosystem.',
  },
  NOMENCLATURE: {
    label: 'Acronyms & Nomenclature',
    badgeColor: 'from-sky-400 to-cyan-500',
    description: 'FWTA, ALIANCE, GENESIS, SANSOLS, HAVEN, EXPRT, SAFHIS, NSIC & Legal Definitions (15 Scenarios).',
  },
  JOBSARAWAK: {
    label: 'JobSarawak Process Flows',
    badgeColor: 'from-emerald-400 to-teal-500',
    description: 'Local vs Non-Sarawakian talent workflows, PERKESO approvals, and Hiring Outcome Reports (15 Scenarios).',
  },
  SANSOLS: {
    label: 'SANSOLS Procedural Routing',
    badgeColor: 'from-blue-500 to-indigo-500',
    description: 'General & Skilled Workers, AP Quota approvals, JTKS Labour Licences, and eVDR (15 Scenarios).',
  },
  EXPRT: {
    label: 'EXPRT Expatriate Platform',
    badgeColor: 'from-violet-400 to-purple-500',
    description: 'Expatriate recruitment, JKLE recommendations, JIMS VDR/eVisa, and Understudy rules (15 Scenarios).',
  },
  HAVEN: {
    label: 'HAVEN Domestic Helpers',
    badgeColor: 'from-amber-400 to-orange-500',
    description: 'Foreign Domestic Helpers (FDH), PDRM recommendations, and PLKS workflows (15 Scenarios).',
  },
  ACCOUNTS: {
    label: 'Accounts, SSO & Escalation',
    badgeColor: 'from-rose-400 to-pink-500',
    description: 'Company account rules, PIC rights, 2FA security, suspension rules, and SSO escalation (15 Scenarios).',
  },
};

export const MASTER_QUESTIONS: QuizQuestion[] = [
  {
    "id": "nom-1",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does FWTA stand for?",
    "options": [
      {
        "text": "Foreign Workers Transformation Approach",
        "correct": true,
        "reason": "CORRECT! FWTA is the umbrella project approach for foreign worker management."
      },
      {
        "text": "Foreign Workforce Transfer Authority",
        "correct": false,
        "reason": "INCORRECT! FWTA stands for Foreign Workers Transformation Approach."
      },
      {
        "text": "Foreign Worker Transition Assessment",
        "correct": false,
        "reason": "INCORRECT! FWTA stands for Foreign Workers Transformation Approach."
      }
    ]
  },
  {
    "id": "nom-2",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does ALIANCE stand for?",
    "options": [
      {
        "text": "Advanced Labour & Immigration Aligned Network for Compliance",
        "correct": true,
        "reason": "CORRECT! ALIANCE is the core ecosystem aligning labour and immigration processes."
      },
      {
        "text": "Automated Labour & Immigration Clearance Engine",
        "correct": false,
        "reason": "INCORRECT! ALIANCE stands for Advanced Labour & Immigration Aligned Network for Compliance."
      },
      {
        "text": "Agency for Labour, Immigration & Compliance Enforcement",
        "correct": false,
        "reason": "INCORRECT! ALIANCE stands for Advanced Labour & Immigration Aligned Network for Compliance."
      }
    ]
  },
  {
    "id": "nom-3",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does GENESIS stand for?",
    "options": [
      {
        "text": "Gateway & Employment for Non-Sarawakians via Sarawak's Integrated System",
        "correct": true,
        "reason": "CORRECT! GENESIS acts as the central portal hosting modules like JobSarawak, SANSOLS, HAVEN, and EXPRT."
      },
      {
        "text": "General Employment Network for Sarawak Immigration Services",
        "correct": false,
        "reason": "INCORRECT! GENESIS stands for Gateway & Employment for Non-Sarawakians via Sarawak's Integrated System."
      },
      {
        "text": "Government Enforcement System for Non-Sarawakians",
        "correct": false,
        "reason": "INCORRECT! GENESIS stands for Gateway & Employment for Non-Sarawakians via Sarawak's Integrated System."
      }
    ]
  },
  {
    "id": "nom-4",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does SANSOLS stand for?",
    "options": [
      {
        "text": "Sarawak Advanced Non-Sarawakian Online Labour System",
        "correct": true,
        "reason": "CORRECT! SANSOLS manages procedural routing for General & Skilled Non-Sarawakian Workers."
      },
      {
        "text": "Sarawak Non-Sarawakian Online Licensing System",
        "correct": false,
        "reason": "INCORRECT! SANSOLS stands for Sarawak Advanced Non-Sarawakian Online Labour System."
      },
      {
        "text": "System Automation for Non-Sarawakian Operations",
        "correct": false,
        "reason": "INCORRECT! SANSOLS stands for Sarawak Advanced Non-Sarawakian Online Labour System."
      }
    ]
  },
  {
    "id": "nom-5",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does HAVEN stand for?",
    "options": [
      {
        "text": "Household and Assistance Vetting & Employment Network",
        "correct": true,
        "reason": "CORRECT! HAVEN processes Foreign Domestic Helpers (FDH)."
      },
      {
        "text": "Household Assistance & Verification Entry Network",
        "correct": false,
        "reason": "INCORRECT! HAVEN stands for Household and Assistance Vetting & Employment Network."
      },
      {
        "text": "Home Assistant & Verification Entry Nexus",
        "correct": false,
        "reason": "INCORRECT! HAVEN stands for Household and Assistance Vetting & Employment Network."
      }
    ]
  },
  {
    "id": "nom-6",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does EXPRT stand for?",
    "options": [
      {
        "text": "Expatriate Platform for Recruitment & Talent",
        "correct": true,
        "reason": "CORRECT! EXPRT is dedicated to recruitment and pass processing for Expatriates."
      },
      {
        "text": "Expatriate Processing & Renewal Tool",
        "correct": false,
        "reason": "INCORRECT! EXPRT stands for Expatriate Platform for Recruitment & Talent."
      },
      {
        "text": "Executive Pass Renewal & Tracking Portal",
        "correct": false,
        "reason": "INCORRECT! EXPRT stands for Expatriate Platform for Recruitment & Talent."
      }
    ]
  },
  {
    "id": "nom-7",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does eVDR stand for?",
    "options": [
      {
        "text": "Elektronik Visa Dengan Rujukan",
        "correct": true,
        "reason": "CORRECT! eVDR represents Electronic Visa with Reference."
      },
      {
        "text": "Employer Visa Direct Referral",
        "correct": false,
        "reason": "INCORRECT! eVDR stands for Elektronik Visa Dengan Rujukan."
      },
      {
        "text": "Electronic Verified Document Registration",
        "correct": false,
        "reason": "INCORRECT! eVDR stands for Elektronik Visa Dengan Rujukan."
      }
    ]
  },
  {
    "id": "nom-8",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does SAFHIS stand for?",
    "options": [
      {
        "text": "Sarawak Foreigners Health Information System",
        "correct": true,
        "reason": "CORRECT! SAFHIS manages health and medical examination workflows."
      },
      {
        "text": "Sarawak Foreign Worker Health Inspection System",
        "correct": false,
        "reason": "INCORRECT! SAFHIS stands for Sarawak Foreigners Health Information System."
      },
      {
        "text": "State Automated Foreign Health Integration Services",
        "correct": false,
        "reason": "INCORRECT! SAFHIS stands for Sarawak Foreigners Health Information System."
      }
    ]
  },
  {
    "id": "nom-9",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What digital reports comprise SAFHIS output?",
    "options": [
      {
        "text": "Electronic Medical Report (EMR), Electronic X-Ray Report (EXR), Electronic Laboratory Report (ELR)",
        "correct": true,
        "reason": "CORRECT! SAFHIS health outcomes are composed of EMR, EXR, and ELR."
      },
      {
        "text": "Employee Medical Record, External Examination Record, Employee Leave Record",
        "correct": false,
        "reason": "INCORRECT! SAFHIS comprises EMR, EXR, and ELR."
      },
      {
        "text": "Emergency Medical Referral, Expedited X-Ray Request, Entry Level Report",
        "correct": false,
        "reason": "INCORRECT! SAFHIS comprises EMR, EXR, and ELR."
      }
    ]
  },
  {
    "id": "nom-10",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does NSIC stand for?",
    "options": [
      {
        "text": "Non-Sarawakian Identity Card",
        "correct": true,
        "reason": "CORRECT! NSIC is the physical identity card issued post-eKYC biometric enrollment."
      },
      {
        "text": "National Security Identification Clearance",
        "correct": false,
        "reason": "INCORRECT! NSIC stands for Non-Sarawakian Identity Card."
      },
      {
        "text": "Non-Sarawakian Integration Certificate",
        "correct": false,
        "reason": "INCORRECT! NSIC stands for Non-Sarawakian Identity Card."
      }
    ]
  },
  {
    "id": "nom-11",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does FORCES stand for?",
    "options": [
      {
        "text": "Foreign Workers Operations Regulation Coordination Enforcement System",
        "correct": true,
        "reason": "CORRECT! FORCES handles validation, status management, and border control monitoring."
      },
      {
        "text": "Foreign Worker Oversight & Enforcement System",
        "correct": false,
        "reason": "INCORRECT! FORCES stands for Foreign Workers Operations Regulation Coordination Enforcement System."
      },
      {
        "text": "Federal Operations & Regional Compliance System",
        "correct": false,
        "reason": "INCORRECT! FORCES stands for Foreign Workers Operations Regulation Coordination Enforcement System."
      }
    ]
  },
  {
    "id": "nom-12",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What do ILC and ILV represent under Infrastructure?",
    "options": [
      {
        "text": "Immigration & Labour Integrated Center and Immigration & Labour Integrated Vehicle",
        "correct": true,
        "reason": "CORRECT! ILC is the physical center and ILV is the mobile infrastructure unit."
      },
      {
        "text": "Identity Verification Center and Identity Verification Vehicle",
        "correct": false,
        "reason": "INCORRECT! They stand for Immigration & Labour Integrated Center and Vehicle."
      },
      {
        "text": "Immigration Licensing Counter and Vehicle",
        "correct": false,
        "reason": "INCORRECT! They stand for Immigration & Labour Integrated Center and Vehicle."
      }
    ]
  },
  {
    "id": "nom-13",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] How is a Non-Sarawakian legally defined under the framework?",
    "options": [
      {
        "text": "Non-Resident Employee under Labour Ordinance Cap. 76, person without 'K' in IC, Permanent Resident, or ties outside Sarawak",
        "correct": true,
        "reason": "CORRECT! Grounded in the explicit legal definition in the FWTA Framework."
      },
      {
        "text": "Any individual holding a foreign passport exclusively",
        "correct": false,
        "reason": "INCORRECT! Includes Non-Resident Employees under Cap. 76, non-'K' IC holders, PRs, or primary legal ties outside Sarawak."
      },
      {
        "text": "Any non-Malaysian citizen residing temporarily in Kuching",
        "correct": false,
        "reason": "INCORRECT! Includes Non-Resident Employees under Cap. 76, non-'K' IC holders, PRs, or primary legal ties outside Sarawak."
      }
    ]
  },
  {
    "id": "nom-14",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] What does PLKS stand for?",
    "options": [
      {
        "text": "Pas Lawatan Kerja Sementara",
        "correct": true,
        "reason": "CORRECT! PLKS stands for Pas Lawatan Kerja Sementara (Temporary Employment Visit Pass)."
      },
      {
        "text": "Pas Latihan Kerja Sarawakian",
        "correct": false,
        "reason": "INCORRECT! PLKS stands for Pas Lawatan Kerja Sementara."
      },
      {
        "text": "Permit Legal Foreign Worker Scheme",
        "correct": false,
        "reason": "INCORRECT! PLKS stands for Pas Lawatan Kerja Sementara."
      }
    ]
  },
  {
    "id": "nom-15",
    "section": "NOMENCLATURE",
    "sectionTitle": "Acronyms & Nomenclature",
    "text": "[NOMENCLATURE] According to the provided document, what defines a Non-Sarawakian / Expatriate worker context?",
    "options": [
      {
        "text": "Any individual whose official place of origin, birth, and primary legal ties are outside of Sarawak, or who lacks the 'K' indicator on their Identification Card.",
        "correct": true,
        "reason": "CORRECT! A Non-Sarawakian is defined by origin/ties outside Sarawak or the absence of the 'K' indicator on their IC."
      },
      {
        "text": "Any Malaysian citizen who holds a valid MyKad regardless of whether the 'K' indicator is present on the card.",
        "correct": false,
        "reason": "INCORRECT! The 'K' indicator is the critical differentiator for legal ties to Sarawak."
      },
      {
        "text": "Any foreign national whose employment contract in Sarawak exceeds a continuous period of six consecutive months.",
        "correct": false,
        "reason": "INCORRECT! Definition relies on legal ties and the 'K' IC indicator rather than contract duration."
      }
    ]
  },
  {
    "id": "job-1",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What is the first procedural step for an Employer recruiting Local Talent?",
    "options": [
      {
        "text": "Employer creates and posts job advertisement (by default 14 working days)",
        "correct": true,
        "reason": "CORRECT! The employer initiates recruitment by creating and posting a job advertisement for a default 14 working days period."
      },
      {
        "text": "Employer applies for Hiring Outcome Report",
        "correct": false,
        "reason": "INCORRECT! Hiring Outcome Reports are mandatory for Non-Sarawakian talent applications and are not part of the Local Talent flow."
      },
      {
        "text": "PERKESO Admin approves job draft",
        "correct": false,
        "reason": "INCORRECT! Local Talent job postings are posted directly by the employer without a PERKESO draft review step."
      }
    ]
  },
  {
    "id": "job-2",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] How does candidate selection initiate in Local Talent recruitment?",
    "options": [
      {
        "text": "Job Seeker applies for the job advertisement",
        "correct": true,
        "reason": "CORRECT! Job seekers initiate the selection process by applying directly to the active job posting."
      },
      {
        "text": "Employer schedules physical interview directly",
        "correct": false,
        "reason": "INCORRECT! Candidates must first apply to the job advertisement before an employer can schedule interviews."
      },
      {
        "text": "PERKESO assigns local candidates",
        "correct": false,
        "reason": "INCORRECT! Local applicants submit applications directly through JobSarawak without automated agency assignments."
      }
    ]
  },
  {
    "id": "job-3",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What is the concluding action for an Employer in Local Talent recruitment?",
    "options": [
      {
        "text": "Employer schedules interview with candidates applied (physical/online)",
        "correct": true,
        "reason": "CORRECT! The Local Talent process finishes with the employer setting up physical or online interviews with applicants."
      },
      {
        "text": "Employer generates a Hiring Outcome Report",
        "correct": false,
        "reason": "INCORRECT! Hiring Outcome Reports are reserved exclusively for Non-Sarawakian workforce streams."
      },
      {
        "text": "Employer requests Labour Licence from JTKS",
        "correct": false,
        "reason": "INCORRECT! Labour Licences are regulatory compliance documents required for Non-Sarawakian workers, not local employees."
      }
    ]
  },
  {
    "id": "job-4",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What initiates the Non-Sarawakian Talent recruitment routing?",
    "options": [
      {
        "text": "Employer applies for job advertisement draft and posts in JobSarawak for 14 working days",
        "correct": true,
        "reason": "CORRECT! Non-Sarawakian Talent recruitment begins with the employer applying for a job advertisement draft and posting the listing for 14 working days."
      },
      {
        "text": "Employer posts advertisement immediately without draft submission",
        "correct": false,
        "reason": "INCORRECT! Non-Sarawakian hiring workflows strictly require initial draft submission for PERKESO administrative review."
      },
      {
        "text": "PERKESO posts advertisement automatically",
        "correct": false,
        "reason": "INCORRECT! The employer must manually create and submit the initial job draft."
      }
    ]
  },
  {
    "id": "job-5",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What approval actions are executed by PERKESO Admin for Non-Sarawakian Talent?",
    "options": [
      {
        "text": "Approve job position and approve job advertisement draft",
        "correct": true,
        "reason": "CORRECT! The Non-Sarawakian process requires PERKESO Admin to approve both the job position and the job advertisement draft."
      },
      {
        "text": "Issue Labour Licence and Approval in Principle (AP)",
        "correct": false,
        "reason": "INCORRECT! APs are approved by the State Secretary/ILMU, while Labour Licences are granted by JTKS."
      },
      {
        "text": "Verify eKYC biometrics",
        "correct": false,
        "reason": "INCORRECT! Biometric verification (eKYC) takes place during NSIC card collection."
      }
    ]
  },
  {
    "id": "job-6",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What interview step is required for Non-Sarawakian Talent recruitment?",
    "options": [
      {
        "text": "Employer attends PERKESO open interview session with candidates (physical/online)",
        "correct": true,
        "reason": "CORRECT! The Non-Sarawakian recruitment pipeline specifies that employers must participate in a PERKESO open interview session (physical or online)."
      },
      {
        "text": "Employer conducts private internal interviews without agency oversight",
        "correct": false,
        "reason": "INCORRECT! System rules explicitly mandate participation in a PERKESO open interview session."
      },
      {
        "text": "JTKS Officer conducts candidate vetting on site",
        "correct": false,
        "reason": "INCORRECT! JTKS officers manage site inspections for AP approvals rather than candidate interviewing."
      }
    ]
  },
  {
    "id": "job-7",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What is the output of the Hiring Outcome Report (HOR) process?",
    "options": [
      {
        "text": "Real-time Generated Hiring Outcome Report",
        "correct": true,
        "reason": "CORRECT! Completing the hiring report submission yields a Real-time Generated Hiring Outcome Report sent via email notification."
      },
      {
        "text": "Approved Approval in Principle (AP)",
        "correct": false,
        "reason": "INCORRECT! The HOR is an upstream prerequisite document required to apply for an AP in SANSOLS."
      },
      {
        "text": "Automatic Non-Sarawakian Identity Card (NSIC)",
        "correct": false,
        "reason": "INCORRECT! NSIC issuance occurs at the end of the onboarding process after medical and visa steps."
      }
    ]
  },
  {
    "id": "job-8",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] Which categories require a Hiring Outcome Report?",
    "options": [
      {
        "text": "General/Skilled Worker and Expatriate (excluding Key-post, Specialist, Shareholder, Cross-posting)",
        "correct": true,
        "reason": "CORRECT! JobSarawak mandates an HOR for General/Skilled Workers and Expatriate positions, excluding designated executive and specialized roles."
      },
      {
        "text": "Local Sarawakian talent and domestic helpers",
        "correct": false,
        "reason": "INCORRECT! Local talent and HAVEN domestic helpers follow separate flows that do not utilize HORs."
      },
      {
        "text": "All Expatriate positions without exception",
        "correct": false,
        "reason": "INCORRECT! Specific expatriate designations are explicitly exempt from the HOR requirement."
      }
    ]
  },
  {
    "id": "job-9",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] Which Expatriate roles are explicitly EXEMPT from the Hiring Outcome Report?",
    "options": [
      {
        "text": "Cross posting/Job rotation, Key-post, Specialist, Shareholder",
        "correct": true,
        "reason": "CORRECT! System rules explicitly exempt Cross posting/Job rotation, Key-post, Specialist, and Shareholder roles from requiring an HOR."
      },
      {
        "text": "General Worker, Skilled Worker, Construction Laborer",
        "correct": false,
        "reason": "INCORRECT! General and Skilled Worker roles are strictly required to obtain an HOR."
      },
      {
        "text": "All positions under Services sector",
        "correct": false,
        "reason": "INCORRECT! HOR exemptions are granted based on specific job categories rather than sector classifications."
      }
    ]
  },
  {
    "id": "job-10",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] Can job posting details be modified after submission in JobSarawak?",
    "options": [
      {
        "text": "No, information is final and cannot be edited once submitted",
        "correct": true,
        "reason": "CORRECT! The JobSarawak interface explicitly warns that posting information is final upon submission and cannot be edited directly."
      },
      {
        "text": "Yes, details can be modified at any point before approval",
        "correct": false,
        "reason": "INCORRECT! Standard user edits are locked after submission; corrections require complete resubmission."
      },
      {
        "text": "Yes, provided an administrative edit fee is paid",
        "correct": false,
        "reason": "INCORRECT! There is no post-submission edit option or fee-based edit capability."
      }
    ]
  },
  {
    "id": "job-11",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What optional attachments can be submitted during Job Listing setup?",
    "options": [
      {
        "text": "Newspaper Attachments",
        "correct": true,
        "reason": "CORRECT! Newspaper attachments are optional during advertisement attachment setup."
      },
      {
        "text": "EPF and SOCSO monthly statements",
        "correct": false,
        "reason": "INCORRECT! Social security and pension statements are not attached during job setup."
      },
      {
        "text": "Radio Attachments",
        "correct": false,
        "reason": "INCORRECT! Radio advertisement proof is mandatory when submitting attachments for HOR generation."
      }
    ]
  },
  {
    "id": "job-12",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What happens to the Hiring Outcome Report once approved by PERKESO?",
    "options": [
      {
        "text": "Pushed to SANSOLS automatically once approved",
        "correct": true,
        "reason": "CORRECT! According to the overall process workflow, an approved Hiring Outcome Report is automatically pushed from JobSarawak to SANSOLS."
      },
      {
        "text": "Sent directly to candidate via SMS",
        "correct": false,
        "reason": "INCORRECT! The HOR is an employer compliance document processed directly within administrative systems."
      },
      {
        "text": "Pushed to JIMS for immediate visa issuance",
        "correct": false,
        "reason": "INCORRECT! The HOR routes into SANSOLS for AP (Approval in Principle) quota applications before immigration processing."
      }
    ]
  },
  {
    "id": "job-13",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] Who is responsible for reviewing and approving the job advertisement draft during initial employer posting?",
    "options": [
      {
        "text": "Admin Pertubuhan Keselamatan Sosial (PERKESO)",
        "correct": true,
        "reason": "Correct. PERKESO reviews and approves both the job position and the job advertisement draft."
      },
      {
        "text": "Admin Jabatan Tenaga Kerja (JTK)",
        "correct": false,
        "reason": "Incorrect. PERKESO approves the job advertisement draft, whereas JTK handles AP verification and Labour Licence approvals."
      },
      {
        "text": "Admin Immigration and Labour Management Unit (ILMU)",
        "correct": false,
        "reason": "Incorrect. PERKESO approves the job advertisement draft, whereas ILMU handles AP recommendations."
      }
    ]
  },
  {
    "id": "job-14",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What happens immediately after PERKESO approves the job advertisement draft?",
    "options": [
      {
        "text": "Employer posts the job advertisement in JobSarawak and optional media",
        "correct": true,
        "reason": "Correct. Once PERKESO approves the draft, the Employer proceeds to post the job advertisement via JobSarawak with optional Radio and Newspaper postings."
      },
      {
        "text": "Employer immediately submits an Approval in Principle (AP) application",
        "correct": false,
        "reason": "Incorrect. The Employer must proceed to run the job advertisement via JobSarawak first before applying for an AP."
      },
      {
        "text": "Employer books a SAFHIS Medical Checkup for the worker",
        "correct": false,
        "reason": "Incorrect. The Employer proceeds with the job advertisement via JobSarawak first; medical checkups occur much later in the hiring process."
      }
    ]
  },
  {
    "id": "job-15",
    "section": "JOBSARAWAK",
    "sectionTitle": "JobSarawak Process Flows",
    "text": "[JOBSARAWAK] What action must the employer complete after the job advertisement period ends?",
    "options": [
      {
        "text": "Employer conducts PERKESO open interviews and submits the Hiring Outcome Report",
        "correct": true,
        "reason": "Correct. Following the job advertisement period, the Employer attends open interviews with candidates and submits the Hiring Outcome Report."
      },
      {
        "text": "Employer directly issues the Labour Licence to the employee",
        "correct": false,
        "reason": "Incorrect. The Employer must submit the Hiring Outcome Report before moving on to apply for an AP and Labour Licence."
      },
      {
        "text": "Employer performs eKYC biometrics verification",
        "correct": false,
        "reason": "Incorrect. The Employer must submit the Hiring Outcome Report after advertising; biometrics take place much later during card processing."
      }
    ]
  },
  {
    "id": "san-1",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Who conducts the site inspection after an Approval in Principle (AP) is applied for?",
    "options": [
      {
        "text": "Admin Jabatan Tenaga Kerja (JTK)",
        "correct": true,
        "reason": "Correct. Admin JTK verifies AP applications, performs necessary site inspections, and routes recommendations."
      },
      {
        "text": "Admin Polis Diraja Malaysia (PDRM)",
        "correct": false,
        "reason": "Incorrect. Admin JTK performs site inspections. PDRM is not involved in SANSOLS AP verification."
      },
      {
        "text": "Operator Service Provider",
        "correct": false,
        "reason": "Incorrect. Admin JTK performs site inspections, whereas Service Providers handle card issuance."
      }
    ]
  },
  {
    "id": "san-2",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Which official grants final approval for the Approval in Principle (AP)?",
    "options": [
      {
        "text": "State Secretary",
        "correct": true,
        "reason": "Correct. Final approval of an Approval in Principle (AP) is granted by the State Secretary following the ILMU Director's recommendation."
      },
      {
        "text": "JTK Director",
        "correct": false,
        "reason": "Incorrect. The State Secretary approves the AP, while the JTK Director approves the Labour Licence."
      },
      {
        "text": "PERKESO Admin",
        "correct": false,
        "reason": "Incorrect. The State Secretary approves the AP. PERKESO only handles job advertisement approvals."
      }
    ]
  },
  {
    "id": "san-3",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What steps must the employer complete after AP approval before obtaining a Labour Licence?",
    "options": [
      {
        "text": "Pay AP fee and apply for Labour Licence with approved AP",
        "correct": true,
        "reason": "Correct. After receiving AP approval, the employer pays the AP fee and submits an application for a Labour Licence using the approved AP."
      },
      {
        "text": "Submit Electronic Medical Report directly to JTK",
        "correct": false,
        "reason": "Incorrect. The employer must pay the AP fee and apply for the Labour Licence first; medical reports occur later in the process."
      },
      {
        "text": "Perform NSIC activation for the Non-Resident Employee",
        "correct": false,
        "reason": "Incorrect. The employer must pay the AP fee and apply for the Labour Licence first; NSIC activation happens toward the end of the workflow."
      }
    ]
  },
  {
    "id": "san-4",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Who signs and approves the Labour Licence?",
    "options": [
      {
        "text": "JTK Director",
        "correct": true,
        "reason": "Correct. After verification and recommendations by PTK Officers and PTK OC, final approval and signature on the Labour Licence are provided by the JTK Director."
      },
      {
        "text": "ILMU Director",
        "correct": false,
        "reason": "Incorrect. The JTK Director signs and approves the Labour Licence, whereas the ILMU Director provides recommendations for APs."
      },
      {
        "text": "State Secretary",
        "correct": false,
        "reason": "Incorrect. The JTK Director signs and approves the Labour Licence, whereas the State Secretary grants AP approvals."
      }
    ]
  },
  {
    "id": "san-5",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What process follows after the employer pays for the Labour Licence for a new application?",
    "options": [
      {
        "text": "Apply for Visa Dengan Rujukan (eVDR)",
        "correct": true,
        "reason": "Correct. After paying for the Labour Licence, the employer applies for an eVDR for new applications."
      },
      {
        "text": "Schedule NSIC Card Collection directly",
        "correct": false,
        "reason": "Incorrect. The employer must apply for an eVDR before undergoing medical checkups and scheduling card collection."
      },
      {
        "text": "Conduct immediate site re-inspection",
        "correct": false,
        "reason": "Incorrect. The employer applies for an eVDR after paying for the Labour Licence."
      }
    ]
  },
  {
    "id": "san-6",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Where does the Non-Resident Employee (NRE) undergo their medical checkup?",
    "options": [
      {
        "text": "In Sarawak at SAFHIS Panel Medical Facilities",
        "correct": true,
        "reason": "Correct. The NRE undergoes their medical checkup within Sarawak at SAFHIS Panel Medical Facilities, which upload the EMR, X-Ray, and Lab reports."
      },
      {
        "text": "In their origin country prior to departure",
        "correct": false,
        "reason": "Incorrect. The medical checkup is explicitly required to be conducted in Sarawak at SAFHIS Panel Medical Facilities."
      },
      {
        "text": "At any local JTK Divisional Office",
        "correct": false,
        "reason": "Incorrect. Medical checkups take place at SAFHIS Panel Medical Facilities, not JTK Divisional Offices."
      }
    ]
  },
  {
    "id": "san-7",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What procedural step takes place during Non-Sarawakian Identity Card (NSIC) processing by the NRE?",
    "options": [
      {
        "text": "Perform eKYC (Biometrics)",
        "correct": true,
        "reason": "Correct. While processing the NSIC card collection, the NRE performs eKYC biometrics verification."
      },
      {
        "text": "Submit Job Advertisement Draft",
        "correct": false,
        "reason": "Incorrect. The NRE performs eKYC biometrics during card processing. Job advertisement drafts are submitted at the beginning of the process."
      },
      {
        "text": "Pay Labour Licence Fee",
        "correct": false,
        "reason": "Incorrect. The NRE performs eKYC biometrics; Labour Licence fees are paid earlier by the employer."
      }
    ]
  },
  {
    "id": "san-8",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Who issues the physical Non-Sarawakian Identity Card (NSIC)?",
    "options": [
      {
        "text": "Operator-Service Provider",
        "correct": true,
        "reason": "Correct. The Operator-Service Provider handles the physical issuance of the card."
      },
      {
        "text": "Admin JTK",
        "correct": false,
        "reason": "Incorrect. The Operator-Service Provider handles card issuance, whereas JTK handles Labour Licences."
      },
      {
        "text": "Admin SAFHIS",
        "correct": false,
        "reason": "Incorrect. The Operator-Service Provider handles card issuance, while SAFHIS manages medical reporting."
      }
    ]
  },
  {
    "id": "san-9",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What actions are performed under FORCES by relevant/authorised enforcement agencies?",
    "options": [
      {
        "text": "View and Validate Foreign Worker information & Manage Foreign Worker status",
        "correct": true,
        "reason": "Correct. Authorised enforcement agencies view, validate foreign worker information, and manage foreign worker status in FORCES."
      },
      {
        "text": "Approve Approval in Principle (AP) applications",
        "correct": false,
        "reason": "Incorrect. Enforcers validate information and manage status in FORCES, whereas APs are approved by the State Secretary."
      },
      {
        "text": "Upload X-Ray and Laboratory Reports",
        "correct": false,
        "reason": "Incorrect. Enforcers validate worker status in FORCES, whereas medical reports are uploaded by SAFHIS Panel Facilities."
      }
    ]
  },
  {
    "id": "san-10",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What happens if an approved application remains unpaid for more than 30 days from approval after 1st December 2025?",
    "options": [
      {
        "text": "Temporary suspension of access to all ALIANCE modules",
        "correct": true,
        "reason": "Correct. Page 10 (Section 1.1) of the SANSOLS Employer User Guide states that effective 1st December 2025, unpaid approved applications exceeding 30 days result in temporary access suspension across all ALIANCE modules until full payment is received."
      },
      {
        "text": "Application is automatically deleted",
        "correct": false,
        "reason": "Incorrect. Module access is temporarily suspended; applications are not automatically deleted."
      },
      {
        "text": "Penalty fee of RM 500 is applied",
        "correct": false,
        "reason": "Incorrect. The rule mandates access suspension across modules rather than a fixed monetary penalty."
      }
    ]
  },
  {
    "id": "san-11",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What is the maximum number of Person In Charge (PIC) accounts allowed per registered company?",
    "options": [
      {
        "text": "1 PIC per company",
        "correct": true,
        "reason": "Correct. Page 11 of the user guide establishes the rule: 1 COMPANY = 1 COMPANY ACCOUNT = 1 Person In Charge (PIC)."
      },
      {
        "text": "2 PICs per company",
        "correct": false,
        "reason": "Incorrect. Only 1 PIC account is permitted per registered company account."
      },
      {
        "text": "5 PICs per company",
        "correct": false,
        "reason": "Incorrect. System architecture limits each company to exactly 1 PIC."
      }
    ]
  },
  {
    "id": "san-12",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What are the Capital Requirements for Company Equity registration under ALIANCE?",
    "options": [
      {
        "text": "Paid-Up Capital must be at least RM 10,000, and Authorised Capital must be equal to or greater than Paid-Up Capital",
        "correct": true,
        "reason": "Correct. Pages 31 and 36 of the SANSOLS Employer User Guide specify Paid-Up Capital = Minimum RM 10,000, and Authorised Capital = Must be greater than or equal to Paid-Up Capital."
      },
      {
        "text": "Authorised Capital must be at least RM 10,000, and Paid-Up Capital must not exceed Authorised Capital",
        "correct": false,
        "reason": "Incorrect. Page 31 explicitly mandates that Paid-Up Capital has the minimum RM 10,000 threshold, while Authorised Capital must be greater than or equal to Paid-Up Capital."
      },
      {
        "text": "Authorised Capital must be at least RM 50,000, and Paid-Up Capital can be any amount",
        "correct": false,
        "reason": "Incorrect. The minimum capital requirement applies to Paid-Up Capital (RM 10,000)."
      }
    ]
  },
  {
    "id": "san-13",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Which workplace photo views are mandatory when updating place of employment details?",
    "options": [
      {
        "text": "Front View, Side View, Interior View, Exterior View, Surrounding View",
        "correct": true,
        "reason": "Correct. Page 35 (Section 3.2.5) of the user guide mandates all 5 distinct photo perspectives: Front View, Side View, Interior View, Exterior View, and Surrounding View."
      },
      {
        "text": "Front View and Back View only",
        "correct": false,
        "reason": "Incorrect. All 5 specified photo views are mandatory for submission."
      },
      {
        "text": "Interior View and Office Desk View only",
        "correct": false,
        "reason": "Incorrect. SANSOLS requires 5 complete spatial perspectives (Front, Side, Interior, Exterior, Surrounding)."
      }
    ]
  },
  {
    "id": "san-14",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] Which source countries are eligible for foreign workers hired under the General Worker role?",
    "options": [
      {
        "text": "Indonesia, Philippines, India",
        "correct": true,
        "reason": "Correct. Page 37 (Section 3.2.6) strictly restricts General Worker role eligibility to candidates originating from Indonesia, Philippines, and India."
      },
      {
        "text": "Nepal, Bangladesh, Myanmar",
        "correct": false,
        "reason": "Incorrect. General Worker eligibility is restricted exclusively to Indonesia, Philippines, and India."
      },
      {
        "text": "Vietnam, Thailand, Cambodia",
        "correct": false,
        "reason": "Incorrect. Candidates for General Worker roles must originate from Indonesia, Philippines, or India."
      }
    ]
  },
  {
    "id": "san-15",
    "section": "SANSOLS",
    "sectionTitle": "SANSOLS Procedural Routing",
    "text": "[SANSOLS] What rule applies to project workplace locations for companies operating in the Construction Sector?",
    "options": [
      {
        "text": "All project workplaces must be in the same division as the first project",
        "correct": true,
        "reason": "Correct. Page 22 (Section 3.2.1.1) mandates that for construction sector applications (MSIC 41xxxx, 42xxxx, 43xxxx), all project workplaces must be located within the same administrative division as the first project."
      },
      {
        "text": "Projects can be located in any division within Sarawak without restriction",
        "correct": false,
        "reason": "Incorrect. Construction sector project locations are restricted to the same division as the primary project."
      },
      {
        "text": "At least two projects must be in different administrative divisions",
        "correct": false,
        "reason": "Incorrect. Cross-divisional project grouping under a single AP is restricted in the construction sector."
      }
    ]
  },
  {
    "id": "exp-1",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] Which positions are EXCLUDED from the requirement to post a job advertisement draft?",
    "options": [
      {
        "text": "Key Post, Shareholder, Specialist, Cross-posting/Job Rotation",
        "correct": true,
        "reason": "Correct. Job advertisement draft requirements do not apply to Key Post, Shareholder, Specialist, and Cross-posting/Job Rotation positions."
      },
      {
        "text": "General Workers and Skilled Workers",
        "correct": false,
        "reason": "Incorrect. General and Skilled Workers are required to post job advertisements, whereas Key Post, Shareholder, Specialist, and Cross-posting/Job Rotation are excluded."
      },
      {
        "text": "All Household Assistance and Maid positions",
        "correct": false,
        "reason": "Incorrect. Household assistance and maid positions follow domestic helper workflows; the specific Expatriate exemptions apply to Key Post, Shareholder, Specialist, and Cross-posting/Job Rotation positions."
      }
    ]
  },
  {
    "id": "exp-2",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] Who performs the initial review and recommendation for an Expatriate Application after employer submission?",
    "options": [
      {
        "text": "Admin Jabatan Imigresen Malaysia Negeri Sarawak (JIMS)",
        "correct": true,
        "reason": "Correct. JIMS Divisional and JIMS HQ review and recommend the initial Expatriate Application."
      },
      {
        "text": "Admin Pertubuhan Keselamatan Sosial (PERKESO)",
        "correct": false,
        "reason": "Incorrect. JIMS performs the initial application review. PERKESO only reviews job positions and advertisements."
      },
      {
        "text": "Admin Polis Diraja Malaysia (PDRM)",
        "correct": false,
        "reason": "Incorrect. JIMS performs the review. PDRM is not involved in the standard Expatriate workflow."
      }
    ]
  },
  {
    "id": "exp-3",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] In the ILMU review flow, under what condition is a Site Inspection conducted?",
    "options": [
      {
        "text": "Only if explicitly required by Head of Department (HOD)",
        "correct": true,
        "reason": "Correct. The HOD decides if a site inspection is required; if not required, the process proceeds directly to EP duration recommendation and JKLE shortlisting."
      },
      {
        "text": "Mandatorily for every single expatriate application",
        "correct": false,
        "reason": "Incorrect. A site inspection is only conducted if deemed necessary by the HOD."
      },
      {
        "text": "When requested directly by the Employer during submission",
        "correct": false,
        "reason": "Incorrect. The decision to conduct a site inspection rests with the ILMU HOD."
      }
    ]
  },
  {
    "id": "exp-4",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] Which body makes recommendations before the final Expatriate Decision is made by the State Secretary?",
    "options": [
      {
        "text": "Jawatankuasa Lokalisasi Ekspatriat (JKLE) Members, ILMU Director, and Deputy State Secretary",
        "correct": true,
        "reason": "Correct. Recommendations flow sequentially through JKLE Members, ILMU Director, and Deputy State Secretary to the State Secretary for final decision."
      },
      {
        "text": "JTK Officer, PTK OC, and JTK Director",
        "correct": false,
        "reason": "Incorrect. Recommendations flow through JKLE Members, ILMU Director, and Deputy State Secretary. JTK handles Labour Licence procedures."
      },
      {
        "text": "SAFHIS Panel Medical Facilities and Operator Service Provider",
        "correct": false,
        "reason": "Incorrect. Recommendations flow through JKLE Members, ILMU Director, and Deputy State Secretary."
      }
    ]
  },
  {
    "id": "exp-5",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] What document is generated and downloaded by the Employer after approval by the State Secretary?",
    "options": [
      {
        "text": "Approval Letter",
        "correct": true,
        "reason": "Correct. The primary outcome following payment by the Employer is an Approval Letter."
      },
      {
        "text": "Electronic Medical Report (EMR)",
        "correct": false,
        "reason": "Incorrect. The outcome of State Secretary approval is an Approval Letter. EMR is a medical screening document."
      },
      {
        "text": "Employment Pass (EP) Card",
        "correct": false,
        "reason": "Incorrect. The outcome of State Secretary approval is an Approval Letter. Physical EP collection occurs at a later stage."
      }
    ]
  },
  {
    "id": "exp-6",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] Who issues the VDR and eVisa for Expatriate applications?",
    "options": [
      {
        "text": "Admin Jabatan Imigresen Malaysia Negeri Sarawak (JIMS)",
        "correct": true,
        "reason": "Correct. Admin JIMS is responsible for issuing the VDR and eVisa."
      },
      {
        "text": "Admin Jabatan Tenaga Kerja Sarawak (JTKS)",
        "correct": false,
        "reason": "Incorrect. Admin JIMS issues the VDR and eVisa. JTKS oversees Labour Licences."
      },
      {
        "text": "Operator-Service Provider",
        "correct": false,
        "reason": "Incorrect. Admin JIMS issues the VDR and eVisa. Service Providers assist with NSIC card operations."
      }
    ]
  },
  {
    "id": "exp-7",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] What process occurs automatically after VDR and eVisa details are verified by Admin JIMS?",
    "options": [
      {
        "text": "Auto-apply Labour Licence",
        "correct": true,
        "reason": "Correct. The system automatically triggers the Labour Licence application upon successful verification of VDR and eVisa details."
      },
      {
        "text": "Auto-issue Non-Sarawakian Identity Card (NSIC)",
        "correct": false,
        "reason": "Incorrect. The system triggers an auto-application for the Labour Licence. NSIC requires separate eKYC and collection procedures."
      },
      {
        "text": "Auto-schedule Local Understudy candidate interview",
        "correct": false,
        "reason": "Incorrect. The system triggers an auto-application for the Labour Licence."
      }
    ]
  },
  {
    "id": "exp-8",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] Who reviews and approves the auto-applied Labour Licence for Expatriates?",
    "options": [
      {
        "text": "Admin Jabatan Tenaga Kerja Sarawak (JTKS) HQ Officer and JTK Director",
        "correct": true,
        "reason": "Correct. The auto-applied Labour Licence is reviewed by the JTK HQ Officer and formally approved by the JTK Director."
      },
      {
        "text": "Admin Immigration and Labour Management Unit (ILMU) Officer",
        "correct": false,
        "reason": "Incorrect. The review is handled by the JTK HQ Officer and approved by the JTK Director."
      },
      {
        "text": "State Secretary",
        "correct": false,
        "reason": "Incorrect. Approval is granted by the JTK Director. The State Secretary approves the overall expatriate decision."
      }
    ]
  },
  {
    "id": "exp-9",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] Where does the employer collect the physical Employment Pass (EP)?",
    "options": [
      {
        "text": "Admin Jabatan Imigresen Malaysia Negeri Sarawak (JIMS) HQ",
        "correct": true,
        "reason": "Correct. The Employer collects the physical Employment Pass directly from JIMS HQ."
      },
      {
        "text": "Immigration & Labour Integrated Center (ILC) Hardware kiosk",
        "correct": false,
        "reason": "Incorrect. The Employer collects the physical EP from JIMS HQ."
      },
      {
        "text": "Operator Service Provider counter",
        "correct": false,
        "reason": "Incorrect. The Employer collects the EP from JIMS HQ. Service Provider counters manage NSIC issuances."
      }
    ]
  },
  {
    "id": "exp-10",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] What post-approval requirement must the Employer fulfill regarding local workforce integration?",
    "options": [
      {
        "text": "Add Local Understudy Candidate within 6 months after EP is approved",
        "correct": true,
        "reason": "Correct. Employers must register a Local Understudy Candidate within 6 months following EP approval."
      },
      {
        "text": "Re-post Job Advertisement in JobSarawak every 6 months",
        "correct": false,
        "reason": "Incorrect. The required action is adding a Local Understudy Candidate within 6 months after EP approval."
      },
      {
        "text": "Submit monthly medical re-checkup reports to SAFHIS",
        "correct": false,
        "reason": "Incorrect. The post-approval requirement is registering a Local Understudy Candidate within 6 months of EP approval."
      }
    ]
  },
  {
    "id": "exp-11",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] What biometrics procedure is required during NSIC processing for Expatriates?",
    "options": [
      {
        "text": "Perform eKYC (Biometrics)",
        "correct": true,
        "reason": "Correct. The Employer or Expatriate must schedule NSIC collection and complete eKYC (Biometrics)."
      },
      {
        "text": "Submit physical fingerprint cards to PDRM",
        "correct": false,
        "reason": "Incorrect. The workflow requires performing eKYC (Biometrics) within the system."
      },
      {
        "text": "Undergo facial scan at SAFHIS Panel Medical Facilities",
        "correct": false,
        "reason": "Incorrect. Biometrics verification for NSIC card processing is conducted via eKYC."
      }
    ]
  },
  {
    "id": "exp-12",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] In EXPRT, an employer submits an application for an Expatriate position. The system requires a site inspection during the review process by the Immigration and Labour Management Unit (ILMU). What process follows directly after the site inspection is completed by the officer?",
    "options": [
      {
        "text": "ILMU Officers repeat the review and recommendation process for the Expatriate position, including setting the Employment Pass (EP) duration, recommending a Local Understudy Candidate, and shortlisting for the Jawatankuasa Lokalisasi Ekspatriat (JKLE).",
        "correct": true,
        "reason": "Correct. Upon completing the required site inspection, the EXPRT workflow dictates repeating the officer/HOD recommendation steps, including setting EP duration, recommending a local understudy, and shortlisting for JKLE."
      },
      {
        "text": "The employer submits a Hiring Outcome Report to ILMU.",
        "correct": false,
        "reason": "Incorrect. The Hiring Outcome Report is part of the pre-application advertising phase on JobSarawak, not the post-inspection workflow."
      },
      {
        "text": "The State Secretary immediately issues the final Expatriate Decision and Employment Pass.",
        "correct": false,
        "reason": "Incorrect. The State Secretary decision comes later in the pipeline after the application is reviewed by JKLE."
      }
    ]
  },
  {
    "id": "exp-13",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] An employer's Expatriate application submitted under EXPRT has received approval from the State Secretary, and the Approval Letter has been downloaded. What is the immediate process that the employer must perform within EXPRT before the Labour Licence can be generated?",
    "options": [
      {
        "text": "Apply for a Visa Dengan Rujukan (VDR) and eVisa (if required based on nationality).",
        "correct": true,
        "reason": "Correct. After downloading the Approval Letter, the employer must apply for a VDR and eVisa, then input and upload these details into EXPRT to trigger the Labour Licence application."
      },
      {
        "text": "Book and attend an in-person interview session with PERKESO.",
        "correct": false,
        "reason": "Incorrect. PERKESO interviews are not required at this stage of the post-approval workflow."
      },
      {
        "text": "Register a local understudy candidate on the JobSarawak portal.",
        "correct": false,
        "reason": "Incorrect. Assigning a Local Understudy Candidate is done within EXPRT after the Employment Pass is collected, not before generating the Labour Licence."
      }
    ]
  },
  {
    "id": "exp-14",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] After Jabatan Imigresen Malaysia Negeri Sarawak (JIMS) HQ updates and issues the Employment Pass (EP) for an expatriate in EXPRT, what specific post-approval procedural requirement must the employer carry out in EXPRT within a 6-month timeframe?",
    "options": [
      {
        "text": "Add a Local Understudy Candidate.",
        "correct": true,
        "reason": "Correct. The EXPRT guidelines require the employer to add a Local Understudy Candidate in the system within 6 months of EP approval to ensure knowledge transfer."
      },
      {
        "text": "Re-apply for a new Approval Letter from ILMU.",
        "correct": false,
        "reason": "Incorrect. A new Approval Letter is not needed unless applying for a new position or extension upon expiry."
      },
      {
        "text": "Conduct a mandatory workplace site inspection with JTK HQ.",
        "correct": false,
        "reason": "Incorrect. Site inspections occur during the review phase before approval, not as a post-approval task."
      }
    ]
  },
  {
    "id": "exp-15",
    "section": "EXPRT",
    "sectionTitle": "EXPRT Expatriate Platform",
    "text": "[EXPATRIATE] When applying for an Expatriate position in EXPRT, which specific category of job positions is exempt from the requirement to post a job advertisement draft on JobSarawak?",
    "options": [
      {
        "text": "Key Post, Shareholder, Specialist, and Cross-posting/Job Rotation positions",
        "correct": true,
        "reason": "Correct. EXPRT explicitly exempts Key Post, Shareholder, Specialist, and Cross-posting/Job Rotation positions from the JobSarawak job advertisement draft requirement."
      },
      {
        "text": "General Workers and Skilled Workers",
        "correct": false,
        "reason": "Incorrect. General workers and standard non-exempt positions require recruitment advertising."
      },
      {
        "text": "All positions seeking Employment Pass (EP) approval",
        "correct": false,
        "reason": "Incorrect. Most regular expatriate roles require advertisement on JobSarawak prior to application."
      }
    ]
  },
  {
    "id": "hav-1",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which party initiates the application process for hiring a housemaid within the HAVEN framework?",
    "options": [
      {
        "text": "Employer",
        "correct": true,
        "reason": "Correct. The Employer directly initiates the housemaid application process."
      },
      {
        "text": "Polis Diraja Malaysia (PDRM)",
        "correct": false,
        "reason": "Incorrect. PDRM is responsible for evaluating and recommending the candidate when required."
      },
      {
        "text": "Immigration and Labour Management Unit (ILMU)",
        "correct": false,
        "reason": "Incorrect. ILMU handles internal reviews and recommendations."
      }
    ]
  },
  {
    "id": "hav-2",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which entity is responsible for evaluating and issuing security recommendations for a candidate during the HAVEN workflow?",
    "options": [
      {
        "text": "Polis Diraja Malaysia (PDRM)",
        "correct": true,
        "reason": "Correct. PDRM conducts the candidate security recommendation stage when required."
      },
      {
        "text": "Jabatan Tenaga Kerja Sarawak (JTKS)",
        "correct": false,
        "reason": "Incorrect. JTKS processes Labour Licence recommendations and decisions."
      },
      {
        "text": "Jabatan Imigresen Malaysia Negeri Sarawak (JIMS)",
        "correct": false,
        "reason": "Incorrect. JIMS oversees eVDR and PLKS approvals."
      }
    ]
  },
  {
    "id": "hav-3",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which authority renders the final approval decision for a housemaid application under the Immigration and Labour Management Unit (ILMU) review process?",
    "options": [
      {
        "text": "State Secretary",
        "correct": true,
        "reason": "Correct. The State Secretary holds the authority to issue the final decision for the housemaid application."
      },
      {
        "text": "ILMU Director",
        "correct": false,
        "reason": "Incorrect. The ILMU Director provides an intermediate recommendation."
      },
      {
        "text": "Deputy State Secretary",
        "correct": false,
        "reason": "Incorrect. The Deputy State Secretary provides an intermediate recommendation prior to final approval."
      }
    ]
  },
  {
    "id": "hav-4",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] What official document is immediately generated when an Employer downloads the initial application approval in HAVEN?",
    "options": [
      {
        "text": "Real-time Approval Letter",
        "correct": true,
        "reason": "Correct. Downloading the initial application decision generates a Real-time Approval Letter."
      },
      {
        "text": "Real-time Labour Licence",
        "correct": false,
        "reason": "Incorrect. The Labour Licence is generated later in the process."
      },
      {
        "text": "Real-time eVDR",
        "correct": false,
        "reason": "Incorrect. The eVDR document is produced during the immigration pass phase."
      }
    ]
  },
  {
    "id": "hav-5",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] How is the Labour Licence application processed once initial approval for a housemaid has been granted in HAVEN?",
    "options": [
      {
        "text": "Automated system application",
        "correct": true,
        "reason": "Correct. The system automatically triggers the Labour Licence application phase following initial approval."
      },
      {
        "text": "Manual submission by Employer",
        "correct": false,
        "reason": "Incorrect. The process is automated without requiring a manual resubmission by the employer."
      },
      {
        "text": "Physical submission at JTKS counter",
        "correct": false,
        "reason": "Incorrect. The workflow handles the Labour Licence processing digitally."
      }
    ]
  },
  {
    "id": "hav-6",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which official body makes the final determination regarding the issuance of the Labour Licence in HAVEN?",
    "options": [
      {
        "text": "Deputy State Secretary / JTKS Director",
        "correct": true,
        "reason": "Correct. The decision on the Labour Licence is issued by the Deputy State Secretary or JTKS Director."
      },
      {
        "text": "ILMU Director",
        "correct": false,
        "reason": "Incorrect. The ILMU Director oversees the initial candidate review phase."
      },
      {
        "text": "Polis Diraja Malaysia (PDRM)",
        "correct": false,
        "reason": "Incorrect. PDRM is involved strictly in security vetting recommendations."
      }
    ]
  },
  {
    "id": "hav-7",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which specific tasks are executed by SAFHIS Panel Medical Facilities during the medical screening process?",
    "options": [
      {
        "text": "Submitting the EMR, uploading X-Ray reports, and submitting Lab Reports",
        "correct": true,
        "reason": "Correct. Panel medical facilities are responsible for direct EMR submission and uploading X-Ray and lab results."
      },
      {
        "text": "Booking and paying for the medical screening",
        "correct": false,
        "reason": "Incorrect. Booking and payment are managed by the employer."
      },
      {
        "text": "Attending the physical health examination",
        "correct": false,
        "reason": "Incorrect. Attending the examination is performed by the worker/employer."
      }
    ]
  },
  {
    "id": "hav-8",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] How is the application for a Temporary Employment Pass (PLKS) initiated in the HAVEN platform?",
    "options": [
      {
        "text": "Automated system trigger (Auto Apply)",
        "correct": true,
        "reason": "Correct. The Employer initiates the PLKS process via the system's 'Auto Apply for PLKS' mechanism."
      },
      {
        "text": "Direct approval by Employer",
        "correct": false,
        "reason": "Incorrect. Approval is granted by immigration authorities (JIMS), not the employer."
      },
      {
        "text": "Physical collection at immigration office",
        "correct": false,
        "reason": "Incorrect. Collection occurs after the pass is approved and issued."
      }
    ]
  },
  {
    "id": "hav-9",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] What primary activities must the Employer perform regarding the Non-Sarawakian Identity Card (NSIC) prior to card issuance?",
    "options": [
      {
        "text": "Book and Pay Non-Sarawakian Identity Card (NSIC) and Perform eKYC (Biometrics)",
        "correct": true,
        "reason": "Correct. The Employer must book and pay for the NSIC and complete eKYC biometrics."
      },
      {
        "text": "Card Issuance",
        "correct": false,
        "reason": "Incorrect. Card Issuance is handled by the Operator - Service Provider."
      },
      {
        "text": "NSIC Activation and NSIC Collection",
        "correct": false,
        "reason": "Incorrect. NSIC Activation and Collection occur after card issuance."
      }
    ]
  },
  {
    "id": "hav-10",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which agency is authorized to access, verify, and regulate foreign worker operational status in the system?",
    "options": [
      {
        "text": "FORCES (Authorized Enforcement Agencies)",
        "correct": true,
        "reason": "Correct. FORCES is designated to view, validate, and manage worker operational details."
      },
      {
        "text": "Jabatan Tenaga Kerja Sarawak (JTKS)",
        "correct": false,
        "reason": "Incorrect. JTKS focuses primarily on Labour Licence approvals."
      },
      {
        "text": "Authorized Service Provider Operator",
        "correct": false,
        "reason": "Incorrect. The service provider handles identity card issuance logistics."
      }
    ]
  },
  {
    "id": "hav-11",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] In contrast to general commercial sectors under SANSOLS, what simplified account registration rule applies to an employer applying for a foreign domestic helper (maid) under HAVEN?",
    "options": [
      {
        "text": "Maid applications do not require the employer to register a company account",
        "correct": true,
        "reason": "Correct. According to the ALIANCE documentation, maid applications only require a personal account and do not require registering a company account."
      },
      {
        "text": "Employers must register a corporate account and provide a valid SST registration number",
        "correct": false,
        "reason": "Incorrect. Maid applications under HAVEN are exempted from corporate company account registration."
      },
      {
        "text": "Employers must create both a personal account and an enterprise business account",
        "correct": false,
        "reason": "Incorrect. Only a personal account is needed to submit a housemaid application under HAVEN."
      }
    ]
  },
  {
    "id": "hav-12",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] Which party is responsible for issuing the real-time eVDR after the employer applies for it in HAVEN?",
    "options": [
      {
        "text": "Admin - Jabatan Imigresen Malaysia Negeri Sarawak (JIMS)",
        "correct": true,
        "reason": "Correct. In the HAVEN process flow, JIMS (Admin - Jabatan Imigresen Malaysia Negeri Sarawak) approves and issues the real-time eVDR."
      },
      {
        "text": "Admin - Jabatan Tenaga Kerja Sarawak (JTKS)",
        "correct": false,
        "reason": "Incorrect. JTKS is responsible for the Labour Licence decision, not eVDR issuance."
      },
      {
        "text": "Operator - Service Provider",
        "correct": false,
        "reason": "Incorrect. The service provider handles physical card issuance for the NSIC, not eVDR approval."
      }
    ]
  },
  {
    "id": "hav-13",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] What sequence of actions must occur regarding the Non-Sarawakian Identity Card (NSIC) once PLKS is collected/downloaded?",
    "options": [
      {
        "text": "Book and pay for NSIC & perform eKYC (Biometrics), followed by Card Issuance by Service Provider, and finally NSIC Activation & Collection",
        "correct": true,
        "reason": "Correct. Following PLKS collection, the Employer books/pays for NSIC and completes eKYC, the Service Provider issues the card, and the Employer completes activation and collection."
      },
      {
        "text": "Collect NSIC directly at the checkpoint, perform eKYC (Biometrics), and apply for Labour Licence",
        "correct": false,
        "reason": "Incorrect. Labour Licence generation occurs prior to PLKS collection, and eKYC/booking precedes card issuance."
      },
      {
        "text": "Perform eKYC (Biometrics) at SAFHIS Panel Clinic, receive card via post, and notify FORCES",
        "correct": false,
        "reason": "Incorrect. Medical screening occurs earlier in the flow, and card issuance involves dedicated booking, service provider processing, activation, and collection."
      }
    ]
  },
  {
    "id": "hav-14",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] What administrative step must an employer perform before applying for an eVDR for a foreign domestic helper, and which authority processes that step?",
    "options": [
      {
        "text": "Submit a domestic helper application for review by PDRM (if required) and processing by ILMU, with final decision by the State Secretary",
        "correct": true,
        "reason": "Correct. Before applying for an eVDR, the employer must submit a domestic helper application that is reviewed by PDRM (if needed) and processed by ILMU, with final approval granted by the State Secretary."
      },
      {
        "text": "Obtain an automatically generated Labour Licence directly from Jabatan Tenaga Kerja Sarawak (JTKS)",
        "correct": false,
        "reason": "Incorrect. Although a Labour Licence is required in the overall process, the specific preliminary administrative step for a domestic helper involves submitting an application reviewed by ILMU/PDRM and determined by the State Secretary."
      },
      {
        "text": "Submit a domestic helper application directly to the Department of Immigration Sarawak (JIMS) for committee evaluation",
        "correct": false,
        "reason": "Incorrect. JIMS handles visa and pass approvals (such as eVDR and PLKS), whereas the initial domestic helper application is processed by ILMU and decided by the State Secretary."
      }
    ]
  },
  {
    "id": "hav-15",
    "section": "HAVEN",
    "sectionTitle": "HAVEN Domestic Helpers",
    "text": "[HAVEN] What sequence of steps occurs regarding visa processing, medical verification, and PLKS issuance after an employer downloads the generated Labour Licence for a foreign domestic helper?",
    "options": [
      {
        "text": "Apply eVDR → JIMS approves & issues eVDR → Apply eVISA → JIMS issues eVISA → Book & perform SAFHIS medical screening → Panel submits medical/X-ray/lab reports → Auto-apply PLKS → JIMS approves PLKS",
        "correct": true,
        "reason": "Correct. According to the HAVEN Foreign Domestic Helpers (FDH) workflow (Slide 8), after downloading the Labour Licence (Step 07), the employer applies for eVDR (Step 08), which JIMS approves and issues (Steps 09–10). Next, the employer applies for eVISA (Step 11), issued by JIMS (Step 12). Following eVISA issuance, the employer books and completes SAFHIS medical screening (Step 13). Once the panel facility submits the electronic medical, X-ray, and lab reports producing a FIT status (Step 14), the employer auto-applies for PLKS (Step 15), which JIMS approves (Step 16)."
      },
      {
        "text": "Book & perform SAFHIS medical screening → Panel submits medical/X-ray/lab reports → Apply eVDR → JIMS issues eVDR → Apply eVISA → JIMS issues eVISA → Auto-apply PLKS → JIMS approves PLKS",
        "correct": false,
        "reason": "Incorrect. In HAVEN, SAFHIS medical screening (Steps 13–14) takes place after eVDR (Steps 08–10) and eVISA (Steps 11–12) have been applied for and issued, not before."
      },
      {
        "text": "Apply eVDR → JIMS issues eVDR → Apply eVISA → JIMS issues eVISA → Auto-apply PLKS → JIMS approves PLKS → Book & perform SAFHIS medical screening → Panel submits medical/X-ray/lab reports",
        "correct": false,
        "reason": "Incorrect. SAFHIS medical screening and report submission (Steps 13–14) must be completed to generate the EMR Fit status BEFORE the employer can auto-apply for PLKS (Step 15) and receive JIMS approval (Step 16)."
      }
    ]
  },
  {
    "id": "acc-1",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What rule governs company account registration regarding Company, Account, and Person In Charge (PIC)?",
    "options": [
      {
        "text": "1 COMPANY = 1 COMPANY ACCOUNT = 1 Person In Charge (PIC)",
        "correct": true,
        "reason": "Correct. The system registration rules strictly enforce that one company corresponds to exactly one company account and one Person In Charge (PIC)."
      },
      {
        "text": "1 COMPANY = Multiple COMPANY ACCOUNTS = 1 Person In Charge (PIC)",
        "correct": false,
        "reason": "Incorrect. Only one company account is permitted per registered company."
      },
      {
        "text": "1 Person In Charge (PIC) = 1 Company",
        "correct": false,
        "reason": "Incorrect. While a company is restricted to one company account and one PIC, a single PIC is allowed to manage multiple companies."
      }
    ]
  },
  {
    "id": "acc-2",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What is the consequence if an approved application remains unpaid for more than 30 days starting from 1st December 2025?",
    "options": [
      {
        "text": "Temporary suspension of access across all system modules",
        "correct": true,
        "reason": "Correct. Any approved application remaining unpaid for more than 30 days from 1st December 2025 results in a temporary access suspension across all system modules until settled."
      },
      {
        "text": "Automatic permanent revocation of company registration",
        "correct": false,
        "reason": "Incorrect. Overdue unpaid applications trigger a temporary module access suspension rather than a permanent registration revocation."
      },
      {
        "text": "Immediate deletion of the company profile",
        "correct": false,
        "reason": "Incorrect. The account profile is retained, but access to system modules is temporarily suspended until full payment is made."
      }
    ]
  },
  {
    "id": "acc-3",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] Does a domestic maid application require an employer to register a company account?",
    "options": [
      {
        "text": "No, domestic maid applications are processed using personal accounts",
        "correct": true,
        "reason": "Correct. Domestic maid applications are processed via individual personal accounts and do not require registering a company account."
      },
      {
        "text": "Yes, all application types require a registered company account",
        "correct": false,
        "reason": "Incorrect. Maid applications are specifically exempt from requiring a company account."
      },
      {
        "text": "Yes, but only when submitting applications for multiple maids",
        "correct": false,
        "reason": "Incorrect. Maid applications do not require a company account regardless of the quantity of domestic helpers being hired."
      }
    ]
  },
  {
    "id": "acc-4",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What system access restrictions apply when a company account status is 'Pending Verification' or 'Incomplete Account Info'?",
    "options": [
      {
        "text": "Users are blocked from accessing all system modules",
        "correct": true,
        "reason": "Correct. While an account is in 'Pending Verification' or 'Incomplete Account Info' status, module access is completely blocked."
      },
      {
        "text": "Users retain full read-and-write permissions across all modules",
        "correct": false,
        "reason": "Incorrect. Access to modules is entirely restricted until the account verification process is completed."
      },
      {
        "text": "Users can access labor system modules but not domestic helper modules",
        "correct": false,
        "reason": "Incorrect. The access restriction applies uniformly across all system modules."
      }
    ]
  },
  {
    "id": "acc-5",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] To whom should an urgent company account verification request be escalated?",
    "options": [
      {
        "text": "SSO Admin",
        "correct": true,
        "reason": "Correct. Urgent account verification issues must be escalated directly to the SSO Admin."
      },
      {
        "text": "ILMU Director",
        "correct": false,
        "reason": "Incorrect. SSO Admin manages account verification escalations, not the ILMU Director."
      },
      {
        "text": "PDRM Admin",
        "correct": false,
        "reason": "Incorrect. Verification of account registration falls under the SSO Admin, not PDRM."
      }
    ]
  },
  {
    "id": "acc-6",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] Which user role holds administrative permissions to edit company details, manage user roles, and remove a company profile?",
    "options": [
      {
        "text": "Company Person In Charge (PIC)",
        "correct": true,
        "reason": "Correct. Only the designated Company PIC possesses the administrative permissions required to update company details, assign user roles, and remove a company."
      },
      {
        "text": "Any standard added company user",
        "correct": false,
        "reason": "Incorrect. Non-PIC users are limited to view-only access for company details and user lists."
      },
      {
        "text": "System Support (SS) team only",
        "correct": false,
        "reason": "Incorrect. Profile administration and role management are managed directly by the Company PIC."
      }
    ]
  },
  {
    "id": "acc-7",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What procedure is required for a user to update their registered account email address in Profile Settings?",
    "options": [
      {
        "text": "Submit a formal request letter",
        "correct": true,
        "reason": "Correct. Updating a registered account email address cannot be done directly on the form and requires submitting a formal request letter."
      },
      {
        "text": "Edit the email field directly on the Update Profile form",
        "correct": false,
        "reason": "Incorrect. Direct editing is permitted only for personal names and phone numbers; changing an email requires a formal request letter."
      },
      {
        "text": "Email addresses are permanently locked and cannot be changed",
        "correct": false,
        "reason": "Incorrect. Email addresses can be updated once a formal request letter is processed."
      }
    ]
  },
  {
    "id": "acc-8",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What is the maximum number of authentication devices that can be configured under Two-Factor Authentication (2FA)?",
    "options": [
      {
        "text": "Up to 4 devices",
        "correct": true,
        "reason": "Correct. The 2FA settings allow users to configure and manage up to 4 authentication devices per account."
      },
      {
        "text": "Strictly 1 device",
        "correct": false,
        "reason": "Incorrect. Accounts support configuring up to 4 authentication devices."
      },
      {
        "text": "An unlimited number of devices",
        "correct": false,
        "reason": "Incorrect. Device configuration for 2FA is capped at a maximum of 4 devices."
      }
    ]
  },
  {
    "id": "acc-9",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] Who receives system email notifications regarding account verification updates such as 'Pending for Verification', 'Resubmit Details', and 'Company Verified'?",
    "options": [
      {
        "text": "Company Person In Charge (PIC) only",
        "correct": true,
        "reason": "Correct. Account verification status notifications are emailed exclusively to the designated Company PIC."
      },
      {
        "text": "All registered company users",
        "correct": false,
        "reason": "Incorrect. Account verification emails are routed only to the Company PIC."
      },
      {
        "text": "Divisional Officers",
        "correct": false,
        "reason": "Incorrect. System status emails for account verification are sent to the Company PIC."
      }
    ]
  },
  {
    "id": "acc-10",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What level of system access does a non-PIC user have when accessing company details in Profile Settings?",
    "options": [
      {
        "text": "View-only access to company details and user lists, accompanied by an informational warning banner",
        "correct": true,
        "reason": "Correct. Non-PIC users are granted view-only access to view details and users, with a warning banner indicating restricted editing rights."
      },
      {
        "text": "Full editing access across all company fields except profile removal",
        "correct": false,
        "reason": "Incorrect. Non-PIC users have view-only access and cannot edit company details or user roles."
      },
      {
        "text": "Complete block from accessing the profile screen until approved by an administrator",
        "correct": false,
        "reason": "Incorrect. Non-PIC users can access the company details page in view-only mode by default."
      }
    ]
  },
  {
    "id": "acc-11",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] How is account management authority routed and handled when a non-Person In Charge (PIC) account attempts to manage company details or user roles?",
    "options": [
      {
        "text": "The non-PIC account is restricted to view-only access with a warning banner, requiring any administrative task or user management action to be performed by the designated Person In Charge (PIC).",
        "correct": true,
        "reason": "Correct. Non-PIC accounts cannot edit company details, assign user roles, or remove a company, and must route all administrative updates through the PIC who holds administrative permissions."
      },
      {
        "text": "The non-PIC account can submit proposed updates to company details, which are then placed in a 'Pending Approval' queue until reviewed by the designated Person In Charge (PIC).",
        "correct": false,
        "reason": "Incorrect. Non-PIC accounts do not have access to submit draft edits or queue changes; their access is strictly view-only with an administrative warning banner."
      },
      {
        "text": "The non-PIC account can manage user roles and standard details, but attempts to edit core company registration or remove a company automatically route an authorization request to the Person In Charge (PIC).",
        "correct": false,
        "reason": "Incorrect. Non-PIC accounts cannot manage user roles or edit any company details directly; all such actions are completely restricted."
      }
    ]
  },
  {
    "id": "acc-12",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Applications & Review] What is the routing process for an Approval in Principle (AP) application that is flagged under Action Request status during review?",
    "options": [
      {
        "text": "The applicant receives an email notification with agency comments, updates the specific forms accordingly (updating construction workplace amendments under Corporate Details), submits a formal letter if signatory changes are needed, and resubmits.",
        "correct": true,
        "reason": "Correct. Resolving Action Request status requires addressing agency feedback across the respective section forms, updating Corporate Details for construction place of employment edits, providing a formal request letter for signatory changes, and resubmitting."
      },
      {
        "text": "The applicant receives an email notification with agency comments, resubmits the entire AP application form from scratch with corrected attachments, and attaches a formal request letter directly to the resubmission portal.",
        "correct": false,
        "reason": "Incorrect. The applicant updates the specific information in their respective section forms (or Corporate Details for construction place of employment changes) rather than re-creating the entire application."
      },
      {
        "text": "The applicant receives an email notification with agency comments, updates all workplace and address amendments directly within the AP Application Form, and resubmits without needing separate formal letter requests.",
        "correct": false,
        "reason": "Incorrect. Construction sector workplace amendments must be updated under Corporate Details rather than the AP form itself, and signatory updates specifically require a formal request letter."
      }
    ]
  },
  {
    "id": "acc-13",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] What is the procedural routing for changing account information when an employer needs to update their registered email address versus updating standard profile details?",
    "options": [
      {
        "text": "Standard profile updates can be performed directly within Profile Settings, whereas updating a registered email address cannot be edited in system settings and requires submitting a formal request letter.",
        "correct": true,
        "reason": "Correct. Photos, names, and mobile numbers are directly editable in Profile Settings, but changing a registered email address requires a formal request letter."
      },
      {
        "text": "Standard profile updates can be performed directly within Profile Settings, whereas changing a registered email address requires updating the Corporate Details form and attaching supporting registration documents.",
        "correct": false,
        "reason": "Incorrect. Registered email changes cannot be updated via system forms like Corporate Details; they strictly require a formal request letter."
      },
      {
        "text": "Standard profile updates and registered email address changes can both be edited directly within Profile Settings, but changing the email triggers a 3-day verification freeze before taking effect.",
        "correct": false,
        "reason": "Incorrect. The registered email address field is non-editable in system settings and cannot be changed directly by the user."
      }
    ]
  },
  {
    "id": "acc-14",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] How is an urgent request handled when a newly registered company account profile is locked in 'Pending Verification' or 'Incomplete Account Info' status?",
    "options": [
      {
        "text": "The company Person In Charge (PIC) must submit an urgent escalation directly to the Single Sign-On (SSO) Admin",
        "correct": true,
        "reason": "Correct. Users cannot access any modules while under 'Incomplete Account Info' or 'Pending Verification' status, and urgent verifications must be procedurally escalated to the SSO Admin."
      },
      {
        "text": "The company Person In Charge (PIC) can override the restriction by uploading a verified business registration document in the system portal",
        "correct": false,
        "reason": "Incorrect. Access to modules is entirely blocked until the verification process is handled via direct escalation."
      },
      {
        "text": "The employer can bypass the restriction by drafting and submitting an Approval in Principle (AP) application while verification remains pending",
        "correct": false,
        "reason": "Incorrect. Account status restrictions block access across system modules, preventing bypass actions."
      }
    ]
  },
  {
    "id": "acc-15",
    "section": "ACCOUNTS",
    "sectionTitle": "Accounts, SSO & Escalation",
    "text": "[Accounts & Escalation] To which entity must the Customer Experience (CX) team escalate issues when an employer encounters an error completing company registration?",
    "options": [
      {
        "text": "Support System (SS)",
        "correct": true,
        "reason": "Correct. CX is required to check with the Support System (SS) when registration errors occur."
      },
      {
        "text": "SSO Admin",
        "correct": false,
        "reason": "Incorrect. Registration errors are handled by checking with Support System (SS), not SSO Admin."
      },
      {
        "text": "ILMU Director",
        "correct": false,
        "reason": "Incorrect. ILMU Director is not involved in technical registration error escalations."
      }
    ]
  }
];

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function prepareQuizQuestions(
  section: QuizSection = 'ALL',
  limit?: number,
  customPool?: QuizQuestion[]
): QuizQuestion[] {
  const pool = customPool || MASTER_QUESTIONS;
  let filtered = section === 'ALL' ? pool : pool.filter((q) => q.section === section);

  // Randomize questions
  let shuffled = shuffleArray(filtered);

  if (limit && limit > 0 && limit < shuffled.length) {
    shuffled = shuffled.slice(0, limit);
  }

  // Also randomize options for each question
  return shuffled.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}
