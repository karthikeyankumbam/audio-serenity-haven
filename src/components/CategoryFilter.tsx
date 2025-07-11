import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-105",
            selectedCategory === category
              ? "bg-primary text-primary-foreground shadow-glow"
              : "hover:bg-accent"
          )}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}