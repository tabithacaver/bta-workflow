export type Stage = {
  n: number;
  slug: string;
  title: string;
  kind: "routine" | "exception" | "complete";
  trigger: string;
  actions: string[];
  required?: string[];
  decision?: { q: string; no: string[]; yes: string[]; noLabel?: string; yesLabel?: string };
  done: string;
};

export const stages: Stage[] = [
  {
    n: 1, slug: "assignment", title: "File Assignment", kind: "routine",
    trigger: "A new transaction file is assigned.",
    actions: [
      "Assign one BTA as the designated File Owner.",
      "Identify the appropriate backup, if applicable.",
      "Record the current status, next action, and due date.",
      "Keep the file in the owner’s queue throughout the transaction lifecycle.",
    ],
    required: ["File or transaction identifier", "Assigned BTA", "Backup contact, if applicable", "Current stage", "Outstanding items and due dates"],
    done: "One accountable File Owner is clearly identified.",
  },
  {
    n: 2, slug: "intake", title: "Intake Review", kind: "routine",
    trigger: "The assigned BTA receives the file.",
    actions: [
      "Review required documents and available contract information.",
      "Verify relevant parties, dates, terms, and commission information.",
      "Identify missing documents or discrepancies.",
      "Document outstanding items and next steps.",
    ],
    done: "Intake review is complete, identified gaps are documented, and required follow-up is assigned.",
  },
  {
    n: 3, slug: "ongoing", title: "Ongoing File Management", kind: "routine",
    trigger: "New documents, amendments, updates, or transaction milestones occur.",
    actions: [
      "Review updates and incorporate relevant changes.",
      "Maintain the transaction’s documented history.",
      "Track deadlines, outstanding items, and corrective actions.",
      "Keep the same BTA as File Owner.",
    ],
    done: "The file is current, actions are documented, and required milestones are addressed.",
  },
  {
    n: 4, slug: "pre-cda", title: "Pre-CDA Review", kind: "routine",
    trigger: "The transaction approaches CDA preparation.",
    actions: [
      "Reconcile relevant contract terms, amendments, and commission information.",
      "Verify required documentation and applicable approvals.",
      "Identify unresolved discrepancies.",
      "Complete the established pre-CDA checklist.",
    ],
    decision: {
      q: "Is the file ready to proceed?",
      no: ["Document the issue.", "Assign a next action.", "Escalate if additional expertise or approval is required.", "Keep the file with the BTA Owner while the issue is resolved."],
      yes: ["Confirm pre-CDA readiness.", "Notify or route the file to the Transaction Team according to the existing workflow."],
    },
    done: "Required pre-CDA checks are complete and outstanding blockers are resolved or appropriately controlled under policy.",
  },
  {
    n: 5, slug: "exception", title: "Exception Handling", kind: "exception",
    trigger: "The BTA identifies an issue requiring assistance, or the Transaction Team discovers a discrepancy.",
    actions: [
      "Identify the specific issue.",
      "Review the relevant documents and history.",
      "Document what has already been checked.",
      "State the question, potential impact, and recommended next step.",
      "Route the exception to the appropriate Lead or subject matter expert.",
      "Record the guidance or decision.",
      "Have the BTA Owner implement the resolution and document completion.",
    ],
    required: ["Transaction identifier", "BTA File Owner", "Issue category", "Description of the discrepancy", "Relevant documents or references", "Actions already taken", "Decision or assistance required", "Assigned decision-maker", "Resolution and date completed"],
    decision: {
      q: "Does the issue require escalation?",
      no: ["BTA resolves the issue within established authority and documents the action."],
      yes: ["Lead or authorized expert provides guidance or approval.", "The BTA implements the resolution unless ownership is formally reassigned."],
    },
    done: "The issue has a documented resolution, the file is updated, and required approvals are recorded.",
  },
  {
    n: 6, slug: "cda-qc", title: "CDA Preparation & Final QC", kind: "routine",
    trigger: "The file is ready for CDA preparation or final review.",
    actions: [
      "Transaction Team performs its assigned CDA responsibilities.",
      "BTA Owner remains the primary contact for file history and outstanding questions.",
      "Targeted corrections are made when issues are identified.",
      "Required final checks are completed according to team policy.",
    ],
    decision: {
      q: "Are required corrections or approvals outstanding?",
      yes: ["Return the specific issue to the BTA Owner for resolution; escalate when needed."],
      no: ["Proceed according to the approved closing workflow."],
    },
    done: "The required checks are satisfied and the file is ready for the next authorized transaction milestone.",
  },
  {
    n: 7, slug: "closing", title: "Closing & Completion", kind: "complete",
    trigger: "The transaction reaches the closing/completion stage.",
    actions: [
      "Confirm required documentation is complete.",
      "Record outstanding follow-up items and their disposition.",
      "Complete applicable file retention and compliance steps.",
      "Mark the transaction complete according to team procedures.",
    ],
    done: "The file meets established completion requirements and its final status is documented.",
  },
];

