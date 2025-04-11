const API_BASE_URL = '/api';

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return {
    data,
    status: response.status,
    message: response.statusText
  };
};

export const taskService = {
  getTasks: async (userId: number): Promise<ApiResponse<Task[]>> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/tasks`);
    return handleResponse<Task[]>(response);
  },
  
  createTask: async (task: Omit<Task, 'id'>): Promise<ApiResponse<Task>> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },
  
  updateTask: async (id: number, task: Pick<Task, 'content' | 'isCompleted'>): Promise<ApiResponse<Task>> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },
};

export const userService = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleResponse<User[]>(response);
  },
}; 