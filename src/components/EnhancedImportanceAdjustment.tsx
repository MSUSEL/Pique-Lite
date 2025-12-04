import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Settings, Info, ArrowUp, ArrowDown, Minus, Wand2, RotateCcw, Download, Upload } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const COLORS = ['#41afaa', '#466eb4', '#aa998f', '#e6a532', '#d7642c', '#af4b91', '#2dd4bf', '#8b5cf6', '#f97316', '#06b6d4'];
const x_tick_amt = 0.1;
const x_tick = arrayRange(0, 1, x_tick_amt);

function arrayRange(start: number, stop: number, step: number) {
  const foo = [];
  for (let i = start; i <= stop; i = i + step) {
    const next = start + i;
    foo.push(Number.parseFloat(next.toPrecision(2)));
  }
  return foo;
}

const calculateGraphedImpacts = (slope: number, step: number, x: number, y: number) => {
  const y_int = y - (slope * x);
  const y_coords = [];
  for (let i = 0; i <= 1; i += step) {
    y_coords.push(slope * i + y_int);
  }
  return y_coords;
};

interface Profile {
  type: string;
  importance: { [key: string]: number };
  characteristic: { [key: string]: number };
}

interface EnhancedImportanceAdjustmentProps {
  dataset: any;
  initialState: {
    adjustedImportance: { [key: string]: number };
    tqiValue: number | undefined;
  };
  onStateChange?: (newState: { adjustedImportance: { [key: string]: number }; tqiValue: number }) => void;
}

