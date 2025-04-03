export const generatePrompt = (query) => {
  return `Generate an array of 5 multiple-choice questions (MCQs) based on the given topic: ${query}. Each MCQ must be relevant to this topic, have a unique question, four answer options, and one correct answer.

### Requirements:
- The response must be a JSON array of 5 MCQs.
- Each MCQ should be an object with the following structure:
  - "id" (1 to 5, unique for each question)
  - "question" (the actual question, related to ${query})
  - "options" (an array of four answer choices, each an object with "id" (A, B, C, D) and "text" (answer text))
  - "correctOption" (the correct answer's ID, e.g., "A", "B", "C", or "D")

### Expected Response (JSON format):
[
  {
    "id": 1,
    "question": "What is the fundamental unit of life?",
    "options": [
      { "id": "A", "text": "Atom" },
      { "id": "B", "text": "Molecule" },
      { "id": "C", "text": "Cell" },
      { "id": "D", "text": "Tissue" }
    ],
    "correctOption": "C"
  },
  {
    "id": 2,
    "question": "Which organelle is responsible for photosynthesis in plants?",
    "options": [
      { "id": "A", "text": "Mitochondria" },
      { "id": "B", "text": "Chloroplast" },
      { "id": "C", "text": "Nucleus" },
      { "id": "D", "text": "Ribosome" }
    ],
    "correctOption": "B"
  }
]`;
};
