// react-dom 패치 파일
// react-quill이 findDOMNode를 사용할 수 있도록 polyfill 제공
import * as ReactDOM from "react-dom";

const findDOMNodePolyfill = function (
  instance: unknown
): Element | Text | null {
  // 이미 DOM 노드인 경우
  if (instance && typeof instance === "object" && "nodeType" in instance) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node = instance as any;
    if (node.nodeType === 1 || node.nodeType === 3) {
      return instance as Element | Text;
    }
  }

  // React 컴포넌트 인스턴스인 경우
  if (instance && typeof instance === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inst = instance as any;

    // React 19의 새로운 구조 시도
    const internals = inst._reactInternalFiber || inst._reactInternals;
    if (internals) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fiber: any = internals;
      while (fiber) {
        if (fiber.stateNode) {
          const node = fiber.stateNode;
          if (node && (node.nodeType === 1 || node.nodeType === 3)) {
            return node;
          }
        }
        fiber = fiber.return;
      }
    }

    // ref를 통해 접근 시도
    if (inst.ref && typeof inst.ref === "object" && inst.ref.current) {
      const node = inst.ref.current;
      if (node && (node.nodeType === 1 || node.nodeType === 3)) {
        return node;
      }
    }

    // 직접 DOM 요소를 반환하는 경우
    if (instance instanceof Element || instance instanceof Text) {
      return instance;
    }
  }

  return null;
};

// ReactDOM 객체에 추가
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(ReactDOM as any).findDOMNode) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (ReactDOM as any).findDOMNode = findDOMNodePolyfill;
}

// react-dom의 default export에도 추가
// TypeScript의 esModuleInterop으로 인해 react_dom_1.default가 생성됨
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactDOMAny = ReactDOM as any;
if (!ReactDOMAny.default) {
  ReactDOMAny.default = { ...ReactDOMAny };
}
ReactDOMAny.default.findDOMNode = findDOMNodePolyfill;

// 추가 패치: react-quill이 사용하는 모든 가능한 경로에 findDOMNode 추가
// Vite의 모듈 시스템에서도 작동하도록
if (typeof window !== "undefined") {
  // 전역 객체에 react-dom 참조 저장 (필요한 경우)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REACT_DOM_PATCHED__ = true;
}

export default ReactDOM;