export const EnhancedImportanceAdjustment = ({ 
  dataset, 
  initialState, 
  onStateChange 
}: EnhancedImportanceAdjustmentProps) => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isApplyButtonActive, setIsApplyButtonActive] = useState(false);
  
  const [recalculatedWeights, setRecalculatedWeights] = useState<{ [key: string]: number }>({});
  const [updatedValues, setUpdatedValues] = useState<{ [key: string]: number }>({});
  const [updatedImportance, setUpdatedImportance] = useState<{ [key: string]: number }>(
    initialState.adjustedImportance || {}
  );
  const [characteristicValues, setCharacteristicValues] = useState<{ [key: string]: number }>({});
  
  const [strategyValues, setStrategyValues] = useState<{ [key: string]: number }>({});
  const [strategy, setStrategy] = useState("Lowest");
  const [isApplied, setIsApplied] = useState(false);

  // Original TQI from dataset
  const originalTQI = dataset && dataset.factors?.tqi ? 
    Object.values(dataset.factors.tqi)[0]?.value || 0 : 0;

  // Initialize data from dataset
  useEffect(() => {
    if (dataset && dataset.factors?.tqi) {
      const tqiObjects = dataset.factors.tqi;
      const firstTqiKey = Object.keys(tqiObjects)[0];
      const firstTqiObj = tqiObjects[firstTqiKey];
      
      if (firstTqiObj) {
        const weights = firstTqiObj.weights || {};
        const values: { [key: string]: number } = {};
        const charValues: { [key: string]: number } = {};
        
        // Get characteristic values
        Object.keys(weights).forEach(aspect => {
          values[aspect] = dataset.factors.quality_aspects?.[aspect]?.value || 0;
          charValues[aspect] = dataset.factors.quality_aspects?.[aspect]?.value || 0;
        });

        setUpdatedImportance(prev => Object.keys(prev).length > 0 ? prev : weights);
        setUpdatedValues(values);
        setCharacteristicValues(charValues);
      }
    }
  }, [dataset]);

  // Recalculate weights when importance changes
  useEffect(() => {
    const newWeights: { [key: string]: number } = {};
    const totalImportance = Object.values(updatedImportance).reduce((sum, importance) => sum + importance, 0);
    
    if (totalImportance > 0) {
      Object.keys(updatedImportance).forEach((name) => {
        newWeights[name] = updatedImportance[name] / totalImportance;
      });
    }
    
    setRecalculatedWeights(newWeights);
  }, [updatedImportance]);

  useEffect(() => {
    handleStrategyChanged();
  }, [strategy, updatedImportance, characteristicValues, recalculatedWeights]);

  const handleStrategyChanged = () => {
    if (strategy === 'Lowest') {
      const sortedValues = Object.fromEntries(
        Object.entries(characteristicValues).sort(([, a], [, b]) => a - b)
      );
      setStrategyValues(sortedValues);
    } else if (strategy === 'Fastest') {
      const sortedValues = Object.fromEntries(
        Object.entries(updatedImportance).sort(([, a], [, b]) => b - a)
      );
      setStrategyValues(sortedValues);
    } else if (strategy === 'LowestEffort') {
      const lowestEffortArray = Object.entries(updatedImportance).map(([name, value]) => ({
        name,
        value: (1 - characteristicValues[name]) * value,
      }));
      lowestEffortArray.sort((a, b) => b.value - a.value);
      const lowestEffort = Object.fromEntries(
        lowestEffortArray.map(item => [item.name, item.value])
      );
      setStrategyValues(lowestEffort);
    } else {
      const sortedValues = Object.fromEntries(
        Object.entries(characteristicValues).sort(([, a], [, b]) => b - a)
      );
      setStrategyValues(sortedValues);
    }
  };

  const handleProfileChange = (value: string) => {
    if (!value || value === "clear") {
      setSelectedProfile(null);
      // Reset to original values when clearing profile
      handleReset();
      return;
    }

    // Get the keys for importance adjustments
    const importanceKeys = Object.keys(updatedImportance);
    const characteristicKeys = Object.keys(characteristicValues);
    
    let newProfile: Profile;
    
    if (value === "Security Focused") {
      const securityProfile: Profile = {
        type: "Security Focused",
        importance: {},
        characteristic: { ...characteristicValues }
      };
      
      // Create a security-focused profile with dramatic differences
      importanceKeys.forEach((key, index) => {
        if (index === 0) {
          // Make first characteristic very high priority (simulate security focus)
          securityProfile.importance[key] = 0.8;
        } else if (index === 1) {
          // Second characteristic medium priority
          securityProfile.importance[key] = 0.6;
        } else {
          // Other characteristics lower priority
          securityProfile.importance[key] = 0.2;
        }
      });
      
      newProfile = securityProfile;
    } else if (value === "Performance Focused") {
      const performanceProfile: Profile = {
        type: "Performance Focused", 
        importance: {},
        characteristic: { ...characteristicValues }
      };
      
      // Create a performance-focused profile
      importanceKeys.forEach((key, index) => {
        if (index === Math.floor(importanceKeys.length / 2)) {
          // Make middle characteristic very high priority (simulate performance focus)
          performanceProfile.importance[key] = 0.9;
        } else if (index === Math.floor(importanceKeys.length / 2) + 1) {
          // Adjacent characteristic medium priority
          performanceProfile.importance[key] = 0.5;
        } else {
          // Other characteristics lower priority
          performanceProfile.importance[key] = 0.1;
        }
      });
      
      newProfile = performanceProfile;
    } else if (value === "Maintainability Focused") {
      const maintainabilityProfile: Profile = {
        type: "Maintainability Focused",
        importance: {},
        characteristic: { ...characteristicValues }
      };
      
      // Create a maintainability-focused profile
      importanceKeys.forEach((key, index) => {
        if (index === importanceKeys.length - 1) {
          // Make last characteristic very high priority (simulate maintainability focus)
          maintainabilityProfile.importance[key] = 0.85;
        } else if (index === importanceKeys.length - 2) {
          // Second to last characteristic medium priority
          maintainabilityProfile.importance[key] = 0.4;
        } else {
          // Other characteristics lower priority
          maintainabilityProfile.importance[key] = 0.15;
        }
      });
      
      newProfile = maintainabilityProfile;
    } else if (value === "Balanced") {
      const balancedProfile: Profile = {
        type: "Balanced",
        importance: {},
        characteristic: { ...characteristicValues }
      };
      
      // Create a balanced profile where all characteristics have equal importance
      const equalImportance = 1.0 / importanceKeys.length;
      importanceKeys.forEach(key => {
        balancedProfile.importance[key] = equalImportance;
      });
      
      newProfile = balancedProfile;
    } else {
      setSelectedProfile(null);
      return;
    }

    // Apply the profile
    setSelectedProfile(newProfile);
    setUpdatedImportance(newProfile.importance);
    setCharacteristicValues(newProfile.characteristic);
    
    console.log(`Applied ${value} profile:`, newProfile.importance);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsApplyButtonActive(true);
    } else {
      setUploadedFile(null);
      setIsApplyButtonActive(false);
    }
  };

  const handleApplyUpload = () => {
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const profile: Profile = JSON.parse(e.target?.result as string);
        setSelectedProfile(profile);
        setUpdatedImportance(profile.importance);
        setCharacteristicValues(profile.characteristic);
        setIsApplyButtonActive(false);
        setUploadedFile(null);
      } catch (error) {
        console.error("Error parsing the uploaded file", error);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleSliderChange = (name: string, newValue: number[], mode: 'importance' | 'characteristic') => {
    const value = newValue[0];
    if (mode === 'importance') {
      setUpdatedImportance(prev => ({ ...prev, [name]: value }));
    } else {
      setCharacteristicValues(prev => ({ ...prev, [name]: value }));
    }
    setIsApplied(false); // Reset applied state when user makes changes
  };

  const handleApply = () => {
    if (onStateChange) {
      onStateChange({
        adjustedImportance: recalculatedWeights, // These are the normalized weights (sum to 1)
        tqiValue: updatedTQIRaw
      });
    }
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 2000); // Reset after 2 seconds
    console.log('Applied changes to tree view and other tabs:', {
      adjustedImportance: recalculatedWeights,
      tqiValue: updatedTQIRaw
    });
  };

  const handleReset = () => {
    if (dataset && dataset.factors?.tqi) {
      const tqiObjects = dataset.factors.tqi;
      const firstTqiKey = Object.keys(tqiObjects)[0];
      const firstTqiObj = tqiObjects[firstTqiKey];
      
      if (firstTqiObj && firstTqiObj.weights) {
        setUpdatedImportance(firstTqiObj.weights);
        
        const values: { [key: string]: number } = {};
        Object.keys(firstTqiObj.weights).forEach(aspect => {
          values[aspect] = dataset.factors.quality_aspects?.[aspect]?.value || 0;
        });
        setCharacteristicValues(values);
        setSelectedProfile(null);
        
        // Also propagate reset to other tabs
        if (onStateChange) {
          onStateChange({
            adjustedImportance: firstTqiObj.weights,
            tqiValue: firstTqiObj.value || 0
          });
        }
        
        console.log('Reset applied to tree view and other tabs');
        setIsApplied(false); // Clear any applied state
      }
    }
  };

  const handleDownload = () => {
    const profileToDownload: Profile = {
      type: "Custom Profile",
      importance: updatedImportance,
      characteristic: characteristicValues,
    };

    const json = JSON.stringify(profileToDownload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "custom_profile.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const updatedTQIRaw = recalculatedWeights &&
    Object.entries(recalculatedWeights).reduce(
      (total, [name, weight]) => total + (characteristicValues[name] || 0) * weight,
      0
    );

  const pieData = Object.entries(recalculatedWeights).map(([name, value], index) => ({
    name,
    value: value * characteristicValues[name] / updatedTQIRaw,
    fill: COLORS[index % COLORS.length]
  }));

  const chartData = Object.entries(recalculatedWeights).map(([name, _value]) => ({
    name: name,
    value: characteristicValues[name],
    importance: _value,
    impacts: calculateGraphedImpacts(_value, x_tick_amt, characteristicValues[name], updatedTQIRaw)
  }));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <span className="text-xs text-blue-700">
            Currently, the adjustment is only applicable for <strong>Quality Characteristics</strong> 
            (i.e., the 2nd level of the tree display, and the 2nd expandable box in the list display).
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left side - Profile Selection and Adjustment Table */}
        <div className="xl:col-span-2 space-y-6">
          {/* Profile Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Selection</CardTitle>
              <CardDescription>
                Choose a predefined profile or upload your own
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Predefined Profiles</Label>
                  <Select value={selectedProfile?.type || "clear"} onValueChange={handleProfileChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a profile..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clear">Clear Profile</SelectItem>
                      <SelectItem value="Security Focused">Security Focused</SelectItem>
                      <SelectItem value="Performance Focused">Performance Focused</SelectItem>
                      <SelectItem value="Maintainability Focused">Maintainability Focused</SelectItem>
                      <SelectItem value="Balanced">Balanced Profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Upload Custom Profile</Label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="flex-1 text-sm"
                    />
                    <Button 
                      onClick={handleApplyUpload} 
                      disabled={!isApplyButtonActive}
                      size="sm"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adjustment Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Characteristics and Weights Adjustment</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        Characteristics
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>These are the Quality Characteristics that have impacts towards the TQI (Total Quality Index).</p>
                          </TooltipContent>
                        </UITooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Original Value</TableHead>
                    <TableHead className="text-center">Characteristic Adjustment</TableHead>
                    <TableHead className="text-center">Original Weight</TableHead>
                    <TableHead className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        Importance Adjustment
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Drag the slider to adjust the importance. The Adjusted Weight column shows updated weight values based on the adjusted importance.</p>
                          </TooltipContent>
                        </UITooltip>
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Adjusted Weight</TableHead>
                    <TableHead className="text-center">Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(updatedImportance).map(([name, importance]) => {
                    const originalValue = updatedValues[name] || 0;
                    const characteristicValue = characteristicValues[name] || 0;
                    const originalWeight = dataset?.factors?.tqi ? 
                      Object.values(dataset.factors.tqi)[0]?.weights?.[name] || 0 : 0;
                    const adjustedWeight = recalculatedWeights[name] || 0;
                    const impact = Math.max(0, characteristicValue - adjustedWeight);

                    return (
                      <TableRow key={name}>
                        <TableCell className="text-center">
                          <UITooltip>
                            <TooltipTrigger>
                              <span className="font-medium cursor-help">{name}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p><strong>Meaning of {name}:</strong> {dataset?.factors?.quality_aspects?.[name]?.description || "No description available"}</p>
                            </TooltipContent>
                          </UITooltip>
                        </TableCell>
                        <TableCell className="text-center">{originalValue.toFixed(3)}</TableCell>
                        <TableCell className="px-6">
                          <div className="space-y-2">
                            <Slider
                              value={[characteristicValue]}
                              onValueChange={(value) => handleSliderChange(name, value, 'characteristic')}
                              max={1}
                              min={0}
                              step={0.001}
                              className="w-full"
                            />
                            <div className="text-xs text-center text-muted-foreground">
                              {characteristicValue.toFixed(3)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{originalWeight.toFixed(3)}</TableCell>
                        <TableCell className="px-6">
                          <div className="space-y-2">
                            <Slider
                              value={[importance]}
                              onValueChange={(value) => handleSliderChange(name, value, 'importance')}
                              max={1}
                              min={0}
                              step={0.001}
                              className="w-full"
                            />
                            <div className="text-xs text-center text-muted-foreground">
                              {importance.toFixed(3)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{adjustedWeight.toFixed(3)}</TableCell>
                        <TableCell className="text-center">{impact.toFixed(3)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* TQI Comparison Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>Ini</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Initial TQI</div>
                    <div className="text-lg font-bold">{originalTQI.toFixed(4)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>New</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Updated TQI</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{updatedTQIRaw.toFixed(4)}</div>
                      {updatedTQIRaw > originalTQI ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : updatedTQIRaw < originalTQI ? (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <Minus className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button onClick={handleApply} className="w-full" variant={isApplied ? "default" : "default"}>
              <Wand2 className="h-4 w-4 mr-2" />
              {isApplied ? "Applied!" : "Apply"}
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleDownload} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Right side - Visualization tabs */}
        <div className="space-y-4">
          <Tabs defaultValue="contributions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
              <TabsTrigger value="impacts">Impacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contributions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contribution Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensitivity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sensitivity Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={x_tick.map(x => {
                      const dataPoint: any = { x };
                      chartData.forEach((chart, index) => {
                        dataPoint[chart.name] = chart.impacts[x_tick.indexOf(x)] || 0;
                      });
                      return dataPoint;
                    })}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" label={{ value: 'Values', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      {chartData.map((chart, index) => (
                        <Line
                          key={chart.name}
                          type="monotone"
                          dataKey={chart.name}
                          stroke={COLORS[index % COLORS.length]}
                          strokeWidth={2}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impacts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Impact Strategies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="strategy-select">Strategy:</Label>
                    <Select value={strategy} onValueChange={setStrategy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lowest">Lowest</SelectItem>
                        <SelectItem value="Fastest">Fastest</SelectItem>
                        <SelectItem value="LowestEffort">Lowest Effort</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recommendation Priority List</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {Object.entries(strategyValues).map(([key, value]) => (
                        <li key={key} className="text-sm">
                          {key}: {value.toFixed(3)}
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};