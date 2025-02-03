"use client";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useValueStore } from "../../app/valueStore"; // Import the Zustand store
import { motion } from "framer-motion"; // Import framer-motion

// Define the Category type
export interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategorySelectorProps {
  categories: Category[];
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

export function CategorySelector({ categories }: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const value = useValueStore((state) => state.value); // Get current value from Zustand
  const setValue = useValueStore((state) => state.setValue); // Get the setValue action

  const router = useRouter();

  // Use useEffect to watch the value and navigate to home if it's empty
  // useEffect(() => {
  //   if (value === "") {
  //     router.push("/"); // Navigate to home route if value is empty
  //   }
  // }, [value, router]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-stone-600 hover:bg-stone-700 hover:text-white text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-transform lg:py-3 lg:px-6 "
        >
          {value
            ? categories.find((category) => category.id.toString() === value)
                ?.name
            : "Select a Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full bg-stone-400 p-0">
        <Command className="w-full bg-stone-600">
          <CommandInput
            placeholder="Search category..."
            className="h-9 "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.name
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug) {
                  setValue(selectedCategory.id.toString());
                  router.push(`/categories/${selectedCategory.slug}`);
                  setOpen(false);
                }
              }
            }}
          />

          <CommandList>
            <CommandEmpty>No category found</CommandEmpty>
            <CommandGroup>
              <motion.div
                initial="closed"
                animate={open ? "open" : "closed"}
                variants={wrapperVariants}
                className="origin-top-right text-white"
              >
                {categories.map((category) => (
                  <motion.div key={category.id} variants={itemVariants}>
                    <CommandItem
                      value={category.name}
                      onSelect={() => {
                        setValue(category.id.toString()); // Update Zustand store
                        // router.push(`/categories/${category.slug}`);
                        setOpen(false);
                      }}
                    >
                      {category.name}
                      <Check
                        className={cn(
                          "ml-auto h4 w-4",
                          value === category.id.toString()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  </motion.div>
                ))}
              </motion.div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
