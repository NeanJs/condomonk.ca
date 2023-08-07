import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: true,
});

export default function TextEditor({ setValue, value }) {
  return (
    <ReactQuill
      // modules={modules}
      placeholder="Description"
      value={value}
      onChange={setValue}
    />
  );
}
