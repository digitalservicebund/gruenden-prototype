import {
  KernHeading,
  KernText,
  KernRow,
  KernColumn,
  KernCard,
  KernAlert,
  KernContainer,
} from "@kern-ux-annex/kern-react-kit";
import {
  type FormData,
  type Rechtsform,
  type SideActivity,
  type HasEmployees,
  rechtsformOptions,
  taetigkeitOptions,
  sideActivityOptions,
  hasEmployeesOptions,
} from "@/app/types";

interface Step6ZusammenfassungProps {
  formData: FormData;
}

const getRechtsformLabel = (value: Rechtsform | "") => {
  if (!value) return "";
  return rechtsformOptions.find((opt) => opt.value === value)?.label ?? "";
};

const getTaetigkeitLabel = (value: string) => {
  if (!value) return "";
  return taetigkeitOptions.find((opt) => opt.value === value)?.label ?? "";
};

const getSideActivityLabel = (value: SideActivity) => {
  if (!value) return "";
  return sideActivityOptions.find((opt) => opt.value === value)?.label ?? "";
};

const getHasEmployeesLabel = (value: HasEmployees) => {
  if (!value) return "";
  return hasEmployeesOptions.find((opt) => opt.value === value)?.label ?? "";
};

export function Step6Zusammenfassung({ formData }: Step6ZusammenfassungProps) {
  return (
    <>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={2}>Zusammenfassung</KernHeading>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernText>
            Bitte überprüfen Sie Ihre Angaben.
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernCard
            title="Ihre Angaben"
            body={
              <KernContainer>
                <KernRow>
                  <KernColumn sizes={12}>
                    <KernText bold>Rechtsform:</KernText>
                    <KernText>{getRechtsformLabel(formData.rechtsform)}</KernText>
                  </KernColumn>
                </KernRow>
                <KernRow>
                  <KernColumn sizes={12}>
                    <KernText bold>Tätigkeit:</KernText>
                    <KernText>{getTaetigkeitLabel(formData.taetigkeit)}</KernText>
                  </KernColumn>
                </KernRow>
                <KernRow>
                  <KernColumn sizes={12}>
                    <KernText bold>Nebentätigkeit:</KernText>
                    <KernText>{getSideActivityLabel(formData.isSideActivity)}</KernText>
                  </KernColumn>
                </KernRow>
                <KernRow>
                  <KernColumn sizes={12}>
                    <KernText bold>Angestellte:</KernText>
                    <KernText>{getHasEmployeesLabel(formData.hasEmployees)}</KernText>
                  </KernColumn>
                </KernRow>
              </KernContainer>
            }
          />
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernAlert
            title="Hinweis"
            variant="info"
            body="Dies ist ein Prototyp. In einer echten Anwendung würden hier weitere Schritte und eine Übermittlung der Daten folgen."
          />
        </KernColumn>
      </KernRow>
    </>
  );
}
