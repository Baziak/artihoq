import { Box, Table, TableBody, TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import TechnicalCorrelationSelector from "./Inputs/TechnicalCorrelationSelector";
import { baseColor } from "./styles";

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

interface HoqTechnicalCorrelationsProps {
  qfdState: QfdState;
  measureCellsWidths: number[];
  setTechnicalCorrelationValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
}

// TODO highlight connected items on hover

const HoqTechnicalCorrelations = ({
  qfdState,
  measureCellsWidths,
  setTechnicalCorrelationValue,
}: HoqTechnicalCorrelationsProps) => {
  const measureCellsTotalWidth = measureCellsWidths.reduce((sum, b) => sum + b, 0);

  return (
    <Box sx={{ height: measureCellsTotalWidth / 2 + "px", overflow: "hidden" }}>
      <Table
        sx={{
          ...baseColor,
          transform:
            "rotate(-45deg) translate(0, " +
            measureCellsTotalWidth * 0.5 * (1 / Math.SQRT2 + 1 / Math.SQRT2 - 1) +
            "px)",
          tableLayout: "fixed",
          width: measureCellsTotalWidth / Math.SQRT2 + "px",
          height: measureCellsTotalWidth / Math.SQRT2 + "px",
        }}
      >
        <TableBody>
        {qfdState.measures.map((firstMeasure, index1st) => (
          <TableRow
            key={firstMeasure.id}
            sx={{
              height: measureCellsWidths[index1st] / Math.SQRT2 - 2 + "px",
            }}
          >
            {qfdState.measures.map((secondMeasure, index2nd) => (
              <TableCell
                key={secondMeasure.id}
                sx={{
                  ...cellStyling,
                  textAlign: "center",
                  padding: 0,
                  width: measureCellsWidths[index2nd] / Math.SQRT2 - 2 + "px",
                }}
              >
                {index1st < index2nd ? (
                  <TechnicalCorrelationSelector
                    selectedValue={qfdState.technicalCorrelations[index1st][index2nd - index1st - 1]}
                    onChange={(newValue) => setTechnicalCorrelationValue(index1st, index2nd - index1st - 1, newValue)}
                  />
                ) : index2nd < index1st && index1st == 5 ? (
                  String.fromCharCode("$)3#/".split("")[index2nd % 6].charCodeAt(0) + 32) + "."
                ) : (
                  ""
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HoqTechnicalCorrelations;
