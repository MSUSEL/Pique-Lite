import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useRiskLevelSettings, RiskLevelRange } from './RiskLevelSettingsProvider';
import { getRisk } from '@/composites/RiskHelpers';
import { useColorMode } from '@/composites/ColorMode';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RotateCcw } from 'lucide-react';

const RISK_LEVELS = [
  { key: 'severe' as const, name: 'Severe', sampleScore: 0.1 },
  { key: 'high' as const, name: 'High', sampleScore: 0.3 },
  { key: 'elevated' as const, name: 'Elevated', sampleScore: 0.5 },
  { key: 'guarded' as const, name: 'Guarded', sampleScore: 0.7 },
  { key: 'low' as const, name: 'Low', sampleScore: 0.9 }
];

const MIN_RANGE_WIDTH = 0.05;

export function RiskLevelConfig() {
  const { riskLevelRanges, updateMultipleRiskLevelRanges, resetToDefaults, isCustomized } = useRiskLevelSettings();
  const { getRiskColor } = useColorMode();
  const [activeScale, setActiveScale] = useState<'normal' | 'diagnostic'>('normal');

  // Handle boundary changes - when a boundary moves, update both adjacent levels
  const handleBoundaryChange = (
    boundaryIndex: number, // 1-4 (boundaries between the 5 levels)
    newValue: number,
    rangeType: 'normalRange' | 'diagnosticRange'
  ) => {
    const scale = rangeType === 'normalRange' ? 'normal' : 'diagnostic';
    const absoluteMin = 0;
    const absoluteMax = scale === 'normal' ? 1 : 2;

    // Get the levels on either side of this boundary
    const lowerLevel = RISK_LEVELS[boundaryIndex - 1];
    const upperLevel = RISK_LEVELS[boundaryIndex];

    // Get current ranges
    const lowerRange = riskLevelRanges[lowerLevel.key][rangeType];
    const upperRange = riskLevelRanges[upperLevel.key][rangeType];

    // Constrain the new value
    // Can't go below the lower level's min + MIN_RANGE_WIDTH
    const minAllowed = lowerRange[0] + MIN_RANGE_WIDTH;
    // Can't go above the upper level's max - MIN_RANGE_WIDTH
    const maxAllowed = (upperRange[1] === Infinity ? absoluteMax : upperRange[1]) - MIN_RANGE_WIDTH;

    const constrainedValue = Math.max(minAllowed, Math.min(maxAllowed, newValue));

    // Update both levels to share this boundary (batch update to avoid intermediate invalid state)
    const updatedLowerRange: RiskLevelRange = {
      ...riskLevelRanges[lowerLevel.key],
      [rangeType]: [lowerRange[0], constrainedValue]
    };

    const updatedUpperRange: RiskLevelRange = {
      ...riskLevelRanges[upperLevel.key],
      [rangeType]: [constrainedValue, upperRange[1]]
    };

    // Update both levels at once
    updateMultipleRiskLevelRanges({
      [lowerLevel.key]: updatedLowerRange,
      [upperLevel.key]: updatedUpperRange
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risk Level Configuration</CardTitle>
            <CardDescription>
              Customize the score ranges for each risk level. Changes apply immediately across all visualizations.
            </CardDescription>
          </div>
          {isCustomized && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefaults}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeScale} onValueChange={(v) => setActiveScale(v as 'normal' | 'diagnostic')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="normal">Normal Scale</TabsTrigger>
            <TabsTrigger value="diagnostic">Diagnostic Scale</TabsTrigger>
          </TabsList>

          <TabsContent value="normal" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Normal scale is used for TQI and quality aspect scores (0-1 range, higher is better).
              </AlertDescription>
            </Alert>
            {RISK_LEVELS.map((level, index) => (
              <RiskLevelRangeInput
                key={level.key}
                level={level}
                range={riskLevelRanges[level.key].normalRange}
                allRanges={riskLevelRanges}
                onBoundaryChange={handleBoundaryChange}
                getRiskColor={getRiskColor}
                scale="normal"
                rangeType="normalRange"
                levelIndex={index}
              />
            ))}
          </TabsContent>

          <TabsContent value="diagnostic" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Diagnostic scale is used for diagnostic measures (inverted scale, lower is better).
              </AlertDescription>
            </Alert>
            {RISK_LEVELS.map((level, index) => (
              <RiskLevelRangeInput
                key={level.key}
                level={level}
                range={riskLevelRanges[level.key].diagnosticRange}
                allRanges={riskLevelRanges}
                onBoundaryChange={handleBoundaryChange}
                getRiskColor={getRiskColor}
                scale="diagnostic"
                rangeType="diagnosticRange"
                levelIndex={index}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface RiskLevelRangeInputProps {
  level: typeof RISK_LEVELS[number];
  range: [number, number];
  allRanges: ReturnType<typeof useRiskLevelSettings>['riskLevelRanges'];
  onBoundaryChange: (boundaryIndex: number, newValue: number, rangeType: 'normalRange' | 'diagnosticRange') => void;
  getRiskColor: (riskLevel: 'severe' | 'high' | 'elevated' | 'guarded' | 'low', type?: 'background' | 'font' | 'badge') => string;
  scale: 'normal' | 'diagnostic';
  rangeType: 'normalRange' | 'diagnosticRange';
  levelIndex: number;
}

function RiskLevelRangeInput({
  level,
  range,
  allRanges,
  onBoundaryChange,
  getRiskColor,
  scale,
  rangeType,
  levelIndex
}: RiskLevelRangeInputProps) {
  const formatValue = (value: number): string => {
    if (value === Infinity) return '∞';
    if (value === -Infinity) return '-∞';
    return value.toFixed(2);
  };

  const absoluteMin = scale === 'normal' ? 0 : 0;
  const absoluteMax = scale === 'normal' ? 1 : 2;
  const step = 0.01;

  const riskLevel = getRisk(level.sampleScore, scale);
  const isFirstLevel = levelIndex === 0;
  const isLastLevel = levelIndex === RISK_LEVELS.length - 1;

  // For rendering, we show the upper boundary slider (unless it's the last level)
  const showUpperBoundary = !isLastLevel;

  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="flex flex-row items-center pl-2"
          style={{
            backgroundColor: getRiskColor(level.key, 'background'),
            borderColor: getRiskColor(level.key, 'badge')
          }}
        >
          <p className="mr-1" style={{ color: getRiskColor(level.key, 'badge') }}>
            {level.name}
          </p>
          <div className="p-1 text-base" style={{ color: getRiskColor(level.key, 'badge') }}>
            {riskLevel.icon}
          </div>
        </Badge>

        <div className="text-sm text-muted-foreground">
          Range: {formatValue(range[0])} to {formatValue(range[1])}
        </div>
      </div>

      {showUpperBoundary && (
        <>
          <div className="px-2">
            <div className="text-xs text-muted-foreground mb-2">
              Adjust upper boundary (affects {level.name} and {RISK_LEVELS[levelIndex + 1].name})
            </div>
            <Slider
              min={range[0] + MIN_RANGE_WIDTH}
              max={(allRanges[RISK_LEVELS[levelIndex + 1].key][rangeType][1] === Infinity ? absoluteMax : allRanges[RISK_LEVELS[levelIndex + 1].key][rangeType][1]) - MIN_RANGE_WIDTH}
              step={step}
              value={[range[1] === Infinity ? absoluteMax : range[1]]}
              onValueChange={(values) => onBoundaryChange(levelIndex + 1, values[0], rangeType)}
              className="w-full"
            />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>{formatValue(range[0] + MIN_RANGE_WIDTH)}</span>
            <span>{formatValue((allRanges[RISK_LEVELS[levelIndex + 1].key][rangeType][1] === Infinity ? absoluteMax : allRanges[RISK_LEVELS[levelIndex + 1].key][rangeType][1]) - MIN_RANGE_WIDTH)}</span>
          </div>
        </>
      )}

      {!showUpperBoundary && (
        <div className="px-2 text-xs text-muted-foreground italic">
          This is the last level - its upper boundary is fixed at {formatValue(range[1])}
        </div>
      )}

      {isFirstLevel && (
        <div className="px-2 text-xs text-muted-foreground italic">
          Lower boundary is fixed at {formatValue(range[0])}
        </div>
      )}
    </div>
  );
}
