"use client";

//
//  CopyEmail.tsx
//  An email address that does something when you click it.
//
//  `mailto:` is a coin flip: it opens a mail client if the machine has one registered, and
//  silently does nothing if it does not — which is most browsers on most desktops now. So
//  the address itself is the label (visible, selectable, copyable by hand) and clicking it
//  copies it to the clipboard and says so.
//

import * as React from "react";

export const EMAIL = "akshatcanbuild@gmail.com";

export function CopyEmail({
  className = "",
  icon,
  copiedLabel = "Copied",
}: {
  className?: string;
  icon?: React.ReactNode;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const labelRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    // `navigator.clipboard` is not just missing outside https — it also *rejects* when the
    // document does not have focus, which is easy to hit. So the old textarea trick is the
    // fallback for both cases rather than only for the missing-API one.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        return;
      }
    } catch {
      // fall through
    }

    const field = document.createElement("textarea");
    field.value = EMAIL;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    let copiedByCommand = false;
    try {
      copiedByCommand = document.execCommand("copy");
    } catch {
      copiedByCommand = false;
    }
    document.body.removeChild(field);
    // Copying is not allowed to fail silently: if neither route worked, the address is
    // selected on the page so the keyboard shortcut still does the job.
    if (copiedByCommand) {
      setCopied(true);
    } else {
      selectLabel();
    }
  };

  const selectLabel = () => {
    const node = labelRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${EMAIL}`}
      className={className}
    >
      <span ref={labelRef} className="tabular-nums">
        {copied ? copiedLabel : EMAIL}
      </span>
      {icon}
    </button>
  );
}
