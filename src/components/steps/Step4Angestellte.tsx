import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
} from "@kern-ux-annex/kern-react-kit";
import { type FormData, hasEmployeesOptions } from "@/app/types";

interface Step4AngestellteProps {
  formData: FormData;
  onHasEmployeesChange: (value: string) => void;
}

export function Step4Angestellte({ formData, onHasEmployeesChange }: Step4AngestellteProps) {
  return (
    <>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={2}>Planen Sie, Mitarbeiter einzustellen?</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernRadioGroup
            name="hasEmployees"
            selected={formData.hasEmployees}
            items={hasEmployeesOptions.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            onChange={onHasEmployeesChange}
          />
        </KernColumn>
      </KernRow>
    </>
  );
}
