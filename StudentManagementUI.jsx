import { useState } from "react";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: "2024-0001", name: "Joseph Banate",   course: "BSCS",   year: 3, status: "Enrolled",  gpa: 1.75 },
  { id: "2024-0002", name: "Uzumaki Naruto", course: "BSIT",   year: 2, status: "Enrolled",  gpa: 2.00 },
  { id: "2024-0003", name: "Uchiha Sasuka",      course: "BSCS",   year: 4, status: "Irregular", gpa: 2.25 },
  { id: "2024-0004", name: "Lady Arkham",  course: "BSIS",   year: 1, status: "Enrolled",  gpa: 1.50 },
  { id: "2024-0005", name: "Rabbit White", course: "BSIT",   year: 3, status: "LOA",       gpa: null  },
  { id: "2024-0006", name: "Dante Sparda",       course: "BSCS",   year: 2, status: "Enrolled",  gpa: 1.25 },
];

const STATS = [
  { label: "Total Students", value: "1,248", delta: "+34 this sem", icon: "👥", color: "#4ade80" },
  { label: "Enrolled",       value: "1,105", delta: "88.5%",        icon: "✅", color: "#60a5fa" },
  { label: "Irregular",      value: "98",    delta: "7.8%",         icon: "⚠️", color: "#fbbf24" },
  { label: "On Leave",       value: "45",    delta: "3.6%",         icon: "💤", color: "#f87171" },
];

// ── Reusable Sub-components ────────────────────────────────────────────────────
function Sidebar({ active, onNav }) {
  const links = [
    { id: "dashboard", icon: "⊞", label: "Dashboard"  },
    { id: "students",  icon: "👤", label: "Students"   },
    { id: "enroll",    icon: "📋", label: "Enrollment" },
    { id: "grades",    icon: "📊", label: "Grades"     },
    { id: "reports",   icon: "📁", label: "Reports"    },
  ];
  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#0f172a",
      display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0,
      borderRight: "1px solid #1e293b",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 24px 32px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
          Akademya
        </div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontFamily: "monospace" }}>
          STUDENT MANAGEMENT
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {links.map(l => (
          <button key={l.id} onClick={() => onNav(l.id)} style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", padding: "10px 12px", border: "none", borderRadius: 8,
            background: active === l.id ? "#1e3a5f" : "transparent",
            color: active === l.id ? "#60a5fa" : "#94a3b8",
            cursor: "pointer", fontSize: 13.5, fontFamily: "inherit",
            marginBottom: 2, transition: "all 0.15s",
            fontWeight: active === l.id ? 600 : 400,
          }}>
            <span style={{ fontSize: 16 }}>{l.icon}</span>
            {l.label}
            {active === l.id && (
              <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#60a5fa" }} />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid #1e293b" }}>
        <div style={{ fontSize: 12, color: "#475569" }}>Logged in as</div>
        <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Admin · Registrar</div>
      </div>
    </aside>
  );
}

function Header({ page, search, onSearch }) {
  const titles = {
    dashboard: "Dashboard Overview",
    students:  "Student Records",
    enroll:    "Enrollment Form",
    grades:    "Grade Management",
    reports:   "Reports & Analytics",
  };
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 32px", background: "#0f172a",
      borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 10,
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 22, color: "#f1f5f9", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>
          {titles[page] || "Akademya"}
        </h1>
        <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>A.Y. 2024–2025 · Second Semester</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search bar */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: 14 }}>🔍</span>
          <input
            placeholder="Search students…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            style={{
              background: "#1e293b", border: "1px solid #334155", borderRadius: 8,
              padding: "8px 12px 8px 32px", color: "#f1f5f9", fontSize: 13,
              outline: "none", width: 220, fontFamily: "inherit",
            }}
          />
        </div>
        <button
          onClick={() => alert("Notifications: No new alerts.")}
          style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#94a3b8", cursor: "pointer", fontSize: 16 }}>
          🔔
        </button>
      </div>
    </header>
  );
}