export const roles = [
  {
    name: "BTA File Owner",
    summary: "Accountable for the file from assignment through closing.",
    items: [
      "Owns the file from assignment through closing.",
      "Performs the standardized reviews.",
      "Tracks missing documents, discrepancies, deadlines, and outstanding actions.",
      "Documents decisions, corrections, and communications.",
      "Escalates exceptions with supporting information and a recommended next step.",
      "Implements the approved resolution and confirms completion.",
    ],
  },
  {
    name: "Lead / Subject Matter Expert",
    summary: "Provides targeted guidance on escalated exceptions.",
    items: [
      "Provides guidance on escalated exceptions.",
      "Reviews specific issues requiring additional expertise.",
      "Documents decisions and communicates required corrective action.",
      "Avoids repeating a full-file review when targeted assistance is sufficient.",
      "Assumes or reassigns ownership only when explicitly necessary.",
    ],
  },
  {
    name: "Transaction Team",
    summary: "Completes downstream work, including CDA preparation.",
    items: [
      "Completes assigned downstream responsibilities, including CDA preparation and processing.",
      "Identifies discrepancies discovered during its work.",
      "Communicates issues to the assigned BTA File Owner.",
      "Holds or adjusts processing when a required correction or approval is outstanding, per policy.",
    ],
  },
];

export const frictions = [
  {
    title: "Fragmented Ownership",
    trigger: "A file moves between multiple reviewers or queues.",
    owners: "BTA File Owner (primary); others assist without assuming ownership.",
    info: "Assigned owner, current status, documented next action.",
    impact: ["Unclear accountability.", "Loss of transaction context.", "Time spent locating the previous reviewer."],
    improved: "One designated BTA owns the file lifecycle. Other team members can assist without automatically assuming ownership.",
    done: "The file has one identifiable owner, current status, and documented next action.",
  },
  {
    title: "Duplicate Work and Rework",
    trigger: "A second or third reviewer repeats work already completed.",
    owners: "BTA File Owner; Lead / SME for targeted assistance only.",
    info: "Standardized checkpoint results, documented findings, tracked corrections.",
    impact: ["Multiple full-file reviews.", "Different interpretations of the same information.", "Increased workload and inconsistent outcomes."],
    improved: "Use standardized review checkpoints, documented findings, and targeted assistance rather than unnecessary repeat reviews.",
    done: "Required reviews are documented, corrections are tracked, and only necessary exceptions receive additional review.",
  },
  {
    title: "Late-Stage Problem Solving",
    trigger: "A discrepancy appears during CDA preparation or final review.",
    owners: "Transaction Team (identifies), BTA File Owner (prepares), Lead (decides).",
    info: "File history, supporting documents, actions taken, recommended next step.",
    impact: ["Lead investigates the transaction history.", "Previous reviewers must be identified.", "Work is repeated before a solution can be determined."],
    improved: "The BTA Owner provides the file history, supporting documents, actions taken, and recommended next step. The Lead focuses on the decision or exception.",
    done: "The issue is resolved and documented, the file is corrected, and the transaction proceeds when all required conditions are met.",
  },
];

export const metrics = [
  "Average number of reviewers per file",
  "Number of file handoffs",
  "Percentage of files with a clearly assigned owner",
  "Number of duplicate reviews",
  "Number of issues identified before CDA",
  "Number of issues identified during or after CDA preparation",
  "Average time to resolve escalated issues",
  "Lead hours spent on investigation and re-review",
  "File correction and rework rates",
];

export const guidingStatement =
  "One file. One accountable owner. Standardized checkpoints. Documented decisions. Targeted escalation. Cleaner files and less rework.";
