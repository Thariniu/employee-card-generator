import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  CheckCircle2,
  Users,
  FileText,
  CloudUpload,
  FileSpreadsheet,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Sparkles,
  AlertCircle,
  Layers,
  Building2,
  Mail,
  Phone,
  MapPin,
  IdCard,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

type TabKey = "upload" | "validation" | "employees" | "pdf";

type Employee = {
  id: string;
  name: string;
  designation: string;
  address: string;
  email: string;
  mobile: string;
  quantity: number;
};

type ValidationRow = {
  id: string;
  name: string;
  designation: string;
  email: string;
  mobile: string;
  quantity: number;
  status: "valid" | "invalid";
  error?: string;
};

type UploadMeta = {
  fileName: string;
  uploadTime: string;
  records: number;
};

function Dashboard() {
  const [tab, setTab] = useState<TabKey>("upload");

  // Upload state
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMeta, setUploadMeta] = useState<UploadMeta | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Data state — starts empty, populated by API integration
  const [validationRows, setValidationRows] = useState<ValidationRow[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // PDF state
  const [pdfState, setPdfState] = useState<"idle" | "generating" | "ready">("idle");
  const [pdfProgress, setPdfProgress] = useState(0);

  const hasUpload = uploadMeta !== null;

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.005_260)]">
      <Toaster position="top-right" richColors />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]">
              <IdCard className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight text-foreground">
                Visiting Card Suite
              </div>
              <div className="text-xs text-muted-foreground">
                Employee Card Management System
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Badge variant="secondary" className="gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 font-medium text-secondary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Enterprise
            </Badge>
            <div className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              EN
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        {/* Hero */}
        <section className="mb-8">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace
            </div>
            <h1 className="font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
              Employee Visiting Card
              <span className="text-primary"> Management</span>
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Upload an employee roster, review validation results, manage records,
              and generate print-ready visiting card PDFs — all from one workspace.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-background p-1.5 shadow-[var(--shadow-soft)]">
            <TabButton
              active={tab === "upload"}
              onClick={() => setTab("upload")}
              icon={<Upload className="h-4 w-4" />}
              label="Upload"
            />
            <TabButton
              active={tab === "validation"}
              onClick={() => setTab("validation")}
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Validation"
              count={validationRows.length || undefined}
            />
            <TabButton
              active={tab === "employees"}
              onClick={() => setTab("employees")}
              icon={<Users className="h-4 w-4" />}
              label="Employees"
              count={employees.length || undefined}
            />
            <TabButton
              active={tab === "pdf"}
              onClick={() => setTab("pdf")}
              icon={<FileText className="h-4 w-4" />}
              label="Generate PDF"
            />
          </div>
        </nav>

        {/* Content */}
        <section className="pb-16">
          {tab === "upload" && (
            <UploadTab
              file={file}
              setFile={setFile}
              uploading={uploading}
              progress={progress}
              uploadMeta={uploadMeta}
              inputRef={inputRef}
              onUpload={async () => {
                if (!file) {
                  toast.error("Please select a file first");
                  return;
                }
                setUploading(true);
                setProgress(0);
                // Simulate progress. Real POST /upload happens here.
                await new Promise<void>((resolve) => {
                  let p = 0;
                  const t = setInterval(() => {
                    p += Math.random() * 18 + 6;
                    if (p >= 100) {
                      p = 100;
                      clearInterval(t);
                      resolve();
                    }
                    setProgress(Math.min(100, Math.round(p)));
                  }, 180);
                });
                setUploading(false);
                setUploadMeta({
                  fileName: file.name,
                  uploadTime: new Date().toLocaleString(),
                  records: 0, // backend will return the true count
                });
                // Backend integration:
                //   const res = await fetch('/upload', { method: 'POST', body: formData })
                //   const data = await res.json()
                //   setValidationRows(data.validation)
                //   setEmployees(data.employees.filter(r => r.status === 'valid'))
                toast.success("File uploaded", {
                  description: "Awaiting backend validation results.",
                });
              }}
              onClear={() => {
                setFile(null);
                setUploadMeta(null);
                setProgress(0);
                setValidationRows([]);
                setEmployees([]);
                setPdfState("idle");
                setPdfProgress(0);
              }}
            />
          )}

          {tab === "validation" && (
            <ValidationTab hasUpload={hasUpload} rows={validationRows} />
          )}

          {tab === "employees" && (
            <EmployeesTab
              hasUpload={hasUpload}
              employees={employees}
              setEmployees={setEmployees}
            />
          )}

          {tab === "pdf" && (
            <PdfTab
              employees={employees}
              state={pdfState}
              progress={pdfProgress}
              onGenerate={async () => {
                if (employees.length === 0) return;
                setPdfState("generating");
                setPdfProgress(0);
                await new Promise<void>((resolve) => {
                  let p = 0;
                  const t = setInterval(() => {
                    p += Math.random() * 14 + 5;
                    if (p >= 100) {
                      p = 100;
                      clearInterval(t);
                      resolve();
                    }
                    setPdfProgress(Math.min(100, Math.round(p)));
                  }, 200);
                });
                setPdfState("ready");
                toast.success("PDF generated", {
                  description: "Your visiting cards are ready to download.",
                });
              }}
              onDownload={() => {
                // GET /download-pdf
                toast.success("Download started");
              }}
            />
          )}
        </section>
      </main>
    </div>
  );
}

