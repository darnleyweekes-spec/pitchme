"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

export function DynamicListField({
  label,
  hint,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");
  const id = useId();

  function addItem() {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}

      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-start justify-between gap-3 rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink-soft"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="shrink-0 text-muted hover:text-accent"
              aria-label={`Remove ${item}`}
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex gap-2">
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
        />
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm font-medium text-ink-soft hover:border-ink hover:text-ink"
        >
          <Plus size={15} aria-hidden />
          Add
        </button>
      </div>
    </div>
  );
}
