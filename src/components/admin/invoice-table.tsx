import {
  formatCurrencyFromPence,
  getInvoiceBalance,
  getInvoiceSchool,
  getInvoiceTotal,
  sampleInvoices,
} from "@/data/invoices";
import {
  InvoiceStatusBadge,
  PaymentMethodBadge,
} from "./invoice-status-badge";

export function InvoiceTable() {
  return (
    <div className="overflow-hidden border border-border-soft bg-surface shadow-sm">
      <div className="border-b border-border-soft px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-brand-blue-strong">
          Invoice register
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Sample-only records showing the intended admin workflow. Live storage,
          editing, payment links, and PDF generation are intentionally disabled.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-soft text-left text-sm">
          <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            <tr>
              <th scope="col" className="px-5 py-3">
                Reference
              </th>
              <th scope="col" className="px-5 py-3">
                Family
              </th>
              <th scope="col" className="px-5 py-3">
                School
              </th>
              <th scope="col" className="px-5 py-3">
                Due
              </th>
              <th scope="col" className="px-5 py-3">
                Status
              </th>
              <th scope="col" className="px-5 py-3">
                Method
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {sampleInvoices.map((invoice) => {
              const school = getInvoiceSchool(invoice);
              const total = getInvoiceTotal(invoice);
              const balance = getInvoiceBalance(invoice);

              return (
                <tr key={invoice.id} className="align-top">
                  <td className="px-5 py-4 font-mono text-xs font-semibold text-brand-blue-strong">
                    {invoice.reference}
                    <span className="mt-1 block font-sans text-xs font-normal text-slate-500">
                      Issued {invoice.issueDate}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-brand-blue-strong">
                      {invoice.customerLabel}
                    </span>
                    <span className="mt-1 block text-xs text-slate-600">
                      {invoice.studentLabel}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {school?.name ?? "School to confirm"}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{invoice.dueDate}</td>
                  <td className="px-5 py-4">
                    <InvoiceStatusBadge status={invoice.paymentStatus} />
                  </td>
                  <td className="px-5 py-4">
                    <PaymentMethodBadge method={invoice.paymentMethod} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="block font-semibold text-brand-blue-strong">
                      {formatCurrencyFromPence(balance)}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      of {formatCurrencyFromPence(total)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
