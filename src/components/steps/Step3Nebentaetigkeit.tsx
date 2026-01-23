import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
  KernAlert,
} from "@kern-ux-annex/kern-react-kit";
import { type FormData, sideActivityOptions } from "@/app/types";

interface Step3NebentaetigkeitProps {
  formData: FormData;
  onSideActivityChange: (value: string) => void;
}

export function Step3Nebentaetigkeit({ formData, onSideActivityChange }: Step3NebentaetigkeitProps) {
  return (
    <>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={2}>Wie wollen Sie diese Tätigkeit ausüben?</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernRadioGroup
            name="isSideActivity"
            selected={formData.isSideActivity}
            items={sideActivityOptions.map((opt) => ({
              id: opt.value,
              value: opt.value,
              label: opt.label,
            }))}
            onChange={onSideActivityChange}
          />
        </KernColumn>
      </KernRow>

      {formData.isSideActivity === "yes" && (
        <KernRow>
          <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
            <KernAlert
              title="Gut zu wissen"
              variant="info"
              body="Sie bleiben über Ihren Hauptjob krankenversichert. Dadurch sparen Sie hohe zusätzliche Kosten für Ihre Versicherung. Das gilt aber nur, wenn Sie maximal 20 Stunden pro Woche für Ihr neues Unternehmen arbeiten."
            />
          </KernColumn>
        </KernRow>
      )}
    </>
  );
}
