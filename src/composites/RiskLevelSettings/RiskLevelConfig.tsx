import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useRiskLevelSettings, RiskLevelRange } from './RiskLevelSettingsProvider';
import { useRiskColor } from '@/composites/RiskHelpers';
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
  const { riskLevelRanges, updateRiskLevelRange, resetToDefaults, isCustomized } = useRiskLevelSettings();
  const { getRiskColor } = useRiskColor();
  const [activeScale, setActiveScale] = useState<'normal' | 'diagnostic'>('normal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<string[]>([]);

  const formatRangeValue = (value: number): string => {
    if (value === Infinity) return '∞';
    if (value === -Infinity) return '-∞';
    return value.toString();
  };

  const parseRangeValue = (value: string): number => {
    if (value === '∞' || value === 'Infinity') return Infinity;
    if (value === '-∞' || value === '-Infinity') return -Infinity;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Get adjacent level info
  const getAdjacentLevels = (levelKey: keyof typeof riskLevelRanges) => {
    const levelIndex = RISK_LEVELS.findIndex(l => l.key === levelKey);
    const previousLevel = levelIndex > 0 ? RISK_LEVELS[levelIndex - 1].key : null;
    const nextLevel = levelIndex < RISK_LEVELS.length - 1 ? RISK_LEVELS[levelIndex + 1].key : null;
    return { previousLevel, nextLevel };
  };

  // Check for gaps and coverage
  const checkWarnings = (rangeType: 'normalRange' | 'diagnosticRange') => {
    const newWarnings: string[] = [];
    const scale = rangeType === 'normalRange' ? 'normal' : 'diagnostic';
    const expectedMin = 0;
    const expectedMax = scale === 'normal' ? 1 : Infinity;

    // Check first level starts at expected min
    if (riskLevelRanges.severe[rangeType][0] > expectedMin) {
      newWarnings.push(`${scale === 'normal' ? 'Normal' : 'Diagnostic'} scale doesn't start at ${expectedMin}`);
    }

    // Check for gaps between levels
    for (let i = 0; i < RISK_LEVELS.length - 1; i++) {
      const currentLevel = RISK_LEVELS[i].key;
      const nextLevel = RISK_LEVELS[i + 1].key;
      const currentMax = riskLevelRanges[currentLevel][rangeType][1];
      const nextMin = riskLevelRanges[nextLevel][rangeType][0];

      if (currentMax !== Infinity && nextMin !== Infinity && Math.abs(currentMax - nextMin) > 0.001) {
        newWarnings.push(`Gap between ${RISK_LEVELS[i].name} and ${RISK_LEVELS[i + 1].name}`);
      }
    }

    // Check last level ends at expected max
    const lastRange = riskLevelRanges.low[rangeType];
    if (expectedMax !== Infinity && lastRange[1] < expectedMax) {
      newWarnings.push(`${scale === 'normal' ? 'Normal' : 'Diagnostic'} scale doesn't end at ${expectedMax}`);
    }

    setWarnings(newWarnings);
  };

  const handleRangeUpdate = (
    level: keyof typeof riskLevelRanges,
    rangeType: 'normalRange' | 'diagnosticRange',
    newMin: number,
    newMax: number
  ) => {
    const { previousLevel, nextLevel } = getAdjacentLevels(level);

    // Constraint 1: Minimum range width
    if (newMax !== Infinity && (newMax - newMin) < MIN_RANGE_WIDTH) {
      setErrors({ ...errors, [`${level}-${rangeType}`]: `Range must be at least ${MIN_RANGE_WIDTH}` });
      return;
    }

    // Constraint 2: Check overlaps with previous level
    if (previousLevel) {
      const prevMax = riskLevelRanges[previousLevel][rangeType][1];
      if (prevMax !== Infinity && newMin < prevMax) {
        // Prevent overlap - clamp to previous level's max
        newMin = prevMax;
      }
    }

    // Constraint 3: Check overlaps with next level
    if (nextLevel) {
      const nextMin = riskLevelRanges[nextLevel][rangeType][0];
      if (newMax !== Infinity && newMax > nextMin) {
        // Prevent overlap - clamp to next level's min
        newMax = nextMin;
      }
    }

    // Constraint 4: Re-check minimum width after clamping
    if (newMax !== Infinity && (newMax - newMin) < MIN_RANGE_WIDTH) {
      setErrors({ ...errors, [`${level}-${rangeType}`]: `Cannot adjust: would create overlap or too narrow range` });
      return;
    }

    // Clear error if valid
    setErrors({ ...errors, [`${level}-${rangeType}`]: '' });

    const updatedLevelRange: RiskLevelRange = {
      ...riskLevelRanges[level],
      [rangeType]: [newMin, newMax]
    };

    updateRiskLevelRange(level, updatedLevelRange);

    // Check for warnings after update
    setTimeout(() => checkWarnings(rangeType), 0);
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
            {warnings.length > 0 && activeScale === 'normal' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {warnings.map((warning, i) => (
                      <div key={i}>• {warning}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            {RISK_LEVELS.map((level, index) => (
              <RiskLevelRangeInput
                key={level.key}
                level={level}
                range={riskLevelRanges[level.key].normalRange}
                allRanges={riskLevelRanges}
                onRangeUpdate={(newMin, newMax) => handleRangeUpdate(level.key, 'normalRange', newMin, newMax)}
                getRiskColor={getRiskColor}
                error={errors[`${level.key}-normalRange`]}
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
            {warnings.length > 0 && activeScale === 'diagnostic' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {warnings.map((warning, i) => (
                      <div key={i}>• {warning}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            {RISK_LEVELS.map((level, index) => (
              <RiskLevelRangeInput
                key={level.key}
                level={level}
                range={riskLevelRanges[level.key].diagnosticRange}
                allRanges={riskLevelRanges}
                onRangeUpdate={(newMin, newMax) => handleRangeUpdate(level.key, 'diagnosticRange', newMin, newMax)}
                getRiskColor={getRiskColor}
                error={errors[`${level.key}-diagnosticRange`]}
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
  onRangeUpdate: (newMin: number, newMax: number) => void;
  getRiskColor: (score: number, type: 'background' | 'font' | 'badge') => string;
  error?: string;
  scale: 'normal' | 'diagnostic';
  rangeType: 'normalRange' | 'diagnosticRange';
  levelIndex: number;
}

function RiskLevelRangeInput({
  level,
  range,
  allRanges,
  onRangeUpdate,
  getRiskColor,
  error,
  scale,
  rangeType,
  levelIndex
}: RiskLevelRangeInputProps) {
  const formatValue = (value: number): string => {
    if (value === Infinity) return '∞';
    if (value === -Infinity) return '-∞';
    return value.toFixed(2);
  };

  // Define min/max bounds for the slider based on scale
  const absoluteMin = scale === 'normal' ? 0 : 0;
  const absoluteMax = scale === 'normal' ? 1 : 2;
  const step = 0.01;

  // Calculate constrained slider bounds based on adjacent levels
  const previousLevel = levelIndex > 0 ? RISK_LEVELS[levelIndex - 1].key : null;
  const nextLevel = levelIndex < RISK_LEVELS.length - 1 ? RISK_LEVELS[levelIndex + 1].key : null;

  // Min bound: can't go below previous level's max
  const constrainedMin = previousLevel
    ? Math.max(absoluteMin, allRanges[previousLevel][rangeType][1] === Infinity ? absoluteMin : allRanges[previousLevel][rangeType][1])
    : absoluteMin;

  // Max bound: can't go above next level's min
  const constrainedMax = nextLevel
    ? Math.min(absoluteMax, allRanges[nextLevel][rangeType][0])
    : absoluteMax;

  // Handle slider value changes with minimum width constraint
  const handleSliderChange = (values: number[]) => {
    let [newMin, newMax] = values;

    // Enforce minimum width
    if (newMax - newMin < MIN_RANGE_WIDTH) {
      // Determine which handle moved more and adjust the other
      const minDiff = Math.abs(newMin - range[0]);
      const maxDiff = Math.abs(newMax - range[1]);

      if (minDiff > maxDiff) {
        // Min handle moved, adjust max
        newMax = Math.min(constrainedMax, newMin + MIN_RANGE_WIDTH);
      } else {
        // Max handle moved, adjust min
        newMin = Math.max(constrainedMin, newMax - MIN_RANGE_WIDTH);
      }
    }

    onRangeUpdate(newMin, newMax);
  };

  // Clamp values to slider bounds for display
  const sliderValues = [
    Math.max(constrainedMin, Math.min(constrainedMax, range[0] === -Infinity ? constrainedMin : range[0])),
    Math.min(constrainedMax, Math.max(constrainedMin, range[1] === Infinity ? constrainedMax : range[1]))
  ];

  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="flex flex-row items-center pl-2"
          style={{
            backgroundColor: getRiskColor(level.sampleScore, 'background'),
            borderColor: getRiskColor(level.sampleScore, 'badge')
          }}
        >
          <p className="mr-1" style={{ color: getRiskColor(level.sampleScore, 'badge') }}>
            {level.name}
          </p>
          <div className="p-1 text-base" style={{ color: getRiskColor(level.sampleScore, 'badge') }}>
            {RISK_LEVELS.find(l => l.key === level.key)?.icon}
          </div>
        </Badge>

        <div className="text-sm text-muted-foreground">
          Range: {formatValue(range[0])} to {formatValue(range[1])}
        </div>
      </div>

      <div className="px-2">
        <Slider
          min={constrainedMin}
          max={constrainedMax}
          step={step}
          value={sliderValues}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <span>{formatValue(constrainedMin)}</span>
        <span>{formatValue(constrainedMax)}</span>
      </div>

      {error && (
        <div className="text-xs text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}
