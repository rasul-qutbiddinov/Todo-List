// src/components/TodoLoader.tsx
const TodoLoader = ({ count = 6 }: { count?: number }) => {
  return (
    <ul className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="flex flex-row animate-pulse items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700"
        >
          <div className="flex items-start space-x-4">
            <div className="mt-1 h-10 w-10 rounded bg-gray-200 dark:bg-indigo-800" />

            <div>
              <div className="mb-1 h-4 w-40 rounded bg-gray-200 dark:bg-indigo-800" />
              <div className="h-3 w-58 rounded bg-gray-200 dark:bg-indigo-800" />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-indigo-800" />
            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-indigo-800" />
              </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoLoader;
