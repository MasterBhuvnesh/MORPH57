export interface ResumePrompt {
  name: string;
  description: string;
}

export const resumePrompts: ResumePrompt[] = [
  { name: "Frontend developer", description: "This is a sample resume of a Frontend developer specializing in React and modern web technologies" },
  { name: "Data analyst", description: "This is a sample resume of a Data analyst proficient in SQL, Power BI, and data visualization" },
  { name: "Software engineer", description: "This is a sample resume of a Software engineer with full-stack development experience" },
  { name: "Product manager", description: "This is a sample resume of a Product manager with cross-functional team leadership" },
  { name: "UX designer", description: "This is a sample resume of a UX designer focused on user research and interaction design" },
  { name: "DevOps engineer", description: "This is a sample resume of a DevOps engineer skilled in CI/CD, Docker, and cloud infrastructure" },
  { name: "Marketing manager", description: "This is a sample resume of a Marketing manager experienced in digital campaigns and analytics" },
  { name: "Backend developer", description: "This is a sample resume of a Backend developer specializing in APIs, databases, and server architecture" },
  { name: "Business analyst", description: "This is a sample resume of a Business analyst bridging stakeholder needs and technical solutions" },
];

export const promptSets: string[][] = [];
for (let i = 0; i < resumePrompts.length; i += 3) {
  promptSets.push(resumePrompts.slice(i, i + 3).map((p) => p.name));
}
