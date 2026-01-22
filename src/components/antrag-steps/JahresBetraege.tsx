import { KernInput } from "@kern-ux-annex/kern-react-kit";

interface JahresBetraegeProps {
  diesJahrValue: string;
  folgejahrValue: string;
  onDiesJahrChange: (value: string) => void;
  onFolgejahrChange: (value: string) => void;
  onDiesJahrBlur?: () => void;
  idPrefix: string;
}

export function JahresBetraege({
  diesJahrValue,
  folgejahrValue,
  onDiesJahrChange,
  onFolgejahrChange,
  onDiesJahrBlur,
  idPrefix,
}: JahresBetraegeProps) {
  return (
    <>
      <div className="mb-8">
        <KernInput
          id={`${idPrefix}-dieses-jahr`}
          label="Dieses Jahr (euro)"
          type="number"
          value={diesJahrValue}
          onChange={(e) => onDiesJahrChange(e.target.value)}
          onBlur={onDiesJahrBlur}
        />
      </div>

      <div className="mb-8">
        <KernInput
          id={`${idPrefix}-folgejahr`}
          label="Folgejahr (euro)"
          type="number"
          value={folgejahrValue}
          onChange={(e) => onFolgejahrChange(e.target.value)}
        />
      </div>
    </>
  );
}
