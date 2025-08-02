import React from "react";
import { TableCell, TableRow } from "@mui/material";
import QfdState from "./QfdState";
import { cellStyling, highlightColor } from "./styles";
import HoqRequirementRatingCell from "./HoqRequirementRatingCell";

interface HoqTechBenchmarkRowsProps {
  qfdState: QfdState;
  setTechnicalBenchmarkRating: (measureIndex: number, competitorIndex: number, rating: number) => void;
}

const HoqTechBenchmarkRows = ({ qfdState, setTechnicalBenchmarkRating }: HoqTechBenchmarkRowsProps) => {
  return (
    <>
      {[...Array(5)].map((_, ratingRowIndex) => {
        const ratingValue = ratingRowIndex + 1;
        return (
          <TableRow key={ratingRowIndex}>
            {ratingRowIndex === 0 && (
              <TableCell colSpan={2} rowSpan={5} sx={{ ...cellStyling, ...highlightColor }}>
                Technical Benchmark
              </TableCell>
            )}
            {qfdState.measures.map((measure, measureIndex) => (
              <HoqRequirementRatingCell
                key={`${measure.id}-${ratingValue}`}
                id={`tech-rating-cell-${measureIndex}-${ratingValue}`}
                competitors={qfdState.competitors}
                ratingValueForCell={ratingValue}
                currentRatingsForThisRequirement={qfdState.technicalBenchmarkRatings[measureIndex] || []}
                onSetRating={(competitorIndex, newRatingForCompetitor) => {
                  setTechnicalBenchmarkRating(measureIndex, competitorIndex, newRatingForCompetitor);
                }}
              />
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default HoqTechBenchmarkRows;
