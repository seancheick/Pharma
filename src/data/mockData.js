import { Box, VStack, HStack, Text, Button } from '@gluestack-ui/themed-native-base';

export const mockData = {
  user: {
    name: "Sarah Chen",
    age: 45,
    sex: "Female",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    goals: ["Manage diabetes", "Boost immunity", "Improve sleep"],
    conditions: ["Type 2 Diabetes", "Iodine allergy"],
    stack: [
      {
        name: "Metformin",
        dosage: "500mg twice daily",
        start: "2025-06-03",
        type: "Prescription",
        status: "Active"
      },
      {
        name: "Fish Oil",
        dosage: "1000mg daily",
        start: "2025-06-03",
        type: "Supplement",
        status: "Active"
      },
      {
        name: "Multivitamin",
        dosage: "1 tablet daily (4000 IU Vitamin D)",
        start: "2025-06-03",
        type: "Supplement",
        status: "Active"
      },
      {
        name: "Ibuprofen",
        dosage: "200mg as needed",
        start: "2024-12-01",
        end: "2024-12-31",
        type: "Prescription",
        status: "Inactive"
      }
    ]
  },
  health_iq: {
    stack_score: 72,
    status: "Needs improvement 🟠",
    streak: "7-day scan streak 🔥",
    badge: "Health Geek 🏆"
  },
  common_goals: ["Manage diabetes", "Boost immunity", "Fitness", "Heart health"],
  common_conditions: ["Type 2 Diabetes", "Hypertension", "Asthma", "High cholesterol"],
  recent_scans: [
    {
      name: "Fish Oil",
      type: "Supplement",
      score: 60,
      risk: "Low DHA, safe with stack",
      cost: 15,
      badges: ["DailyMed", "PubMed"],
      source: "Searched"
    },
    {
      name: "Vitamin D/K2",
      type: "Supplement",
      score: 75,
      risk: "Total 8000 IU exceeds UL",
      cost: 20,
      badges: ["DailyMed", "PubMed"],
      source: "Scan"
    },
    {
      name: "Metformin",
      type: "Prescription",
      feedback: "No interactions",
      cost: 10,
      badges: ["DailyMed"],
      source: "Scan"
    }
  ],
  alerts: [
    { text: "Avoid iodine supplements (allergy)" },
    { text: "High Vitamin D risk (8000 IU)" }
  ],
  trending: ["Turmeric up 20%", "Vitamin D rising", "B-Complex popular"],
  search_suggestions: ["Fish Oil", "Metformin", "Vitamin D/K2", "Turmeric", "B-Complex"],
  chat_history: [
    {
      id: '1',
      text: 'Hello! I\'m your AI Pharmacist. How can I help you today?',
      isUser: false,
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '2',
      text: 'Can I take Fish Oil with my blood pressure medication?',
      isUser: true,
      timestamp: new Date(Date.now() - 86300000),
    },
    {
      id: '3',
      text: 'Fish Oil is generally safe to take with most blood pressure medications. In fact, it may have complementary effects in some cases. However, if you\'re on blood thinners like warfarin, you should monitor for increased bleeding risk. Always consult with your healthcare provider before starting any new supplement.',
      isUser: false,
      timestamp: new Date(Date.now() - 86200000),
      sources: ['DailyMed', 'PubMed', 'AI Summary'],
    },
    {
      id: '4',
      text: 'What about Vitamin D? Is 5000 IU daily too much?',
      isUser: true,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: '5',
      text: 'For most adults, 5000 IU of Vitamin D daily is considered safe for short-term use. However, the recommended daily allowance is 600-800 IU for most adults, with a safe upper limit of 4000 IU for long-term use. High doses over an extended period may lead to vitamin D toxicity. It\'s best to have your vitamin D levels checked and follow your healthcare provider\'s recommendation for dosage.',
      isUser: false,
      timestamp: new Date(Date.now() - 3500000),
      sources: ['DailyMed', 'PubMed', 'AI Summary'],
    },
  ],
  suggested_questions: [
    'Is turmeric safe with blood pressure medication?',
    'What\'s the best time to take magnesium?',
    'Can I take melatonin with antidepressants?',
    'Is there a natural alternative to statins?',
    'What supplements help with joint pain?',
  ],
}; 