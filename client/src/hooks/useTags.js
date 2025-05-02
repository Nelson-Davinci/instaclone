import { useState } from "react";

export default function useTags() {
  const [tags, setTags] = useState([]);

  const handleTags = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = e.target.value.trim();
      //check if our text is not inside our tags array, then we add
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        //reset input value after adding a tag
        e.target.value = "";
      }
    }
  };
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  return { tags, setTags, handleTags, removeTag };
}
