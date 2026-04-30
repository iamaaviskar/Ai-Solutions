import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
  Heading3,
} from "lucide-react";

export default function ArticleToolbar({ editor }) {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else editor.chain().focus().unsetLink().run();
  };

  const btn = (active, onClick, title, children) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active ? "bg-amber-500 text-black" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-0.5 p-2 border-b border-slate-200 bg-slate-50 rounded-t-lg">
      {btn(
        editor.isActive("bold"),
        () => editor.chain().focus().toggleBold().run(),
        "Bold",
        <Bold size={15} />,
      )}
      {btn(
        editor.isActive("italic"),
        () => editor.chain().focus().toggleItalic().run(),
        "Italic",
        <Italic size={15} />,
      )}
      <div className="w-px bg-slate-200 mx-1" />
      {btn(
        editor.isActive("heading", { level: 2 }),
        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        "Heading 2",
        <Heading2 size={15} />,
      )}
      {btn(
        editor.isActive("heading", { level: 3 }),
        () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        "Heading 3",
        <Heading3 size={15} />,
      )}
      <div className="w-px bg-slate-200 mx-1" />
      {btn(
        editor.isActive("bulletList"),
        () => editor.chain().focus().toggleBulletList().run(),
        "Bullet list",
        <List size={15} />,
      )}
      {btn(
        editor.isActive("orderedList"),
        () => editor.chain().focus().toggleOrderedList().run(),
        "Ordered list",
        <ListOrdered size={15} />,
      )}
      <div className="w-px bg-slate-200 mx-1" />
      {btn(editor.isActive("link"), setLink, "Link", <LinkIcon size={15} />)}
    </div>
  );
}
