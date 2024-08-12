export interface Report {
    id: string;
    type: 'occupancy' | 'revenue'; // Add more report types as needed
    title: string;
    content: string; // Use this to store report data or summary
    generatedAt: string; // Date of report generation
  }
  