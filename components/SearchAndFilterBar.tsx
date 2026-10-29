"use client";

import { ALL_FILTER_VALUE, QuestionFilters } from "@/types/question";

interface SearchAndFilterBarProps {
  filters: QuestionFilters;
  onChange: (filters: QuestionFilters) => void;
  companies: string[];
  roles: string[];
  topics: string[];
  difficulties: readonly string[];
  questionTypes: string[];
  resultCount: number;
  totalCount: number;
  view: "cards" | "table";
  onViewChange: (view: "cards" | "table") => void;
}

export function SearchAndFilterBar({
  filters,
  onChange,
  companies,
  roles,
  topics,
  difficulties,
  questionTypes,
  resultCount,
  totalCount,
  view,
  onViewChange,
}: SearchAndFilterBarProps) {
  function update<K extends keyof QuestionFilters>(key: K, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="rounded-card border border-slate-border bg-card p-4 shadow-card sm:p-5">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-slate-muted">
          ?
        </span>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Search by keyword, company, role, or topic..."
          className="w-full rounded-full border border-slate-border bg-paper py-3 pl-9 pr-4 text-sm text-ink placeholder:text-slate-muted focus:border-indigo focus:outline-none"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <FilterSelect
          label="Company"
          value={filters.company}
          options={companies}
          onChange={(v) => update("company", v)}
        />
        <FilterSelect
          label="Role"
          value={filters.role}
          options={roles}
          onChange={(v) => update("role", v)}
        />
        <FilterSelect
          label="Topic"
          value={filters.topic}
          options={topics}
          onChange={(v) => update("topic", v)}
        />
        <FilterSelect
          label="Difficulty"
          value={filters.difficulty}
          options={[...difficulties]}
          onChange={(v) => update("difficulty", v)}
        />
        <FilterSelect
          label="Type"
          value={filters.question_type}
          options={questionTypes}
          onChange={(v) => update("question_type", v)}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-border pt-4">
        <p className="text-sm text-slate-muted">
          Showing{" "}
          <span className="font-semibold text-ink">{resultCount}</span> of{" "}
          {totalCount} questions
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onChange({
                search: "",
                company: ALL_FILTER_VALUE,
                role: ALL_FILTER_VALUE,
                topic: ALL_FILTER_VALUE,
                difficulty: ALL_FILTER_VALUE,
                question_type: ALL_FILTER_VALUE,
              })
            }
            className="text-sm font-medium text-indigo hover:text-indigo-dark"
          >
            Reset filters
          </button>

          <div className="ml-2 flex rounded-full border border-slate-border p-0.5">
            <ViewToggleButton
              active={view === "cards"}
              onClick={() => onViewChange("cards")}
            >
              Cards
            </ViewToggleButton>
            <ViewToggleButton
              active={view === "table"}
              onClick={() => onViewChange("table")}
            >
              Table
            </ViewToggleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-full border border-slate-border bg-paper px-3 py-2 text-xs font-medium text-ink focus:border-indigo focus:outline-none sm:text-sm"
    >
      <option value={ALL_FILTER_VALUE}>{label}: All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function ViewToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