function StatCard({ label, value, delta, icon, color }) {
  return (
    <div style={{
      background: "#1e293b", border: "1px solid #334155", borderRadius: 12,
      padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#f1f5f9", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontSize: 12, color, fontWeight: 500 }}>{delta}</div>
    </div>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────
function DashboardPage() {
  const recent = STUDENTS.slice(0, 4);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Bottom split */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Recent students */}
        <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600, marginBottom: 16 }}>Recent Students</div>
          {recent.map(s => (
            <div key={s.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid #0f172a",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "#60a5fa", fontWeight: 700,
                }}>
                  {s.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#f1f5f9", fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "#475569" }}>{s.id} · {s.course}</div>
                </div>
              </div>
              <StatusBadge status={s.status} />
            </div>
          ))}
        </div>

        {/* Course distribution */}
        <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600, marginBottom: 16 }}>Course Distribution</div>
          {[
            { course: "BSCS", pct: 42, count: 524, color: "#60a5fa" },
            { course: "BSIT", pct: 33, count: 412, color: "#4ade80" },
            { course: "BSIS", pct: 25, count: 312, color: "#fbbf24" },
          ].map(c => (
            <div key={c.course} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{c.course}</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>{c.count} students · {c.pct}%</span>
              </div>
              <div style={{ height: 6, background: "#0f172a", borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 99, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Enrolled":  { bg: "#052e16", color: "#4ade80", border: "#166534" },
    "Irregular": { bg: "#422006", color: "#fbbf24", border: "#92400e" },
    "LOA":       { bg: "#2d1111", color: "#f87171", border: "#7f1d1d" },
  };
  const s = map[status] || { bg: "#1e293b", color: "#94a3b8", border: "#334155" };
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600,
    }}>{status}</span>
  );
}

