import { createRoot } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../src/i18n/LocaleContext.tsx";
import DiagnosticForm from "../src/components/DiagnosticForm.jsx";

export async function renderDiagnosticForm(container) {
  const root = createRoot(container);
  await act(async () => {
    root.render(
      <MemoryRouter initialEntries={["/?source=dual-key#diagnostic"]}>
        <LocaleProvider>
          <DiagnosticForm intent="snapshot" onIntentChange={() => {}} enquirySource="dual-key" />
        </LocaleProvider>
      </MemoryRouter>,
    );
  });
  return root;
}
