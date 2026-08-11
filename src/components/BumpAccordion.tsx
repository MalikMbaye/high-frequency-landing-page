import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

/**
 * Six-panel exclusive accordion for the honey order bump.
 * Restricted ingredient / safety copy is fetched at runtime from
 * /content/bump-panels.json — never inlined into the bundle.
 */
type Block =
  | { type: "lead" | "p" | "accent" | "note" | "subhead"; text: string }
  | { type: "labelled"; label: string; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "list"; items: Array<{ label: string; text: string }> }
  | { type: "disclosures"; items: Array<{ label: string; text: string }> }
  | {
      type: "nutrition";
      headValue: string;
      headDv: string;
      rows: Array<{ label: string; value: string; dv: string }>;
    };

interface Panel {
  id: string;
  title: string;
  subline?: string;
  blocks: Block[];
}


function PanelBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="hfa-lead">
                {block.text}
              </p>
            );
          case "subhead":
            return (
              <p key={i} className="hfa-subhead">
                {block.text}
              </p>
            );
          case "accent":
            return (
              <p key={i} className="hfa-accent">
                {block.text}
              </p>
            );

          case "note":
            return (
              <p key={i} className="hfa-note">
                {block.text}
              </p>
            );
          case "labelled":
            return (
              <p key={i} className="hfa-p">
                <strong className="hfa-strong">{block.label}</strong> {block.text}
              </p>
            );
          case "bullets":
            return (
              <ul key={i} className="hfa-bullets">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "list":
            return (
              <dl key={i} className="hfa-steps">
                {block.items.map((item) => (
                  <div key={item.label} className="hfa-step">
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            );
          case "nutrition":
            return (
              <table key={i} className="hfa-table">
                <thead>
                  <tr>
                    <th scope="col" />
                    <th scope="col">{block.headValue}</th>
                    <th scope="col">{block.headDv}</th>
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                      <td className="hfa-dv">{row.dv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case "disclosures":
            return (
              <div key={i} className="hfa-disclosures">
                {block.items.map((item) => (
                  <p key={item.text}>
                    {item.label && <strong>{item.label}</strong>} {item.text}
                  </p>
                ))}
              </div>
            );
          default:
            return (
              <p key={i} className="hfa-p">
                {(block as { text: string }).text}
              </p>
            );
        }
      })}
    </>
  );
}

function AccordionRow({
  panel,
  open,
  onToggle,
}: {
  panel: Panel;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!open) {
      setHeight(0);
      return;
    }
    const measure = () => setHeight(innerRef.current?.scrollHeight ?? 0);
    measure();
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [open]);

  return (
    <div className={`hfa-row ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="hfa-head"
        id={`hfa-head-${panel.id}`}
        aria-expanded={open}
        aria-controls={`hfa-panel-${panel.id}`}
        onClick={onToggle}
      >
        <span className="hfa-title">{panel.title}</span>
        <ChevronDown className="hfa-chev" size={18} aria-hidden="true" />
      </button>
      <div
        className="hfa-panel"
        id={`hfa-panel-${panel.id}`}
        role="region"
        aria-labelledby={`hfa-head-${panel.id}`}
        hidden={!open}
        style={{ height: open ? height : 0 }}
      >
        <div className="hfa-panel-inner" ref={innerRef}>
          <PanelBody blocks={panel.blocks} />
        </div>
      </div>
    </div>
  );
}

const BumpAccordion = ({ onOpenPanel }: { onOpenPanel?: (title: string) => void }) => {
  const [panels, setPanels] = useState<Panel[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/content/bump-panels.json")
      .then((res) => res.json())
      .then((data: { panels: Panel[] }) => {
        if (!cancelled) setPanels(data.panels ?? []);
      })
      .catch((error) => console.error("Failed to load bump panels:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback(
    (panel: Panel) => {
      setOpenId((current) => {
        const next = current === panel.id ? null : panel.id;
        if (next) onOpenPanel?.(panel.title);
        return next;
      });
    },
    [onOpenPanel],
  );

  if (!panels) {
    return (
      <div className="hfa hfa-loading">
        <Loader2 className="animate-spin h-4 w-4" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="hfa">
      {panels.map((panel) => (
        <AccordionRow
          key={panel.id}
          panel={panel}
          open={openId === panel.id}
          onToggle={() => toggle(panel)}
        />
      ))}
    </div>
  );
};

export default BumpAccordion;
