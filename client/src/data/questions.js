export const questions = [
  // ── DSA ──────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Two Sum",
    text: "Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.",
    plain: "Two Sum: Given an array nums and a target, return indices of two numbers that add up to target.",
    difficulty: "Easy",
    category: "DSA",
    tag: "Array",
    hint: "Think about using a hash map to store visited numbers."
  },
  {
    id: 2,
    title: "Longest Common Subsequence",
    text: "Given two strings <code>text1</code> and <code>text2</code>, return the length of their <strong>Longest Common Subsequence</strong>. A subsequence is derived by deleting some characters without changing the order.",
    plain: "Longest Common Subsequence: Given two strings, find the length of their longest common subsequence.",
    difficulty: "Hard",
    category: "DSA",
    tag: "DP",
    hint: "Use a 2D DP table. dp[i][j] = LCS of first i chars of text1 and first j chars of text2."
  },
  {
    id: 3,
    title: "Level Order Traversal",
    text: "Given the root of a binary tree, return the <strong>level order traversal</strong> of its node values — left to right, level by level.",
    plain: "Level Order Traversal of a binary tree.",
    difficulty: "Medium",
    category: "DSA",
    tag: "Tree",
    hint: "Use a queue (BFS). Process nodes level by level."
  },
  {
    id: 4,
    title: "Reverse Linked List",
    text: "Given the head of a singly linked list, reverse it and return the reversed list.",
    plain: "Reverse a singly linked list.",
    difficulty: "Easy",
    category: "DSA",
    tag: "LinkedList",
    hint: "Use three pointers: prev, curr, next. Iterative approach is O(n) time, O(1) space."
  },
  {
    id: 5,
    title: "Valid Parentheses",
    text: "Given a string containing just the characters <code>(</code>, <code>)</code>, <code>{</code>, <code>}</code>, <code>[</code>, <code>]</code>, determine if the input string is valid.",
    plain: "Check if a string of brackets is valid (properly opened and closed).",
    difficulty: "Easy",
    category: "DSA",
    tag: "Stack",
    hint: "Use a stack. Push opening brackets, pop and match when you see a closing bracket."
  },
  {
    id: 6,
    title: "Merge K Sorted Lists",
    text: "You are given an array of <code>k</code> linked lists, each sorted in ascending order. Merge all the linked lists into one sorted list and return it.",
    plain: "Merge k sorted linked lists into one sorted list.",
    difficulty: "Hard",
    category: "DSA",
    tag: "Heap",
    hint: "Use a min-heap of size k. Always extract the minimum and push the next node from that list."
  },

  // ── HR ────────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Tell me about yourself",
    text: "<strong>Tell me about yourself.</strong> Walk me through your background, skills, and why you're applying for this software engineering role.",
    plain: "Tell me about yourself for a software engineering interview.",
    difficulty: "Easy",
    category: "HR",
    tag: "Introduction",
    hint: "Use the Present → Past → Future structure. Keep it under 2 minutes."
  },
  {
    id: 8,
    title: "Biggest weakness?",
    text: "<strong>What is your biggest weakness?</strong> Be honest, but also demonstrate self-awareness and how you're actively improving.",
    plain: "What is your biggest weakness? Show self-awareness and improvement.",
    difficulty: "Medium",
    category: "HR",
    tag: "Behavioral",
    hint: "Pick a real weakness, but pair it with concrete steps you're taking to fix it."
  },
  {
    id: 9,
    title: "Why this company?",
    text: "<strong>Why do you want to work here?</strong> Show that you've researched the company and align with their mission or tech stack.",
    plain: "Why do you want to work at this company?",
    difficulty: "Medium",
    category: "HR",
    tag: "Motivation",
    hint: "Research the company's products, tech stack, and recent news before answering."
  },
  {
    id: 10,
    title: "Conflict with teammate",
    text: "<strong>Tell me about a time you had a conflict with a teammate.</strong> How did you handle it and what was the outcome?",
    plain: "Describe a conflict with a teammate and how you resolved it.",
    difficulty: "Medium",
    category: "HR",
    tag: "Behavioral",
    hint: "Use the STAR method: Situation, Task, Action, Result."
  },

  // ── System Design ─────────────────────────────────────────────────────
  {
    id: 11,
    title: "Design a URL shortener",
    text: "<strong>Design a URL shortener</strong> (like bit.ly). Cover system components, data model, scalability considerations, and trade-offs.",
    plain: "Design a URL shortener like bit.ly — components, data model, scaling, trade-offs.",
    difficulty: "Hard",
    category: "System Design",
    tag: "Design",
    hint: "Think about: hashing strategy, database choice (SQL vs NoSQL), caching, and redirect latency."
  },
  {
    id: 12,
    title: "Design a Chat App",
    text: "<strong>Design a real-time chat application</strong> (like WhatsApp). Focus on message delivery, storage, online/offline handling, and scaling to millions of users.",
    plain: "Design a real-time chat app like WhatsApp.",
    difficulty: "Hard",
    category: "System Design",
    tag: "Design",
    hint: "Consider WebSockets for real-time, message queues for reliability, and a fan-out service for group chats."
  }
]
