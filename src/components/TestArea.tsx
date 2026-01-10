import { useState, useMemo } from "react";

function TestArea() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(100);

  // useMemo를 사용하지 않는 버전
  console.time("useMemo 미사용 - 계산 시간");
  const expensiveCalculationWithoutMemo = () => {
    // 결정론적인 계산을 위해 items와 인덱스를 기반으로 값 생성
    const array = Array.from({ length: items }, (_, i) => ({
      id: i,
      value: (i * 17 + items * 23) % 1000,
    }));
    return array
      .sort((a, b) => b.value - a.value)
      .filter((item) => item.value > 500)
      .map((item) => item.value * 2);
  };
  const resultWithoutMemo = expensiveCalculationWithoutMemo();
  console.timeEnd("useMemo 미사용 - 계산 시간");

  // useMemo를 사용하는 버전
  console.time("useMemo 사용 - 계산 시간");
  const resultWithMemo = useMemo(() => {
    // 결정론적인 계산을 위해 items와 인덱스를 기반으로 값 생성
    const array = Array.from({ length: items }, (_, i) => ({
      id: i,
      value: (i * 17 + items * 23) % 1000,
    }));
    return array
      .sort((a, b) => b.value - a.value)
      .filter((item) => item.value > 500)
      .map((item) => item.value * 2);
  }, [items]);
  console.timeEnd("useMemo 사용 - 계산 시간");

  return (
    <div className="flex-1 bg-gray-50 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center p-6 gap-4">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          useMemo 성능 비교 테스트
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              카운터 증가 (리렌더링 트리거): {count}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">배열 크기: {items}</label>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={items}
              onChange={(e) => setItems(Number(e.target.value))}
              className="w-48"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <p className="text-gray-600">
            useMemo 미사용 결과 개수: {resultWithoutMemo.length}
          </p>
          <p className="text-gray-600">
            useMemo 사용 결과 개수: {resultWithMemo.length}
          </p>
          <p className="text-xs text-gray-500 mt-4">
            콘솔을 열어서 계산 시간을 확인하세요.
            <br />
            카운터를 증가시켜도 useMemo 사용 버전은 items가 변경되지 않으면
            재계산되지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestArea;
