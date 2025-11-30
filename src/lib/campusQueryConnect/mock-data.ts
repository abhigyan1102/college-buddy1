

export type BadgeLevel = "new" | "moderate" | "expert";

export interface UserProfile {
  id: string;
  name: string;
  year: number; // 1, 2, 3, 4
  avatar: string;
  questionsAnswered: number;
  questionsPending: number;
  badges: BadgeLevel[];
  bio: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  rating: number; // 1-5
}

export interface Question {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string; // e.g., "Computer Science", "Mathematics"
  timestamp: string;
  isUnanswered: boolean;
  important: boolean;
  answers: Comment[];
  views: number;
  isAnonymous?: boolean;
}

export const currentUser: UserProfile = {
  id: "u1",
  name: "Alex Rivera",
  year: 2,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  questionsAnswered: 42,
  questionsPending: 3,
  badges: ["moderate"],
  bio: "CS Sophomore | React Enthusiast"
};

export const users: Record<string, UserProfile> = {
  "u1": currentUser,
  "u2": {
    id: "u2",
    name: "Sarah Chen",
    year: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    questionsAnswered: 156,
    questionsPending: 0,
    badges: ["expert"],
    bio: "Senior Year | Machine Learning"
  },
  "u3": {
    id: "u3",
    name: "Mike Ross",
    year: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    questionsAnswered: 2,
    questionsPending: 5,
    badges: ["new"],
    bio: "Freshman | Still figuring it out"
  },
  "u4": {
    id: "u4",
    name: "Emily Blunt",
    year: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    questionsAnswered: 89,
    questionsPending: 1,
    badges: ["moderate"],
    bio: "Junior | Physics Major"
  }
};

export const questions: Question[] = [
  {
    id: "q1",
    userId: "u3", // Freshman asking
    title: "How do I reverse a linked list recursively?",
    content: "I'm stuck on this Data Structures assignment. I understand the iterative approach but recursion is confusing me.",
    category: "Computer Science",
    timestamp: "2h ago",
    isUnanswered: false,
    important: true,
    views: 124,
    answers: [
      {
        id: "a1",
        userId: "u2", // Senior answering
        content: "Think about the base case first. If the list is empty or has one node, return it. Otherwise, reverse the rest of the list and fix the head pointer.",
        timestamp: "1h ago",
        rating: 5
      },
      {
        id: "a2",
        userId: "u4",
        content: "Here is a diagram that might help...",
        timestamp: "30m ago",
        rating: 4
      }
    ]
  },
  {
    id: "q2",
    userId: "u1",
    title: "Best resources for Linear Algebra?",
    content: "Professor's notes are a bit dense. Any video recommendations?",
    category: "Mathematics",
    timestamp: "4h ago",
    isUnanswered: true,
    important: false,
    views: 45,
    answers: []
  },
  {
    id: "q3",
    userId: "u3",
    title: "When is the deadline for dropping classes?",
    content: "I checked the portal but can't find the specific date for this semester.",
    category: "Administration",
    timestamp: "5h ago",
    isUnanswered: true,
    important: true,
    views: 312,
    answers: []
  },
  {
    id: "q4",
    userId: "u4",
    title: "Quantum Mechanics: Wave function collapse",
    content: "Can someone explain the Copenhagen interpretation in simple terms?",
    category: "Physics",
    timestamp: "1d ago",
    isUnanswered: false,
    important: true,
    views: 890,
    answers: [
      {
        id: "a3",
        userId: "u2",
        content: "Imagine a coin spinning...",
        timestamp: "20h ago",
        rating: 5
      }
    ]
  },
  {
    id: "q5",
    userId: "u2",
    title: "Internship opportunities for 3rd year?",
    content: "Has anyone heard back from the summer internship program? I applied last week but haven't received any confirmation.",
    category: "Career",
    timestamp: "1d ago",
    isUnanswered: true,
    important: true,
    views: 210,
    answers: []
  },
  {
    id: "q6",
    userId: "u1",
    title: "Best coffee spots near campus?",
    content: "I need a quiet place to study with good wifi and coffee. The library is too crowded.",
    category: "Campus Life",
    timestamp: "2d ago",
    isUnanswered: false,
    important: false,
    views: 56,
    answers: [
      {
        id: "a4",
        userId: "u3",
        content: "Try the 'Bean There' cafe on 4th street. It's usually empty in the mornings.",
        timestamp: "1d ago",
        rating: 4
      }
    ]
  },
  {
    id: "q7",
    userId: "u3",
    title: "Help with React useEffect dependency array",
    content: "My effect is running in an infinite loop. I'm updating a state inside the effect that is also in the dependency array.",
    category: "Computer Science",
    timestamp: "2d ago",
    isUnanswered: false,
    important: true,
    views: 145,
    answers: [
      {
        id: "a5",
        userId: "u1",
        content: "You should use a functional update or remove the state from the dependency array if possible.",
        timestamp: "1d ago",
        rating: 5
      }
    ]
  },
  {
    id: "q8",
    userId: "u4",
    title: "Anyone selling a used bicycle?",
    content: "Looking for a cheap bike to get around campus. Budget is around $50.",
    category: "Marketplace",
    timestamp: "3d ago",
    isUnanswered: true,
    important: false,
    views: 89,
    answers: []
  },
  {
    id: "q9",
    userId: "u2",
    title: "Club Fair dates?",
    content: "Does anyone know when the annual club fair is happening this semester?",
    category: "Events",
    timestamp: "3d ago",
    isUnanswered: false,
    important: true,
    views: 340,
    answers: [
      {
        id: "a6",
        userId: "u1",
        content: "It's next Tuesday at the Student Center plaza!",
        timestamp: "2d ago",
        rating: 5
      }
    ]
  }
];
