import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
} from "@kern-ux-annex/kern-react-kit";
import { RechtsformHelper } from "@/components/RechtsformHelper";
import { type FormData, rechtsformOptions } from "@/app/types";

interface Step1RechtsformProps {
  formData: FormData;
  onRechtsformChange: (value: string) => void;
}

export function Step1Rechtsform({ formData, onRechtsformChange }: Step1RechtsformProps) {
  return (
    <>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={2}>Rechtsform wählen</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText>
            Bitte wählen Sie die Rechtsform Ihres Unternehmens.
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernRadioGroup
            name="rechtsform"
            legend="Rechtsform"
            selected={formData.rechtsform}
            items={rechtsformOptions.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            onChange={onRechtsformChange}
          />
        </KernColumn>
      </KernRow>
    </>
  );
}
