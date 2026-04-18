export const questions = [

  // ================= DSA (15) =================
  {
    id: 1,
    category: "DSA",
    title: "Two Sum",
    difficulty: "Easy",
    text: "Given an array and a target, return indices of two numbers that add up to the target.",
    input: "nums = [2,7,11,15], target = 9",
    output: "[0,1]",
    plain: "Two sum problem"
  },
  {
    id: 2,
    category: "DSA",
    title: "Reverse Linked List",
    difficulty: "Easy",
    text: "Reverse a singly linked list.",
    input: "1 -> 2 -> 3 -> 4",
    output: "4 -> 3 -> 2 -> 1",
    plain: "Reverse linked list"
  },
  {
    id: 3,
    category: "DSA",
    title: "Valid Parentheses",
    difficulty: "Easy",
    text: "Check if a string of brackets is valid.",
    input: "()[]{}",
    output: "true",
    plain: "Valid parentheses problem"
  },
  {
    id: 4,
    category: "DSA",
    title: "Maximum Subarray",
    difficulty: "Easy",
    text: "Find the contiguous subarray with the largest sum.",
    input: "[-2,1,-3,4,-1,2,1,-5,4]",
    output: "6",
    plain: "Kadane algorithm"
  },
  {
    id: 5,
    category: "DSA",
    title: "Climbing Stairs",
    difficulty: "Easy",
    text: "Find how many ways to climb n stairs.",
    input: "n = 5",
    output: "8",
    plain: "Climbing stairs DP"
  },
  {
    id: 6,
    category: "DSA",
    title: "Binary Search",
    difficulty: "Easy",
    text: "Search a target in a sorted array.",
    input: "nums = [1,2,3,4,5], target = 4",
    output: "3",
    plain: "Binary search"
  },
  {
    id: 7,
    category: "DSA",
    title: "Level Order Traversal",
    difficulty: "Medium",
    text: "Return level order traversal of a binary tree.",
    input: "[3,9,20,null,null,15,7]",
    output: "[[3],[9,20],[15,7]]",
    plain: "Tree level order traversal"
  },
  {
    id: 8,
    category: "DSA",
    title: "Longest Common Subsequence",
    difficulty: "Hard",
    text: "Find length of longest common subsequence of two strings.",
    input: "text1 = 'abcde', text2 = 'ace'",
    output: "3",
    plain: "LCS dynamic programming"
  },
  {
    id: 9,
    category: "DSA",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    text: "Merge k sorted linked lists into one sorted list.",
    input: "[[1,4,5],[1,3,4],[2,6]]",
    output: "[1,1,2,3,4,4,5,6]",
    plain: "Merge k sorted lists"
  },
  {
    id: 10,
    category: "DSA",
    title: "Number of Islands",
    difficulty: "Medium",
    text: "Count number of islands in a 2D grid.",
    input: "grid of 0s and 1s",
    output: "number of islands",
    plain: "Number of islands graph"
  },
  {
    id: 11,
    category: "DSA",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    text: "Find longest substring without repeating characters.",
    input: "abcabcbb",
    output: "3",
    plain: "Sliding window substring"
  },
  {
    id: 12,
    category: "DSA",
    title: "Word Search",
    difficulty: "Medium",
    text: "Check if a word exists in a grid.",
    input: "board + word",
    output: "true/false",
    plain: "Backtracking word search"
  },
  {
    id: 13,
    category: "DSA",
    title: "Merge Intervals",
    difficulty: "Medium",
    text: "Merge overlapping intervals.",
    input: "[[1,3],[2,6],[8,10]]",
    output: "[[1,6],[8,10]]",
    plain: "Merge intervals"
  },
  {
    id: 14,
    category: "DSA",
    title: "Kth Largest Element",
    difficulty: "Medium",
    text: "Find kth largest element.",
    input: "[3,2,1,5,6,4], k=2",
    output: "5",
    plain: "Kth largest element"
  },
  {
    id: 15,
    category: "DSA",
    title: "Detect Cycle in Linked List",
    difficulty: "Medium",
    text: "Detect if linked list has a cycle.",
    input: "linked list",
    output: "true/false",
    plain: "Cycle detection"
  },

  // ================= HR (8) =================
  {
    id: 16,
    category: "HR",
    title: "Tell me about yourself",
    difficulty: "Easy",
    text: "Walk me through your background and skills.",
    input: null,
    output: null,
    plain: "HR intro question"
  },
  {
    id: 17,
    category: "HR",
    title: "Biggest weakness",
    difficulty: "Medium",
    text: "What is your biggest weakness?",
    input: null,
    output: null,
    plain: "Weakness question"
  },
  {
    id: 18,
    category: "HR",
    title: "Why this company",
    difficulty: "Medium",
    text: "Why do you want to work here?",
    input: null,
    output: null,
    plain: "Company motivation"
  },
  {
    id: 19,
    category: "HR",
    title: "Conflict with teammate",
    difficulty: "Medium",
    text: "Describe a conflict and resolution.",
    input: null,
    output: null,
    plain: "Conflict question"
  },
  {
    id: 20,
    category: "HR",
    title: "Where do you see yourself in 5 years",
    difficulty: "Medium",
    text: "Explain your career goals.",
    input: null,
    output: null,
    plain: "Future goals"
  },
  {
    id: 21,
    category: "HR",
    title: "Why should we hire you",
    difficulty: "Medium",
    text: "Explain why you are the best fit.",
    input: null,
    output: null,
    plain: "Hire me pitch"
  },
  {
    id: 22,
    category: "HR",
    title: "Describe a challenging project",
    difficulty: "Medium",
    text: "Talk about a difficult project.",
    input: null,
    output: null,
    plain: "Project challenge"
  },
  {
    id: 23,
    category: "HR",
    title: "Strength",
    difficulty: "Easy",
    text: "What is your biggest strength?",
    input: null,
    output: null,
    plain: "Strength question"
  },

  // ================= SYSTEM DESIGN (5) =================
  {
    id: 24,
    category: "System Design",
    title: "Design URL Shortener",
    difficulty: "Hard",
    text: "Design a system like bit.ly",
    input: null,
    output: null,
    plain: "URL shortener design"
  },
  {
    id: 25,
    category: "System Design",
    title: "Design Chat App",
    difficulty: "Hard",
    text: "Design WhatsApp-like system.",
    input: null,
    output: null,
    plain: "Chat system design"
  },
  {
    id: 26,
    category: "System Design",
    title: "Design Parking Lot",
    difficulty: "Medium",
    text: "Design OOP parking lot system.",
    input: null,
    output: null,
    plain: "Parking lot design"
  },
  {
    id: 27,
    category: "System Design",
    title: "Design Netflix",
    difficulty: "Hard",
    text: "Design streaming platform.",
    input: null,
    output: null,
    plain: "Netflix system design"
  },
  {
    id: 28,
    category: "System Design",
    title: "Design Rate Limiter",
    difficulty: "Hard",
    text: "Design API rate limiter.",
    input: null,
    output: null,
    plain: "Rate limiter design"
  },

  // ================= CS FUNDAMENTALS (7) =================
  {
    id: 29,
    category: "CS Fundamentals",
    title: "What is Deadlock",
    difficulty: "Medium",
    text: "Explain deadlock and conditions.",
    input: null,
    output: null,
    plain: "Deadlock OS"
  },
  {
    id: 30,
    category: "CS Fundamentals",
    title: "Process vs Thread",
    difficulty: "Easy",
    text: "Difference between process and thread.",
    input: null,
    output: null,
    plain: "Process vs thread"
  },
  {
    id: 31,
    category: "CS Fundamentals",
    title: "Normalization",
    difficulty: "Medium",
    text: "Explain database normalization.",
    input: null,
    output: null,
    plain: "DB normalization"
  },
  {
    id: 32,
    category: "CS Fundamentals",
    title: "SQL vs NoSQL",
    difficulty: "Medium",
    text: "Compare SQL and NoSQL.",
    input: null,
    output: null,
    plain: "SQL vs NoSQL"
  },
  {
    id: 33,
    category: "CS Fundamentals",
    title: "TCP vs UDP",
    difficulty: "Medium",
    text: "Difference between TCP and UDP.",
    input: null,
    output: null,
    plain: "TCP vs UDP"
  },
  {
    id: 34,
    category: "CS Fundamentals",
    title: "What happens when you type a URL",
    difficulty: "Medium",
    text: "Explain full flow.",
    input: null,
    output: null,
    plain: "URL process"
  },
  {
    id: 35,
    category: "CS Fundamentals",
    title: "Virtual Memory",
    difficulty: "Medium",
    text: "Explain virtual memory and paging.",
    input: null,
    output: null,
    plain: "Virtual memory"
  }

]