import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernRadioGroup,
  KernAlert,
  KernList,
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
              title="Achten Sie auf diese Vorraussetzungen"
              variant="info"
              body={
                <KernList type="bullet" items={[
                  { content: "Sie arbeiten weiter in Ihrem Hauptberuf" },
                  { content: "Ihr Einkommen aus Ihrer Selbstständigkeit ist geringer als aus Ihrer Haupttätigkeit" },
                  { content: "Sie bleiben über Ihren Hauptberuf weiter sozialversichert" },
                ]} />
              }
            />
          </KernColumn>
        </KernRow>
      )}
    </>
  );
}
