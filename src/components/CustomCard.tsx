import { ReactNode } from "react";
import { KernContainer, KernRow, KernColumn } from "@kern-ux-annex/kern-react-kit";
import styles from "./CustomCard.module.css";

interface CustomCardProps {
  title?: string;
  preline?: string;
  children: ReactNode;
}

export function CustomCard({ title, preline, children }: CustomCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.container}>
        {(preline || title) && (
          <KernContainer>
            <KernRow>
              <KernColumn sizes={12}>
                <div className={styles.header}>
                  {preline && (
                    <div className={styles.preline}>
                      {preline}
                    </div>
                  )}
                  {title && (
                    <h3 className={styles.title}>{title}</h3>
                  )}
                </div>
              </KernColumn>
            </KernRow>
          </KernContainer>
        )}
        <section className={styles.body}>
          {children}
        </section>
      </div>
    </article>
  );
}
