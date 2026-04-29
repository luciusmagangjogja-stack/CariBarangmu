import { CategoryId, categories } from "@/data/products";

interface Props {
  value: CategoryId | "all";
  onChange: (v: CategoryId | "all") => void;
}

export const CategoryFilter = ({ value, onChange }: Props) => {
  const items: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: "Semua" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
      {items.map((it) => {
        const active = value === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-secondary"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
};