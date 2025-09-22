export function metersToUnits(
  meters: number,
  oneUnitLenghtInCentimeters: number
): number {
  return Math.floor(Math.round(meters * 100) / oneUnitLenghtInCentimeters);
}

export function getLastBlockWidth(
  meters: number,
  oneColumnLenghtInCentimeters: number
) {
  return Math.round((meters * 100) % oneColumnLenghtInCentimeters);
}

export function generatePathDFromElements(
  blockElements: React.JSX.Element[],
  rTop: number = 1,
  rBottom: number = 1
): string {
  return blockElements
    .map((el) => {
      const { x, y, width, height } = el.props;

      return `
        M${x + rTop},${y}
        h${width - 2 * rTop}
        a${rTop},${rTop} 0 0 1 ${rTop},${rTop}
        v${height - rTop - rBottom}
        a${rBottom},${rBottom} 0 0 1 -${rBottom},${rBottom}
        h-${width - 2 * rBottom}
        a${rBottom},${rBottom} 0 0 1 -${rBottom},-${rBottom}
        v-${height - rTop - rBottom}
        a${rTop},${rTop} 0 0 1 ${rTop},-${rTop}
        Z
      `
        .trim()
        .replace(/\s+/g, " ");
    })
    .join(" ");
}

export function floorToOneDecimal(num: number): number {
  return Math.floor(num * 10) / 10;
}
