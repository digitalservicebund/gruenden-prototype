"use client";

import { Combobox } from "@base-ui/react/combobox";
import { useMemo, useState, useEffect } from "react";
import styles from "./KernCombobox.module.css";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface KernComboboxProps {
  id: string;
  label: string;
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export function KernCombobox({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "",
  hint,
  error,
  required,
}: KernComboboxProps) {
  // Initialize inputValue from the selected value, or find the label for the selected value
  const getInitialInputValue = () => {
    if (value) {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : "";
    }
    return "";
  };

  const [inputValue, setInputValue] = useState(getInitialInputValue);

  // Sync inputValue when value prop changes (e.g., when navigating back/forth)
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((opt) => opt.value === value);
      if (selectedOption && selectedOption.label !== inputValue) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInputValue(selectedOption.label);
      }
    } else if (inputValue !== "") {
      setInputValue("");
    }
  }, [value, options, inputValue]);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    const lower = inputValue.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lower)
    );
  }, [options, inputValue]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {hint && <p className={styles.hint}>{hint}</p>}

      <Combobox.Root
        value={value}
        inputValue={inputValue}
        onValueChange={(val) => {
          if (val !== null) {
            onChange(val);
            // Update inputValue to show the selected option's label
            const selectedOption = options.find((opt) => opt.value === val);
            if (selectedOption) {
              setInputValue(selectedOption.label);
            }
          }
        }}
        onInputValueChange={(val) => {
          setInputValue(val);
          // If input is cleared, clear the selected value
          if (!val) {
            onChange("");
          }
        }}
      >
        <div className={styles.inputWrapper}>
          <Combobox.Input
            id={id}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            aria-invalid={!!error}
          />
          <Combobox.Trigger className={styles.trigger}>
            <ChevronDownIcon />
          </Combobox.Trigger>
        </div>

        <Combobox.Portal>
          <Combobox.Positioner className={styles.positioner}>
            <Combobox.Popup className={styles.popup}>
              {filteredOptions.length === 0 ? (
                <div className={styles.empty}>Keine Ergebnisse gefunden</div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Item
                    key={option.value}
                    value={option.value}
                    className={styles.item}
                  >
                    <span>{option.label}</span>
                    <Combobox.ItemIndicator className={styles.itemIndicator}>
                      <CheckIcon />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))
              )}
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>

      {error && (
        <div id={`${id}-error`} className={styles.error}>
          <DangerIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      className={styles.dangerIcon}
    >
      <path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-361q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Z" />
    </svg>
  );
}

export default KernCombobox;
