import TestArea from "./components/TestArea";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg w-[80%] h-[80vh] flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            여기에 테스트하세요
          </h2>
        </div>

        {/* Test Area */}
        <TestArea />
      </div>
    </div>
  );
}

export default App;
