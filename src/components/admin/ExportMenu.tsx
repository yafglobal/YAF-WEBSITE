"use client";

import { useState, useRef, useEffect } from "react";
import { Export, CaretDown, FileCsv, FileXls, FilePdf } from "@phosphor-icons/react";

export interface ExportColumn {
  label: string;
  key: string;
}

interface ExportMenuProps {
  data: Record<string, unknown>[];
  columns: ExportColumn[];
  filename: string;
}

export function ExportMenu({ data, columns, filename }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const flatRow = (row: Record<string, unknown>) => columns.map((c) => String(row[c.key] ?? ""));

  const exportCSV = () => {
    const header = columns.map((c) => `"${c.label}"`).join(",");
    const rows = data.map((row) =>
      flatRow(row)
        .map((v) => `"${v.replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const exportXLSX = async () => {
    // Dynamic import keeps xlsx out of the initial bundle
    const { utils, writeFile } = await import("xlsx");
    const wsData = [columns.map((c) => c.label), ...data.map((row) => flatRow(row))];
    const ws = utils.aoa_to_sheet(wsData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `${filename}.xlsx`);
    setOpen(false);
  };

  const exportPDF = () => {
    const tableRows = data
      .map(
        (row) =>
          `<tr>${flatRow(row)
            .map((v) => `<td>${v}</td>`)
            .join("")}</tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${filename}</title>
  <style>
    body { font-family: system-ui, sans-serif; font-size: 11px; color: #111; }
    h2   { font-size: 16px; margin-bottom: 12px; }
    table{ border-collapse: collapse; width: 100%; }
    th   { background: #f3f4f6; font-weight: 600; text-align: left; }
    th, td { border: 1px solid #e5e7eb; padding: 6px 10px; }
    tr:nth-child(even) td { background: #f9fafb; }
  </style>
</head>
<body>
  <h2>${filename}</h2>
  <table>
    <thead><tr>${columns.map((c) => `<th>${c.label}</th>`).join("")}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <Export size={16} />
        Export
        <CaretDown
          size={11}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 min-w-[176px] py-1 overflow-hidden">
          <button
            onClick={exportCSV}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileCsv size={18} className="text-emerald-500" weight="fill" /> CSV
          </button>
          <button
            onClick={exportXLSX}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileXls size={18} className="text-emerald-600" weight="fill" /> Excel (.xlsx)
          </button>
          <div className="my-1 border-t border-gray-100" />
          <button
            onClick={exportPDF}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FilePdf size={18} className="text-rose-500" weight="fill" /> PDF (print)
          </button>
        </div>
      )}
    </div>
  );
}
