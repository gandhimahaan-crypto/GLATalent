import { useState } from "react";
import { Badge } from "../ui/Badge";

export function TagInput({ tags, setTags, placeholder = "Type and press Enter" }) {
  const [value, setValue] = useState("");
  function addTag(event) {
    if (event.key === "Enter" && value.trim()) {
      event.preventDefault();
      setTags([...tags, value.trim()]);
      setValue("");
    }
  }
  return (
    <div className="tag-input">
      <div className="tag-list">{tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
      <input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={addTag} placeholder={placeholder} />
    </div>
  );
}
