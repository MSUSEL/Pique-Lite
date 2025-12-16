import React from 'react';
import { useColorMode } from '../ColorMode';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorModeToggleProps {
  className?: string;
}

export function ColorModeToggle({ className }: ColorModeToggleProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Color Mode</CardTitle>
        <CardDescription>
          Choose between normal and colorblind-friendly color schemes for risk visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            id="colorblind-mode"
            checked={colorMode === 'colorblind'}
            onCheckedChange={toggleColorMode}
          />
          <Label htmlFor="colorblind-mode">
            {colorMode === 'colorblind' ? 'Colorblind-friendly mode' : 'Normal mode'}
          </Label>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            {colorMode === 'colorblind' 
              ? 'Using colorblind-friendly colors with distinct hues and contrast ratios.'
              : 'Using standard risk colors with traditional green-red spectrum.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Simplified toggle for inline use
export function ColorModeSwitch({ className }: ColorModeToggleProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Switch
        id="colorblind-mode-simple"
        checked={colorMode === 'colorblind'}
        onCheckedChange={toggleColorMode}
      />
      <Label htmlFor="colorblind-mode-simple">
        Colorblind mode
      </Label>
    </div>
  );
}