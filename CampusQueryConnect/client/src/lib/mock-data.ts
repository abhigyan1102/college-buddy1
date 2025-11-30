import { User, GraduationCap, BookOpen, Medal, Star, HelpCircle } from "lucide-react";

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
  }
];
