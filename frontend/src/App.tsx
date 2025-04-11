import { TaskList } from './components/TaskList';
import {useUserContext} from './services/context';

function App() {
  const { userId, setUserId } = useUserContext();
  return (
      <div className="h-screen w-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  Task Manager
                  </div>
              </div>
              <div className="flex gap-2">
                <button className={`bg-blue-500 text-white px-4 py-2 rounded-md ${userId === 2 ? '!bg-opacity-50' : 'shadow'}`} onClick={() => setUserId(1)}>
                  User 1
                </button>
                <button className={`bg-blue-500 text-white px-4 py-2 rounded-md ${userId === 1 ? '!bg-opacity-50' : 'shadow'}`} onClick={() => setUserId(2)}>
                  User 2
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TaskList />
        </main>
      </div>
  );
}

export default App;
