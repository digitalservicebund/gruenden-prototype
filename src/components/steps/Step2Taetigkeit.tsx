import React, { useState, useEffect } from "react";
import {
  KernHeading,
  KernRow,
  KernColumn,
  KernInput,
  KernCheckbox,
  KernList,
  KernText,
} from "@kern-ux-annex/kern-react-kit";
import { PrimaryButton } from "@/components/PrimaryButton";
import { type FormData } from "@/app/types";

interface SearchResult {
  id: string;
  title: string;
  bulletPoints: string[];
}

interface Step2TaetigkeitProps {
  formData: FormData;
  onTaetigkeitChange: (value: string) => void;
  onTaetigkeitFreetextChange: (value: string) => void;
}

// Mock network call to search for activities
const mockSearchActivities = async (_query: string): Promise<SearchResult[]> => {
  // Simulate 100ms network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "reparatur-moebel",
      title: "Reparatur von Möbeln und Einrichtungsgegenständen",
      bulletPoints: [
        "Aufpolstern, Reparieren und Restaurieren von Möbeln und Einrichtungsgegenständen (einschließlich Büromöbel)",
        "Zusammenbau / Aufbau von freistehenden Möbeln",
      ],
    },
    {
      id: "bautischlerei-schlosserei",
      title: "Bautischlerei und -schlosserei",
      bulletPoints: [
        "Einbau von Türen (außer automatischen Türen und Drehtüren), Fenstern, Tür- und Fensterrahmen aus Holz oder anderem Material",
        "Einbau von Einbauküchen, Einbauschränken, Treppen, Ladeneinrichtungen und ähnlichem",
        "Einbau von Decken, beweglichen Trennwänden u. ä. Innenausbauarbeiten",
      ],
    },
    {
      id: "herstellung-sonstige-moebel",
      title: "Herstellung von sonstigen Möbeln",
      bulletPoints: [
        "Herstellung von Schlafzimmer-, Wohnzimmer- und Gartenmöbeln usw.",
        "Herstellung von Schränken für Nähmaschinen, Fernsehgeräte usw.",
      ],
    },
  ];
};

export function Step2Taetigkeit({ formData, onTaetigkeitChange, onTaetigkeitFreetextChange }: Step2TaetigkeitProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResults, setSelectedResults] = useState<Set<string>>(new Set());
  const [isSearching, setIsSearching] = useState(false);

  // Update parent when selectedResults changes
  useEffect(() => {
    onTaetigkeitChange(Array.from(selectedResults).join(','));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResults]);

  const handleSearch = async () => {
    if (!formData.taetigkeitFreetext?.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const results = await mockSearchActivities(formData.taetigkeitFreetext);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCheckboxChange = (resultId: string, checked: boolean) => {
    setSelectedResults((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(resultId);
      } else {
        newSet.delete(resultId);
      }
      return newSet;
    });
  };

  return (
    <>
      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <KernHeading level={2}>Womit wird sich Ihr neues Unternehmen beschäftigen?</KernHeading>
          <KernText>
            Bitte beschreiben Sie die geplanten Tätigkeiten Ihres Unternehmens.
          </KernText>
        </KernColumn>
      </KernRow>

      <KernRow>
        <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <KernInput
                id="taetigkeitFreetext"
                label=""
                value={formData.taetigkeitFreetext || ""}
                onChange={(e) => onTaetigkeitFreetextChange(e.target.value)}
                placeholder="Tätigkeiten eingeben..."
                required
              />
            </div>
            <PrimaryButton
              text="Suchen"
              icon="search"
              iconPlacement="left"
              onClick={handleSearch}
              disabled={isSearching || !formData.taetigkeitFreetext?.trim()}
            />
          </div>
        </KernColumn>
      </KernRow>

      {/* Search Results */}
      {searchResults.length > 0 && searchResults.map((result, index) => (
        <React.Fragment key={result.id}>
          <KernRow>
            <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
              <div className="flex gap-4 items-start">
                <div className="pt-1">
                  <KernCheckbox
                    id={`result-${result.id}`}
                    checked={selectedResults.has(result.id)}
                    onChange={(e) => handleCheckboxChange(result.id, e.target.checked)}
                  />
                </div>
                <div className="flex-1">
                  <KernHeading level={4}>{result.title}</KernHeading>
                  <div className="mt-2">
                    <KernList
                      type="bullet"
                      items={result.bulletPoints.map((point) => ({ content: point }))}
                    />
                  </div>
                </div>
              </div>
            </KernColumn>
          </KernRow>

          {/* Divider between results (not after the last one) */}
          {index < searchResults.length - 1 && (
            <KernRow>
              <KernColumn sizes={{ xs: 12, md: 8, lg: 6 }}>
                <hr className="border-0 border-t-2 border-gray-300 my-4" />
              </KernColumn>
            </KernRow>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