function StudentsPage({ search }) {
  const [sortCol, setSortCol] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState(null);

  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.includes(search) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const va = a[sortCol] ?? "";
    const vb = b[sortCol] ?? "";
    return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });

  const toggleSort = col => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const cols = [
    { key: "id",     label: "Student ID"  },
    { key: "name",   label: "Name"        },
    { key: "course", label: "Course"      },
    { key: "year",   label: "Year"        },
    { key: "status", label: "Status"      },
    { key: "gpa",    label: "GPA"         },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, color: "#475569" }}>
          {filtered.length} of {STUDENTS.length} records{search ? ` matching "${search}"` : ""}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => alert("Export CSV — feature coming in final version")} style={btnStyle("#1e293b", "#94a3b8")}>⬇ Export CSV</button>
          <button onClick={() => alert("Add student form will open here")} style={btnStyle("#1e3a5f", "#60a5fa")}>+ Add Student</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: "#475569" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            No students found for "{search}"
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                {cols.map(c => (
                  <th
                    key={c.key}
                    onClick={() => toggleSort(c.key)}
                    style={{
                      padding: "12px 16px", textAlign: "left", fontSize: 11,
                      color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8,
                      cursor: "pointer", userSelect: "none", fontWeight: 600,
                    }}>
                    {c.label} {sortCol === c.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                ))}
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={s.id}
                  style={{
                    borderTop: "1px solid #0f172a",
                    background: selected === s.id ? "#1e3a5f" : i % 2 === 1 ? "#172033" : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelected(selected === s.id ? null : s.id)}
                >
                  <td style={td}><span style={{ fontFamily: "monospace", color: "#60a5fa", fontSize: 12 }}>{s.id}</span></td>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", background: "#0f172a",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, color: "#60a5fa", fontWeight: 700, flexShrink: 0,
                      }}>{s.name.charAt(0)}</div>
                      <span style={{ color: "#f1f5f9", fontWeight: 500, fontSize: 13 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={td}><span style={{ color: "#94a3b8", fontSize: 13 }}>{s.course}</span></td>
                  <td style={td}><span style={{ color: "#94a3b8", fontSize: 13 }}>Year {s.year}</span></td>
                  <td style={td}><StatusBadge status={s.status} /></td>
                  <td style={td}><span style={{ color: s.gpa ? "#4ade80" : "#475569", fontWeight: 600, fontSize: 13 }}>{s.gpa ? s.gpa.toFixed(2) : "—"}</span></td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={e => { e.stopPropagation(); alert(`View profile: ${s.name}`); }} style={iconBtn}>👁</button>
                      <button onClick={e => { e.stopPropagation(); alert(`Edit record: ${s.name}`); }} style={iconBtn}>✏️</button>
                      <button onClick={e => { e.stopPropagation(); alert(`Delete: ${s.name}?`); }} style={{ ...iconBtn, color: "#f87171" }}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const td = { padding: "12px 16px", verticalAlign: "middle" };
const iconBtn = {
  background: "#0f172a", border: "1px solid #1e293b", borderRadius: 6,
  padding: "4px 8px", cursor: "pointer", fontSize: 13, color: "#94a3b8",
};
const btnStyle = (bg, color) => ({
  background: bg, border: `1px solid ${color}20`, color,
  borderRadius: 8, padding: "8px 16px", cursor: "pointer",
  fontSize: 13, fontFamily: "inherit", fontWeight: 500,
});

function EnrollPage() {
  const [form, setForm] = useState({
    lastName: "", firstName: "", middleName: "", email: "",
    course: "", year: "", section: "", type: "Regular",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    if (!form.lastName || !form.firstName || !form.course) {
      alert("Please fill in required fields: Last Name, First Name, and Course.");
      return;
    }
    setSubmitted(true);
    console.log("Form submitted:", form);
  };

  if (submitted) {
    return (
      <div style={{
        background: "#1e293b", border: "1px solid #334155", borderRadius: 12,
        padding: 48, textAlign: "center", maxWidth: 480, margin: "40px auto",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 20, color: "#4ade80", fontWeight: 700, marginBottom: 8 }}>Enrollment Submitted!</div>
        <div style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
          {form.firstName} {form.lastName} has been queued for enrollment validation.
        </div>
        <button onClick={() => { setSubmitted(false); setForm({ lastName:"",firstName:"",middleName:"",email:"",course:"",year:"",section:"",type:"Regular" }); }}
          style={{ ...btnStyle("#1e3a5f", "#60a5fa"), padding: "10px 24px" }}>
          Enroll Another Student
        </button>
      </div>
    );
  }

  const field = (label, key, type = "text", required = false) => (
    <div>
      <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}{required && <span style={{ color: "#f87171", marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={update(key)}
        style={{
          width: "100%", background: "#0f172a", border: "1px solid #334155",
          borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13,
          outline: "none", fontFamily: "inherit", boxSizing: "border-box",
        }}
      />
    </div>
  );

  const select = (label, key, opts, required = false) => (
    <div>
      <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}{required && <span style={{ color: "#f87171", marginLeft: 2 }}>*</span>}
      </label>
      <select
        value={form[key]}
        onChange={update(key)}
        style={{
          width: "100%", background: "#0f172a", border: "1px solid #334155",
          borderRadius: 8, padding: "10px 12px", color: form[key] ? "#f1f5f9" : "#475569",
          fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box",
        }}>
        <option value="">— Select —</option>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: 32 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>New Student Enrollment</div>
        <div style={{ fontSize: 13, color: "#475569", marginBottom: 28 }}>Fill in all required fields marked with *</div>

        {/* Personal Info */}
        <div style={{ fontSize: 12, color: "#60a5fa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, fontWeight: 600 }}>Personal Information</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {field("Last Name",   "lastName",   "text", true)}
          {field("First Name",  "firstName",  "text", true)}
          {field("Middle Name", "middleName")}
          {field("Email",       "email",      "email")}
        </div>

        {/* Academic Info */}
        <div style={{ fontSize: 12, color: "#60a5fa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, fontWeight: 600 }}>Academic Information</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {select("Course",       "course",  ["BSCS","BSIT","BSIS"],         true)}
          {select("Year Level",   "year",    ["1st Year","2nd Year","3rd Year","4th Year"], true)}
          {select("Section",      "section", ["A","B","C","D"])}
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>
            Enrollment Type
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            {["Regular","Irregular","Transferee"].map(t => (
              <label key={t} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: form.type === t ? "#60a5fa" : "#64748b", fontSize: 13 }}>
                <input type="radio" name="type" value={t} checked={form.type === t} onChange={update("type")} />
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={() => setForm({ lastName:"",firstName:"",middleName:"",email:"",course:"",year:"",section:"",type:"Regular" })}
            style={btnStyle("#0f172a", "#94a3b8")}>
            Clear Form
          </button>
          <button onClick={handleSubmit} style={{ ...btnStyle("#1e3a5f", "#60a5fa"), background: "#1d4ed8", color: "#fff", border: "none" }}>
            Submit Enrollment
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, emoji, desc }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: 12 }}>
      <div style={{ fontSize: 48 }}>{emoji}</div>
      <div style={{ fontSize: 20, color: "#f1f5f9", fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#475569" }}>{desc}</div>
      <div style={{
        marginTop: 8, background: "#1e293b", border: "1px solid #334155", borderRadius: 8,
        padding: "8px 20px", fontSize: 12, color: "#60a5fa",
      }}>
        This section will be built in the final system
      </div>
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page,   setPage]   = useState("dashboard");
  const [search, setSearch] = useState("");

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#0a0f1e", fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#f1f5f9",
    }}>
      <Sidebar active={page} onNav={p => { setPage(p); setSearch(""); }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        <Header page={page} search={search} onSearch={setSearch} />
        <main style={{ flex: 1, padding: 32 }}>
          {page === "dashboard" && <DashboardPage />}
          {page === "students"  && <StudentsPage search={search} />}
          {page === "enroll"    && <EnrollPage />}
          {page === "grades"    && <PlaceholderPage title="Grade Management" emoji="📊" desc="View, encode, and manage student grades." />}
          {page === "reports"   && <PlaceholderPage title="Reports & Analytics" emoji="📁" desc="Generate enrollment and performance reports." />}
        </main>
      </div>
    </div>
  );
}
