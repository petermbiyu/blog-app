"use client";

import {
  useEditor,
  EditorContent,
  Editor as TiptapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback } from "react";

type EditorProps = {
  onChange: (html: string) => void;
  initialContent?: string;
  placeholder?: string;
};

/* ---------- Small reusable toolbar button ---------- */
const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`px-2.5 py-1.5 text-sm rounded border transition-colors
      ${
        isActive
          ? "bg-amber-500 text-white border-amber-500"
          : "bg-white text-gray-700 border-gray-300 hover:bg-amber-50 hover:border-amber-400"
      }
      ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {children}
  </button>
);

/* ---------- Divider ---------- */
const Divider = () => <span className="w-px h-6 bg-gray-300 mx-1" />;

/* ---------- The editor ---------- */
const Editor = ({
  onChange,
  initialContent = "",
  placeholder = "Start writing your blog post...",
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-amber-600 underline" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[250px] p-4",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return; // cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-amber-500 rounded-lg bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-amber-500 bg-amber-50/40">
        {/* Text style */}
        <ToolbarButton
          title="Bold (Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          title="Italic (Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton
          title="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          {"</>"}
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          title="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
        >
          ¶
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          title="Ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          1. List
        </ToolbarButton>

        <Divider />

        {/* Block elements */}
        <ToolbarButton
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          ❝
        </ToolbarButton>
        <ToolbarButton
          title="Code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          {"{ }"}
        </ToolbarButton>
        <ToolbarButton
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          ―
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton
          title="Add / edit link"
          onClick={setLink}
          isActive={editor.isActive("link")}
        >
          🔗
        </ToolbarButton>
        <ToolbarButton
          title="Remove link"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          ⛓️‍💥
        </ToolbarButton>

        <Divider />

        {/* History */}
        <ToolbarButton
          title="Undo (Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          title="Redo (Ctrl+Shift+Z)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          ↷
        </ToolbarButton>
        <ToolbarButton
          title="Clear formatting"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          ✕ Clear
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[250px] focus:outline-none
                   prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl
                   prose-a:text-amber-600"
      />
    </div>
  );
};

export default Editor;
