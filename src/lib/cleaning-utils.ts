export interface CleaningOptions {
  removeHeaders: boolean;
  removeFooters: boolean;
  fixHyphenation: boolean;
  level: 'basic' | 'balanced' | 'aggressive';
}

/**
 * Identifies lines that appear at the same relative position (top or bottom)
 * on multiple pages and removes them.
 */
export function removePatternNoise(pages: string[]): string[] {
  if (pages.length < 2) return pages;

  const threshold = 0.5; // If it appears in >50% of pages
  const linesByPage = pages.map(text => text.split('\n'));
  
  // Very simplistic approach: look at first and last 2 lines of each page
  const headers: Record<string, number> = {};
  const footers: Record<string, number> = {};

  linesByPage.forEach(lines => {
    if (lines.length > 0) {
      const top = lines[0].trim();
      if (top) headers[top] = (headers[top] || 0) + 1;
      
      const bottom = lines[lines.length - 1].trim();
      if (bottom) footers[bottom] = (footers[bottom] || 0) + 1;
    }
  });

  const noiseHeaders = Object.keys(headers).filter(h => headers[h] / pages.length > threshold);
  const noiseFooters = Object.keys(footers).filter(f => footers[f] / pages.length > threshold);

  return pages.map(text => {
    let lines = text.split('\n');
    lines = lines.filter(line => {
      const trimmed = line.trim();
      return !noiseHeaders.includes(trimmed) && !noiseFooters.includes(trimmed);
    });
    return lines.join('\n');
  });
}

export function fixTextArtifacts(text: string): string {
  return text
    .replace(/(\w)-\s+(\w)/g, '$1$2') // Fix "pro- duto"
    .replace(/\s+/g, ' ')             // Normalize whitespace
    .replace(/\s+\n/g, '\n')          // Clean end of lines
    .trim();
}
