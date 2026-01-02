import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SizeStyle = Quill.import("attributors/style/size") as any;

const sizeList = Array.from({ length: 91 }, (_, i) => `${i + 10}px`);
SizeStyle.whitelist = sizeList;

Quill.register(SizeStyle, true);

export default function TestArea() {
  const quillRef = useRef<ReactQuill>(null);
  const [fontSize, setFontSize] = useState(16);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setFontSize(newSize);

    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    editor.format("size", `${newSize}px`);

    setTimeout(() => {
      editor.focus();
    }, 0);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        ["image", "link"],
      ],
    }),
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>크기(px): </label>
        <input
          type="number"
          value={fontSize}
          min={10}
          max={100}
          onChange={handleSizeChange}
          style={{ width: "70px", padding: "5px", border: "1px solid #ccc" }}
        />
        <small style={{ color: "#666" }}>
          (글자를 드래그하고 숫자를 누르세요)
        </small>
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        style={{ height: "300px" }}
      />
    </div>
  );
}