/* ---------------- Tab button ---------------- */

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "group relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all sm:flex-none " +
        (active
          ? "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground")
      }
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={
            "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold " +
            (active
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-secondary text-muted-foreground group-hover:bg-background")
          }
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ---------------- Empty state ---------------- */

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-background px-6 py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ---------------- Card wrapper ---------------- */

function PanelCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-2xl border border-border/70 bg-background shadow-[var(--shadow-soft)] " +
        className
      }
    >
      {children}
    </div>
  );
}

/* ---------------- UPLOAD TAB ---------------- */

function UploadTab({
  file,
  setFile,
  uploading,
  progress,
  uploadMeta,
  inputRef,
  onUpload,
  onClear,
}: {
  file: File | null;
  setFile: (f: File | null) => void;
  uploading: boolean;
  progress: number;
  uploadMeta: UploadMeta | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUpload: () => void;
  onClear: () => void;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PanelCard className="p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Upload employee roster</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Accepted formats: .xlsx, .xls. Columns: Name, Designation, Address, Email, Mobile No, Quantity.
              </p>
            </div>
            <Badge variant="secondary" className="hidden gap-1.5 rounded-full border border-border/60 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              POST /upload
            </Badge>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) setFile(f);
            }}
            className={
              "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all " +
              (dragging
                ? "border-primary bg-primary/5"
                : "border-border/80 bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50")
            }
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CloudUpload className="h-7 w-7" />
            </div>
            <h3 className="text-base font-semibold tracking-tight">
              Drag and drop your Excel file
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              or click the button below to browse
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="rounded-full border-border/70"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Choose file
              </Button>
              <Button
                onClick={onUpload}
                disabled={!file || uploading}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
            </div>

            {file && (
              <div className="mt-6 flex w-full max-w-md items-center gap-3 rounded-xl border border-border/70 bg-background px-4 py-3 text-left">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileSpreadsheet className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                {!uploading && (
                  <button
                    onClick={() => setFile(null)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}

            {uploading && (
              <div className="mt-6 w-full max-w-md">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Uploading…</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            )}
          </div>
        </PanelCard>
      </div>

      <div className="space-y-6">
        <PanelCard className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Layers className="h-4 w-4 text-primary" />
            Last upload
          </div>
          {uploadMeta ? (
            <div className="space-y-4 text-sm">
              <MetaRow label="File name" value={uploadMeta.fileName} />
              <MetaRow label="Upload time" value={uploadMeta.uploadTime} />
              <MetaRow
                label="Records"
                value={
                  uploadMeta.records > 0
                    ? String(uploadMeta.records)
                    : "Awaiting backend"
                }
              />
              <Button
                variant="ghost"
                size="sm"
                className="w-full rounded-lg text-xs text-muted-foreground hover:text-foreground"
                onClick={onClear}
              >
                Clear upload
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-secondary/30 px-4 py-8 text-center text-sm text-muted-foreground">
              No file uploaded yet
            </div>
          )}
        </PanelCard>

        <PanelCard className="p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <FileSpreadsheet className="h-4 w-4 text-primary" />
            Expected columns
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Name", "Designation", "Address", "Email", "Mobile No", "Quantity"].map(
              (c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {c}
                </li>
              ),
            )}
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="max-w-[60%] truncate text-right text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

/* ---------------- VALIDATION TAB ---------------- */

function ValidationTab({
  hasUpload,
  rows,
}: {
  hasUpload: boolean;
  rows: ValidationRow[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "valid" | "invalid">("all");

  const filtered = useMemo(() => {
    return rows
      .filter((r) => (filter === "all" ? true : r.status === filter))
      .filter((r) =>
        query
          ? [r.name, r.email, r.mobile, r.designation]
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase())
          : true,
      );
  }, [rows, query, filter]);

  const valid = rows.filter((r) => r.status === "valid").length;
  const invalid = rows.length - valid;

  if (!hasUpload) {
    return (
      <EmptyState
        icon={<CheckCircle2 className="h-6 w-6" />}
        title="No validation results available"
        description="Upload an Excel file from the Upload tab to see validation results returned by the backend here."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Total records" value={rows.length} tone="neutral" />
        <SummaryCard label="Valid records" value={valid} tone="positive" />
        <SummaryCard label="Invalid records" value={invalid} tone="negative" />
      </div>

      <PanelCard>
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email…"
              className="rounded-lg pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background p-1">
              {(["all", "valid", "invalid"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition " +
                    (filter === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="rounded-lg">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button size="sm" className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Export report
            </Button>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-muted-foreground">
            Backend has not returned any validation rows yet.
            <div className="mt-1 text-xs">
              Endpoint: <code className="rounded bg-secondary px-1.5 py-0.5">GET /validation-results</code>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40">
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Error message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.designation}</TableCell>
                    <TableCell className="text-muted-foreground">{r.email}</TableCell>
                    <TableCell className="text-muted-foreground">{r.mobile}</TableCell>
                    <TableCell className="text-right">{r.quantity}</TableCell>
                    <TableCell>
                      {r.status === "valid" ? (
                        <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                          Valid
                        </Badge>
                      ) : (
                        <Badge className="rounded-full bg-red-50 text-red-700 hover:bg-red-50">
                          Invalid
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.error ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
          <span>
            Showing {filtered.length} of {rows.length}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 rounded-md" disabled>
              Previous
            </Button>
            <Button variant="ghost" size="sm" className="h-7 rounded-md" disabled>
              Next
            </Button>
          </div>
        </div>
      </PanelCard>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "positive" | "negative";
}) {
  const dot =
    tone === "positive"
      ? "bg-emerald-500"
      : tone === "negative"
        ? "bg-red-500"
        : "bg-primary";
  return (
    <PanelCard className="p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span className={"h-1.5 w-1.5 rounded-full " + dot} />
        {label}
      </div>
      <div className="mt-3 font-serif text-4xl tracking-tight text-foreground">
        {value}
      </div>
    </PanelCard>
  );
}

/* ---------------- EMPLOYEES TAB ---------------- */

function EmployeesTab({
  hasUpload,
  employees,
  setEmployees,
}: {
  hasUpload: boolean;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}) {
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState<Employee | null>(null);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = employees.filter((e) =>
    query
      ? [e.name, e.email, e.designation, e.mobile]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      : true,
  );

  if (!hasUpload && employees.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-6 w-6" />}
        title="No employee records found"
        description="Upload an Excel file to continue. Employee records returned by the backend will appear here."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PanelCard>
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Employee records</h2>
            <p className="text-xs text-muted-foreground">
              Endpoint: <code className="rounded bg-secondary px-1.5 py-0.5">GET /employees</code>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search employees…"
                className="rounded-lg pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              size="sm"
              className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setCreating(true)}
            >
              <Plus className="h-4 w-4" />
              Add employee
            </Button>
          </div>
        </div>

        {employees.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-muted-foreground">
            No employee records returned by the backend yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40">
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {e.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <span className="font-medium">{e.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.designation}</TableCell>
                    <TableCell className="max-w-[220px] truncate text-muted-foreground">
                      {e.address}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.email}</TableCell>
                    <TableCell className="text-muted-foreground">{e.mobile}</TableCell>
                    <TableCell className="text-right font-medium">{e.quantity}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <IconButton onClick={() => setViewing(e)} title="View">
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <IconButton onClick={() => setEditing(e)} title="Edit">
                          <Pencil className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEmployees((prev) => prev.filter((x) => x.id !== e.id));
                            toast.success("Employee deleted");
                          }}
                          title="Delete"
                          danger
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </PanelCard>

      {/* View */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Employee details</DialogTitle>
            <DialogDescription>Read-only view of the selected employee.</DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <DetailRow icon={<Users className="h-4 w-4" />} label="Name" value={viewing.name} />
              <DetailRow icon={<Building2 className="h-4 w-4" />} label="Designation" value={viewing.designation} />
              <DetailRow icon={<MapPin className="h-4 w-4" />} label="Address" value={viewing.address} />
              <DetailRow icon={<Mail className="h-4 w-4" />} label="Email" value={viewing.email} />
              <DetailRow icon={<Phone className="h-4 w-4" />} label="Mobile" value={viewing.mobile} />
              <DetailRow icon={<Layers className="h-4 w-4" />} label="Quantity" value={String(viewing.quantity)} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit / Create */}
      <EmployeeFormDialog
        open={!!editing || creating}
        initial={editing}
        onClose={() => {
          setEditing(null);
          setCreating(false);
        }}
        onSave={(payload) => {
          if (editing) {
            setEmployees((prev) =>
              prev.map((x) => (x.id === editing.id ? { ...x, ...payload } : x)),
            );
            toast.success("Employee updated");
          } else {
            setEmployees((prev) => [
              ...prev,
              { id: crypto.randomUUID(), ...payload },
            ]);
            toast.success("Employee added");
          }
          setEditing(null);
          setCreating(false);
        }}
      />
    </div>
  );
}

function IconButton({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={
        "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground " +
        (danger ? "hover:bg-red-50 hover:text-red-600" : "")
      }
    >
      {children}
    </button>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2.5">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

function EmployeeFormDialog({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: Employee | null;
  onClose: () => void;
  onSave: (payload: Omit<Employee, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<Employee, "id">>({
    name: "",
    designation: "",
    address: "",
    email: "",
    mobile: "",
    quantity: 1,
  });

  // reset when opening
  useMemo(() => {
    if (open) {
      setForm(
        initial ?? {
          name: "",
          designation: "",
          address: "",
          email: "",
          mobile: "",
          quantity: 1,
        },
      );
    }
  }, [open, initial]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit employee" : "Add employee"}</DialogTitle>
          <DialogDescription>
            {initial ? "Update employee details." : "Create a new employee record."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Designation">
            <Input
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Mobile No">
            <Input
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Address">
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Quantity">
            <Input
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Math.max(1, Number(e.target.value) || 1) })
              }
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              if (!form.name || !form.email) {
                toast.error("Name and email are required");
                return;
              }
              onSave(form);
            }}
          >
            {initial ? "Save changes" : "Add employee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

/* ---------------- PDF TAB ---------------- */

function PdfTab({
  employees,
  state,
  progress,
  onGenerate,
  onDownload,
}: {
  employees: Employee[];
  state: "idle" | "generating" | "ready";
  progress: number;
  onGenerate: () => void;
  onDownload: () => void;
}) {
  const totalCards = employees.reduce((s, e) => s + (e.quantity || 0), 0);

  if (employees.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-6 w-6" />}
        title="No employee records available for PDF generation"
        description="Add or upload employees first. Once records exist, you can generate and download visiting card PDFs here."
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Employees" value={employees.length} tone="neutral" />
          <SummaryCard label="Total cards" value={totalCards} tone="positive" />
          <SummaryCard
            label="Status"
            value={state === "ready" ? 1 : 0}
            tone={state === "ready" ? "positive" : "neutral"}
          />
        </div>

        <PanelCard>
          <div className="flex items-center justify-between border-b border-border/60 p-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Card generation queue</h2>
              <p className="text-xs text-muted-foreground">
                Endpoints: <code className="rounded bg-secondary px-1.5 py-0.5">POST /generate-pdf</code> ·{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5">GET /download-pdf</code>
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40">
                  <TableHead>Employee</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell className="text-muted-foreground">{e.designation}</TableCell>
                    <TableCell className="text-right">{e.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PanelCard>
      </div>

      <div className="space-y-6">
        <PanelCard className="overflow-hidden">
          <div className="border-b border-border/60 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <IdCard className="h-4 w-4 text-primary" />
              Card preview
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Placeholder only. Final template is provided by the backend.
            </p>
          </div>
          <div className="bg-secondary/40 p-6">
            <div className="relative aspect-[1.75/1] w-full overflow-hidden rounded-xl bg-white shadow-[var(--shadow-elegant)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5" />
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
              <div className="relative flex h-full flex-col justify-between p-5">
                <div className="flex items-center gap-2 text-primary">
                  <IdCard className="h-4 w-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Your Company
                  </span>
                </div>
                <div>
                  <div className="font-serif text-lg leading-tight text-foreground">
                    Employee Name
                  </div>
                  <div className="text-[11px] text-muted-foreground">Designation</div>
                  <div className="mt-2 space-y-0.5 text-[10px] text-muted-foreground">
                    <div>email@company.com</div>
                    <div>+00 00000 00000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard className="p-5">
          {state === "generating" && (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Generating…
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
          {state === "ready" && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              PDF is ready to download.
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button
              onClick={onGenerate}
              disabled={state === "generating"}
              className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {state === "generating" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate PDF
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onDownload}
              disabled={state !== "ready"}
              className="rounded-lg"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            The visiting card template will be provided separately. This preview is a
            placeholder for layout purposes only.
          </div>
        </PanelCard>

        <div className="flex items-center justify-between rounded-2xl border border-dashed border-border/70 px-4 py-3 text-xs text-muted-foreground">
          <span>Ready for backend integration</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
