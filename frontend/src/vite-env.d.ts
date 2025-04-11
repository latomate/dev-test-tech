/// <reference types="vite/client" />

interface User {
  id;
  name;
  email;
}

interface Task {
  id;
  content;
  isCompleted;
  userId;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
